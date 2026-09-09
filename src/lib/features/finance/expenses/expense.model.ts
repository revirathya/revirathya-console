export type Expense = {
    id: string;
    user_id: string;
    category_id: string;
    category_name: string;
    transaction_dt: string; // ISO 'YYYY-MM-DD'
    description: string | null;
    amount: number;
}

export type ExpenseDraft = Omit<Expense, 'id' | 'user_id' | 'category_name'>;

export type ExpenseErrors = Partial<Record<keyof ExpenseDraft, string>>;

export function validateExpense(draft: ExpenseDraft): ExpenseErrors {
    const errors: ExpenseErrors = {};
    if (!draft.category_id) errors.category_id = 'Required';
    if (!draft.transaction_dt) errors.transaction_dt = 'Required';
    if (!(draft.amount > 0)) errors.amount = 'Must be greater than 0';
    return errors
}