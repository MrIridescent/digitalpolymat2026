import { quotes, type Quote } from './quotes'

export type QuoteSlot = {
  quote: Quote
  index: number
}

export type QuotePassageSelection = QuoteSlot & {
  /** Up to four neighbouring voices from the same category, for the ticker. */
  related: QuoteSlot[]
}

/**
 * Which part of the library belongs to which page. The first matching prefix
 * wins; `/` is the fallback and must stay last.
 */
const ROUTE_CATEGORIES: Array<{ prefix: string; category: string }> = [
  { prefix: '/manifesto', category: 'First Principles' },
  { prefix: '/philosophy', category: 'Wisdom' },
  { prefix: '/growth', category: 'Business' },
  { prefix: '/services', category: 'Business' },
  { prefix: '/case-studies', category: 'Business' },
  { prefix: '/projects', category: 'Computing' },
  { prefix: '/emerging-tech', category: 'Innovation' },
  { prefix: '/advocacy', category: 'Pan-African' },
  { prefix: '/blog', category: 'Learning' },
  { prefix: '/writings', category: 'Creativity' },
  { prefix: '/media', category: 'Cinematography' },
  { prefix: '/credentials', category: 'Learning' },
  { prefix: '/statistics', category: 'Science' },
  { prefix: '/contact', category: 'Vision' },
  { prefix: '/resume', category: 'Learning' },
  { prefix: '/share', category: 'Creativity' },
  { prefix: '/qr', category: 'Innovation' },
  { prefix: '/about', category: 'Renaissance' },
  { prefix: '/', category: 'Vision' },
]

/** The library page is already the quote experience; no passage above it. */
const HIDDEN_PATHS = new Set(['/quotes'])

function normalisePath(pathname: string) {
  const path = pathname.replace(/\/+$/, '')
  return path || '/'
}

/** FNV-1a: small, stable, and safe to run during prerender and hydration. */
function hashPath(value: string) {
  let hash = 2166136261
  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index)
    hash = Math.imul(hash, 16777619)
  }
  return hash >>> 0
}

export function quoteCategoryForPath(pathname: string): string | null {
  const path = normalisePath(pathname)
  if (HIDDEN_PATHS.has(path) || path.startsWith('/quotes/')) return null

  const rule = ROUTE_CATEGORIES.find(
    ({ prefix }) => prefix === '/' || path === prefix || path.startsWith(`${prefix}/`)
  )
  return rule?.category ?? null
}

/**
 * Deterministically choose a quote for a path. The same URL always gets the
 * same line, so the server-rendered HTML and the hydrated page agree; different
 * URLs (including individual journal slugs) draw different lines.
 */
export function quoteForPath(pathname: string): QuotePassageSelection | null {
  const category = quoteCategoryForPath(pathname)
  if (!category) return null

  const pool: QuoteSlot[] = quotes.flatMap((quote, index) =>
    quote.category === category ? [{ quote, index }] : []
  )
  if (!pool.length) return null

  const start = hashPath(normalisePath(pathname)) % pool.length
  const primary = pool[start]
  const related = Array.from(
    { length: Math.min(4, pool.length - 1) },
    (_, offset) => pool[(start + offset + 1) % pool.length]
  )

  return { ...primary, related }
}
