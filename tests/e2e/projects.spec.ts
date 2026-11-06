import { test, expect } from '@playwright/test';

test.describe('Projects Page', () => {
  test('should display project grid', async ({ page }) => {
    await page.goto('/projects');
    
    // Check page title
    await expect(page.locator('h1')).toContainText('Projects');
    
    // Check project cards are visible
    await expect(page.locator('[data-testid="project-card"]').first()).toBeVisible();
    
    // Check filter buttons
    await expect(page.locator('[data-testid="category-filter"]')).toBeVisible();
  });

  test('should filter projects by category', async ({ page }) => {
    await page.goto('/projects');
    
    // Click on AI/ML filter
    await page.click('text=AI/ML');
    
    // Check that only AI/ML projects are shown
    const projectCards = page.locator('[data-testid="project-card"]');
    await expect(projectCards).toHaveCount(1); // Based on your data
    
    // Check that the project contains AI/ML tag
    await expect(projectCards.first().locator('text=AI/ML')).toBeVisible();
  });

  test('should open project details', async ({ page }) => {
    await page.goto('/projects');
    
    // Click on first project's "View Details" link
    await page.click('[data-testid="project-card"] >> text=View Details');
    
    // Should navigate to project detail page
    await expect(page).toHaveURL(/\/projects\/\d+/);
  });
});