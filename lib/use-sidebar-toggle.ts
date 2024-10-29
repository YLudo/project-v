import { UseSidebarToggleStore } from "@/types";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export const useSidebarToggle = create(
    persist<UseSidebarToggleStore>(
        (set, get) => ({
            isOpen: true,
            setIsOpen: () => {
                set({ isOpen: !get().isOpen });
            }
        }),
        {
            name: 'sidebarOpen',
            storage: createJSONStorage(() => localStorage),
        }
    )
)