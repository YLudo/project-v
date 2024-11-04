import { ContentLayout } from "@/components/layout/content-layout";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { getLoggedInUser } from "@/lib/actions/user.actions";
import { Link } from "lucide-react";
import { redirect } from "next/navigation";

const DashboardPage = async () => {
    const response = await getLoggedInUser();
    if ('error' in response) {
        redirect("/login");
    }

    return (
        <ContentLayout title="Tableau de bord" user={response.data}>
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <Link href="/">Accueil</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>Tableau de bord</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
        </ContentLayout>
    );
}

export default DashboardPage;