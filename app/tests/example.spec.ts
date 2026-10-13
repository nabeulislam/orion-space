import { test, expect } from '@playwright/test';

test('App Smoke Test: index page loads successfully', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/Orion Space/i);
  const root = page.locator('#root');
  await expect(root).toBeVisible();
});
