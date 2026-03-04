import { Page, expect } from '@playwright/test';

export class PaymentPage {
  constructor(private page: Page) {}

  async goToPayments() {
    await this.page.locator('#navbarAccount').click();
    await this.page.locator("//button[@aria-label='Show Orders and Payment Menu']").click();
    await this.page.locator("//span[contains(text(),'My Payment Options')]").click();
  }

  async addCard(cardNumber: string, expiryYear: string, name: string, expiryMonth: string) {
    await this.page.getByText('Add new card').click();
    await this.page.locator("//input[@id='mat-input-4']").fill(name);
    await this.page.locator("//input[@id='mat-input-5']").fill(cardNumber);
// Month
  await this.page.getByLabel('Expiry Month').click();
  await this.page.selectOption('select#mat-input-6', { label: expiryMonth });

// Year
  await this.page.locator('select#mat-input-7').click();
  await this.page.selectOption('select#mat-input-7', { label: expiryYear});
  }

  async submit(){
    await this.page.getByText('Submit').click();
  }

  async verifySubmit(){
      // Locate the submit button by its ID and text content
  const submitButton = this.page.locator('#submitButton:has-text("send Submit")');
    await expect(submitButton).toBeDisabled();
  }

  async verifyCardAdded(lastDigits: string) {
    await expect(this.page.getByText('************'+lastDigits)).toBeVisible();
  }
}