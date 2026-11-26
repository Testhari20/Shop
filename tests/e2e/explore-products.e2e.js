// Proposed by the AI regression agent after exploring "/products" in a browser.
const { test, expect } = require('@playwright/test');

const BASE_URL = "http://localhost:4173";

test("products page loads", async ({ page }) => {
  const response = await page.goto(BASE_URL + "/products");
  expect(response && response.status()).toBeLessThan(400);
  await expect(page).toHaveTitle("ShopLite");
  await expect(page.getByRole('heading', { name: "Gear up for your next adventure" }).first()).toBeVisible();
});
