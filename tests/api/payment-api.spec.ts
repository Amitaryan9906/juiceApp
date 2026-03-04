import { test, expect } from '../../fixtures/apiFixture';
import { addCard } from '../../utils/payments';

test.describe('Payments API - Edge Cases', () => {

  test('Happy path - add card successfully', async ({ request, authToken }) => {

    const uniqueCard = '411111111111' + Math.floor(Math.random() * 10000);

    const response = await addCard(
      request,
      authToken,
      uniqueCard,
      11,
      2099,
      'Rahul'
    );

    expect(response.status()).toBe(201);

    const body = await response.json();

    expect(body.cardNum).toContain(uniqueCard.slice(-4));
  });


  test('Invalid card number', async ({ request, authToken }) => {

    const response = await addCard(
      request,
      authToken,
      '1234',
      11,
      2099,
      'Rahul'
    );

    expect(response.status()).toBe(400);
  });


  test('Expired card', async ({ request, authToken }) => {

    const response = await addCard(
      request,
      authToken,
      '4111111111118888',
      11,
      2020,
      'Rahul'
    );

    expect(response.status()).toBe(400);
  });


  test('Invalid expiry month', async ({ request, authToken }) => {

    const response = await addCard(
      request,
      authToken,
      '4111111111117777',
      15,
      2099,
      'Rahul'
    );

    expect(response.status()).toBe(400);
  });


  test('Missing fullName field', async ({ request, authToken }) => {

    const response = await request.post('/api/Cards/', {
      headers: {
        Authorization: `Bearer ${authToken}`
      },
      data: {
        cardNum: '4111111111119999',
        expMonth: 11,
        expYear: 2099
      }
    });

    expect(response.status()).toBe(400);
  });


  test('Unauthorized request', async ({ request }) => {

    const response = await request.post('/api/Cards/', {
      data: {
        cardNum: '4111111111115555',
        expMonth: 11,
        expYear: 2099,
        fullName: 'Rahul'
      }
    });

    expect(response.status()).toBe(401);
  });


  test('Duplicate card', async ({ request, authToken }) => {

    const card = '4111111111116666';

    await addCard(request, authToken, card, 11, 2099, 'Rahul');

    const response = await addCard(request, authToken, card, 11, 2099, 'Rahul');

    expect(response.status()).not.toBe(201);
  });

});