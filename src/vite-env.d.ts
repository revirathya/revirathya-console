/// <reference types="svelte" />
/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_API_MODE?: 'mock' | 'http';
    readonly VITE_GRAPHQL_ENDPOINT?: string;
    readonly VITE_DEFAULT_USER_ID?: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}