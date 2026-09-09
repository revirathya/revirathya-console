/* eslint-disable */
import * as types from './graphql';
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    "query GetCategory($id: ID!) {\n  category(id: $id) {\n    id\n    categoryName\n  }\n}\n\nquery ListCategories {\n  categories {\n    id\n    categoryName\n  }\n}\n\nmutation CreateCategory($input: CreateCategoryInput!) {\n  createCategory(input: $input) {\n    id\n    categoryName\n  }\n}\n\nmutation UpdateCategory($id: ID!, $patch: UpdateCategoryInput!) {\n  updateCategory(id: $id, patch: $patch) {\n    id\n    categoryName\n  }\n}\n\nmutation DeleteCategory($id: ID!) {\n  deleteCategory(id: $id)\n}": typeof types.GetCategoryDocument,
    "query GetExpense($id: ID!) {\n  expense(id: $id) {\n    id\n    userId\n    categoryId\n    categoryName\n    transactionDt\n    description\n    amount\n  }\n}\n\nquery ListExpenses($userId: ID!, $transactionDt: String) {\n  expenses(userId: $userId, transactionDt: $transactionDt) {\n    id\n    userId\n    categoryId\n    categoryName\n    transactionDt\n    description\n    amount\n  }\n}\n\nmutation CreateExpense($input: CreateExpenseInput!) {\n  createExpense(input: $input) {\n    id\n    userId\n    categoryId\n    categoryName\n    transactionDt\n    description\n    amount\n  }\n}\n\nmutation UpdateExpense($id: ID!, $patch: UpdateExpenseInput!) {\n  updateExpense(id: $id, patch: $patch) {\n    id\n    userId\n    categoryId\n    categoryName\n    transactionDt\n    description\n    amount\n  }\n}\n\nmutation DeleteExpense($id: ID!) {\n  deleteExpense(id: $id)\n}": typeof types.GetExpenseDocument,
    "query GetUser($id: ID!) {\n  user(id: $id) {\n    id\n    firstName\n    lastName\n    email\n    telegramChatId\n  }\n}": typeof types.GetUserDocument,
};
const documents: Documents = {
    "query GetCategory($id: ID!) {\n  category(id: $id) {\n    id\n    categoryName\n  }\n}\n\nquery ListCategories {\n  categories {\n    id\n    categoryName\n  }\n}\n\nmutation CreateCategory($input: CreateCategoryInput!) {\n  createCategory(input: $input) {\n    id\n    categoryName\n  }\n}\n\nmutation UpdateCategory($id: ID!, $patch: UpdateCategoryInput!) {\n  updateCategory(id: $id, patch: $patch) {\n    id\n    categoryName\n  }\n}\n\nmutation DeleteCategory($id: ID!) {\n  deleteCategory(id: $id)\n}": types.GetCategoryDocument,
    "query GetExpense($id: ID!) {\n  expense(id: $id) {\n    id\n    userId\n    categoryId\n    categoryName\n    transactionDt\n    description\n    amount\n  }\n}\n\nquery ListExpenses($userId: ID!, $transactionDt: String) {\n  expenses(userId: $userId, transactionDt: $transactionDt) {\n    id\n    userId\n    categoryId\n    categoryName\n    transactionDt\n    description\n    amount\n  }\n}\n\nmutation CreateExpense($input: CreateExpenseInput!) {\n  createExpense(input: $input) {\n    id\n    userId\n    categoryId\n    categoryName\n    transactionDt\n    description\n    amount\n  }\n}\n\nmutation UpdateExpense($id: ID!, $patch: UpdateExpenseInput!) {\n  updateExpense(id: $id, patch: $patch) {\n    id\n    userId\n    categoryId\n    categoryName\n    transactionDt\n    description\n    amount\n  }\n}\n\nmutation DeleteExpense($id: ID!) {\n  deleteExpense(id: $id)\n}": types.GetExpenseDocument,
    "query GetUser($id: ID!) {\n  user(id: $id) {\n    id\n    firstName\n    lastName\n    email\n    telegramChatId\n  }\n}": types.GetUserDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query GetCategory($id: ID!) {\n  category(id: $id) {\n    id\n    categoryName\n  }\n}\n\nquery ListCategories {\n  categories {\n    id\n    categoryName\n  }\n}\n\nmutation CreateCategory($input: CreateCategoryInput!) {\n  createCategory(input: $input) {\n    id\n    categoryName\n  }\n}\n\nmutation UpdateCategory($id: ID!, $patch: UpdateCategoryInput!) {\n  updateCategory(id: $id, patch: $patch) {\n    id\n    categoryName\n  }\n}\n\nmutation DeleteCategory($id: ID!) {\n  deleteCategory(id: $id)\n}"): (typeof documents)["query GetCategory($id: ID!) {\n  category(id: $id) {\n    id\n    categoryName\n  }\n}\n\nquery ListCategories {\n  categories {\n    id\n    categoryName\n  }\n}\n\nmutation CreateCategory($input: CreateCategoryInput!) {\n  createCategory(input: $input) {\n    id\n    categoryName\n  }\n}\n\nmutation UpdateCategory($id: ID!, $patch: UpdateCategoryInput!) {\n  updateCategory(id: $id, patch: $patch) {\n    id\n    categoryName\n  }\n}\n\nmutation DeleteCategory($id: ID!) {\n  deleteCategory(id: $id)\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query GetExpense($id: ID!) {\n  expense(id: $id) {\n    id\n    userId\n    categoryId\n    categoryName\n    transactionDt\n    description\n    amount\n  }\n}\n\nquery ListExpenses($userId: ID!, $transactionDt: String) {\n  expenses(userId: $userId, transactionDt: $transactionDt) {\n    id\n    userId\n    categoryId\n    categoryName\n    transactionDt\n    description\n    amount\n  }\n}\n\nmutation CreateExpense($input: CreateExpenseInput!) {\n  createExpense(input: $input) {\n    id\n    userId\n    categoryId\n    categoryName\n    transactionDt\n    description\n    amount\n  }\n}\n\nmutation UpdateExpense($id: ID!, $patch: UpdateExpenseInput!) {\n  updateExpense(id: $id, patch: $patch) {\n    id\n    userId\n    categoryId\n    categoryName\n    transactionDt\n    description\n    amount\n  }\n}\n\nmutation DeleteExpense($id: ID!) {\n  deleteExpense(id: $id)\n}"): (typeof documents)["query GetExpense($id: ID!) {\n  expense(id: $id) {\n    id\n    userId\n    categoryId\n    categoryName\n    transactionDt\n    description\n    amount\n  }\n}\n\nquery ListExpenses($userId: ID!, $transactionDt: String) {\n  expenses(userId: $userId, transactionDt: $transactionDt) {\n    id\n    userId\n    categoryId\n    categoryName\n    transactionDt\n    description\n    amount\n  }\n}\n\nmutation CreateExpense($input: CreateExpenseInput!) {\n  createExpense(input: $input) {\n    id\n    userId\n    categoryId\n    categoryName\n    transactionDt\n    description\n    amount\n  }\n}\n\nmutation UpdateExpense($id: ID!, $patch: UpdateExpenseInput!) {\n  updateExpense(id: $id, patch: $patch) {\n    id\n    userId\n    categoryId\n    categoryName\n    transactionDt\n    description\n    amount\n  }\n}\n\nmutation DeleteExpense($id: ID!) {\n  deleteExpense(id: $id)\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query GetUser($id: ID!) {\n  user(id: $id) {\n    id\n    firstName\n    lastName\n    email\n    telegramChatId\n  }\n}"): (typeof documents)["query GetUser($id: ID!) {\n  user(id: $id) {\n    id\n    firstName\n    lastName\n    email\n    telegramChatId\n  }\n}"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;