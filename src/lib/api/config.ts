const raw: string = import.meta.env.VITE_GRAPHQL_ENDPOINT ?? '/graphql';

export const GRAPHQL_ENDPOINT: string = /^https?:\/\//.test(raw)
    ? raw
    : new URL(raw, window.location.origin).toString();

export const DEFAULT_USER_ID: string =
    import.meta.env.VITE_DEFAULT_USER_ID ?? '';