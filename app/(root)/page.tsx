import { ContentLayout } from "@/components/layout/content-layout";
import { getLoggedInUser } from "@/lib/actions/user.actions";

const DashboardPage = async () => {
    const user = await getLoggedInUser();

    return (
        <ContentLayout title="Tableau de bord" user={user}>
            Test
        </ContentLayout>
    );
}

export default DashboardPage;