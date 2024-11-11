import { getAccount, getAccounts } from "@/lib/actions/bank.actions";
import { TransactionHistoryProps } from "@/types";
import { redirect } from "next/navigation";
import PlaidLink from "../plaid-link";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { formatAmount } from "@/lib/utils";
import TransactionsTable from "./transactions-table";
import TransactionPagination from "./transaction-pagination";

const TransactionHistory = async ({ user, params }: TransactionHistoryProps) => {
    const currentPage = params.page || 1;
    const accounts = await getAccounts({
        userId: user.$id
    });

    if (!accounts) {
        redirect("/");
    };

    if (accounts.totalBanks === 0) {
        return (
            <div className="mt-6">
                <PlaidLink user={user} />
            </div>
        );
    }

    const accountsData = accounts?.data;
    const appwriteItemId = (params.id as string) || accountsData[0]?.appwriteItemId;

    const account = await getAccount({ appwriteItemId });

    const rowsPerPage = 7;
    const totalPages = Math.ceil(account?.transactions.length / rowsPerPage);

    const indexOfLastTransaction = currentPage * rowsPerPage;
    const indexOfFirstTransaction = indexOfLastTransaction - rowsPerPage;

    const currentTransactions = account?.transactions.slice(
        indexOfFirstTransaction, indexOfLastTransaction
    )

    console.log(account);

    return (
        <div className="space-y-6 mt-6">
            <Card className="bg-primary">
                <CardHeader className="flex items-center md:items-start">
                    <CardTitle className="text-muted">Mon compte</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col items-center justify-between gap-4 rounded-lg md:flex-row">
                    <div className="flex flex-col gap-2">
                        <h2 className="text-base font-bold text-muted">{account?.data.name}</h2>
                        <p className="text-sm text-muted">
                            {account?.data.officialName}
                        </p>
                        <p className="text-sm font-semibold tracking-[1.1px] text-muted">
                            ●●●● ●●●● ●●●● {account?.data.mask}
                        </p>
                    </div>
                    <div className="flex-center flex-col gap-2 text-muted">
                        <p className="text-sm text-center">Solde actuel</p>
                        <p className="text-lg text-center font-bold">{formatAmount(account?.data.currentBalance)}</p>
                    </div>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>Liste des transactions</CardTitle>
                </CardHeader>
                <CardContent>
                    <TransactionsTable transactions={currentTransactions} />
                </CardContent>
                {totalPages > 1 && (
                    <CardFooter>
                        <TransactionPagination page={currentPage} totalPages={totalPages} />
                    </CardFooter>
                )}
            </Card>
        </div>
    )
}

export default TransactionHistory;