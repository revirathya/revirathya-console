import type { LucideIcon } from "@lucide/svelte";
import Database from "@lucide/svelte/icons/database";
import House from "@lucide/svelte/icons/house";
import Receipt from "@lucide/svelte/icons/receipt";
import Wallet from "@lucide/svelte/icons/wallet";

export type NavLeaf = {
    label: string;
    icon: LucideIcon;
    path: string;
};

export type NavGroup = {
    label: string;
    icon: LucideIcon;
    children: NavLeaf[];
}

export type NavItem = NavLeaf | NavGroup;

export function isNavGroup(item: NavItem): item is NavGroup {
    return 'children' in item;
}

export const nav: NavItem[] = [
    { label: 'Home', icon: House, path: '/'},
    {
        label: 'Finance',
        icon: Wallet,
        children: [
            { label: 'Expenses', icon: Receipt, path: '/finance/expenses' },
            { label: 'Masters', icon: Database, path: '/finance/masters' },
        ],
    }
]