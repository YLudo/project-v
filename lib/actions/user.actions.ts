"use server";

import { ApiResponse, CreateBankAccountProps, ErrorResponse, ExchangePublicTokenProps, GetBankProps, GetBanksProps, GetUserInfoProps, SignInParams, SignUpParams, SuccessResponse, User } from "@/types";
import { createAdminClient, createSessionClient } from "../appwrite";
import { ID, Query } from "node-appwrite";
import { cookies } from "next/headers";
import { encryptId, isErrorResponse, parseStringify } from "@/lib/utils";
import { CountryCode, Products } from "plaid";
import { plaidClient } from "../plaid";
import { revalidatePath } from "next/cache";

const {
    APPWRITE_DATABASE_ID: DATABASE_ID,
    APPWRITE_USER_COLLECTION_ID: USER_COLLECTION_ID,
    APPWRITE_BANK_COLLECTION_ID: BANK_COLLECTION_ID,
} = process.env;

const checkConfig = (): ErrorResponse | null => {
    if (!DATABASE_ID || !USER_COLLECTION_ID) {
        return {
            error: "Configuration de la base de données manquante",
            status: 500
        };
    }
    return null;
};

const setSessionCookie = (sessionSecret: string) => {
    cookies().set("project-v-session", sessionSecret, {
        path: "/",
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.NODE_ENV === "production",
        maxAge: 7 * 24 * 60 * 60
    });
};

export const getUserInfo = async ({ userId }: GetUserInfoProps): Promise<ApiResponse<any>> => {
    const configError = checkConfig();
    if (configError) return configError;

    if (!userId) {
        return  {
            error: "ID utilisateur requis",
            status: 400
        };
    }

    try {
        const { database } = await createAdminClient();
    
        const userDocuments = await database.listDocuments(
            DATABASE_ID!,
            USER_COLLECTION_ID!,
            [Query.equal('userId', [userId])]
        )
        
        if (!userDocuments.documents.length) {
            return {
                error: "Nous ne trouvons pas votre compte. Veuillez vous déconnecter et vous reconnecter.",
                status: 404
            }
        }
        
        return {
            data: parseStringify(userDocuments.documents[0]),
            status: 200
        };
    } catch (error) {
        return {
            error: "Impossible de récupérer vos informations. Veuillez rafraîchir la page.",
            status: 500
        };
    }
};

export const signIn = async ({ email, password }: SignInParams): Promise<ApiResponse<any>> => {
    const configError = checkConfig();
    if (configError) return configError;

    if (!email || !password) {
        return {
            error: "Vous devez spécifier votre adresse e-mail et votre mot de passe.",
            status: 400
        };
    }

    try {
        const { account } = await createAdminClient();

        const session = await account.createEmailPasswordSession(email, password);

        if (!session?.secret) {
            return {
                error: "Echec de la création de la session",
                status: 401
            };
        }

        setSessionCookie(session.secret);

        const userResponse = await getUserInfo({ userId: session.userId });

        if (isErrorResponse(userResponse)) {
            cookies().delete("project-v-session");
            return userResponse;
        }

        return {
            data: userResponse.data,
            status: 200
        };
    } catch (error: any) {
        if (error?.code === 401) {
            return {
                error: "L'adresse e-mail ou le mot de passe est incorrect. Veuillez réessayer.",
                status: 401
            };
        }

        return {
            error: "Oups! Quelque chose s'est mal passé. Veuillez réessayer dans quelques instants.",
            status: 500
        };
    }
}

export const signUp = async ({ password, ...userData }: SignUpParams) => {
    const configError = checkConfig();
    if (configError) return configError;

    const { username, email } = userData;

    if (!email || !password || !username) {
        return {
            error: "Veuillez remplir tous les champs du formulaire.",
            status: 400
        };
    }

    try {
        const { account, database } = await createAdminClient();

        try {
            await account.get();
            return {
                error: "Cette adresse e-mail est déjà associé à un compte. Essayez de vous connecter ou utilisez une autre adresse.",
                status: 409
            };
        } catch {}

        const newUserAccount = await account.create(
            ID.unique(),
            email,
            password,
            username
        );

        if(!newUserAccount) {
            return {
                error: "Nous n'avons pas pu créer votre compte. Veuillez réessayer dans quelques instants.",
                status: 500
            };
        };

        const newUser = await database.createDocument(
            DATABASE_ID!,
            USER_COLLECTION_ID!,
            ID.unique(),
            {
                ...userData,
                userId: newUserAccount.$id
            }
        )

        const session = await account.createEmailPasswordSession(email, password);
        setSessionCookie(session.secret);

        return {
            data: parseStringify(newUser),
            status: 201,
        };
    } catch (error: any) {
        if (error?.code === 409) {
            return {
                error: "Cette adresse e-mail est déjà associé à un compte. Essayez de vous connecter ou utilisez une autre adresse.",
                status: 409
            };
        }
        return {
            error: "Oups ! Quelque chose s'est mal passé. Veuillez réessayer dans quelques instants.",
            status: 500
        };
    }
};

export const getLoggedInUser = async (): Promise<ApiResponse<any>> => {
    try {
        const { account } = await createSessionClient();
        const session = await account.get();

        if (!session?.$id) {
            return {
                error: "Votre session a expiré. Veuillez vous reconnecter.",
                status: 401
            };
        }

        return await getUserInfo({ userId: session.$id });
    } catch (error) {
        return {
            error: "Votre session a expiré. Veuillez vous reconnecter.",
            status: 401
        };
    }
};

export const signOut = async (): Promise<ApiResponse<null>> => {
    try {
        const { account } = await createSessionClient();
        await account.deleteSession("current");
        cookies().delete("project-v-session");

        return {
            data: null,
            status: 200
        };
    } catch (error) {
        return {
            error: "La déconnexion a échoué. Veuillez fermer votre navigateur pour terminer la session.",
            status: 500
        };
    }
};

export const createLinkToken = async (user: User) => {
    try {
        const tokenParams = {
            user: {
                client_user_id: user.$id
            },
            client_name: user.username,
            products: ['auth', 'transactions'] as Products[],
            language: 'fr',
            country_codes: ['FR'] as CountryCode[],
        }

        const response = await plaidClient.linkTokenCreate(tokenParams);

        return parseStringify({ linkToken: response.data.link_token });
    } catch (error) {
        return {
            error: "Oups ! Quelque chose s'est mal passé. Veuillez réessayer dans quelques instants.",
            status: 500
        };
    }
}

export const createBankAccount = async ({
    userId, bankId, accountId, accessToken, shareableId
}: CreateBankAccountProps) => {
    try {
        const { database } = await createAdminClient();

        const bankAccount = await database.createDocument(
            DATABASE_ID!,
            BANK_COLLECTION_ID!,
            ID.unique(),
            {
                userId,
                bankId,
                accountId,
                accessToken,
                shareableId
            }
        )

        return parseStringify(bankAccount);
    } catch (error) {
        return {
            error: "Oups ! Quelque chose s'est mal passé. Veuillez réessayer dans quelques instants.",
            status: 500
        };
    }
}

export const exchangePublicToken = async ({
    publicToken, user
}: ExchangePublicTokenProps) => {
    try {
        const response = await plaidClient.itemPublicTokenExchange({
            public_token: publicToken,
        });

        const accessToken = response.data.access_token;
        const itemId = response.data.item_id;

        const accountsResponse = await plaidClient.accountsGet({
            access_token: accessToken,
        });

        const accountsData = accountsResponse.data.accounts[0];

        await createBankAccount({
            userId: user.$id,
            bankId: itemId,
            accountId: accountsData.account_id,
            accessToken,
            shareableId: encryptId(accountsData.account_id),
        });

        revalidatePath("/");

        return parseStringify({
            publicTokenExchange: "complete",
        });
    } catch (error) {
        return {
            error: "Oups ! Quelque chose s'est mal passé. Veuillez réessayer dans quelques instants.",
            status: 500
        };
    }
}

export const getBanks = async ({ userId }: GetBanksProps) => {
    try {
        const { database } = await createAdminClient();

        const banks = await database.listDocuments(
            DATABASE_ID!,
            BANK_COLLECTION_ID!,
            [Query.equal('userId', [userId])]
        );

        return parseStringify(banks.documents);
    } catch (error) {
        return {
            error: "Oups ! Quelque chose s'est mal passé. Veuillez réessayer dans quelques instants.",
            status: 500
        };
    }
}

export const getBank = async ({ documentId }: GetBankProps) => {
    try {
        const { database } = await createAdminClient();

        const bank = await database.listDocuments(
            DATABASE_ID!,
            BANK_COLLECTION_ID!,
            [Query.equal('$id', [documentId])]
        );

        return parseStringify(bank.documents[0]);
    } catch (error) {
        return {
            error: "Oups ! Quelque chose s'est mal passé. Veuillez réessayer dans quelques instants.",
            status: 500
        }; 
    }
}