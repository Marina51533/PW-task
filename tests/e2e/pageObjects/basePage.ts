import { Page } from "@playwright/test";

export class BasePage {
  protected page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigateTo(
    url: string,
    options?: Parameters<Page["goto"]>[1]
  ): Promise<void> {
    await this.page.goto(url, { waitUntil: "domcontentloaded", ...options });
  }
}
