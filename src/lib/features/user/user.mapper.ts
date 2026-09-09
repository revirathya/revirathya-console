import type { User } from './user.model';

type UserNode = {
    id: string;
    firstName: string;
    lastName?: string | null;
    email: string;
    telegramChatId?: string | null;
}


export function toUser(node: UserNode): User {
    return {
        id: node.id,
        first_name: node.firstName,
        last_name: node.lastName,
        email: node.email,
        telegram_chat_id: node.telegramChatId,
    }
}