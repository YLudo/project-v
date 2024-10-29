import { LucideIcon } from "lucide-react";

declare type Submenu = {
    href: string;
    label: string;
    active: boolean;
};

declare type Menu = {
    href: string;
    label: string;
    active: boolean;
    icon: LucideIcon;
    submenus: Submenu[];
};

declare type Group = {
    groupLabel: string;
    menus: Menu[];
};

declare type UseSidebarToggleStore = {
    isOpen: boolean;
    setIsOpen: () => void;
};

declare type SidebarToggleProps = {
    isOpen: boolean | undefined;
    setIsOpen?: () => void;
}

declare type CollapseMenuButtonProps = {
    icon: LucideIcon;
    label: string;
    active: boolean;
    submenus: Submenu[];
    isOpen: boolean | undefined;
}

declare type MenuProps = {
    isOpen: boolean | undefined;
}

declare type NavbarProps = {
    title: string;
}

declare type ContentLayoutProps = {
    title: string;
    children: React.ReactNode;
}