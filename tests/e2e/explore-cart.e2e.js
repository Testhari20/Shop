// Proposed by the AI regression agent after exploring "/cart" in a browser.
const { test, expect } = require('@playwright/test');

const BASE_URL = "http://localhost:4173";

test("cart page loads", async ({ page }) => {
  const response = await page.goto(BASE_URL + "/cart");
  expect(response && response.status()).toBeLessThan(400);
  await expect(page).toHaveTitle("ShopLite");
  await expect(page.getByRole('heading', { name: "Your Cart" }).first()).toBeVisible();
});
