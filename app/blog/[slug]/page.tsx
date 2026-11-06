import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, ArrowUpRight } from 'lucide-react'
import { PostCover } from '@/components/blog/PostCover'
import { RichText } from '@/components/blog/RichText'
import { ShareRow } from '@/components/blog/ShareRow'
import {
  formatPostDate,
  formatPostDateShort,
  getPostBySlug,
  getPosts,
  richTextToPlainText,
  slugifyHeading,
  type RichTextNode,
} from '@/lib/contentful'
import { site } from '@/lib/profile'
import { generateMetaTags } from '@/lib/seo-config'

type PageProps = {
  params: Promise<{ slug: string }>
}

export const dynamicParams = false

export async function generateStaticParams() {
  const posts = await getPosts()
  return posts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  if (!post) return generateMetaTags('Journal', undefined, undefined, '/blog')

  const base = generateMetaTags(
    post.title,
    post.excerpt,
    post.tags,
    `/blog/${post.slug}`
  )

  return {
    ...base,
    openGraph: {
      ...base.openGraph,
      type: 'article',
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      tags: post.tags,
      images: [
        post.cover
          ? {
              url: absoluteUrl(post.cover.url),
              width: post.cover.width,
              height: post.cover.height,
              alt: post.cover.title,
            }
          : { url: `${site.url}/media/brand/og-card.jpg`, width: 1200, height: 630, alt: post.title },
      ],
    },
  }
}

/** Social crawlers need absolute URLs; local covers are served from this site. */
function absoluteUrl(value: string) {
  if (/^https?:\/\//i.test(value)) return value
  return `${site.url}${value.startsWith('/') ? '' : '/'}${value}`
}

function sectionHeadings(body: RichTextNode | null) {
  if (!body?.content) return []
  return body.content
    .filter((node) => node.nodeType === 'heading-2')
    .map((node) => {
      const label = richTextToPlainText(node)
      return { label, id: slugifyHeading(label) }
    })
    .filter((section) => section.label)
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params
  const posts = await getPosts()
  const post = posts.find((candidate) => candidate.slug === slug)

  if (!post) notFound()

  const index = posts.findIndex((candidate) => candidate.slug === slug)
  const previous = posts[index + 1]
  const next = posts[index - 1]
  const sections = sectionHeadings(post.body)
  const articleUrl = `${site.url}/blog/${post.slug}`

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': `${articleUrl}#article`,
    headline: post.title,
    description: post.excerpt,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt ?? post.publishedAt,
    keywords: post.tags.join(', '),
    articleSection: post.tags[0],
    inLanguage: 'en',
    url: articleUrl,
    mainEntityOfPage: { '@type': 'WebPage', '@id': articleUrl },
    isPartOf: {
      '@type': 'Blog',
      '@id': `${site.url}/blog#blog`,
      name: 'The Journal',
      url: `${site.url}/blog`,
    },
    image: post.cover
      ? [absoluteUrl(post.cover.url)]
      : [`${site.url}/media/brand/og-card.jpg`],
    author: {
      '@type': 'Person',
      '@id': `${site.url}/#person`,
      name: site.name,
      alternateName: site.alias,
      url: site.url,
    },
    publisher: {
      '@type': 'Organization',
      '@id': `${site.url}/#organization`,
      name: 'Iridescent Internet Solutions Limited',
      logo: {
        '@type': 'ImageObject',
        url: `${site.url}/media/brand/mr-iridescent-mark.png`,
      },
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article className="relative overflow-hidden pt-28 sm:pt-32">
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-[28rem] opacity-60"
          style={{
            background:
              'radial-gradient(40% 38% at 18% 22%, rgba(139, 92, 246, 0.18), transparent 70%), radial-gradient(35% 40% at 78% 18%, rgba(6, 182, 212, 0.14), transparent 70%)',
          }}
          aria-hidden="true"
        />

        <header className="shell relative">
          <Link
            href="/blog"
            className="k-mono inline-flex items-center gap-2 text-white/40 transition-colors hover:text-white"
          >
            <ArrowLeft className="h-3 w-3" />
            The journal
          </Link>

          <div className="mt-8 flex flex-wrap items-center gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="border border-white/15 px-2.5 py-1 font-mono text-[0.55rem] uppercase tracking-[0.14em] text-white/45"
              >
                {tag}
              </span>
            ))}
          </div>

          <h1 className="k-serif mt-6 max-w-[22ch] text-[clamp(2.6rem,6.4vw,5.6rem)] leading-[0.96] text-white">
            {post.title}
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/55 sm:text-lg">
            {post.excerpt}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 border-y border-white/10 py-4 font-mono text-[0.58rem] uppercase tracking-[0.14em] text-white/35">
            <span>Written by David Akpoviroro Oke</span>
            <time dateTime={post.publishedAt}>{formatPostDate(post.publishedAt)}</time>
            <span>{post.readingMinutes} min read</span>
            <span className="text-[color:var(--acid)]">
              {post.source === 'contentful' ? 'Contentful' : 'Local archive'}
            </span>
          </div>
        </header>

        <div className="shell mt-10">
          <PostCover
            post={post}
            index={index}
            priority
            showTitle={false}
            className="aspect-[16/8] border border-white/10 sm:aspect-[21/8]"
          />
        </div>

        <div className="shell mt-14 grid gap-12 pb-20 lg:grid-cols-[minmax(0,1fr)_14rem] lg:gap-16">
          <div className="min-w-0 max-w-[72ch]">
            {post.body ? (
              <RichText document={post.body} />
            ) : (
              <p className="text-white/60">This entry has no body yet.</p>
            )}

            <div className="mt-14 border-t border-white/10 pt-8">
              <p className="k-mono text-white/35">Filed under</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <Link
                    key={tag}
                    href="/blog"
                    className="border border-white/15 px-3 py-1.5 font-mono text-[0.58rem] uppercase tracking-[0.14em] text-white/50 transition-colors hover:border-[color:var(--acid)] hover:text-white"
                  >
                    {tag}
                  </Link>
                ))}
              </div>
            </div>

            <div className="mt-8 border border-white/10 bg-ink-soft/60 p-5 sm:p-6">
              <p className="k-mono text-white/35">Share this note</p>
              <div className="mt-4">
                <ShareRow url={articleUrl} title={post.title} />
              </div>
            </div>
          </div>

          <aside>
            <div className="lg:sticky lg:top-28">
              <p className="k-mono text-white/35">On this page</p>
              {sections.length > 0 ? (
                <nav aria-label="Article sections" className="mt-4 border-t border-white/10">
                  <ol>
                    {sections.map((section, sectionIndex) => (
                      <li key={section.id} className="border-b border-white/10">
                        <a
                          href={`#${section.id}`}
                          className="group flex items-baseline gap-3 py-3 text-xs leading-snug text-white/50 transition-colors hover:text-white"
                        >
                          <span className="font-mono text-[0.55rem] text-white/25">
                            {String(sectionIndex + 1).padStart(2, '0')}
                          </span>
                          {section.label}
                        </a>
                      </li>
                    ))}
                  </ol>
                </nav>
              ) : (
                <p className="mt-4 text-xs leading-relaxed text-white/35">
                  A short note, best read in one sitting.
                </p>
              )}

              <div className="mt-8 border border-white/10 p-4">
                <p className="text-sm font-medium text-white/80">David Akpoviroro Oke</p>
                <p className="mt-1 font-mono text-[0.55rem] uppercase tracking-[0.14em] text-white/35">
                  Digital product delivery architect
                </p>
                <Link href="/contact" className="k-link mt-4 inline-flex text-xs text-white/55">
                  Work with me
                </Link>
              </div>

              <div className="mt-8">
                <ShareRow url={articleUrl} title={post.title} />
              </div>
            </div>
          </aside>
        </div>
      </article>

      <nav aria-label="More journal entries" className="border-t border-white/10 bg-ink-soft/40">
        <div className="shell grid gap-px sm:grid-cols-2">
          {previous ? (
            <Link
              href={`/blog/${previous.slug}`}
              className="group border-b border-white/10 py-10 pr-6 sm:border-b-0 sm:border-r"
            >
              <p className="k-mono flex items-center gap-2 text-white/35">
                <ArrowLeft className="h-3 w-3 transition-transform group-hover:-translate-x-1" />
                Previous
              </p>
              <p className="k-serif mt-3 text-2xl text-white transition-colors group-hover:text-[color:var(--acid)]">
                {previous.title}
              </p>
              <p className="mt-2 font-mono text-[0.55rem] uppercase tracking-[0.14em] text-white/30">
                {formatPostDateShort(previous.publishedAt)}
              </p>
            </Link>
          ) : (
            <div className="hidden sm:block" />
          )}

          {next ? (
            <Link href={`/blog/${next.slug}`} className="group py-10 sm:pl-6 sm:text-right">
              <p className="k-mono flex items-center gap-2 text-white/35 sm:justify-end">
                Next
                <ArrowUpRight className="h-3 w-3 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </p>
              <p className="k-serif mt-3 text-2xl text-white transition-colors group-hover:text-[color:var(--acid)]">
                {next.title}
              </p>
              <p className="mt-2 font-mono text-[0.55rem] uppercase tracking-[0.14em] text-white/30">
                {formatPostDateShort(next.publishedAt)}
              </p>
            </Link>
          ) : null}
        </div>
      </nav>
    </>
  )
}
