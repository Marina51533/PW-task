import { Page, expect } from "@playwright/test";
import { BasePage } from "./basePage";

export class EmployeesPage extends BasePage {
  private readonly addButton = "#add";
  private readonly employeeModal = "#employeeModal";
  private readonly firstNameInput = "#firstName";
  private readonly lastNameInput = "#lastName";
  private readonly dependantsInput = "#dependants";
  private readonly addEmployeeButton = "#addEmployee";
  private readonly employeesTable = "#employeesTable";
  private readonly tableBody = "#employeesTable tbody";

  constructor(page: Page) {
    super(page);
  }

  async gotoEmployeesPage(
    options?: Parameters<Page["goto"]>[1]
  ): Promise<void> {
    const baseUrl = process.env.BASE_URL_PROD;

    if (!baseUrl) {
      throw new Error("BASE_URL_PROD environment variable is not set");
    }
    await this.navigateTo(new URL("", baseUrl).toString(), options);
  }

  async fillEmployeeForm(
    firstName: string,
    lastName: string,
    dependants: number
  ): Promise<void> {
    await this.page.fill(this.firstNameInput, firstName);
    await this.page.fill(this.lastNameInput, lastName);
    await this.page.fill(this.dependantsInput, dependants.toString());
  }

  async isEmployeeInTable(
    firstName: string,
    lastName: string
  ): Promise<boolean> {
    const tableVisible = await this.page
      .locator(this.employeesTable)
      .isVisible()
      .catch(() => false);

    if (!tableVisible) return false;

    const rows = this.page.locator(`${this.tableBody} tr`);
    const rowCount = await rows.count().catch(() => 0);

    for (let index = 0; index < rowCount; index++) {
      const row = rows.nth(index);
      const cells = row.locator("td");
      const cellCount = await cells.count().catch(() => 0);

      if (cellCount >= 3) {
        // UI columns are swapped: cells[1] shows firstName and cells[2] shows lastName
        const rowFirstName = await cells.nth(1).textContent();
        const rowLastName = await cells.nth(2).textContent();

        if (
          rowFirstName?.trim() === firstName &&
          rowLastName?.trim() === lastName
        ) {
          return true;
        }
      }
    }

    return false;
  }

  async addEmployee(
    firstName: string,
    lastName: string,
    dependants: number
  ): Promise<void> {
    await this.page.locator(this.addButton).click({ timeout: 10_000 });

    // Fail fast if the UI didn't react (prevents cryptic downstream failures).
    await expect(this.page.locator(this.employeeModal)).toBeVisible({
      timeout: 10_000,
    });

    await this.fillEmployeeForm(firstName, lastName, dependants);

    await expect(this.page.locator(this.firstNameInput)).toHaveValue(firstName);
    await expect(this.page.locator(this.lastNameInput)).toHaveValue(lastName);
    await expect(this.page.locator(this.dependantsInput)).toHaveValue(
      dependants.toString()
    );

    await this.page.locator(this.addEmployeeButton).click({ timeout: 10_000 });
  }
}
