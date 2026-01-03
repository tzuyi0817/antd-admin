import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

test('click Vite logo open Vite official website blank tab', async ({ page }) => {
  const link = page.getByRole('link', { name: /vite logo/i });

  await expect(link).toBeVisible();
  const [popup] = await Promise.all([page.waitForEvent('popup'), link.evaluate((node: HTMLElement) => node.click())]);

  await popup.waitForLoadState();
  await expect(popup).toHaveTitle('Vite | Next Generation Frontend Tooling');
});
