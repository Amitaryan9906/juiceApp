import { test as base, APIRequestContext } from '@playwright/test';
import { getAuthToken } from '../utils/auth';

type MyFixtures = {
  authToken: string;
};

export const test = base.extend<MyFixtures>({
  authToken: async ({ request }, use) => {
    const token = await getAuthToken(request);
    await use(token);
  },
});

export { expect } from '@playwright/test';