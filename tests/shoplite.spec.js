import { test, expect } from "@playwright/test";

// ---------- Home ----------
test.describe("Home page", () => {
  test("shows the hero and a link to products", async ({ page }) => {
    await page.goto("/#/");
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(
      "Gear up for your next adventure"
    );
    await expect(page.getByText("Quality outdoor equipment at honest prices.")).toBeVisible();
    await expect(page.getByRole("link", { name: "Browse products" })).toBeVisible();
  });

  test("Browse products goes to the products page", async ({ page }) => {
    await page.goto("/#/");
    await page.getByRole("link", { name: "Browse products" }).click();
    await expect(page).toHaveURL(/#\/products$/);
    await expect(page.getByRole("heading", { name: "Products" })).toBeVisible();
  });
});

// ---------- Navbar ----------
test.describe("Navbar", () => {
  test("shows brand and all links on every page", async ({ page }) => {
    for (const path of ["/#/", "/#/products", "/#/cart"]) {
      await page.goto(path);
      await expect(page.locator(".brand")).toHaveText("ShopLite");
      await expect(page.getByRole("link", { name: "Home" })).toBeVisible();
      await expect(page.getByRole("link", { name: "Products" })).toBeVisible();
      await expect(page.getByRole("link", { name: /Cart/ })).toBeVisible();
    }
  });

  test("cart badge shows 3", async ({ page }) => {
    await page.goto("/#/");
    await expect(page.locator(".cart-count")).toHaveText("3");
  });

  test("active link is highlighted", async ({ page }) => {
    await page.goto("/#/products");
    await expect(page.getByRole("link", { name: "Products" })).toHaveClass(/active/);
    await expect(page.getByRole("link", { name: "Home" })).not.toHaveClass(/active/);
  });

  test("navigates between pages", async ({ page }) => {
    await page.goto("/#/");
    await page.getByRole("link", { name: /Cart/ }).click();
    await expect(page).toHaveURL(/#\/cart$/);
    await page.getByRole("link", { name: "Home" }).click();
    await expect(page).toHaveURL(/#\/$/);
  });
});

// ---------- Products ----------
test.describe("Products page", () => {
  test("lists four products with names and prices", async ({ page }) => {
    await page.goto("/#/products");
    const cards = page.locator(".product-card");
    await expect(cards).toHaveCount(4);

    const expected = [
      ["Trail Backpack", "$59.00"],
      ["Water Bottle", "$18.50"],
      ["Camping Lantern", "$34.00"],
      ["Hiking Boots", "$120.00"],
    ];
    for (let i = 0; i < expected.length; i++) {
      await expect(cards.nth(i).locator("h3")).toHaveText(expected[i][0]);
      await expect(cards.nth(i).locator(".price")).toHaveText(expected[i][1]);
    }
  });

  test("shows New and Sale tags on the right products", async ({ page }) => {
    await page.goto("/#/products");
    const tags = page.locator(".tag");
    await expect(tags).toHaveCount(2);
    await expect(page.locator(".product-card", { hasText: "Trail Backpack" }).locator(".tag")).toHaveText("New");
    await expect(page.locator(".product-card", { hasText: "Camping Lantern" }).locator(".tag")).toHaveText("Sale");
  });

  test("every card has an Add to cart button", async ({ page }) => {
    await page.goto("/#/products");
    await expect(page.getByRole("button", { name: "Add to cart" })).toHaveCount(4);
  });

  test("uses a four-column grid on desktop", async ({ page }) => {
    await page.goto("/#/products");
    const columns = await page.locator(".grid").evaluate(
      (el) => getComputedStyle(el).gridTemplateColumns.split(" ").length
    );
    expect(columns).toBe(4);
  });
});

// ---------- Cart ----------
test.describe("Cart page", () => {
  test("lists the cart items with line totals", async ({ page }) => {
    await page.goto("/#/cart");
    const rows = page.locator(".cart-table tbody tr");
    await expect(rows).toHaveCount(2);
    await expect(rows.nth(0)).toContainText("Trail Backpack");
    await expect(rows.nth(0)).toContainText("$59.00");
    await expect(rows.nth(1)).toContainText("Camping Lantern");
    await expect(rows.nth(1)).toContainText("$68.00");
  });

  test("shows the correct total", async ({ page }) => {
    await page.goto("/#/cart");
    await expect(page.locator(".cart-total strong")).toHaveText("$127.00");
  });

  test("has a Checkout button", async ({ page }) => {
    await page.goto("/#/cart");
    await expect(page.getByRole("button", { name: "Checkout" })).toBeVisible();
  });
});

// ---------- Footer ----------
test("footer is shown on every page", async ({ page }) => {
  for (const path of ["/#/", "/#/products", "/#/cart"]) {
    await page.goto(path);
    await expect(page.locator(".footer")).toContainText("2026 ShopLite");
  }
});

// ---------- Visual snapshots (optional) ----------
test.describe("Visual snapshots", () => {
  for (const [name, path] of [
    ["home", "/#/"],
    ["products", "/#/products"],
    ["cart", "/#/cart"],
  ]) {
    test(`${name} page looks the same`, async ({ page }) => {
      await page.goto(path);
      await page.waitForLoadState("networkidle");
      await expect(page).toHaveScreenshot(`${name}.png`, {
        fullPage: true,
        maxDiffPixelRatio: 0.002,
      });
    });
  }
});
