import { useSidebarToggle } from "@/lib/use-sidebar-toggle";
import { useStore } from "@/lib/use-store";
import { cn } from "@/lib/utils";
import SidebarToggle from "@/components/layout/sidebar-toggle";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PanelsTopLeft } from "lucide-react";
import Menu from "@/components/layout/menu";

const Sidebar = () => {
    const sidebar = useStore(useSidebarToggle, (state) => state);
    if (!sidebar) return null;

    return (
        <aside
            className={cn(
                "fixed top-0 left-0 z-20 -translate-x-full lg:translate-x-0 transition-[width] ease-in-out duration-300",
                sidebar?.isOpen === false ? "w-[90px]" : "w-72"
            )}
        >
            <SidebarToggle isOpen={sidebar?.isOpen} setIsOpen={sidebar?.setIsOpen} />
            <div className="relative h-full flex flex-col px-3 py-4 overflow-y-auto shadow-md dark:shadow-zinc-800">
                <Button
                    className={cn(
                        "transition-transform ease-in-out duration-300 mb-1",
                        sidebar?.isOpen === false ? "translate-x-1" : "translate-x-0"
                    )}
                    variant="link"
                    asChild
                >
                    <Link href="/dashboard" className="flex items-center gap-2" style={{ textDecoration: 'none' }}>
                        <PanelsTopLeft className="w-6 h-6 mr-1" />
                        <h1
                        className={cn(
                            "font-bold text-lg whitespace-nowrap transition-[transform,opacity,display] ease-in-out duration-300",
                            sidebar?.isOpen === false
                            ? "-translate-x-96 opacity-0 hidden"
                            : "translate-x-0 opacity-100"
                        )}
                        >
                        CoFound
                        </h1>
                    </Link>
                </Button>
                <Menu isOpen={sidebar?.isOpen} />
            </div>
        </aside>
    );
}

export default Sidebar;