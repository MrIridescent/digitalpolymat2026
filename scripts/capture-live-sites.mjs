/**
 * Capture consistent preview images for the live client sites shown on
 * /projects. Run after changing the live site list:
 *
 *   node scripts/capture-live-sites.mjs
 *
 * Output: public/media/live-sites/<slug>.jpg (1440 × 900, JPEG).
 */
import { chromium } from 'playwright'
import { mkdir } from 'node:fs/promises'
import path from 'node:path'

const sites = [
  { slug: 'mriridescent-github', url: 'https://mriridescent.github.io/' },
  { slug: 'olmash-consulting', url: 'https://olmashconsulting.com/' },
  { slug: 'sf-dynamics', url: 'https://sfdynamics.com.ng/' },
  { slug: 'ola-western', url: 'https://olawestern.ng/' },
  { slug: 'digital-polymath', url: 'https://mriridescent-digitalpolymat.netlify.app/' },
  { slug: 'polymathic-coder', url: 'https://mriridescent-polymatic-coder.netlify.app/' },
  { slug: 'polymathic-coder-studio', url: 'https://harmonious-daffodil-5d988a.netlify.app/' },
  { slug: 'polymathic-coder-atelier', url: 'https://cool-frangollo-9c22b5.netlify.app/' },
]

const outDir = path.join(process.cwd(), 'public', 'media', 'live-sites')
await mkdir(outDir, { recursive: true })

const browser = await chromium.launch({ channel: 'chrome' })
const context = await browser.newContext({
  viewport: { width: 1440, height: 900 },
  deviceScaleFactor: 1,
  reducedMotion: 'reduce',
})

for (const site of sites) {
  const page = await context.newPage()
  await page.addInitScript(() => {
    const style = document.createElement('style')
    style.textContent = '#nl-badge-frame{display:none!important}'
    document.documentElement.appendChild(style)
  })

  try {
    await page.goto(site.url, { waitUntil: 'load', timeout: 45000 })
    await page.waitForTimeout(6500)
    await page.evaluate(() => document.fonts?.ready)
    await page.waitForTimeout(500)
    const file = path.join(outDir, `${site.slug}.jpg`)
    // Trim the bottom 80px so injected badges, chat bubbles and cookie bars
    // never appear inside the portfolio's own showcase.
    await page.screenshot({
      path: file,
      type: 'jpeg',
      quality: 80,
      fullPage: false,
      clip: { x: 0, y: 0, width: 1440, height: 820 },
    })
    console.log(`captured ${site.slug}`)
  } catch (error) {
    console.error(`failed ${site.slug}: ${error.message}`)
  } finally {
    await page.close()
  }
}

await context.close()
await browser.close()
