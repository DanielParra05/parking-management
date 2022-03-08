import { test, expect, Page } from "@playwright/test";

test.describe("Right flow", () => {
  let page: Page;
  test.beforeAll(async ({ browser }) => {
    const context = await browser.newContext();
    page = await context.newPage();
    await page.goto("http://localhost:8080/#/");
  });

  test.afterAll(async ({ browser }) => {
    browser.close;
  });

  test("Login", async ({}) => {
    await page.locator('button:has-text("Log in")').click();
    await expect(page.locator("#header")).toBeVisible();
  });

  test("Navigate to Parking Form", async ({}) => {
    await page.locator('button:has-text("New ticket")').click();
    await expect(page).toHaveURL("http://localhost:8080/#/parking-form");
  });

  test("Create ticket", async ({}) => {
    await page
      .locator("text=Vehicle typearrow_drop_down >> div")
      .nth(1)
      .click();
    await page
      .locator('div[role="listbox"] div:has-text("Car")')
      .nth(3)
      .click();
    await page.locator('[aria-label="Vehicle\\ plate"]').click();
    await page.locator('[aria-label="Vehicle\\ plate"]').fill("zzz000");
    await page.locator('button:has-text("Save")').click();
    await expect(page.locator("#dialogComponent")).toContainText(
      "Ticket created!"
    );
  });

  test("Navigate to Home", async ({}) => {
    await page.locator('button:has-text("OK")').click();
    await page.locator("text=local_parking").click();
    await expect(page).toHaveURL("http://localhost:8080/#/");
  });

  test("Closing ticket", async ({}) => {
    if (await page.locator('button:has-text("last_page")').isVisible()) {
      await page.locator('button:has-text("last_page")').click();
    } else if (
      await page.locator('button:has-text("chevron_right")').isVisible()
    ) {
      await page.locator('button:has-text("chevron_right")').click();
    }

    const tbodyRowCount = await page.evaluate(
      () =>
        (document.getElementsByClassName("q-table")[0] as HTMLTableElement)
          .tBodies[0].rows.length
    );
    await page
      .locator('td:has-text("exit_to_app")')
      .nth(tbodyRowCount - 1)
      .click();
    await expect(page.locator("#dialogComponent")).toContainText(
      "Ticket closed successfully"
    );
  });

  test("Logout", async ({}) => {
    await page.locator('button:has-text("OK")').click();
    await page.locator('button:has-text("logout")').click();
    await expect(page).toHaveURL("http://localhost:8080/#/login");
  });
});
