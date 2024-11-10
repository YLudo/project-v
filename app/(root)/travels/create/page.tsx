import TravelCreateForm from "@/components/app/travels/travel-create-form";
import { ContentLayout } from "@/components/layout/content-layout";
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from "@/components/ui/breadcrumb";
import { buttonVariants } from "@/components/ui/button";
import { getLoggedInUser } from "@/lib/actions/user.actions";
import Link from "next/link";
import { redirect } from "next/navigation";

const TravelCreatePage = async () => {
    const response = await getLoggedInUser();
    if ('error' in response) {
        redirect("/login");
    }

    return (
        <ContentLayout title="Voyages" user={response.data}>
            <div className="flex items-center justify-between">
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink asChild>
                                <Link href="/">Tableau de bord</Link>
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbLink asChild>
                                <Link href="/travels">Voyages</Link>
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage>Créer un voyage</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
                <Link href="/travels" className={buttonVariants({ variant: "default" })}>Retour</Link>
            </div>
            <TravelCreateForm />
        </ContentLayout>
    );
}

export default TravelCreatePage;