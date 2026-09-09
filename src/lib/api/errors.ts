import { ClientError } from 'graphql-request';

export class ApiError extends Error {
    readonly code: string | undefined;

    constructor(message: string, code?: string) {
        super(message);
        this.name = 'ApiError';
        this.code = code;
    }
}

export function toApiError(e: unknown): ApiError {
    if (e instanceof ClientError) {
        console.error('[GraphQL]', {
            status: e.response.status,
            errors: e.response.errors,
            query: e.request.query,
            variables: e.request.variables,
        });

        const first = e.response.errors?.[0];
        const code: string | undefined =
            typeof first?.extensions?.code === 'string' ? first.extensions.code : undefined;
        return new ApiError(first?.message ?? 'Request failed', code);
    }
    return new ApiError(e instanceof Error ? e.message : 'Unknown error');
}