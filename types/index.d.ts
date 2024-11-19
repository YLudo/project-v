import { LucideIcon } from "lucide-react";
import { ParsedUrlQuery } from "querystring";

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
    startDate?: string;
    endDate?: string;
    userId: string;
}

declare type Bank = {
    $id: string;
    accountId: string;
    bankId: string;
    accessToken: string;
    userId: string;
    shareableId: string;
};

declare type Account = {
    id: string;
    availableBalance: number;
    currentBalance: number;
    officialName: string;
    mask: string;
    institutionId: string;
    name: string;
    type: string;
    subtype: string;
    appwriteItemId: string;
    shareableId: string;
};

declare type Transaction = {
    id: string;
    $id: string;
    name: string;
    paymentChannel: string;
    type: string;
    accountId: string;
    amount: number;
    pending: boolean;
    category: string;
    date: string;
    image: string;
    type: string;
    $createdAt: string;
    channel: string;
    senderBankId: string;
    receiverBankId: string;
};

// COMPONENTS
declare type TravelCardProps = {
    id: string;
    destination: string;
    startDate: string;
    endDate: string;
};

declare type TravelsLayoutProps = {
    travels: Travel[];
}

declare type TravelEditPageProps = {
    params: {
        travelId: string;
    };
}

declare type TravelEditFormProps = {
    travel: Travel;
}

declare type CreateBankAccountProps = {
    bankId: string;
    accountId: string;
    accessToken: string;
    shareableId: string;
    userId: string;
}

declare type ExchangePublicTokenProps = {
    publicToken: string;
    user: User;
}

declare type PlaidLinkProps = {
    user: User;
}

declare type GetBanksProps = {
    userId: string;
}
  
declare type GetBankProps = {
    documentId: string;
}

declare type GetBankByAccountIdProps = {
    accountId: string;
}

declare type GetAccountsProps = {
    userId: string;
}

declare type GetAccountProps = {
    appwriteItemId: string;
}

declare type GetInstitutionProps = {
    institutionId: string;
}

declare type GetTransactionsProps = {
    accessToken: string;
}

declare type TransactionsPageProps = {
    searchParams: ParsedUrlQuery;
}

declare type TransactionHistoryProps = {
    user: User,
    params: {
        page: number,
        id?:string
    }
}

declare type TransactionsTableProps = {
    transactions: Transaction[];
}

declare type TransactionPaginationProps = {
    page: number,
    totalPages: number;
}