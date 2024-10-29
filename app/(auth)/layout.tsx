import { getLoggedInUser } from "@/lib/actions/user.actions"
import { redirect } from "next/navigation";

export default async function AuthLayout({
    children
}: {
    children: React.ReactNode
}) {
    const user = await getLoggedInUser();
    if (user) {
        redirect("/");
    }

    return (
        <main className="flex h-screen items-center justify-center">
            {children}
        </main>
    )
}