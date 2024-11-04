import { ContentLayout } from "@/components/layout/content-layout";
import { getLoggedInUser } from "@/lib/actions/user.actions";
import { redirect } from "next/navigation";

const DashboardPage = async () => {
    const response = await getLoggedInUser();
    if ('error' in response) {
        redirect("/login");
    }

    return (
        <ContentLayout title="Tableau de bord" user={response.data}>
            Test
        </ContentLayout>
    );
}

export default DashboardPage;