import type { Category, CategoryDraft } from './category.model';
import type { CategoryRepository } from './category.repository';
import { CategoryHttpRepository } from './category.repository.http';


class CategoryStore {
    items: Category[] = $state([]);
    loading: boolean = $state(false);
    error: string | null = $state(null);

    private repo: CategoryRepository;

    constructor(repo: CategoryRepository) {
        this.repo = repo;
    }

    async load(): Promise<void> {
        this.loading = true;
        this.error = null;
        try {
            this.items = await this.repo.list();
        } catch (e) {
            this.error = e instanceof Error ? e.message : 'Failed to load categories';
        } finally {
            this.loading = false;
        }
    }

    async create(draft: CategoryDraft): Promise<void> {
        const created = await this.repo.create(draft);
        this.items = [created, ...this.items];
    }

    async update(id: string, patch: Partial<CategoryDraft>): Promise<void> {
        const updated = await this.repo.update(id, patch);
        this.items = this.items.map((c) => (c.id === id ? updated : c));
    }

    async remove(id: string): Promise<void> {
        await this.repo.remove(id);
        this.items = this.items.filter((c) => c.id !== id);
    }
}

export const categoryStore = new CategoryStore(new CategoryHttpRepository());