#!/usr/bin/env node
/**
 * Publish an essay to Contentful with the Content Management API.
 *
 * The site is a static export, so "publishing" happens in two steps:
 *   1. This script creates or updates the entry (and its cover asset) in
 *      Contentful and publishes it.
 *   2. The site is rebuilt, which pulls the entry through the Delivery API.
 *
 * Usage:
 *   npm run blog:publish                    # reads contentful/post.json
 *   npm run blog:publish -- --file post.json
 *   npm run blog:publish -- --file -        # read JSON from stdin
 *   npm run blog:publish -- --dry-run       # validate, change nothing
 *   npm run blog:setup                      # create the blogPost content type
 *
 * Required environment (server-side only, never NEXT_PUBLIC_):
 *   CONTENTFUL_SPACE_ID
 *   CONTENTFUL_MANAGEMENT_TOKEN   Contentful → Settings → CMA tokens
 *
 * Optional:
 *   CONTENTFUL_ENVIRONMENT        default master
 *   CONTENTFUL_CONTENT_TYPE       default blogPost
 *   CONTENTFUL_LOCALE             default en-US
 *   BLOG_REBUILD_WEBHOOK_URL      Netlify build hook; triggers a redeploy
 *   BLOG_REBUILD_TOKEN            optional GitHub token for Actions deployments
 *   BLOG_REBUILD_REPO             default mriridescent/digitalpolymat2026
 *   NEXT_PUBLIC_SITE_URL          used only to print the public URL
 */

import { existsSync, readFileSync } from 'node:fs'
import { readFile } from 'node:fs/promises'
import path from 'node:path'
import process from 'node:process'
import { fileURLToPath } from 'node:url'

const CMA_ROOT = 'https://api.contentful.com'
const DEFAULT_CONTENT_TYPE = 'blogPost'
const DEFAULT_LOCALE = 'en-US'
const DEFAULT_REBUILD_REPO = 'mriridescent/digitalpolymat2026'
const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://mriridescent.africa').replace(/\/$/, '')

/* ------------------------------------------------------------------ */
/* Environment                                                        */
/* ------------------------------------------------------------------ */

/**
 * Standalone Node scripts do not load Next.js env files. Read the same files
 * so `npm run blog:publish` works without an extra dotenv dependency.
 */
function loadEnvFile(file) {
  if (!existsSync(file)) return
  const source = readFileSync(file, 'utf8')
  for (const rawLine of source.split(/\r?\n/)) {
    const line = rawLine.trim()
    if (!line || line.startsWith('#')) continue
    const match = line.match(/^([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)$/)
    if (!match) continue
    const [, key, rawValue] = match
    if (process.env[key] !== undefined) continue
    let value = rawValue.trim()
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1)
    }
    process.env[key] = value
  }
}

loadEnvFile('.env.local')
loadEnvFile('.env')

const argv = process.argv.slice(2)
const hasFlag = (name) => argv.includes(name)
const flagValue = (name, fallback) => {
  const index = argv.indexOf(name)
  if (index === -1) return fallback
  const value = argv[index + 1]
  return value && !value.startsWith('--') ? value : fallback
}

/* ------------------------------------------------------------------ */
/* Contentful client                                                  */
/* ------------------------------------------------------------------ */

class CmaError extends Error {
  constructor(message, status, details) {
    super(message)
    this.name = 'CmaError'
    this.status = status
    this.details = details
  }
}

function config() {
  const spaceId = process.env.CONTENTFUL_SPACE_ID?.trim()
  const token = process.env.CONTENTFUL_MANAGEMENT_TOKEN?.trim()
  return {
    spaceId,
    token,
    environment: process.env.CONTENTFUL_ENVIRONMENT?.trim() || 'master',
    contentType: process.env.CONTENTFUL_CONTENT_TYPE?.trim() || DEFAULT_CONTENT_TYPE,
    locale: process.env.CONTENTFUL_LOCALE?.trim() || DEFAULT_LOCALE,
  }
}

function assertCredentials(cfg) {
  const missing = []
  if (!cfg.spaceId) missing.push('CONTENTFUL_SPACE_ID')
  if (!cfg.token) missing.push('CONTENTFUL_MANAGEMENT_TOKEN')
  if (missing.length) {
    fail(
      `Missing ${missing.join(' and ')}.\n` +
        'Add them to .env.local (never commit that file) or export them in the shell.\n' +
        'Create a CMA token at Contentful → Settings → API keys → Content management tokens.'
    )
  }
}

async function cma(method, endpoint, body, extraHeaders = {}) {
  const cfg = config()
  assertCredentials(cfg)
  const url = `${CMA_ROOT}/spaces/${cfg.spaceId}/environments/${cfg.environment}${endpoint}`
  const headers = {
    Authorization: `Bearer ${cfg.token}`,
    Accept: 'application/json',
    ...extraHeaders,
  }
  if (body !== undefined) headers['Content-Type'] = 'application/json'

  const response = await fetch(url, {
    method,
    headers,
    body: body === undefined ? undefined : JSON.stringify(body),
  })

  const text = await response.text()
  let payload = null
  if (text) {
    try {
      payload = JSON.parse(text)
    } catch {
      payload = text
    }
  }

  if (!response.ok) {
    const detail =
      payload && typeof payload === 'object'
        ? payload.message || JSON.stringify(payload)
        : payload || response.statusText
    throw new CmaError(
      `Contentful ${method} ${endpoint} failed (${response.status}): ${detail}`,
      response.status,
      payload
    )
  }

  return payload
}

async function getContentType(cfg) {
  return cma('GET', `/content_types/${encodeURIComponent(cfg.contentType)}`)
}

async function ensureContentType(cfg) {
  try {
    return await getContentType(cfg)
  } catch (error) {
    if (error instanceof CmaError && error.status === 404) {
      fail(
        `Content type "${cfg.contentType}" does not exist in this space.\n` +
          `Run "npm run blog:setup" to create it, or set CONTENTFUL_CONTENT_TYPE to an existing type.`
      )
    }
    throw error
  }
}

/* ------------------------------------------------------------------ */
/* Rich text                                                          */
/* ------------------------------------------------------------------ */

const MARK_PATTERN = /(\*\*[^*]+\*\*|\*[^*]+\*|_[^_]+_|`[^`]+`|\[[^\]]+\]\([^)]+\))/g

function inlineNodes(value) {
  const nodes = []
  let lastIndex = 0
  for (const match of value.matchAll(MARK_PATTERN)) {
    const token = match[0]
    const index = match.index ?? 0
    if (index > lastIndex) {
      nodes.push(textNode(value.slice(lastIndex, index)))
    }
    if (token.startsWith('**')) {
      nodes.push(...withMark(inlineNodes(token.slice(2, -2)), 'bold'))
    } else if (token.startsWith('`')) {
      nodes.push(textNode(token.slice(1, -1), [{ type: 'code' }]))
    } else if (token.startsWith('[')) {
      const link = token.match(/^\[([^\]]+)\]\(([^)]+)\)$/)
      if (link) {
        nodes.push({
          nodeType: 'hyperlink',
          data: { uri: link[2] },
          content: inlineNodes(link[1]),
        })
      } else {
        nodes.push(textNode(token))
      }
    } else {
      nodes.push(...withMark(inlineNodes(token.slice(1, -1)), 'italic'))
    }
    lastIndex = index + token.length
  }
  if (lastIndex < value.length) nodes.push(textNode(value.slice(lastIndex)))
  return nodes.length ? nodes : [textNode('')]
}

function textNode(value, marks = []) {
  return { nodeType: 'text', value, marks, data: {} }
}

function withMark(nodes, mark) {
  return nodes.map((node) =>
    node.nodeType === 'text'
      ? { ...node, marks: [...(node.marks ?? []), { type: mark }] }
      : node
  )
}

function paragraph(nodes) {
  return { nodeType: 'paragraph', data: {}, content: nodes }
}

/**
 * Convert the Markdown subset used by the journal into Contentful rich text.
 * Supported: H2–H4, paragraphs, bold, italic, inline code, links, blockquotes,
 * unordered and ordered lists, horizontal rules, and fenced code blocks.
 */
export function markdownToRichText(markdown) {
  const lines = String(markdown).replace(/\r\n/g, '\n').split('\n')
  const content = []
  let index = 0

  const startsBlock = (line) =>
    /^(#{2,4})\s+/.test(line) ||
    /^>\s?/.test(line) ||
    /^[-*]\s+/.test(line) ||
    /^\d+\.\s+/.test(line) ||
    /^(---|\*\*\*)$/.test(line) ||
    /^```/.test(line)

  while (index < lines.length) {
    const line = lines[index]

    if (!line.trim()) {
      index += 1
      continue
    }

    if (/^```/.test(line)) {
      const code = []
      index += 1
      while (index < lines.length && !/^```/.test(lines[index])) {
        code.push(lines[index])
        index += 1
      }
      index += 1
      content.push(paragraph([textNode(code.join('\n'), [{ type: 'code' }])]))
      continue
    }

    const heading = line.match(/^(#{2,4})\s+(.*)$/)
    if (heading) {
      content.push({
        nodeType: `heading-${heading[1].length}`,
        data: {},
        content: inlineNodes(heading[2].trim()),
      })
      index += 1
      continue
    }

    if (/^(---|\*\*\*)$/.test(line.trim())) {
      content.push({ nodeType: 'hr', data: {} })
      index += 1
      continue
    }

    if (/^>\s?/.test(line)) {
      const quoteLines = []
      while (index < lines.length && /^>\s?/.test(lines[index])) {
        quoteLines.push(lines[index].replace(/^>\s?/, ''))
        index += 1
      }
      content.push({
        nodeType: 'blockquote',
        data: {},
        content: [paragraph(inlineNodes(quoteLines.join(' ')))],
      })
      continue
    }

    const unordered = /^[-*]\s+/.test(line)
    const ordered = /^\d+\.\s+/.test(line)
    if (unordered || ordered) {
      const list = []
      const pattern = unordered ? /^[-*]\s+/ : /^\d+\.\s+/
      while (index < lines.length && pattern.test(lines[index])) {
        const item = lines[index].replace(pattern, '')
        list.push({
          nodeType: 'list-item',
          data: {},
          content: [paragraph(inlineNodes(item))],
        })
        index += 1
      }
      content.push({
        nodeType: unordered ? 'unordered-list' : 'ordered-list',
        data: {},
        content: list,
      })
      continue
    }

    const paragraphLines = [line.trim()]
    index += 1
    while (index < lines.length && lines[index].trim() && !startsBlock(lines[index])) {
      paragraphLines.push(lines[index].trim())
      index += 1
    }
    content.push(paragraph(inlineNodes(paragraphLines.join(' '))))
  }

  return { nodeType: 'document', data: {}, content }
}

/* ------------------------------------------------------------------ */
/* Fields                                                             */
/* ------------------------------------------------------------------ */

const FIELD_ALIASES = {
  title: ['title', 'name'],
  slug: ['slug', 'slugField'],
  excerpt: ['excerpt', 'summary', 'description'],
  publishedAt: ['publishedAt', 'publishDate', 'date'],
  updatedAt: ['updatedAt', 'lastReviewed'],
  tags: ['tags', 'categories', 'category', 'kicker'],
  featured: ['featured', 'pinned'],
  cover: ['cover', 'hero', 'image'],
  readingMinutes: ['readingMinutes'],
  body: ['body', 'content', 'richText'],
}

function pickField(fields, key) {
  for (const candidate of FIELD_ALIASES[key]) {
    const field = fields.find((item) => item.id === candidate)
    if (field) return field
  }
  return undefined
}

function asArray(value) {
  if (Array.isArray(value)) return value.map((item) => String(item).trim()).filter(Boolean)
  if (typeof value === 'string') {
    return value.split(',').map((item) => item.trim()).filter(Boolean)
  }
  return []
}

function asIsoDate(value, label) {
  const date = value instanceof Date ? value : new Date(value)
  if (Number.isNaN(date.getTime())) {
    fail(`${label} is not a valid date: ${value}`)
  }
  return date.toISOString()
}

function encodeValue(field, value) {
  switch (field.type) {
    case 'Symbol':
    case 'Text':
      return Array.isArray(value) ? value.join(', ') : String(value)
    case 'Date':
      return asIsoDate(value, field.name || field.id)
    case 'Boolean':
      return value === true || value === 'true'
    case 'Integer':
      return Math.round(Number(value))
    case 'Number':
      return Number(value)
    case 'RichText':
      return value
    case 'Array': {
      const items = asArray(value)
      if (field.items?.type === 'Link') {
        return items.map((id) => ({
          sys: { type: 'Link', linkType: field.items.linkType, id },
        }))
      }
      return items
    }
    case 'Link':
      return {
        sys: { type: 'Link', linkType: field.linkType || 'Asset', id: String(value) },
      }
    default:
      return value
  }
}

function setLocalized(fields, fieldId, locale, value) {
  fields[fieldId] = { ...(fields[fieldId] ?? {}), [locale]: value }
}

function buildEntryFields({ post, contentType, cfg, coverAssetId }) {
  const fields = {}
  const warnings = []

  const add = (key, value, transform) => {
    if (value === undefined || value === null || value === '') return
    const field = pickField(contentType.fields ?? [], key)
    if (!field) {
      warnings.push(`Content type has no field for "${key}"; skipped.`)
      return
    }
    const encoded = encodeValue(field, transform ? transform(value) : value)
    if (encoded === undefined) return
    setLocalized(fields, field.id, cfg.locale, encoded)
  }

  add('title', post.title)
  add('slug', post.slug)
  add('excerpt', post.excerpt)
  add('publishedAt', post.publishedAt ?? new Date().toISOString())
  add('updatedAt', post.updatedAt)
  add('tags', post.tags)
  add('featured', post.featured)
  add('readingMinutes', post.readingMinutes)
  if (coverAssetId) add('cover', coverAssetId)
  add('body', post.body)

  return { fields, warnings }
}

/* ------------------------------------------------------------------ */
/* Cover asset                                                        */
/* ------------------------------------------------------------------ */

const MIME_BY_EXTENSION = {
  '.webp': 'image/webp',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.avif': 'image/avif',
  '.gif': 'image/gif',
}

function mimeFor(fileName, fallback = 'application/octet-stream') {
  return MIME_BY_EXTENSION[path.extname(fileName).toLowerCase()] || fallback
}

async function readCover(source) {
  if (/^https?:\/\//i.test(source)) {
    const response = await fetch(source)
    if (!response.ok) fail(`Could not download cover (${response.status}): ${source}`)
    const buffer = Buffer.from(await response.arrayBuffer())
    const fileName = path.basename(new URL(source).pathname) || 'cover.webp'
    return { buffer, fileName, contentType: mimeFor(fileName, response.headers.get('content-type') || 'image/webp') }
  }

  const resolved = path.resolve(source)
  if (!existsSync(resolved)) fail(`Cover file not found: ${resolved}`)
  const buffer = await readFile(resolved)
  const fileName = path.basename(resolved)
  return { buffer, fileName, contentType: mimeFor(fileName) }
}

async function uploadBinary({ cfg, buffer }) {
  const url = `${CMA_ROOT}/spaces/${cfg.spaceId}/environments/${cfg.environment}/uploads`
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${cfg.token}`,
      'Content-Type': 'application/octet-stream',
    },
    body: buffer,
  })
  if (!response.ok) {
    fail(`Upload endpoint failed (${response.status}): ${await response.text()}`)
  }
  const payload = await response.json()
  if (!payload.upload) {
    fail('The uploads endpoint did not return a file URL.')
  }
  return payload.upload
}

async function createAndPublishAsset({ post, cfg, contentTypeTitle }) {
  const { buffer, fileName, contentType } = await readCover(post.cover)
  const title = post.coverAlt || `${contentTypeTitle} — cover`

  const asset = await cma('POST', '/assets', {
    fields: {
      title: { [cfg.locale]: title },
      file: { [cfg.locale]: { contentType, fileName } },
    },
  })

  const assetId = asset.sys.id
  let current = asset
  const uploadUrl = asset.fields?.file?.[cfg.locale]?.upload

  if (uploadUrl) {
    const upload = await fetch(uploadUrl, {
      method: 'PUT',
      headers: { 'Content-Type': contentType },
      body: buffer,
    })
    if (!upload.ok) {
      fail(`Asset upload failed (${upload.status}): ${await upload.text()}`)
    }
  } else {
    // Some spaces return the signed URL only from the dedicated uploads endpoint.
    const uploaded = await uploadBinary({ cfg, buffer })
    const fields = structuredClone(asset.fields ?? {})
    fields.file = fields.file ?? {}
    fields.file[cfg.locale] = { ...(fields.file[cfg.locale] ?? {}), upload: uploaded }
    current = await cma('PUT', `/assets/${assetId}`, { fields }, {
      'X-Contentful-Version': String(asset.sys.version),
    })
  }
  try {
    await cma('PUT', `/assets/${assetId}/files/${cfg.locale}/process`, undefined, {
      'X-Contentful-Version': String(current.sys.version),
    })
  } catch (error) {
    if (!(error instanceof CmaError) || error.status !== 422) throw error
  }

  for (let attempt = 0; attempt < 30; attempt += 1) {
    current = await cma('GET', `/assets/${assetId}`)
    if (current.fields?.file?.[cfg.locale]?.url) break
    await new Promise((resolve) => setTimeout(resolve, 1000))
  }

  if (!current.fields?.file?.[cfg.locale]?.url) {
    fail(`Asset ${assetId} did not finish processing. Open Contentful and publish it manually.`)
  }

  await cma('PUT', `/assets/${assetId}/published`, undefined, {
    'X-Contentful-Version': String(current.sys.version),
  })

  return assetId
}

/* ------------------------------------------------------------------ */
/* Entry                                                              */
/* ------------------------------------------------------------------ */

async function findEntryBySlug(cfg, slug) {
  const query = new URLSearchParams({
    content_type: cfg.contentType,
    'fields.slug': slug,
    limit: '10',
  })
  const payload = await cma('GET', `/entries?${query.toString()}`)
  return (payload.items ?? []).find((entry) => entry.fields?.slug?.[cfg.locale] === slug)
}

async function publishEntry({ post, cfg, contentType, coverAssetId, dryRun }) {
  const existing = await findEntryBySlug(cfg, post.slug)
  const { fields, warnings } = buildEntryFields({ post, contentType, cfg, coverAssetId })

  for (const warning of warnings) console.warn(`  ! ${warning}`)

  if (existing) {
    // Preserve fields this script does not manage (for example, a custom author link).
    for (const [fieldId, localized] of Object.entries(existing.fields ?? {})) {
      fields[fieldId] = { ...localized, ...(fields[fieldId] ?? {}) }
    }
  }

  if (dryRun) {
    return {
      action: existing ? 'update' : 'create',
      entryId: existing?.sys?.id ?? '(new)',
      fields,
      dryRun: true,
    }
  }

  let saved
  if (existing) {
    saved = await cma('PUT', `/entries/${existing.sys.id}`, { fields }, {
      'X-Contentful-Version': String(existing.sys.version),
    })
  } else {
    saved = await cma(
      'POST',
      '/entries',
      { fields },
      { 'X-Contentful-Content-Type': cfg.contentType }
    )
  }

  await cma('PUT', `/entries/${saved.sys.id}/published`, undefined, {
    'X-Contentful-Version': String(saved.sys.version),
  })

  return { action: existing ? 'update' : 'create', entryId: saved.sys.id, dryRun: false }
}

/* ------------------------------------------------------------------ */
/* Setup                                                              */
/* ------------------------------------------------------------------ */

const CONTENT_TYPE_FIELDS = [
  { id: 'title', name: 'Title', type: 'Symbol', required: true },
  {
    id: 'slug',
    name: 'Slug',
    type: 'Symbol',
    required: true,
    validations: [{ unique: true }],
  },
  { id: 'excerpt', name: 'Excerpt', type: 'Text' },
  { id: 'publishedAt', name: 'Published at', type: 'Date', required: true },
  { id: 'tags', name: 'Tags', type: 'Array', items: { type: 'Symbol' } },
  { id: 'featured', name: 'Featured', type: 'Boolean' },
  { id: 'cover', name: 'Cover', type: 'Link', linkType: 'Asset' },
  { id: 'body', name: 'Body', type: 'RichText' },
]

async function setupContentType(cfg) {
  try {
    await getContentType(cfg)
    console.log(`Content type "${cfg.contentType}" already exists. Nothing changed.`)
    return
  } catch (error) {
    if (!(error instanceof CmaError) || error.status !== 404) throw error
  }

  const created = await cma('POST', '/content_types', {
    name: 'Blog Post',
    description: 'Essays rendered by the journal at /blog.',
    displayField: 'title',
    fields: CONTENT_TYPE_FIELDS,
  })

  await cma('PUT', `/content_types/${created.sys.id}/published`, undefined, {
    'X-Contentful-Version': String(created.sys.version),
  })

  console.log(`Created and published content type "${cfg.contentType}".`)
  console.log('Fields: ' + CONTENT_TYPE_FIELDS.map((field) => field.id).join(', '))
}

/* ------------------------------------------------------------------ */
/* Rebuild                                                            */
/* ------------------------------------------------------------------ */

async function triggerRebuild() {
  const hook = process.env.BLOG_REBUILD_WEBHOOK_URL?.trim()
  if (hook) {
    const response = await fetch(hook, { method: 'POST' })
    if (!response.ok) {
      console.warn(
        `\nPublished in Contentful, but the Netlify rebuild hook failed (${response.status}).` +
          '\nTrigger a deploy from Netlify → Deploys → Trigger deploy.'
      )
      return
    }
    console.log('\nNetlify rebuild triggered. The article appears when the deploy finishes.')
    return
  }

  const token = process.env.BLOG_REBUILD_TOKEN?.trim()
  const repo =
    process.env.BLOG_REBUILD_REPO?.trim() ||
    process.env.GITHUB_REPOSITORY?.trim() ||
    DEFAULT_REBUILD_REPO

  if (!token) {
    console.log(
      '\nThe entry is public in Contentful, but the static site has not rebuilt yet.'
    )
    console.log('Set BLOG_REBUILD_WEBHOOK_URL to a Netlify build hook, or trigger a')
    console.log('deploy from Netlify → Deploys → Trigger deploy.')
    return
  }

  const response = await fetch(`https://api.github.com/repos/${repo}/dispatches`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      event_type: 'contentful-publish',
      client_payload: { source: 'contentful-publish' },
    }),
  })

  if (!response.ok) {
    console.warn(
      `\nPublished in Contentful, but the rebuild dispatch failed (${response.status}).` +
        '\nRun the deploy workflow manually.'
    )
    return
  }

  console.log(`\nRebuild dispatched on ${repo}. The article appears after the workflow finishes.`)
}

/* ------------------------------------------------------------------ */
/* Main                                                               */
/* ------------------------------------------------------------------ */

function fail(message) {
  console.error(`\n✖ ${message}\n`)
  process.exit(1)
}

function readInput(file) {
  if (file === '-') {
    return readFile(0, 'utf8')
  }
  const resolved = path.resolve(file)
  if (!existsSync(resolved)) {
    fail(
      `Post file not found: ${resolved}\n` +
        'Copy contentful/post-template.json to contentful/post.json and edit it.'
    )
  }
  return readFile(resolved, 'utf8')
}

function validatePost(raw) {
  let parsed
  try {
    parsed = JSON.parse(raw)
  } catch (error) {
    fail(`The post file is not valid JSON: ${error.message}`)
  }

  const title = typeof parsed.title === 'string' ? parsed.title.trim() : ''
  const slug = typeof parsed.slug === 'string' ? parsed.slug.trim() : ''
  if (!title) fail('The post needs a "title".')
  if (!slug) fail('The post needs a "slug".')
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
    fail('The "slug" must be lowercase words separated by hyphens, e.g. "the-interface-is-a-promise".')
  }

  const body =
    parsed.body && typeof parsed.body === 'object'
      ? parsed.body
      : typeof parsed.body === 'string'
        ? markdownToRichText(parsed.body)
        : parsed.bodyRichText && typeof parsed.bodyRichText === 'object'
          ? parsed.bodyRichText
          : null

  const post = {
    title,
    slug,
    excerpt: typeof parsed.excerpt === 'string' ? parsed.excerpt.trim() : undefined,
    publishedAt: parsed.publishedAt ?? new Date().toISOString(),
    updatedAt: parsed.updatedAt,
    tags: asArray(parsed.tags),
    featured: parsed.featured === true,
    readingMinutes:
      typeof parsed.readingMinutes === 'number' ? parsed.readingMinutes : undefined,
    cover: typeof parsed.cover === 'string' ? parsed.cover.trim() : undefined,
    coverAlt: typeof parsed.coverAlt === 'string' ? parsed.coverAlt.trim() : undefined,
    coverAssetId:
      typeof parsed.coverAssetId === 'string' ? parsed.coverAssetId.trim() : undefined,
    body,
  }

  if (parsed.body === undefined && parsed.bodyRichText === undefined) {
    console.warn('  ! No "body"; the entry will publish without article text.')
  }
  if (!post.cover && !post.coverAssetId) {
    console.warn('  ! No "cover"; the journal card will use the generated placeholder.')
  }
  if (!post.tags.length) {
    console.warn('  ! No "tags"; the card and article metadata will have no label.')
  }

  return post
}

async function main() {
  const cfg = config()
  assertCredentials(cfg)

  if (hasFlag('--setup')) {
    await setupContentType(cfg)
    return
  }

  const file = flagValue('--file', 'contentful/post.json')
  const dryRun = hasFlag('--dry-run')
  const post = validatePost(readInput(file))
  const contentType = await ensureContentType(cfg)

  console.log(`Contentful space ${cfg.spaceId} · environment ${cfg.environment}`)
  console.log(`Content type ${cfg.contentType} · locale ${cfg.locale}`)
  console.log(`${dryRun ? 'Validating' : 'Publishing'} “${post.title}” (${post.slug})`)

  let coverAssetId = post.coverAssetId
  if (post.cover) {
    if (dryRun) {
      console.log(`  cover: ${post.cover} (would be uploaded and published)`)
    } else {
      console.log(`  uploading cover: ${post.cover}`)
      coverAssetId = await createAndPublishAsset({
        post,
        cfg,
        contentTypeTitle: post.title,
      })
      console.log(`  cover asset: ${coverAssetId}`)
    }
  }

  const result = await publishEntry({
    post,
    cfg,
    contentType,
    coverAssetId,
    dryRun,
  })

  if (result.dryRun) {
    console.log(`\nDry run complete. Would ${result.action} entry ${result.entryId}.`)
    console.log(JSON.stringify({ fields: result.fields }, null, 2))
    return
  }

  console.log(`\n✓ ${result.action === 'create' ? 'Created' : 'Updated'} and published entry ${result.entryId}`)
  console.log(`  ${SITE_URL}/blog/${post.slug}`)

  if (hasFlag('--no-rebuild')) {
    console.log('\nSkipped the rebuild trigger (--no-rebuild).')
    return
  }
  await triggerRebuild()
}

const isMain =
  process.argv[1] && path.resolve(process.argv[1]) === path.resolve(fileURLToPath(import.meta.url))

if (isMain) {
  main().catch((error) => {
    if (error instanceof CmaError) {
      fail(error.message)
    }
    fail(error instanceof Error ? error.stack || error.message : String(error))
  })
}
