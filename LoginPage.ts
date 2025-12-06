import { Page, Locator } from "@playwright/test";

export class LoginPage {
  readonly page: Page;
  readonly username: Locator;
  readonly password: Locator;
  readonly loginButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.username = page.locator('[data-test="username"]');
    this.password = page.locator('[data-test="password"]');
    this.loginButton = page.locator('[data-test="login-button"]');
  }

  async goto() {
    await this.page.goto("https://www.saucedemo.com/");
  }

  async login(user: string, pwd: string) {
    await this.username.fill(user);
    await this.password.fill(pwd);
    await this.loginButton.click();
  }
}
