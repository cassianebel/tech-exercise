import { test, expect } from "@playwright/test";

test("test", async ({ page }) => {
  await page.goto("http://localhost:5173/");
  await page.getByRole("textbox", { name: "Enter user ID" }).click();
  await page.getByRole("textbox", { name: "Enter user ID" }).fill("18");
  page.once("dialog", (dialog) => {
    console.log(`Dialog message: ${dialog.message()}`);
    dialog.dismiss().catch(() => {});
  });
  await page.getByRole("button", { name: "Delete User" }).click();
  await page.getByRole("textbox", { name: "User ID", exact: true }).click();
  await page.getByRole("textbox", { name: "User ID", exact: true }).fill("17");
  await page.getByRole("button", { name: "Get User" }).click();
  await page
    .locator("form")
    .filter({ hasText: "Update User" })
    .locator('input[name="email"]')
    .click();
  await page
    .locator("form")
    .filter({ hasText: "Update User" })
    .locator('input[name="email"]')
    .fill("april@gmail.com");
  await page.getByRole("button", { name: "Update User" }).click();
  await page.getByRole("textbox", { name: "Name" }).click();
  await page.getByRole("textbox", { name: "Name" }).fill("Vivian");
  await page.getByRole("textbox", { name: "Name" }).press("Tab");
  await page.getByRole("textbox", { name: "Email" }).fill("viv@mail.com");
  page.once("dialog", (dialog) => {
    console.log(`Dialog message: ${dialog.message()}`);
    dialog.dismiss().catch(() => {});
  });
  await page.getByRole("button", { name: "Create User" }).click();
});
