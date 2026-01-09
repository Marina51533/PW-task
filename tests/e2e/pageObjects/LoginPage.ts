import { Page, expect } from '@playwright/test';
import { BasePage } from './basePage';

export class LoginPage extends BasePage {
  // Locators
  private readonly usernameInput = '#Username';
  private readonly passwordInput = '#Password';
  private readonly loginButton = 'button[type="submit"]';
  private readonly errorMessage = '.text-danger';

  constructor(page: Page) {
    super(page);
  }

  async gotoLoginPage(): Promise<void> {
    await this.navigateTo('https://wmxrwq14uc.execute-api.us-east-1.amazonaws.com/Prod/Account/Login');
  }

  async enterUsername(username: string): Promise<void> {
    await this.page.fill(this.usernameInput, username);
  }

  async enterPassword(password: string): Promise<void> {
    await this.page.fill(this.passwordInput, password);
  }

  async clickLoginButton(): Promise<void> {
    await this.page.click(this.loginButton);
  }

  async login(username: string, password: string): Promise<void> {
    await this.enterUsername(username);
    await this.enterPassword(password);
    await this.clickLoginButton();
  }

  async getErrorMessage(): Promise<string> {
    await expect(this.page.locator(this.errorMessage)).toBeVisible();
    return await this.page.textContent(this.errorMessage) || '';
  }
}