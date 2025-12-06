import { test, expect } from './login'; // login fixture only
import { Page, Locator } from '@playwright/test';

// All other pages can stay here, defined manually if needed
class InventoryPage {
  readonly page: Page;
  readonly boltTShirt: Locator;
  readonly fleeceJacket: Locator;
  readonly onesie: Locator;
  readonly cartLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.boltTShirt = page.locator('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]');
    this.fleeceJacket = page.locator('[data-test="add-to-cart-sauce-labs-fleece-jacket"]');
    this.onesie = page.locator('[data-test="add-to-cart-sauce-labs-onesie"]');
    this.cartLink = page.locator('[data-test="shopping-cart-link"]');
  }

  async addItemsToCart() {
    await this.boltTShirt.click();
    await this.fleeceJacket.click();
    await this.onesie.click();
  }

  async goToCart() {
    await this.cartLink.click();
  }
}

class CartPage {
  readonly page: Page;
  readonly checkoutButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.checkoutButton = page.locator('[data-test="checkout"]');
  }

  async checkout() {
    await this.checkoutButton.click();
  }
}

class CheckoutPage {
  readonly page: Page;
  readonly firstName: Locator;
  readonly lastName: Locator;
  readonly postalCode: Locator;
  readonly continueButton: Locator;
  readonly finishButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.firstName = page.locator('[data-test="firstName"]');
    this.lastName = page.locator('[data-test="lastName"]');
    this.postalCode = page.locator('[data-test="postalCode"]');
    this.continueButton = page.locator('[data-test="continue"]');
    this.finishButton = page.locator('[data-test="finish"]');
  }

  async fillCheckoutInfo(first: string, last: string, postal: string) {
    await this.firstName.fill(first);
    await this.lastName.fill(last);
    await this.postalCode.fill(postal);
  }

  async continue() {
    await this.continueButton.click();
  }

  async finish() {
    await this.finishButton.click();
  }
}

// =========================
// Test using only loginPage fixture
// =========================
test('Swag Labs Full Flow - Single File', async ({ page, loginPage }) => {
  const inventoryPage = new InventoryPage(page);
  const cartPage = new CartPage(page);
  const checkoutPage = new CheckoutPage(page);

  // -------- Login --------
  await loginPage.goto();
  await page.pause();
  await loginPage.login('standard_user', 'secret_sauce');
  await page.pause();

  // -------- Inventory --------
  await inventoryPage.addItemsToCart();
  await page.pause();
  await inventoryPage.goToCart();
  await page.pause();
  // -------- Cart --------
  await cartPage.checkout();
  await page.pause();

  // -------- Checkout --------
  await checkoutPage.fillCheckoutInfo('stand', 'user', '12345');
  await page.pause();
  await checkoutPage.continue();
  await page.pause();
  await checkoutPage.finish();
  await page.pause();
});
//npx playwright test --headed --project=chromium