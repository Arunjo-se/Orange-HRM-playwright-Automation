import "dotenv/config";
import { test, expect } from "@playwright/test";
import LoginPage from "../pages/loginPage";

test.describe("Login Functionality", () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  test("Valid Login Test", async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.loginFunction(
      process.env.USER_NAME ?? "",
      process.env.PASSWORD ?? ""
    );

    await expect(
      page.getByRole("heading", { name: "Dashboard" })
    ).toBeVisible();
  });

  test.skip("Invalid Login Test", async ({ page }) => {
    const loginPage = new LoginPage(page);

    await page.fill('input[name="username"]', "InvalidUser");
    await page.fill('input[name="password"]', "InvalidPass");
    await page.click('button[type="submit"]');

    // Verify error message is displayed
    await expect(page.locator(".oxd-alert-content-text")).toHaveText(
      "Invalid credentials"
    );
  });
});
