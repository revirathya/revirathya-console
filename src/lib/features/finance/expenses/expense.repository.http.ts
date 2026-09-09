import { gqlClient } from '@/lib/api/client';
import { ApiError, toApiError } from '@/lib/api/errors';
import {
    CreateExpenseDocument,
    DeleteExpenseDocument,
    GetExpenseDocument,
    ListExpensesDocument,
    UpdateExpenseDocument
} from '@/lib/graphql/generated/graphql';

import { DEFAULT_USER_ID } from '@/lib/api/config';

import type { ExpenseRepository } from './expense.repository';
import type { Expense, ExpenseDraft } from './expense.model';
import { toExpense } from './expense.mapper';


export class ExpenseHttpRepository implements ExpenseRepository {
    async list(transactionDt: string): Promise<Expense[]> {
        try {
            const { expenses } = await gqlClient.request(ListExpensesDocument, {
                userId: DEFAULT_USER_ID,
                transactionDt: transactionDt,
            });
            return expenses.map(toExpense)
        } catch (e) {
            throw toApiError(e)
        }
    }

    async get(id: string): Promise<Expense | null> {
        try {
            const { expense } = await gqlClient.request(GetExpenseDocument, { id: id });
            return expense ? toExpense(expense) : null;
        } catch (e) {
            throw toApiError(e);
        }
    }

    async create(draft: ExpenseDraft): Promise<Expense> {
        try {
            const { createExpense } = await gqlClient.request(CreateExpenseDocument, {
                input: {
                    userId: DEFAULT_USER_ID,
                    categoryId: draft.category_id,
                    transactionDt: draft.transaction_dt,
                    description: draft.description,
                    amount: draft.amount.toString(),
                }
            });
            if (!createExpense) throw new ApiError('createExpense returned no data');

            return toExpense(createExpense);
        } catch (e) {
            throw toApiError(e);
        }
    }

    async update(id: string, patch: Partial<ExpenseDraft>): Promise<Expense> {
        try {
            const { updateExpense } = await gqlClient.request(UpdateExpenseDocument, {
                id: id,
                patch: {
                    userId: DEFAULT_USER_ID,
                    transactionDt: patch.transaction_dt!,
                    categoryId: patch.category_id!,
                    description: patch.description,
                    amount: patch.amount!.toString(),
                }
            });
            if (!updateExpense) throw new ApiError('updateExpense returned no data');

            return toExpense(updateExpense);
        } catch (e) {
            throw toApiError(e);
        }
    }
    async remove(id: string): Promise<void> {
        try {
            await gqlClient.request(DeleteExpenseDocument, { id: id });
        } catch (e) {
            throw toApiError(e);
        }
    }
}