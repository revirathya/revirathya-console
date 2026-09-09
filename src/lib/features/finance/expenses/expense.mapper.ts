import type { Expense } from './expense.model';

type ExpenseNode = {
    id: string;
    userId: string;
    transactionDt: string;
    categoryId: string;
    categoryName: string;
    description: string | null;
    amount: string;
}

export function toExpense(node: ExpenseNode): Expense {
    return {
        id: node.id,
        user_id: node.userId,
        transaction_dt: node.transactionDt,
        category_id: node.categoryId,
        category_name: node.categoryName,
        description: node.description,
        amount: Number(node.amount),
    }
}