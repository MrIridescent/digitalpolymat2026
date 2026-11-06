#!/usr/bin/env node
/**
 * Submit the live sitemap to IndexNow (Bing, Yandex, Seznam, Naver, Yep).
 *
 * Usage:
 *   node scripts/seo-indexnow.mjs             # submit every URL
 *   node scripts/seo-indexnow.mjs --dry-run   # print what would be sent
 *   npm run seo:indexnow
 *
 * The key below is public by design: IndexNow verifies ownership by fetching
 * https://<host>/<key>.txt, which is served from public/. Change the key in
 * both places if you rotate it (INDEXNOW_KEY must match the file name).
 */

const KEY = process.env.INDEXNOW_KEY || '9f4c2a7d8e1b6c3f5a0d9e7b2c4f8a16'
const SITE = (process.env.NEXT_PUBLIC_SITE_URL || 'https://mriridescent.africa').replace(/\/$/, '')
const ENDPOINT = process.env.INDEXNOW_ENDPOINT || 'https://api.indexnow.org/indexnow'
const dryRun = process.argv.includes('--dry-run')

function extractUrls(xml) {
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1].trim())
}

async function main() {
  const sitemapUrl = `${SITE}/sitemap.xml`
  const response = await fetch(sitemapUrl, { headers: { Accept: 'application/xml' } })

  if (!response.ok) {
    throw new Error(`Could not fetch ${sitemapUrl} (HTTP ${response.status}). Deploy first, then rerun.`)
  }

  const xml = await response.text()
  const urlList = extractUrls(xml)

  if (!urlList.length) throw new Error('The sitemap contained no <loc> entries.')

  // Trust the sitemap's own origin rather than the environment variable: a
  // local preview can serve a sitemap baked with the production URL, and the
  // payload must match what the live key file proves ownership of.
  const origin = new URL(urlList[0]).origin
  const host = new URL(origin).host

  if (origin !== new URL(SITE).origin) {
    console.warn(`Note: sitemap origin ${origin} differs from NEXT_PUBLIC_SITE_URL ${SITE}.`)
  }

  const payload = {
    host,
    key: KEY,
    keyLocation: `${origin}/${KEY}.txt`,
    urlList,
  }

  console.log(`IndexNow · ${urlList.length} URLs · ${host}`)

  if (dryRun) {
    console.log(JSON.stringify(payload, null, 2))
    return
  }

  const submission = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify(payload),
  })

  const text = await submission.text().catch(() => '')
  console.log(`HTTP ${submission.status} ${submission.statusText}${text ? ` — ${text}` : ''}`)

  if (!submission.ok && submission.status !== 202) {
    throw new Error('IndexNow rejected the submission. Check the key file is live and matches.')
  }

  console.log('Done. IndexNow engines usually recrawl within 24–72 hours.')
}

main().catch((error) => {
  console.error(error.message)
  process.exit(1)
})
