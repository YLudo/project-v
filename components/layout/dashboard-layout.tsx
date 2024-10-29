"use client";

import { useSidebarToggle } from "@/lib/use-sidebar-toggle";
import { useStore } from "@/lib/use-store";
import Sidebar from "@/components/layout/sidebar";
import { cn } from "@/lib/utils";
import Footer from "@/components/layout/footer";

export default function DashboardLayout({
    children
}: {
    children: React.ReactNode;
}) {
    const sidebar = useStore(useSidebarToggle, (state) => state);
    if (!sidebar) return null;

    return (
        <>
            <Sidebar />
            <main
                className={cn(
                    "min-h-[calc(100vh_-_56px)] bg-zinc-50 dark:bg-zinc-900 transition-[margin-left] ease-in-out duration-300",
                    sidebar?.isOpen === false ? "lg:ml-[90px]" : "lg:ml-72"
                )}
            >
                {children}
            </main>
            <footer
                className={cn(
                    "transition-[margin-left] ease-in-out duration-300",
                    sidebar?.isOpen === false ? "lg:ml-[90px]" : "lg:ml-72"
                )}
            >
                <Footer />
            </footer>
        </>
    )
}