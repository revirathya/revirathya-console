type Theme = 'light' | 'dark';

interface ThemeStore {
    readonly current: Theme;
    readonly isDark: boolean;
    toggle(): void;
    set(next: Theme): void;
}

function createThemeStore(): ThemeStore {
    // Get Current Theme
    let current: Theme = $state<Theme>(
        document.documentElement.classList.contains('dark') ? 'dark' : 'light',
    );

    // Apply Theme function
    function apply(next: Theme): void {
        current = next;
        document.documentElement.classList.toggle('dark', next === 'dark');
        try {
            localStorage.theme = next;
        } catch {
            /* private-mode: ignore */
        }
    }

    return {
        get current(): Theme {
            return current;
        },
        get isDark(): boolean {
            return current === 'dark';
        },
        toggle(): void {
            apply(current === 'dark' ? 'light' : 'dark');
        },
        set: apply,
    };
}

export const theme: ThemeStore = createThemeStore();