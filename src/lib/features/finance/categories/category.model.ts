export type Category = {
    id: string;
    category_name: string;
}

export type CategoryDraft = Omit<Category, 'id'>;

export type CategoryErrors = Partial<Record<keyof CategoryDraft, string>>;

export function validateCategory(draft: CategoryDraft): CategoryErrors {
    const errors: CategoryErrors = {};
    if (!draft.category_name) errors.category_name = 'Required';
    return errors
}