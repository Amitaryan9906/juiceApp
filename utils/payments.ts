import { APIRequestContext } from '@playwright/test';

export async function addCard(
  request: APIRequestContext,
  token: string,
  cardNum: string,
  expMonth: number,
  expYear: number,
  fullName: string
) {

  const response = await request.post('/api/Cards/', {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    data: {
      fullName,
      cardNum,
      expMonth,
      expYear
    }
  });

  return response;
}