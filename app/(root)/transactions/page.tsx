import TransactionHistory from "@/components/app/transactions/transaction-history";
import { ContentLayout } from "@/components/layout/content-layout";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { getLoggedInUser } from "@/lib/actions/user.actions"
import { TransactionsPageProps } from "@/types";
import Link from "next/link";
import { redirect } from "next/navigation";

const TransactionsPage = async ({ searchParams }: TransactionsPageProps) => {
    const response = await getLoggedInUser();
    if ('error' in response) {
        redirect("/login");
    }

    const page = searchParams.page ? parseInt(searchParams.page as string) : 1;
    const id = searchParams.id as string;

    if (isNaN(page) || page < 1) {
        redirect("/transactions?page=1");
    }

    return (
        <ContentLayout title="Transactions" user={response.data}>
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <Link href="/">Tableau de bord</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>Liste des transactions</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <TransactionHistory 
                user={response.data} 
                params={{
                    page: page,
                    id: id
                }} 
            />
        </ContentLayout>
    );
}

export default TransactionsPage;