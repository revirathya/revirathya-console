import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
    schema: 'http://localhost:8080/graphql',
    documents: 'src/lib/graphql/operation/**/*.graphql',
    ignoreNoDocuments: true,
    generates: {
        'src/lib/graphql/generated/': {
            preset: 'client',
            config: {
                useTypeImports: true,
            },
        },
    },
};

export default config;
