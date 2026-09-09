import type { Category, CategoryDraft } from './category.model';

export interface CategoryRepository {
    list(): Promise<Category[]>;
    get(id: string): Promise<Category | null>;
    create(draft: CategoryDraft): Promise<Category>;
    update(id: string, patch: Partial<CategoryDraft>): Promise<Category>;
    remove(id: string): Promise<void>;
}