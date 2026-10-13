import { test } from '@playwright/test'
import path from 'path'

const ARTIFACT_DIR = 'C:/Users/nabeul/.gemini/antigravity/brain/ab23099b-5fec-4003-8abf-7085b9f9a048'

test('Capture screenshots of all pages', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 })

  // 1. Home Page Hero
  await page.goto('/')
  await page.waitForTimeout(1000)
  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'screenshot_home.png') })

  // 1b. Home Page Scrolled (verifying globe & space background behind sections)
  await page.evaluate(() => window.scrollTo(0, 950))
  await page.waitForTimeout(1000)
  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'screenshot_home_scrolled.png') })

  // 2. Dossiers Page
  await page.goto('/dossiers')
  await page.waitForTimeout(800)
  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'screenshot_dossiers.png') })

  // 3. Games Page
  await page.goto('/games')
  await page.waitForTimeout(800)
  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'screenshot_games.png') })

  // 4. Cockpit Page
  await page.goto('/cockpit')
  await page.waitForTimeout(800)
  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'screenshot_cockpit.png') })

  // 5. About Page
  await page.goto('/about')
  await page.waitForTimeout(800)
  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'screenshot_about.png') })

  // 6. Agent Page
  await page.goto('/agent')
  await page.waitForTimeout(2000)
  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'screenshot_agent.png') })
})

