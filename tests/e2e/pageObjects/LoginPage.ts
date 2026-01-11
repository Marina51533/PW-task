import { Page, expect, Locator } from '@playwright/test';
import { BasePage } from './basePage';

export class LoginPage extends BasePage {
  // Locators
  private readonly usernameInput: Locator;
  private readonly passwordInput: Locator;
  private readonly loginButton: Locator;
  private readonly errorMessage: Locator;

  constructor(page: Page) {
    super(page);

    this.usernameInput = this.page.locator('#Username');
    this.passwordInput = this.page.locator('#Password');
    this.loginButton = this.page.locator('button[type="submit"]');
    this.errorMessage = this.page.locator('.text-danger');
  }

  async gotoLoginPage(): Promise<void> {
    const baseUrl = process.env.BASE_URL_PROD;

    if (!baseUrl) {
      throw new Error('Environment variable BASE_URL_PROD is not defined.');
    }
    await this.navigateTo(new URL('Account/Login', baseUrl).toString());
  }

  async enterUsername(username: string): Promise<void> {
    await this.usernameInput.fill(username);
  }

  async enterPassword(password: string): Promise<void> {
    await this.passwordInput.fill(password);
  }

  async clickLoginButton(): Promise<void> {
    await this.loginButton.click();
  }

  async login(username: string, password: string): Promise<void> {
    await this.enterUsername(username);
    await this.enterPassword(password);
    await this.clickLoginButton();
  }

  async getErrorMessage(): Promise<string> {
    await expect(this.errorMessage).toBeVisible();
    return (await this.errorMessage.textContent()) || '';
  }
}