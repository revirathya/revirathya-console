import type { Category } from './category.model';

type CategoryNode = {
    id: string;
    categoryName: string;
}

export function toCategory(node: CategoryNode): Category {
    return {
        id: node.id,
        category_name: node.categoryName,
    }
}