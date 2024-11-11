"use server";

import { Bank, GetInstitutionProps, GetAccountProps, GetAccountsProps, GetTransactionsProps } from "@/types";
import { getBank, getBanks } from "./user.actions"
import { plaidClient } from "../plaid";
import { CountryCode } from "plaid";
import { parseStringify } from "../utils";

export const getAccounts = async ({ userId }: GetAccountsProps) => {
    try {
        const banks = await getBanks({ userId });

        const accounts = await Promise.all(
            banks?.map(async (bank: Bank) => {
                const accountsResponse = await plaidClient.accountsGet({
                    access_token: bank.accessToken,
                });

                const accountData = accountsResponse.data.accounts[0];

                const institution = await getInstitution({
                    institutionId: accountsResponse.data.item.institution_id!,
                });

                const account = {
                    id: accountData.account_id,
                    availableBalance: accountData.balances.available!,
                    currentBalance: accountData.balances.current!,
                    institutionId: institution.institution_id,
                    name: accountData.name,
                    officialName: accountData.official_name,
                    mask: accountData.mask!,
                    type: accountData.type as string,
                    subtype: accountData.subtype! as string,
                    appwriteItemId: bank.$id,
                    shareableId: bank.shareableId,
                };

                return account;
            })
        );

        const totalBanks = accounts.length;
        const totalCurrentBalance = accounts.reduce((total, account) => {
            return total + account.currentBalance;
        }, 0);

        return parseStringify({ data: accounts, totalBanks, totalCurrentBalance });
    } catch (error) {
        return {
            error: "Oups ! Quelque chose s'est mal passé. Veuillez réessayer dans quelques instants.",
            status: 500
        };
    }
}

export const getAccount = async ({ appwriteItemId }: GetAccountProps) => {
    try {
        const bank = await getBank({ documentId: appwriteItemId });

        const accountsResponse = await plaidClient.accountsGet({
            access_token: bank.accessToken,
        });

        const accountData = accountsResponse.data.accounts[0];

        const institution = await getInstitution({
            institutionId: accountsResponse.data.item.institution_id!,
        });

        const transactions = await getTransactions({
            accessToken: bank?.accessToken,
        });

        const account = {
            id: accountData.account_id,
            availableBalance: accountData.balances.available!,
            currentBalance: accountData.balances.current!,
            institutionId: institution.institution_id,
            name: accountData.name,
            officialName: accountData.official_name,
            mask: accountData.mask!,
            type: accountData.type as string,
            subtype: accountData.subtype! as string,
            appwriteItemId: bank.$id,
        };

        const allTransactions = [...transactions].sort(
            (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        );

        return parseStringify({
            data: account,
            transactions: allTransactions,
        });
    } catch (error) {
        return {
            error: "Oups ! Quelque chose s'est mal passé. Veuillez réessayer dans quelques instants.",
            status: 500
        };
    }
}

export const getInstitution = async ({
    institutionId,
}: GetInstitutionProps) => {
    try {
        const institutionResponse = await plaidClient.institutionsGetById({
            institution_id: institutionId,
            country_codes: ["FR"] as CountryCode[],
        });

        const institution = institutionResponse.data.institution;

        return parseStringify(institution);
    } catch (error) {
        return {
            error: "Oups ! Quelque chose s'est mal passé. Veuillez réessayer dans quelques instants.",
            status: 500
        };
    }
}

export const getTransactions = async ({
    accessToken
}: GetTransactionsProps) => {
    let hasMore = true;
    let transactions: any = [];

    try {
        while (hasMore) {
            const response = await plaidClient.transactionsSync({
                access_token: accessToken,
            });

            const data = response.data;

            transactions = response.data.added.map((transaction) => ({
                id: transaction.transaction_id,
                name: transaction.name,
                paymentChannel: transaction.payment_channel,
                type: transaction.payment_channel,
                accountId: transaction.account_id,
                amount: transaction.amount,
                pending: transaction.pending,
                category: transaction.category ? transaction.category[0] : "",
                date: transaction.date,
                image: transaction.logo_url,
            }));

            hasMore = data.has_more;
        }

        return parseStringify(transactions);
    } catch (error) {
        return {
            error: "Oups ! Quelque chose s'est mal passé. Veuillez réessayer dans quelques instants.",
            status: 500
        };
    }
}