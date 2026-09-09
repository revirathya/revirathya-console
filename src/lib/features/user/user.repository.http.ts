import { gqlClient } from '@/lib/api/client';
import { toApiError } from '@/lib/api/errors';
import {
    GetUserDocument
} from '@/lib/graphql/generated/graphql';

import { DEFAULT_USER_ID } from '@/lib/api/config';

import type { UserRepository } from './user.repository';
import type { User } from './user.model';
import { toUser } from './user.mapper';


export class UserHttpRepository implements UserRepository {
    async getCurrent(): Promise<User | null> {
        try {
            const { user } = await gqlClient.request(GetUserDocument, { id: DEFAULT_USER_ID });
            return user ? toUser(user) : null;
        } catch (e) {
            throw toApiError(e);
        }
    }
}