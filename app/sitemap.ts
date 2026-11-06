import type { MetadataRoute } from 'next'
import { getPosts, postHref } from '@/lib/contentful'
import { site } from '@/lib/profile'
import { CONTENT_UPDATED } from '@/lib/seo-config'

/**
 * Generated at build time so Contentful posts enter the sitemap without a
 * manual edit. `output: 'export'` writes this to `out/sitemap.xml`, replacing
 * the old hand-maintained `public/sitemap.xml`.
 */

export const dynamic = 'force-static'

type Route = {
  path: string
  changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency']
  priority: number
}

const routes: Route[] = [
  { path: '/', changeFrequency: 'weekly', priority: 1 },
  { path: '/projects', changeFrequency: 'weekly', priority: 0.9 },
  { path: '/case-studies', changeFrequency: 'monthly', priority: 0.9 },
  { path: '/about', changeFrequency: 'monthly', priority: 0.9 },
  { path: '/growth', changeFrequency: 'monthly', priority: 0.9 },
  { path: '/services', changeFrequency: 'monthly', priority: 0.9 },
  { path: '/services/fractional-cto', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/credentials', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/credentials/cisco', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/credentials/training', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/credentials/education', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/manifesto', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/advocacy', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/blog', changeFrequency: 'weekly', priority: 0.8 },
  { path: '/resume', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/contact', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/statistics', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/emerging-tech', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/philosophy', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/global', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/faq', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/share', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/qr', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/media', changeFrequency: 'monthly', priority: 0.5 },
  { path: '/quotes', changeFrequency: 'monthly', priority: 0.5 },
]

function absolute(path: string) {
  return new URL(path, site.url).toString()
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getPosts()

  const pages: MetadataRoute.Sitemap = routes.map((route) => ({
    url: absolute(route.path),
    lastModified: new Date(CONTENT_UPDATED),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }))

  const articles: MetadataRoute.Sitemap = posts.map((post) => ({
    url: absolute(postHref(post.slug)),
    lastModified: new Date(post.updatedAt || post.publishedAt),
    changeFrequency: 'yearly',
    priority: 0.6,
  }))

  return [...pages, ...articles]
}
