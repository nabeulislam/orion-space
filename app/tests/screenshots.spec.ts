import { test } from '@playwright/test'
import path from 'path'

const ARTIFACT_DIR = 'C:/Users/nabeul/.gemini/antigravity/brain/ab23099b-5fec-4003-8abf-7085b9f9a048'

test('Capture screenshots of all pages', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 })

  // 1. Home Page Hero
  await page.goto('/')
  await page.waitForSelector('h1:has-text("ORION SPACE")')
  await page.waitForTimeout(1000)
  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'screenshot_home.png') })

  // 1b. Home Page Scrolled
  await page.locator('#games-preview').scrollIntoViewIfNeeded()
  await page.waitForSelector('h2:has-text("EARTH DETECTIVE GAMES")')
  await page.waitForTimeout(500)
  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'screenshot_home_scrolled.png') })

  // 2. Dossiers Page
  await page.goto('/dossiers')
  await page.waitForSelector('h2:has-text("INTELLIGENCE DOSSIERS")')
  await page.waitForTimeout(1000)
  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'screenshot_dossiers.png') })

  // 3. Games Page
  await page.goto('/games')
  await page.waitForSelector('h2:has-text("EARTH DETECTIVE ACADEMY")')
  await page.waitForTimeout(1000)
  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'screenshot_games.png') })

  // 4. Cockpit Page
  await page.goto('/cockpit')
  await page.waitForSelector('h2:has-text("AGENT INTELLIGENCE COCKPIT")')
  await page.waitForTimeout(1000)
  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'screenshot_cockpit.png') })

  // 5. About Page
  await page.goto('/about')
  await page.waitForSelector('h3:has-text("PROJECT ORION SPACE")')
  await page.waitForTimeout(1000)
  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'screenshot_about.png') })

  // 5b. Footer
  await page.locator('#contact').scrollIntoViewIfNeeded()
  await page.waitForTimeout(600)
  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'screenshot_footer.png') })

  // 6. Agent Page
  await page.goto('/agent')
  await page.waitForTimeout(2500)
  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'screenshot_agent.png') })
})

