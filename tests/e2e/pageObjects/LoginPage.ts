import { Page } from '@playwright/test';
import { BasePage } from './basePage';

export class LoginPage extends BasePage {
  // Locators
  private readonly usernameInput = '[data-testid="username"]';
  private readonly passwordInput = '[data-testid="password"]';
  private readonly loginButton = '[data-testid="login-btn"]';
  private readonly errorMessage = '[data-testid="error-msg"]';

  constructor(page: Page) {
    super(page);
  }

  async navigateToLoginPage(url: string): Promise<void> {
    await this.navigateTo(url);
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
    return await this.page.textContent(this.errorMessage) || '';
  }
}