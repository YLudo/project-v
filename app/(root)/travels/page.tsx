import TravelsLayout from "@/components/app/travels/travels-layout";
import { ContentLayout } from "@/components/layout/content-layout"
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from "@/components/ui/breadcrumb";
import { buttonVariants } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { getTravels } from "@/lib/actions/travel.actions";
import { getLoggedInUser } from "@/lib/actions/user.actions";
import { isErrorResponse } from "@/lib/utils";
import Link from "next/link";
import { redirect } from "next/navigation";

const TravelsPage = async () => {
    const response = await getLoggedInUser();
    if ('error' in response) {
        redirect("/login");
    }
    
    const travels = await getTravels();
    if (isErrorResponse(travels)) {
        toast({
            variant: "destructive",
            title: "Une erreur est survenue !",
            description: travels.error,
        })
        redirect("/");
    }

    return (
        <ContentLayout title="Voyages" user={response.data}>
            <div className="flex justify-between items-center">
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink asChild>
                                <Link href="/">Tableau de bord</Link>
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage>Liste des voyages</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
                <Link href="/travels/create" className={buttonVariants({ variant: "default" })}>Créer un voyage</Link>
            </div>
            <TravelsLayout travels={travels.data} />
        </ContentLayout>
    );
}

export default TravelsPage;