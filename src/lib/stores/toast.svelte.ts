export type ToastKind = 'success' | 'error' | 'info';

export type Toast = {
    id: string;
    kind: ToastKind;
    message: string;
}

interface ToastStore {
    readonly items: Toast[];
    dismiss(id: string): void;
    success(message: string): void;
    error(message: string): void;
    info(message: string): void;
}

const DEFAULT_DURATION_MS: number = 4000;
const ERROR_DURATION_MS: number = 6000;

function createToastStore(): ToastStore {
    let items: Toast[] = $state([]);

    function dismiss(id: string): void {
        items = items.filter((t) => t.id !== id);
    }

    function push(kind: ToastKind, message: string, duration: number): void {
        const id: string = crypto.randomUUID();
        items = [...items, { id, kind, message }];
        if (duration > 0) window.setTimeout(() => dismiss(id), duration);
    }

    return {
        get items(): Toast[] {
            return items;
        },
        dismiss,
        success(message: string): void {
            push('success', message, DEFAULT_DURATION_MS);
        },
        error(message: string): void {
            push('error', message, ERROR_DURATION_MS);
        },
        info(message: string): void {
            push('info', message, DEFAULT_DURATION_MS);
        }
    }
}

export const toast: ToastStore = createToastStore();