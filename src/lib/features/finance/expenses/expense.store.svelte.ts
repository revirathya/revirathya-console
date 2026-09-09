import type { Expense, ExpenseDraft } from './expense.model';
import type { ExpenseRepository } from './expense.repository';
import { ExpenseHttpRepository } from './expense.repository.http';

class ExpenseStore {
    items: Expense[] = $state([]);
    loading: boolean = $state(false);
    error: string | null = $state(null);

    private repo: ExpenseRepository;

    constructor(repo: ExpenseRepository) {
        this.repo = repo;
    }

    async load(): Promise<void> {
        this.loading = true;
        this.error = null;
        try {
            const currDt: Date = new Date();
            this.items = await this.repo.list(currDt.toISOString().split('T')[0]);
        } catch (e) {
            this.error = e instanceof Error ? e.message : 'Failed to load expenses';
        } finally {
            this.loading = false;
        }
    }

    async create(draft: ExpenseDraft): Promise<void> {
        const created = await this.repo.create(draft);
        this.items = [created, ...this.items];
    }

    async update(id: string, patch: Partial<ExpenseDraft>): Promise<void> {
        const updated = await this.repo.update(id, patch);
        this.items = this.items.map((e) => (e.id === id ? updated : e));
    }

    async remove(id: string): Promise<void> {
        await this.repo.remove(id);
        this.items = this.items.filter((e) => e.id !== id);
    }
}

export const expenseStore = new ExpenseStore(new ExpenseHttpRepository());