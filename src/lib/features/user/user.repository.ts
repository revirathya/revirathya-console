import type { User } from './user.model';

export interface UserRepository {
    getCurrent(): Promise<User | null>
}