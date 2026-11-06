import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowUpRight, PenLine } from 'lucide-react'
import { SplitLines } from '@/components/kinetic/SplitLines'
import { formatPostDateShort, getPosts } from '@/lib/contentful'
import { generateMetaTags, pageMetadata } from '@/lib/seo-config'

const baseMeta = generateMetaTags(
  pageMetadata.writings.title,
  pageMetadata.writings.description,
  ['software essays', 'systems thinking', 'polymath', 'security design', 'AI engineering'],
  '/writings'
)

export const metadata: Metadata = {
  ...baseMeta,
  alternates: { canonical: '/blog' },
  robots: { index: false, follow: true },
}

export default async function WritingsPage() {
  const posts = await getPosts()

  return (
    <section className="aurora grain relative overflow-hidden pb-24 pt-32 sm:pt-36 lg:pt-40">
      <div className="shell relative grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
        <div>
          <p className="k-mono flex items-center gap-2 text-white/45">
            <PenLine className="h-3.5 w-3.5" />
            Writing
          </p>
          <h1 className="mt-8">
            <SplitLines
              lines={[
                'The journal',
                <span key="moved">
                  has <span className="k-outline">moved</span>.
                </span>,
              ]}
              lineClassName="k-title block text-[clamp(3rem,8vw,7rem)] text-white"
            />
          </h1>
          <p className="mt-8 max-w-xl text-base leading-relaxed text-white/55">
            These notes now live in a dedicated journal with topics, search, and
            proper article pages. The old anchors are gone; the thinking is not.
          </p>
          <Link href="/blog" className="k-btn k-btn-acid mt-8">
            Read the journal
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        <nav aria-label="Latest journal entries" className="border-t border-white/10">
          <p className="k-mono py-4 text-white/35">Latest entries</p>
          <ol>
            {posts.map((post) => (
              <li key={post.slug} className="border-t border-white/10">
                <Link
                  href={`/blog/${post.slug}`}
                  className="group flex items-baseline gap-4 py-5 transition-colors"
                >
                  <span className="font-mono text-[0.58rem] uppercase tracking-[0.12em] text-white/25">
                    {formatPostDateShort(post.publishedAt)}
                  </span>
                  <span className="flex-1 text-sm font-medium text-white/70 group-hover:text-white">
                    {post.title}
                  </span>
                  <ArrowUpRight className="h-3.5 w-3.5 shrink-0 text-white/20 group-hover:text-[color:var(--acid)]" />
                </Link>
              </li>
            ))}
          </ol>
        </nav>
      </div>
    </section>
  )
}
