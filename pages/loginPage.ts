import { Locator, Page } from "@playwright/test";
import dotenv from "dotenv";
dotenv.config();
const baseURL: string = (process.env.BaseURL ?? "").trim();

export default class loginPage {
  private page: Page;
  private username: Locator;
  private password: Locator;
  private submitButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.username = page.getByRole("textbox", { name: "Username" });
    this.password = page.getByRole("textbox", { name: "Password" });
    this.submitButton = page.getByRole("button", { name: "Login" });
  }

  async goto(): Promise<void> {
    await this.page.goto(baseURL, { waitUntil: "domcontentloaded" });
  }

  async loginFunction(username: string, password: string): Promise<void> {
    await this.username.type(username);
    await this.password.type(password);
    await this.submitButton.click();
  }
}
