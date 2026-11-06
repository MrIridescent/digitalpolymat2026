import { test, expect } from '@playwright/test';

test.describe('Homepage', () => {
  test('should load and display main content', async ({ page }) => {
    await page.goto('/');

    // Check page title
    await expect(page).toHaveTitle(/Growth Hacker|Creative Renaissance Man/);

    // Check main heading
    const h1 = page.locator('h1');
    await expect(h1).toBeVisible();
    await expect(h1).toContainText('I find the angle');

    // Check navigation
    await expect(page.locator('nav[aria-label="Primary"]')).toBeVisible();

    // Check the selected work section
    await expect(
      page.getByRole('heading', { name: /Built, shipped, and public/ })
    ).toBeVisible();
  });

  test('should navigate to projects page', async ({ page }) => {
    await page.goto('/');

    // Click the Work link in the primary navigation
    await page.locator('nav[aria-label="Primary"] a[href="/projects"]').click();
    await expect(page).toHaveURL('/projects');

    // Verify projects page loaded
    await expect(page.locator('h1')).toContainText('The work');
  });

  test('should be responsive on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');

    // Check mobile navigation trigger
    await expect(page.getByRole('button', { name: 'Open menu' })).toBeVisible();

    // Check content is properly displayed without horizontal overflow
    await expect(page.locator('h1')).toBeVisible();
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth
    );
    expect(overflow).toBe(0);
  });
});
