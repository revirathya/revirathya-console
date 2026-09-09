export type User = {
    id: string;
    first_name: string;
    last_name?: string | null;
    email: string;
    telegram_chat_id?: string | null;
}