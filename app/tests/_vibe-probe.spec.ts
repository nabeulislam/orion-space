import { test } from '@playwright/test'
import fs from 'fs'
import path from 'path'

/**
 * Temporary probe for the vibe-consistency pass.
 * Writes, per route: a full-page screenshot and a deterministic computed-style
 * fingerprint JSON, into $VIBE_OUT (before) or $VIBE_OUT (after).
 */

const OUT = process.env.VIBE_OUT || 'C:/Users/nabeul/AppData/Local/Temp/vibe-audit/out'
const ROUTES = ['/', '/dossiers', '/games', '/about', '/cockpit', '/agent']

const PROPS = [
  'fontFamily', 'fontSize', 'fontWeight', 'fontStyle', 'letterSpacing', 'lineHeight',
  'color', 'backgroundColor', 'backgroundImage', 'backgroundClip',
  'borderTopWidth', 'borderTopColor', 'borderTopLeftRadius', 'borderBottomRightRadius',
  'paddingTop', 'paddingLeft', 'marginTop', 'marginLeft',
  'display', 'gap', 'boxShadow', 'backdropFilter', 'opacity', 'textAlign', 'textTransform',
] as const

const FREEZE = `
  *, *::before, *::after { animation: none !important; transition: none !important; caret-color: transparent !important; }
  html { scroll-behavior: auto !important; }
`

function slug(route: string) {
  return route === '/' ? 'home' : route.replace(/^\//, '').replace(/\//g, '-')
}

test('probe: layout + style fingerprint', async ({ page }) => {
  test.setTimeout(600_000)
  fs.mkdirSync(OUT, { recursive: true })
  await page.emulateMedia({ reducedMotion: 'reduce' })

  for (const route of ROUTES) {
    await page.setViewportSize({ width: 1440, height: 900 })
    await page.goto(route, { waitUntil: 'domcontentloaded' })
    await page.addStyleTag({ content: FREEZE })
    await page.evaluate(() => document.fonts.ready)
    await page.waitForTimeout(1400)

    await page.screenshot({ path: path.join(OUT, `${slug(route)}.png`), fullPage: true, animations: 'disabled' })

    // Deterministic fingerprint of two zones: the whole /agent page, and the
    // AgentCockpit subtree on /cockpit (its chrome legitimately restyles).
    const zones: Record<string, string> = { page: 'body' }
    if (await page.locator('#cockpit').count()) zones.cockpit = '#cockpit'

    for (const [name, selector] of Object.entries(zones)) {
      const data = await page.evaluate(
        ({ selector, props }) => {
          const root = document.querySelector(selector)
          if (!root) return null
          const out: Record<string, Record<string, string>> = {}
          let i = 0
          for (const el of Array.from(root.querySelectorAll('*'))) {
            const tag = el.tagName.toLowerCase()
            if (tag === 'script' || tag === 'style' || tag === 'canvas') continue
            const cs = getComputedStyle(el)
            const rec: Record<string, string> = { tag, cls: (el.getAttribute('class') || '').slice(0, 200) }
            for (const p of props) rec[p] = cs.getPropertyValue(p.replace(/[A-Z]/g, (m) => '-' + m.toLowerCase()))
            out[`${i++}:${tag}`] = rec
          }
          return out
        },
        { selector, props: PROPS as unknown as string[] },
      )
      fs.writeFileSync(path.join(OUT, `${slug(route)}.${name}.styles.json`), JSON.stringify(data, null, 1))
    }

    // Mobile pass (layout only).
    await page.setViewportSize({ width: 390, height: 844 })
    await page.goto(route, { waitUntil: 'domcontentloaded' })
    await page.addStyleTag({ content: FREEZE })
    await page.evaluate(() => document.fonts.ready)
    await page.waitForTimeout(900)
    await page.screenshot({ path: path.join(OUT, `${slug(route)}.mobile.png`), fullPage: true, animations: 'disabled' })
  }
})
