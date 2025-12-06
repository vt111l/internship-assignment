import { test, expect, Page } from '@playwright/test';

/** Fill textbox using ARIA role + label */
async function fillInput(page: Page, label: string, value: string) {
  await page.getByRole('textbox', { name: label }).fill(value);
  await page.pause();
}

/** Select normal AntD dropdown without search */
async function selectAntDropdown(page: Page, label: string, option: string) {
  await page.getByRole('combobox', { name: label }).click();
  const dropdown = page.locator('.ant-select-dropdown:visible');
  await dropdown.waitFor();
  await dropdown.locator('.ant-select-item-option-content', { hasText: option }).click();
  await page.pause();
}

/** Select searchable AntD dropdown (with typing) */
async function searchSelectDropdown(page: Page, label: string, inputId: string, keyword: string) {
  await page.getByRole('combobox', { name: label }).click();
  await page.locator(inputId).fill(keyword);
  const dropdown = page.locator('.ant-select-dropdown:not(.ant-select-dropdown-hidden)').first();
  await dropdown.waitFor();
  await dropdown.locator('.ant-select-item-option-content', { hasText: keyword }).first().click({ force: true });
  await page.pause();
}


/** Click button by name */
async function clickButton(page: Page, name: string) {
  await page.getByRole('button', { name }).click();
  await page.pause();
}

test('Demo demo', async ({ page }) => {

  await page.goto('https://ant-design-form-test.harith-610.workers.dev/');
  await page.pause();

  // PAGE 1
  await fillInput(page, 'Customer So :', 'Harith');
  await fillInput(page, 'References :', 'Testing');
  await fillInput(page, 'Cust Refs :', '12345');
  await fillInput(page, 'Commodity :', 'Testing');

  // TRUCK TYPE
  await selectAntDropdown(page, '* Truck Type :', '10-Footer');

  // Trip type dropdown
  await page.getByText('LTL - Less than Truck Load').click();
  await page.pause();
  await page
    .locator('.ant-select-dropdown:visible .ant-select-item-option-content', { hasText: 'FTL - Full Truck Load' })
    .click();
  await page.pause();

  await clickButton(page, 'Next');

  // PAGE 2

  // Job Type dropdown
  await page.getByText('LTL').click();
  const jobTypeDropdown = page.locator('.ant-select-dropdown:visible');
  await page.pause();
  await jobTypeDropdown.locator('.ant-select-item-option-content', { hasText: 'FTL' }).click();
  await page.pause();

  await fillInput(page, 'Uom :', '10');
  await fillInput(page, 'Quantity :', '5');

  // Options dropdown
  await selectAntDropdown(page, 'Options :', 'Option 2');

  await page.getByPlaceholder('Enter trip #1 remarks...').fill('Testing');
  await page.pause();

  await clickButton(page, 'Next');

  // PAGE 3

  await searchSelectDropdown(page, 'From Company :', '#fromCompany', 'Metro Freight');
  await searchSelectDropdown(page, '* To Company :', '#toCompany', '0006 - Distribution Partners');
  await searchSelectDropdown(page, '* From Address :', '#fromAddress', 'Customer Warehouse A');
  await searchSelectDropdown(page, '* To Address :', '#toAddress', 'PNMB Logistics Sdn. Bhd');

  await clickButton(page, 'Next');

  // SUBMIT
  await clickButton(page, 'Submit');
});


