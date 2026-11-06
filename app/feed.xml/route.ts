import { getPosts, postHref, richTextToPlainText } from '@/lib/contentful'
import { site } from '@/lib/profile'
import { CONTENT_UPDATED, siteOrigin } from '@/lib/seo-config'

export const dynamic = 'force-static'

const origin = siteOrigin()

function escapeXml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

function rfc822(value: string) {
  const date = new Date(value)
  return Number.isNaN(date.getTime()) ? new Date().toUTCString() : date.toUTCString()
}

/**
 * RSS 2.0 feed — generated from the same posts that render /blog, so the
 * journal can be syndicated without a manual copy. Also advertised in the
 * document head via `alternates.types`.
 */
export async function GET() {
  const posts = await getPosts()

  const items = posts.map((post) => {
    const url = `${origin}${postHref(post.slug)}`
    const body = post.body ? richTextToPlainText(post.body) : ''
    const description = post.excerpt || body.slice(0, 280)

    return [
      '    <item>',
      `      <title>${escapeXml(post.title)}</title>`,
      `      <link>${escapeXml(url)}</link>`,
      `      <guid isPermaLink="true">${escapeXml(url)}</guid>`,
      `      <pubDate>${rfc822(post.publishedAt)}</pubDate>`,
      `      <dc:creator>${escapeXml(site.name)}</dc:creator>`,
      ...post.tags.map((tag) => `      <category>${escapeXml(tag)}</category>`),
      `      <description>${escapeXml(description)}</description>`,
      '    </item>',
    ].join('\n')
  })

  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0"',
    '  xmlns:dc="http://purl.org/dc/elements/1.1/"',
    '  xmlns:atom="http://www.w3.org/2005/Atom">',
    '  <channel>',
    `    <title>${escapeXml(`${site.name} — Journal`)}</title>`,
    `    <link>${escapeXml(`${origin}/blog`)}</link>`,
    `    <description>${escapeXml(
      'Field notes on software, systems thinking, security, AI, and the practice of building in public.'
    )}</description>`,
    '    <language>en</language>',
    `    <lastBuildDate>${rfc822(CONTENT_UPDATED)}</lastBuildDate>`,
    `    <copyright>${escapeXml(
      `© ${new Date().getUTCFullYear()} ${site.name}. All rights reserved.`
    )}</copyright>`,
    `    <atom:link href="${escapeXml(
      `${origin}/feed.xml`
    )}" rel="self" type="application/rss+xml" />`,
    ...items,
    '  </channel>',
    '</rss>',
    '',
  ].join('\n')

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  })
}
