import { test } from '@playwright/test'
import path from 'path'

const ARTIFACT_DIR = 'C:/Users/nabeul/.gemini/antigravity/brain/ab23099b-5fec-4003-8abf-7085b9f9a048'

test('Capture screenshots of all pages including React Bits components', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 })

  // 1. Home Page Hero (with TrueFocus & DecryptedText)
  await page.goto('/')
  await page.waitForSelector('h1:has-text("ORION SPACE")')
  await page.waitForTimeout(1000)
  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'screenshot_home.png') })

  // 1b. Home Page Scrolled (FlipCards & MaskedHeading & LatticeLoader badge)
  await page.evaluate(() => document.getElementById('games-preview')?.scrollIntoView())
  await page.waitForSelector('h2:has-text("EARTH DETECTIVE GAMES")')
  await page.waitForTimeout(800)
  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'screenshot_home_scrolled.png') })

  // 2. Dossiers Page (with React Bits Image Selector & MorphSlider)
  await page.goto('/dossiers')
  await page.waitForSelector('h2:has-text("INTELLIGENCE DOSSIERS")')
  await page.waitForTimeout(1000)
  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'screenshot_dossiers.png') })

  // 3. Games Page (Scientific Lab Mode)
  await page.goto('/games')
  await page.waitForSelector('h2:has-text("EARTH DETECTIVE ACADEMY")')
  await page.waitForTimeout(1000)
  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'screenshot_games.png') })

  // 3b. Games Page: VIBE SHIFT TO 2D RETRO ARCADE (Pixel Transition Full Page)
  const arcadeBtn = page.locator('button:has-text("VIBE SHIFT TO 2D ARCADE")').first()
  if (await arcadeBtn.isVisible()) {
    await arcadeBtn.click()
    await page.waitForTimeout(1500) // wait for pixel transition dissolve
    await page.screenshot({ path: path.join(ARTIFACT_DIR, 'screenshot_games_2d_pixel.png') })
  }

  // 4. Cockpit Page (with TechText & DecryptedText & Liquid Glass Cockpit)
  await page.goto('/cockpit')
  await page.waitForSelector('h2:has-text("AGENT INTELLIGENCE COCKPIT")')
  await page.waitForTimeout(1000)
  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'screenshot_cockpit.png') })

  // 5. About Page (with ScrollStack scientific verification)
  await page.goto('/about')
  await page.waitForSelector('h3:has-text("PROJECT ORION SPACE")')
  await page.waitForTimeout(800)
  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'screenshot_about.png') })

  // 5b. Scientific Verification Stack in About
  await page.evaluate(() => window.scrollBy(0, 500))
  await page.waitForTimeout(800)
  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'screenshot_about_stack.png') })

  // 5c. Footer
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))
  await page.waitForTimeout(800)
  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'screenshot_footer.png') })

  // 6. Agent Page (with LatticeLoader 3D launch sequence)
  await page.goto('/agent')
  await page.waitForTimeout(1200) // capture the LatticeLoader in progress!
  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'screenshot_agent_launch.png') })
  await page.waitForTimeout(2200) // let Cesium hydrate
  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'screenshot_agent.png') })
})
