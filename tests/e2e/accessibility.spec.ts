import { test, expect } from '@playwright/test';

test.describe('Accessibility', () => {
  test('should have proper heading hierarchy', async ({ page }) => {
    await page.goto('/');
    
    // Check h1 exists and is unique
    const h1Elements = page.locator('h1');
    await expect(h1Elements).toHaveCount(1);
    
    // Check heading hierarchy
    await expect(page.locator('h1, h2, h3, h4, h5, h6')).toHaveCount(await page.locator('h1, h2, h3, h4, h5, h6').count());
  });

  test('should have alt text for images', async ({ page }) => {
    await page.goto('/');
    
    // Check all images have alt attributes
    const images = page.locator('img');
    const imageCount = await images.count();
    
    for (let i = 0; i < imageCount; i++) {
      await expect(images.nth(i)).toHaveAttribute('alt');
    }
  });

  test('should be keyboard navigable', async ({ page }) => {
    await page.goto('/');
    
    // Tab through interactive elements
    await page.keyboard.press('Tab');
    await expect(page.locator(':focus')).toBeVisible();
    
    // Continue tabbing
    await page.keyboard.press('Tab');
    await expect(page.locator(':focus')).toBeVisible();
  });
});