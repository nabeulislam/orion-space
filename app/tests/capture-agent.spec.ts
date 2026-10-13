import { test } from '@playwright/test'
import path from 'path'

const ARTIFACT_DIR = 'C:/Users/nabeul/.gemini/antigravity/brain/ab23099b-5fec-4003-8abf-7085b9f9a048'

test('Capture complete screenshot of /agent route', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 })

  await page.goto('/agent')
  // Wait for the iframe and Cesium globe to fully initialize
  await page.waitForTimeout(6500)
  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'screenshot_agent.png') })
})
