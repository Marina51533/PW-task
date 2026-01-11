import { Page, expect, Locator } from "@playwright/test";
import { BasePage } from "./basePage";

export class EmployeesPage extends BasePage {
  private readonly addButton: Locator;
  private readonly employeeModal: Locator;
  private readonly firstNameInput: Locator;
  private readonly lastNameInput: Locator;
  private readonly dependantsInput: Locator;
  private readonly addEmployeeButton: Locator;
  private readonly employeesTable: Locator;
  private readonly tableBody: Locator;
  private readonly tableRows: Locator;

  constructor(page: Page) {
    super(page);

    this.addButton = this.page.locator("#add");
    this.employeeModal = this.page.locator("#employeeModal");
    this.firstNameInput = this.page.locator("#firstName");
    this.lastNameInput = this.page.locator("#lastName");
    this.dependantsInput = this.page.locator("#dependants");
    this.addEmployeeButton = this.page.locator("#addEmployee");
    this.employeesTable = this.page.locator("#employeesTable");
    this.tableBody = this.page.locator("#employeesTable tbody");
    this.tableRows = this.tableBody.locator("tr");
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
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.dependantsInput.fill(dependants.toString());
  }

  async isEmployeeInTable(
    firstName: string,
    lastName: string
  ): Promise<boolean> {
    const tableVisible = await this.employeesTable.isVisible().catch(() => false);

    if (!tableVisible) return false;

    const rowCount = await this.tableRows.count().catch(() => 0);

    for (let index = 0; index < rowCount; index++) {
      const row = this.tableRows.nth(index);
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
    await this.addButton.click({ timeout: 10_000 });

    // Fail fast if the UI didn't react (prevents cryptic downstream failures).
    await expect(this.employeeModal).toBeVisible({
      timeout: 10_000,
    });

    await this.fillEmployeeForm(firstName, lastName, dependants);

    await expect(this.firstNameInput).toHaveValue(firstName);
    await expect(this.lastNameInput).toHaveValue(lastName);
    await expect(this.dependantsInput).toHaveValue(dependants.toString());

    await this.addEmployeeButton.click({ timeout: 10_000 });
  }
}
