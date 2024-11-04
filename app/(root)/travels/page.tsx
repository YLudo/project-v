import TravelsLayout from "@/components/app/travels/travels-layout";
import { ContentLayout } from "@/components/layout/content-layout"
import { getLoggedInUser } from "@/lib/actions/user.actions";
import { redirect } from "next/navigation";

const TravelsPage = async () => {
    const response = await getLoggedInUser();
    if ('error' in response) {
        redirect("/login");
    }
    
    return (
        <ContentLayout title="Voyages" user={response.data}>
            <TravelsLayout travels={[]} />
        </ContentLayout>
    );
}

export default TravelsPage;