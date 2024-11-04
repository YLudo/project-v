import { LucideIcon } from "lucide-react";

// LAYOUT
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

declare type UserNavProps = {
    user: User;
}

declare type NavbarProps = {
    title: string;
    user: User;
}

declare type ContentLayoutProps = {
    title: string;
    user: User;
    children: React.ReactNode;
}

// AUTH
declare type SignUpParams = {
    username: string;
    email: string;
    password: string;
}

declare type SignInParams = {
    email: string;
    password: string;
}

declare type GetUserInfoProps = {
    userId: string;
}

// ACTIONS
declare type ErrorResponse = {
    error: string;
    status: number;
}

declare type SuccessResponse<T> = {
    data: T;
    status: number;
}

declare type ApiResponse<T> = SuccessResponse<T> | ErrorResponse;

// ENTITIES
declare type User = {
    $id: string;
    userId: string;
    email: string;
    username: string;
}

declare type Travel = {
    id: string;
    destination: string;
    startDate: string;
    endDate: string;
    userId: string;
}

// COMPONENTS
declare type TravelCardProps = {
    destination: string;
    startDate: string;
    endDate: string;
};

declare type TravelsLayoutProps = {
    travels: TravelCardProps[];
}