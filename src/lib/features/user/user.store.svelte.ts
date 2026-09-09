import type { User } from './user.model';
import type { UserRepository } from './user.repository';
import { UserHttpRepository } from './user.repository.http';

class UserStore {
    currentUser: User | null = $state(null);
    loading: boolean = $state(false);
    error: string | null = $state(null);

    private repo: UserRepository;

    constructor(repo: UserRepository) {
        this.repo = repo;
    }

    async load(): Promise<void> {
        this.loading = true;
        this.error = null;
        try {
            this.currentUser = await this.repo.getCurrent();
        } catch (e) {
            this.error = e instanceof Error ? e.message : 'Failed to load user';
        } finally {
            this.loading = false;
        }
    }
}

export const userStore = new UserStore(new UserHttpRepository());