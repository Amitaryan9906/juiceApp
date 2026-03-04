import { APIRequestContext, expect } from '@playwright/test';
import user from '../test-data/new-user.json';

export async function getAuthToken(request: APIRequestContext): Promise<string> {
  const response = await request.post('/rest/user/login', {
    data: {
      email: user.email,
      password: user.password
    }
  });

  expect(response.status()).toBe(200);

  const body = await response.json();
  return body.authentication.token;
}