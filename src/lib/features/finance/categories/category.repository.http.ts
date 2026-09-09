import { gqlClient } from '@/lib/api/client';
import { ApiError, toApiError } from '@/lib/api/errors';
import {
    CreateCategoryDocument,
    DeleteCategoryDocument,
    GetCategoryDocument,
    ListCategoriesDocument,
    UpdateCategoryDocument
} from '@/lib/graphql/generated/graphql';

import type { Category, CategoryDraft } from './category.model';
import type { CategoryRepository } from './category.repository';
import { toCategory } from './category.mapper';


export class CategoryHttpRepository implements CategoryRepository {
    async list(): Promise<Category[]> {
        try {
            const { categories } = await gqlClient.request(ListCategoriesDocument);
            return categories.map(toCategory)
        } catch (e) {
            throw toApiError(e);
        }
    }

    async get(id: string): Promise<Category | null> {
        try {
            const { category } = await gqlClient.request(GetCategoryDocument, { id: id })
            return category ? toCategory(category) : null;
        } catch (e) {
            throw toApiError(e);
        }
    }

    async create(draft: CategoryDraft): Promise<Category> {
        try {
            const { createCategory } = await gqlClient.request(CreateCategoryDocument, {
                input: {
                    categoryName: draft.category_name,
                }
            })
            if (!createCategory) throw new ApiError('createCategory returned no data');

            return toCategory(createCategory);
        } catch (e) {
            throw toApiError(e)
        }
    }

    async update(id: string, patch: Partial<CategoryDraft>): Promise<Category> {
        try {
            const { updateCategory } = await gqlClient.request(UpdateCategoryDocument, {
                id: id,
                patch: {
                    categoryName: patch.category_name ?? '',
                }
            })
            
            if (!updateCategory) throw new ApiError('updateCategory returned no data');

            return toCategory(updateCategory);
        } catch (e) {
            throw toApiError(e)
        }
    }

    async remove(id: string): Promise<void> {
        try {
            await gqlClient.request(DeleteCategoryDocument, { id: id });
        } catch (e) {
            throw toApiError(e);
        }
    }
}