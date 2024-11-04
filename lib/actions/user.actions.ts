"use server";

import { ApiResponse, ErrorResponse, GetUserInfoProps, SignInParams, SignUpParams, SuccessResponse } from "@/types";
import { createAdminClient, createSessionClient } from "../appwrite";
import { ID, Query } from "node-appwrite";
import { cookies } from "next/headers";
import { isErrorResponse, parseStringify } from "@/lib/utils";

const {
    APPWRITE_DATABASE_ID: DATABASE_ID,
    APPWRITE_USER_COLLECTION_ID: USER_COLLECTION_ID,
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