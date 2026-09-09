import { GraphQLClient } from 'graphql-request';
import { GRAPHQL_ENDPOINT } from './config';

export const gqlClient: GraphQLClient = new GraphQLClient(GRAPHQL_ENDPOINT);
