import TravelsLayout from "@/components/app/travels/travels-layout";
import { ContentLayout } from "@/components/layout/content-layout"
import { toast } from "@/hooks/use-toast";
import { getTravels } from "@/lib/actions/travel.actions";
import { getLoggedInUser } from "@/lib/actions/user.actions";
import { isErrorResponse } from "@/lib/utils";
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
            <TravelsLayout travels={travels.data} />
        </ContentLayout>
    );
}

export default TravelsPage;