import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/login.page';
import loginData from '../../test-data/login-data.json';

test.describe('Login UI Tests', () => {

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.navigate();
    await loginPage.dismissInitialPopups();
  });

test('LOGIN_TC_01 - Successful login', async ({ page }) => {

  const loginPage = new LoginPage(page);
  const data = loginData.validLogin;

  await loginPage.login(data.email, data.password);
  await loginPage.clickLoginButton();
  await loginPage.verifyLoggedInUser(data.email);

});


  test('LOGIN_TC_02 - Invalid password', async ({ page }) => {

    const loginPage = new LoginPage(page);
    const data = loginData.invalidPassword;

    await loginPage.login(data.email, data.password);
    await loginPage.clickLoginButton();

    await expect(page.getByText(data.error)).toBeVisible();
  });


  test('LOGIN_TC_03 - Invalid email format', async ({ page }) => {

    const loginPage = new LoginPage(page);
    const data = loginData.invalidEmailFormat;

    await loginPage.login(data.email, data.password);
    await loginPage.clickLoginButton();

    await expect(page.getByText(data.error)).toBeVisible();
  });


  test('LOGIN_TC_04 - Empty email and password', async ({ page }) => {

    const loginPage = new LoginPage(page);
    const data = loginData.emptyFields;

    await loginPage.login(data.email, data.password);
    await loginPage.verifyLoginButtonDisabled();

    await expect(page.getByText(data.error)).toBeVisible();
  });

});