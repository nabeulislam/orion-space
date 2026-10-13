import { test } from '@playwright/test'
import path from 'path'

const ARTIFACT_DIR = 'C:/Users/nabeul/.gemini/antigravity/brain/7ee64d7c-932b-403c-a9d4-5898c3ccf560'

test('Capture screenshots of all routes to artifact dir', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 })

  // 1. Home
  await page.goto('/')
  await page.waitForTimeout(1500)
  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'home_top.png') })

  // Scroll down to showcase
  await page.evaluate(() => window.scrollTo(0, 1100))
  await page.waitForTimeout(1000)
  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'home_scrolled.png') })

  // 2. Dossiers
  await page.goto('/dossiers')
  await page.waitForTimeout(1500)
  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'dossiers_page.png') })

  // 3. Games
  await page.goto('/games')
  await page.waitForTimeout(1500)
  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'games_page.png') })

  // 4. Cockpit
  await page.goto('/cockpit')
  await page.waitForTimeout(1500)
  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'cockpit_page.png') })

  // 5. About
  await page.goto('/about')
  await page.waitForTimeout(1500)
  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'about_page.png') })
})
