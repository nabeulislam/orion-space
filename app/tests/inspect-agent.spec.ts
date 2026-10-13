import { test } from '@playwright/test'

test('Inspect /agent console and network', async ({ page }) => {
  page.on('console', msg => console.log('BROWSER_LOG:', msg.type(), msg.text()))
  page.on('pageerror', err => console.log('PAGE_ERROR:', err.message))

  await page.goto('/agent/index.html')
  await page.waitForTimeout(4000)
  await page.screenshot({ path: 'C:/Users/nabeul/.gemini/antigravity/brain/ab23099b-5fec-4003-8abf-7085b9f9a048/screenshot_agent_direct.png' })
})
