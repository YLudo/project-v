import { getLoggedInUser } from "@/lib/actions/user.actions"
import { redirect } from "next/navigation";

export default async function AuthLayout({
    children
}: {
    children: React.ReactNode
}) {
    const response = await getLoggedInUser();
    if (!('error' in response)) {
        redirect("/");
    }

    return (
        <main className="flex h-screen items-center justify-center">
            {children}
        </main>
    )
}