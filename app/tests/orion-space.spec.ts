import { test, expect } from '@playwright/test'

test.describe('Orion Space — Multi-Page Architecture & 3D Cesium Project', () => {
  test('Home Page: Clean reference design matching Image 2, typography, and single CTA', async ({ page }) => {
    await page.goto('/')

    // Expect page title
    await expect(page).toHaveTitle(/Orion Space/i)

    // Check minimalist brand in Navbar
    await expect(page.getByRole('link', { name: 'orion space' })).toBeVisible()

    // Check navbar links
    const nav = page.getByRole('navigation')
    await expect(nav.getByRole('link', { name: 'Home' })).toBeVisible()
    await expect(nav.getByRole('link', { name: 'Dossiers' })).toBeVisible()
    await expect(nav.getByRole('link', { name: 'Games' })).toBeVisible()
    await expect(nav.getByRole('link', { name: 'Cockpit' })).toBeVisible()
    await expect(nav.getByRole('link', { name: 'About' })).toBeVisible()

    // Check Launch 3D Agent button in Navbar links to internal /agent page
    const agentBtn = page.getByRole('link', { name: /Launch 3D Agent/i }).first()
    await expect(agentBtn).toBeVisible()
    await expect(agentBtn).toHaveAttribute('href', '/agent')

    // Check Hero title and clean subtitle
    const heroHeading = page.locator('h1')
    await expect(heroHeading).toBeVisible()
    await expect(heroHeading).toHaveText('ORION SPACE')
    await expect(page.locator('#home').getByText('Be An Earth System Trend Detective.', { exact: true })).toBeVisible()

    // Check single centered glass pill CTA on Earth
    const ctaButton = page.locator('#home').getByRole('link', { name: /Explore Dossiers/i })
    await expect(ctaButton).toBeVisible()
    await expect(ctaButton).toHaveAttribute('href', '/dossiers')

    // Check games preview section
    await page.locator('#games-preview').scrollIntoViewIfNeeded()
    await expect(page.getByRole('heading', { name: 'EARTH DETECTIVE GAMES' })).toBeVisible()
    await expect(page.getByText('The Late-Monsoon Mystery').first()).toBeVisible()

    // Check 3D showcase section
    await page.locator('#immersive-showcase').scrollIntoViewIfNeeded()
    await expect(page.getByRole('heading', { name: 'IMMERSIVE 3D AGENT' })).toBeVisible()
  })

  test('Page Navigation: Dedicated Dossiers Page (/dossiers)', async ({ page }) => {
    await page.goto('/dossiers')

    // Verify URL and heading
    await expect(page).toHaveURL(/\/dossiers/)
    await expect(page.getByRole('heading', { name: 'INTELLIGENCE DOSSIERS' })).toBeVisible()

    // Verify Case 01 is present
    await expect(page.getByText('The Monsoon Temperature Paradox').first()).toBeVisible()
    await expect(page.getByText('+0.40 °C per decade').first()).toBeVisible()

    // Switch to Case 02
    const case2Tab = page.getByRole('button', { name: /EOSDIS Multi-Sensor Thermal Sweeps/i })
    await case2Tab.click()
    await expect(page.getByText(/FIRMS Active Wildfire Sensor/i)).toBeVisible()
  })

  test('Page Navigation: Dedicated Games Page (/games)', async ({ page }) => {
    await page.goto('/games')

    // Verify URL and heading
    await expect(page).toHaveURL(/\/games/)
    await expect(page.getByRole('heading', { name: 'EARTH DETECTIVE ACADEMY' })).toBeVisible()

    // Solve Game 1 by selecting September
    const septemberBtn = page.locator('#academy').getByRole('button', { name: 'September', exact: true })
    await septemberBtn.click()

    // Verify mystery solved report
    await expect(page.getByText(/MYSTERY SOLVED! DETECTIVE REPORT/i)).toBeVisible()
    await expect(page.getByText('+0.40 °C').first()).toBeVisible()
  })

  test('Page Navigation: Dedicated Cockpit Page (/cockpit)', async ({ page }) => {
    await page.goto('/cockpit')

    // Verify URL and heading
    await expect(page).toHaveURL(/\/cockpit/)
    await expect(page.getByText(/ORION AGENT.*TERMINAL/i)).toBeVisible()

    // Switch metric to Annual Average
    const annualBtn = page.getByRole('button', { name: /Annual Average/i })
    await annualBtn.click()
    await expect(page.getByText('0.8900 (Not Significant)')).toBeVisible()

    // Switch back to September
    const sepBtn = page.getByRole('button', { name: /September \(\+0.40 °C\)/i })
    await sepBtn.click()
    await expect(page.getByText('0.00007 (Significant)')).toBeVisible()
  })

  test('Page Navigation: Dedicated About Page (/about)', async ({ page }) => {
    await page.goto('/about')

    // Verify URL and heading
    await expect(page).toHaveURL(/\/about/)
    await expect(page.getByRole('heading', { name: 'PROJECT ORION SPACE' })).toBeVisible()
    await expect(page.getByText('Barisal, Bangladesh', { exact: false }).first()).toBeVisible()
  })

  test('Page Navigation: Dedicated 3D Cesium Agent Page (/agent)', async ({ page }) => {
    await page.goto('/agent')

    // Verify URL
    await expect(page).toHaveURL(/\/agent/)

    // Verify iframe embedding the 3D Cesium project from orion-space
    const iframe = page.locator('iframe[title="Orion Space 3D Cesium Digital Twin"]')
    await expect(iframe).toBeVisible()
    await expect(iframe).toHaveAttribute('src', '/agent/index.html')

    // Verify Exit to Portal button
    await expect(page.getByRole('link', { name: /Exit to Portal/i })).toBeVisible()
  })
})
