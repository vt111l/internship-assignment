import { test, expect } from "../fixtures/Loginfixtures";
import { InventoryPage } from "../pages/InventoryPages";

test("Sauce Demo Sorting Test", async ({ page, loginPage }) => {

  // Open login page
  await loginPage.goto();
  await page.pause();

  // Try wrong password
  await loginPage.login("standard_user", "12345");
  await page.pause();

  // Try another wrong password
  await loginPage.password.fill("joking123456");
  await page.pause();
  await loginPage.loginButton.click();
  await page.pause();

  // Try locked_out_user
  await loginPage.login("locked_out_user", "secret_sauce");
  await page.pause();

  // Login with performance user
  await loginPage.login("performance_glitch_user", "secret_sauce");
  await page.pause();

  // Inventory page
  const inventory = new InventoryPage(page);
  await page.pause();

  // Sort: Price Low → High
  await inventory.sort("lohi");
  await page.pause();

  // Sort: Name Z → A
  await inventory.sort("za");
  await page.pause();

  // Sort: Name A → Z
  await inventory.sort("az");
  await page.pause();
});
