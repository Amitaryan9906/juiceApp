import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/login.page';
import { PaymentPage } from '../../pages/payment.page';
import user from '../../test-data/new-user.json';
import paymentData from '../../test-data/card-data.json';

test.beforeEach(async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.navigate();
  await loginPage.dismissInitialPopups();
  await loginPage.login(user.email, user.password);
  await loginPage.clickLoginButton();
});

test.describe('Payment UI Tests', () => {

  test('UI_TC_01 - Add card successfully', async ({ page }) => {
    const paymentPage = new PaymentPage(page);

    await paymentPage.goToPayments();

    const data = paymentData.validCard;

    await paymentPage.addCard(
      data.cardNumber,
      data.expYear,
      data.name,
      data.expMonth
    );
    await paymentPage.submit();

    await paymentPage.verifyCardAdded(data.lastDigits);
  });


  test('UI_TC_02 - Card number less than 16 digits', async ({ page }) => {
    const paymentPage = new PaymentPage(page);

    const data = paymentData.invalidShortCard;

    await paymentPage.goToPayments();

    await paymentPage.addCard(
      data.cardNumber,
      data.expYear,
      data.name,
      data.expMonth
    );
    await paymentPage.verifySubmit();

    await expect(page.getByText(data.error)).toBeVisible();
  });


  test('UI_TC_03 - Card number greater than 16 digits', async ({ page }) => {
    const paymentPage = new PaymentPage(page);

    const data = paymentData.invalidLongCard;

    await paymentPage.goToPayments();

    await paymentPage.addCard(
      data.cardNumber,
      data.expYear,
      data.name,
      data.expMonth
    );
    await paymentPage.verifySubmit();

    await expect(page.getByText(data.error)).toBeVisible();
  });


  test('UI_TC_04 - Empty card number', async ({ page }) => {
    const paymentPage = new PaymentPage(page);

    const data = paymentData.emptyCard;

    await paymentPage.goToPayments();

    await paymentPage.addCard(
      data.cardNumber,
      data.expYear,
      data.name,
      data.expMonth
    );
    await paymentPage.verifySubmit();

    await expect(page.getByText(data.error)).toBeVisible();
  });


  test('UI_TC_05 - Expired card year', async ({ page }) => {
    const paymentPage = new PaymentPage(page);

    const data = paymentData.expiredCard;

    await paymentPage.goToPayments();

    await paymentPage.addCard(
      data.cardNumber,
      data.expYear,
      data.name,
      data.expMonth
    );
    await paymentPage.verifySubmit();

    await expect(page.getByText(data.error)).toBeVisible();
  });


  test('UI_TC_06 - Invalid month', async ({ page }) => {
    const paymentPage = new PaymentPage(page);

    const data = paymentData.invalidMonth;

    await paymentPage.goToPayments();

    await paymentPage.addCard(
      data.cardNumber,
      data.expYear,
      data.name,
      data.expMonth
    );
    await paymentPage.verifySubmit();

    await expect(page.getByText(data.error)).toBeVisible();
  });


  test('UI_TC_07 - Empty cardholder name', async ({ page }) => {
    const paymentPage = new PaymentPage(page);

    const data = paymentData.emptyName;

    await paymentPage.goToPayments();

    await paymentPage.addCard(
      data.cardNumber,
      data.expYear,
      data.name,
      data.expMonth
    );
    await paymentPage.verifySubmit();

    await expect(page.getByText(data.error)).toBeVisible();
  });

});