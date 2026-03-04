import { expect, Page } from '@playwright/test';

export class LoginPage {
  constructor(private page: Page) {}

  async navigate() {
    await this.page.goto('/');
  }
async dismissInitialPopups() {
  // Close welcome banner (X icon)
  await this.page.locator('button[aria-label="Close Welcome Banner"]')
    .click({ timeout: 3000 })
    .catch(() => {});

  // Close cookie banner
  await this.page.getByRole('button', { name: /dismiss/i })
    .click({ timeout: 3000 })
    .catch(() => {});
}

  async login(email: string, password: string) {
    await this.page.locator('#navbarAccount').click();
    await this.page.locator("//button[@id='navbarLoginButton']").click();
    await this.page.locator("//input[@id='email']").fill(email);
    await this.page.locator("//mat-label[normalize-space()='Password']").fill(password);
  }
  async clickLoginButton() {
  await this.page.locator('#loginButton').click();
}

async verifyLoggedInUser(email: string) {
  await this.page.locator('#navbarAccount').click();
  const userEmail = this.page.locator(
    `//span[@class='mat-mdc-menu-item-text']//span[contains(text(),'${email}')]`
  );

  await userEmail.scrollIntoViewIfNeeded();
  await userEmail.isVisible();
}

async verifyLoginButtonDisabled() {
    await expect(this.page.locator('#loginButton')).toBeDisabled();
  }
}