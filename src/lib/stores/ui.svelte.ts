const COLLAPSE_KEY: string = 'ui.sidebarCollapsed';

interface UiStore {
    readonly sidebarCollapsed: boolean;
    readonly sidebarMobileOpen: boolean;
    toggleSidebar(): void;
    openMobileSidebar(): void;
    closeMobileSidebar(): void;
}

function readCollapsed(): boolean {
    try {
        return localStorage.getItem(COLLAPSE_KEY) === 'true';
    } catch {
        return false;
    }
}

function createUiStore(): UiStore {
    let sidebarCollapsed: boolean = $state(readCollapsed());
    let sidebarMobileOpen: boolean = $state(false);

    return {
        get sidebarCollapsed(): boolean {
            return sidebarCollapsed;
        },
        get sidebarMobileOpen(): boolean {
            return sidebarMobileOpen;
        },
        toggleSidebar(): void {
            sidebarCollapsed = !sidebarCollapsed;
            try {
                localStorage.setItem(COLLAPSE_KEY, String(sidebarCollapsed));
            } catch {
                /* ignore */
            }
        },
        openMobileSidebar(): void {
            sidebarMobileOpen = true;
        },
        closeMobileSidebar(): void {
            sidebarMobileOpen = false;
        },
    }
}

export const ui: UiStore = createUiStore();