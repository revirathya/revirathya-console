import type { Expense, ExpenseDraft } from './expense.model';

export interface ExpenseRepository {
    list(transactionDt: string): Promise<Expense[]>;
    get(id: string): Promise<Expense | null>;
    create(draft: ExpenseDraft): Promise<Expense>;
    update(id: string, patch: Partial<ExpenseDraft>): Promise<Expense>;
    remove(id: string): Promise<void>;
}