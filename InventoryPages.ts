import { Page, Locator } from "@playwright/test";

export class InventoryPage {
  readonly page: Page;
  readonly sortDropdown: Locator;

  constructor(page: Page) {
    this.page = page;
    this.sortDropdown = page.locator('[data-test="product-sort-container"]');
  }

  async sort(optionValue: string) {
    await this.sortDropdown.selectOption(optionValue);
  }
}
