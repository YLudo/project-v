import { Group } from "@/types";
import { LayoutGrid, Plane } from "lucide-react";

export default function getMenuList(pathname: string): Group[] {
    return [
        {
            groupLabel: "",
            menus: [
                {
                    href: "/",
                    label: "Tableau de bord",
                    active: pathname == "/",
                    icon: LayoutGrid,
                    submenus: [],
                },
                {
                    href: "/travels",
                    label: "Voyages",
                    active: pathname.includes("/travels"),
                    icon: Plane,
                    submenus: [],
                }
            ],
        },
    ]
}