/**
 * Contentful blog layer.
 *
 * The site is a static export, so Contentful is read at build time through the
 * Delivery or Preview API. When the space credentials are missing — or the
 * request fails, times out, or returns nothing usable — the journal falls back
 * to the local essays in `lib/blog-fallback.ts` so a build never breaks because
 * a third party is down. When Contentful is available, its entries are merged
 * with the local essays; a Contentful entry with the same slug wins.
 *
 * Two read APIs are supported:
 *   Delivery API (cdn.contentful.com)    published entries — production
 *   Preview API  (preview.contentful.com) drafts + published — local/staging
 *
 * Environment variables (never exposed to the client):
 *   CONTENTFUL_SPACE_ID
 *   CONTENTFUL_ACCESS_TOKEN            Delivery API token (published content)
 *   CONTENTFUL_PREVIEW_ACCESS_TOKEN    Preview API token (drafts); required
 *                                      only when preview mode is on
 *   CONTENTFUL_USE_PREVIEW             optional, "true" switches APIs
 *   CONTENTFUL_ENVIRONMENT             optional, defaults to "master"
 *   CONTENTFUL_CONTENT_TYPE            optional, defaults to "blogPost"
 *   CONTENTFUL_LOCALE                  optional, master locale when omitted
 */

import { fallbackPosts } from './blog-fallback'

export type RichTextMark = {
  type: string
  attrs?: Record<string, unknown>
}

export type RichTextNode = {
  nodeType: string
  value?: string
  marks?: RichTextMark[]
  data?: Record<string, unknown>
  content?: RichTextNode[]
}

export type RichTextDocument = RichTextNode & { nodeType: 'document' }

export type BlogCover = {
  url: string
  title: string
  width?: number
  height?: number
  /** CSS object-position, for covers whose subject sits off-centre. */
  position?: string
}

export type BlogPost = {
  slug: string
  title: string
  excerpt: string
  publishedAt: string
  updatedAt?: string
  tags: string[]
  readingMinutes: number
  featured?: boolean
  cover?: BlogCover
  body: RichTextDocument | null
  source: 'contentful' | 'local'
}

type ContentfulAsset = {
  sys?: { id?: string }
  fields?: {
    title?: string
    description?: string
    file?: {
      url?: string
      details?: { image?: { width?: number; height?: number } }
    }
  }
}

type ContentfulEntry = {
  sys?: {
    id?: string
    createdAt?: string
    updatedAt?: string
    contentType?: { sys?: { id?: string } }
  }
  fields?: Record<string, unknown>
}

type ContentfulResponse = {
  items?: ContentfulEntry[]
  includes?: { Asset?: ContentfulAsset[] }
}

const DELIVERY_API_ROOT = 'https://cdn.contentful.com'
const PREVIEW_API_ROOT = 'https://preview.contentful.com'
const REQUEST_TIMEOUT_MS = 8000
const WORDS_PER_MINUTE = 220

export type ContentfulMode = 'delivery' | 'preview'

function spaceId() {
  return process.env.CONTENTFUL_SPACE_ID?.trim()
}

/**
 * Preview mode is opt-in. A static export must never ship drafts accidentally,
 * so anything other than an explicit `true` keeps the Delivery API.
 */
export function contentfulMode(): ContentfulMode {
  return process.env.CONTENTFUL_USE_PREVIEW?.trim().toLowerCase() === 'true'
    ? 'preview'
    : 'delivery'
}

function accessToken() {
  return contentfulMode() === 'preview'
    ? process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN?.trim()
    : process.env.CONTENTFUL_ACCESS_TOKEN?.trim()
}

export function contentfulConfigured() {
  return Boolean(spaceId() && accessToken())
}

export function contentfulApiRoot() {
  return contentfulMode() === 'preview' ? PREVIEW_API_ROOT : DELIVERY_API_ROOT
}

export function contentfulContentType() {
  return process.env.CONTENTFUL_CONTENT_TYPE?.trim() || 'blogPost'
}

function environmentId() {
  return process.env.CONTENTFUL_ENVIRONMENT?.trim() || 'master'
}

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */

function asString(value: unknown): string | undefined {
  if (typeof value === 'string' && value.trim()) return value.trim()
  return undefined
}

function asBoolean(value: unknown): boolean {
  return value === true || value === 'true'
}

function asStringArray(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value
      .map((item) => {
        if (typeof item === 'string') return item.trim()
        if (item && typeof item === 'object' && 'fields' in item) {
          const fields = (item as ContentfulEntry).fields
          return (
            asString(fields?.title) ??
            asString(fields?.name) ??
            asString(fields?.label) ??
            ''
          )
        }
        return ''
      })
      .filter(Boolean)
  }
  const single = asString(value)
  return single ? single.split(',').map((tag) => tag.trim()).filter(Boolean) : []
}

export function richTextToPlainText(node?: RichTextNode | null): string {
  if (!node) return ''
  const parts: string[] = []
  const walk = (current: RichTextNode) => {
    if (current.value) parts.push(current.value)
    if (current.content) {
      current.content.forEach(walk)
      if (
        current.nodeType === 'paragraph' ||
        current.nodeType === 'heading-1' ||
        current.nodeType === 'heading-2' ||
        current.nodeType === 'heading-3' ||
        current.nodeType === 'heading-4' ||
        current.nodeType === 'blockquote' ||
        current.nodeType === 'list-item'
      ) {
        parts.push(' ')
      }
    }
  }
  walk(node)
  return parts.join('').replace(/\s+/g, ' ').trim()
}

export function estimateReadingMinutes(body: RichTextDocument | null, excerpt = '') {
  const words = `${richTextToPlainText(body)} ${excerpt}`.split(/\s+/).filter(Boolean).length
  return Math.max(1, Math.round(words / WORDS_PER_MINUTE))
}

/** Stable, readable anchor ids for article headings. */
export function slugifyHeading(value: string) {
  return value
    .toLowerCase()
    .replace(/[’']/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

function assetFromIncludes(id: unknown, assets: ContentfulAsset[]): BlogCover | undefined {
  if (!id || typeof id !== 'object' || !('sys' in id)) return undefined
  const assetId = (id as { sys?: { id?: string } }).sys?.id
  if (!assetId) return undefined
  const asset = assets.find((candidate) => candidate.sys?.id === assetId)
  const url = asset?.fields?.file?.url
  if (!url) return undefined
  return {
    url: url.startsWith('//') ? `https:${url}` : url,
    title:
      asString(asset?.fields?.title) ??
      asString(asset?.fields?.description) ??
      'Article cover',
    width: asset?.fields?.file?.details?.image?.width,
    height: asset?.fields?.file?.details?.image?.height,
  }
}

function normaliseBody(value: unknown, assets: ContentfulAsset[]): RichTextDocument | null {
  if (!value || typeof value !== 'object') return null
  const candidate = value as RichTextNode
  if (candidate.nodeType !== 'document') return null
  return resolveAssets(candidate, assets) as RichTextDocument
}

/** Resolve `embedded-asset-block` nodes against the response `includes`. */
function resolveAssets(node: RichTextNode, assets: ContentfulAsset[]): RichTextNode {
  const resolved: RichTextNode = { ...node }
  if (node.nodeType === 'embedded-asset-block') {
    const target = node.data?.target as { sys?: { id?: string } } | undefined
    const cover = assetFromIncludes(target, assets)
    if (cover) resolved.data = { ...node.data, asset: cover }
  }
  if (node.content) {
    resolved.content = node.content.map((child) => resolveAssets(child, assets))
  }
  return resolved
}

function normaliseEntry(entry: ContentfulEntry, assets: ContentfulAsset[]): BlogPost | null {
  const fields = entry.fields ?? {}
  const slug = asString(fields.slug) ?? asString(fields.slugField)
  const title = asString(fields.title) ?? asString(fields.name)
  if (!slug || !title) return null

  const body = normaliseBody(fields.body ?? fields.content ?? fields.richText, assets)
  const excerpt =
    asString(fields.excerpt) ??
    asString(fields.summary) ??
    asString(fields.description) ??
    richTextToPlainText(body).slice(0, 190)
  const publishedAt =
    asString(fields.publishedAt) ??
    asString(fields.publishDate) ??
    asString(fields.date) ??
    entry.sys?.createdAt ??
    new Date().toISOString()

  return {
    slug,
    title,
    excerpt,
    publishedAt,
    updatedAt:
      asString(fields.updatedAt) ?? asString(fields.lastReviewed) ?? entry.sys?.updatedAt,
    tags: asStringArray(fields.tags ?? fields.categories ?? fields.category ?? fields.kicker),
    readingMinutes:
      typeof fields.readingMinutes === 'number'
        ? Math.max(1, Math.round(fields.readingMinutes))
        : estimateReadingMinutes(body, excerpt),
    featured: asBoolean(fields.featured ?? fields.pinned),
    cover: assetFromIncludes(fields.cover ?? fields.hero ?? fields.image, assets),
    body,
    source: 'contentful',
  }
}

function sortPosts(posts: BlogPost[]) {
  return [...posts].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  )
}

/* ------------------------------------------------------------------ */
/* Fetching                                                            */
/* ------------------------------------------------------------------ */

async function requestContentful(): Promise<ContentfulResponse | null> {
  if (!contentfulConfigured()) return null

  const mode = contentfulMode()
  const apiName = mode === 'preview' ? 'Preview API' : 'Delivery API'

  if (mode === 'preview') {
    console.warn(
      '[contentful] Preview API enabled — unpublished drafts may be rendered in this build.'
    )
  }

  const params = new URLSearchParams({
    access_token: accessToken() as string,
    content_type: contentfulContentType(),
    include: '2',
    order: '-fields.publishedAt',
    limit: '100',
  })

  const locale = process.env.CONTENTFUL_LOCALE?.trim()
  if (locale) params.set('locale', locale)

  const url = `${contentfulApiRoot()}/spaces/${spaceId()}/environments/${environmentId()}/entries?${params.toString()}`
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS)

  try {
    const response = await fetch(url, {
      headers: { Accept: 'application/json' },
      signal: controller.signal,
      cache: 'no-store',
    })
    if (!response.ok) {
      console.warn(
        `[contentful] ${apiName} responded ${response.status}; using local journal fallback.`
      )
      return null
    }
    return (await response.json()) as ContentfulResponse
  } catch (error) {
    console.warn(
      `[contentful] Could not reach the ${apiName}; using local journal fallback.`,
      error instanceof Error ? error.message : error
    )
    return null
  } finally {
    clearTimeout(timer)
  }
}

let postsPromise: Promise<BlogPost[]> | null = null

export async function getPosts(): Promise<BlogPost[]> {
  if (!postsPromise) {
    postsPromise = (async () => {
      const payload = await requestContentful()
      const assets = payload?.includes?.Asset ?? []
      const remote = (payload?.items ?? [])
        .map((entry) => normaliseEntry(entry, assets))
        .filter((post): post is BlogPost => Boolean(post))

      // Keep the written archive and add new entries from Contentful. A remote
      // entry with the same slug replaces its local counterpart.
      const merged = new Map(fallbackPosts.map((post) => [post.slug, post]))
      for (const post of remote) merged.set(post.slug, post)

      return sortPosts([...merged.values()])
    })()
  }
  return postsPromise
}

export async function getPostBySlug(slug: string): Promise<BlogPost | undefined> {
  const posts = await getPosts()
  return posts.find((post) => post.slug === slug)
}

export async function getBlogSlugs(): Promise<string[]> {
  const posts = await getPosts()
  return posts.map((post) => post.slug)
}

export function postHref(slug: string) {
  return `/blog/${slug}`
}

export function formatPostDate(value: string) {
  return new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(value))
}

export function formatPostDateShort(value: string) {
  return new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(new Date(value))
}
