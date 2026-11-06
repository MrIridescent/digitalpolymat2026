import { chromium } from '@playwright/test'
import fs from 'node:fs'

const exe = 'C:/Users/C0sm0s/AppData/Local/ms-playwright/chromium-1248/chrome-win64/chrome.exe'
const base = 'http://localhost:4173'
const outDir = 'audit/redesign'
fs.mkdirSync(outDir, { recursive: true })

const routes = ['/', '/blog', '/blog/the-polymath-is-a-systems-engineer', '/writings']
const widths = [
  { name: 'desktop', width: 1280, height: 900 },
  { name: 'mobile', width: 390, height: 844 },
  { name: 'small', width: 320, height: 700 },
]

const browser = await chromium.launch({ executablePath: exe, headless: true })
const report = []

for (const viewport of widths) {
  const context = await browser.newContext({ viewport: { width: viewport.width, height: viewport.height } })
  for (const route of routes) {
    const page = await context.newPage()
    const consoleErrors = []
    const failed = []
    page.on('console', (msg) => {
      if (msg.type() === 'error') consoleErrors.push(msg.text())
    })
    page.on('response', (res) => {
      if (res.status() >= 400) failed.push(`${res.status()} ${res.url()}`)
    })

    await page.goto(base + route, { waitUntil: 'networkidle' })
    await page.waitForTimeout(700)
    // Walk down the page so lazy images decode and scroll effects fire.
    const step = Math.round(viewport.height * 0.7)
    const height = await page.evaluate(() => document.body.scrollHeight)
    for (let y = 0; y < height; y += step) {
      await page.evaluate((top) => window.scrollTo(0, top), y)
      await page.waitForTimeout(120)
    }
    await page.evaluate(() => window.scrollTo(0, 0))
    await page.waitForTimeout(600)

    const overflow = await page.evaluate(() => {
      const viewportWidth = window.innerWidth
      const scrollWidth = document.documentElement.scrollWidth
      const candidates = []
      if (scrollWidth > viewportWidth + 1) {
        document.querySelectorAll('body *').forEach((el) => {
          const rect = el.getBoundingClientRect()
          if (rect.width === 0 || rect.height === 0) return
          if (rect.right <= viewportWidth + 1 && rect.left >= -1) return
          const style = getComputedStyle(el)
          if (style.pointerEvents === 'none') return
          let parent = el.parentElement
          while (parent) {
            const ps = getComputedStyle(parent)
            if (['hidden', 'clip', 'scroll', 'auto'].includes(ps.overflowX)) return
            parent = parent.parentElement
          }
          candidates.push({
            tag: el.tagName.toLowerCase(),
            cls: typeof el.className === 'string' ? el.className.slice(0, 120) : '',
            left: Math.round(rect.left),
            right: Math.round(rect.right),
            text: (el.textContent || '').trim().slice(0, 60),
          })
        })
      }
      return { viewportWidth, scrollWidth, candidates: candidates.slice(0, 8) }
    })

    const images = await page.evaluate(() =>
      Array.from(document.images)
        .filter((img) => img.complete && img.naturalWidth === 0)
        .map((img) => img.currentSrc || img.src)
    )

    const brokenText = await page.evaluate(() => {
      const body = document.body.innerText
      return ['undefined', 'NaN'].some((token) => body.includes(token))
    })

    const name = `${viewport.name}${route === '/' ? '-home' : route.replace(/\//g, '-')}`
    await page.screenshot({ path: `${outDir}/${name}.png`, fullPage: false })
    if (viewport.name === 'desktop' || viewport.name === 'mobile') {
      await page.screenshot({ path: `${outDir}/${name}-full.png`, fullPage: true })
    }

    report.push({
      viewport: viewport.name,
      route,
      scrollWidth: overflow.scrollWidth,
      viewportWidth: overflow.viewportWidth,
      overflow: overflow.scrollWidth > overflow.viewportWidth + 1 ? overflow.candidates : [],
      consoleErrors: consoleErrors.slice(0, 5),
      failed: failed.slice(0, 5),
      brokenImages: images,
      suspiciousText: brokenText,
    })

    await page.close()
  }
  await context.close()
}

// Interaction checks on the home page at desktop.
const context = await browser.newContext({ viewport: { width: 1280, height: 900 } })
const page = await context.newPage()
await page.goto(base + '/', { waitUntil: 'networkidle' })
await page.waitForTimeout(800)

const carousel = page.locator('[aria-roledescription="carousel"]').first()
const start = await carousel.evaluate((el) => el.scrollLeft)
await page.getByRole('button', { name: 'Next item' }).first().click()
await page.waitForTimeout(900)
const after = await carousel.evaluate((el) => el.scrollLeft)

const services = page.locator('button[aria-controls^="service-panel-"]')
await services.nth(1).click()
await page.waitForTimeout(700)
const secondExpanded = await services.nth(1).getAttribute('aria-expanded')
const panelHeight = await page.locator('#service-panel-delivery-architecture').evaluate((el) => el.getBoundingClientRect().height).catch(() => 0)

report.push({
  interactions: {
    carouselMoved: after > start + 20,
    carouselStart: start,
    carouselAfter: after,
    secondServiceExpanded: secondExpanded,
    servicePanelHeight: Math.round(panelHeight),
  },
})

await context.close()
await browser.close()
fs.writeFileSync(`${outDir}/report.json`, JSON.stringify(report, null, 2))
console.log(JSON.stringify(report, null, 2))
