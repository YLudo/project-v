import DashboardLayout from "@/components/layout/dashboard-layout";
import { getLoggedInUser } from "@/lib/actions/user.actions";
import { redirect } from "next/navigation";

export default async function ApplicationLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const user = await getLoggedInUser();
    if (!user) {
        redirect("/login");
    }

    return <DashboardLayout>{children}</DashboardLayout>;
}