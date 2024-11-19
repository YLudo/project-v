import { ContentLayout } from "@/components/layout/content-layout";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { buttonVariants } from "@/components/ui/button";
import { getTravel } from "@/lib/actions/travel.actions";
import { getLoggedInUser } from "@/lib/actions/user.actions";
import { TravelShowPageProps } from "@/types";
import Link from "next/link";
import { redirect } from "next/navigation";

const TravelShowPage = async ({ params }: TravelShowPageProps) => {
    const userResponse = await getLoggedInUser();
    if ('error' in userResponse) {
        redirect("/login");
    }

    const travelResponse = await getTravel(params.travelId);
    if ('error' in travelResponse) {
        redirect("/travels");
    }

    return (
        <ContentLayout title="Voyages" user={userResponse.data}>
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
                            <BreadcrumbPage>Voir un voyage</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
                <Link href="/travels" className={buttonVariants({ variant: "default" })}>Retour</Link>
            </div>
        </ContentLayout>
    );
}

export default TravelShowPage;