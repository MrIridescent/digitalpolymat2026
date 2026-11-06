import Link from 'next/link'
import { ArrowDownRight, ArrowUpRight, PenLine } from 'lucide-react'
import { JournalIndex } from '@/components/blog/JournalIndex'
import { PostCover } from '@/components/blog/PostCover'
import { Marquee } from '@/components/kinetic/Marquee'
import { SplitLines } from '@/components/kinetic/SplitLines'
import { formatPostDateShort, getPosts } from '@/lib/contentful'
import { generateMetaTags, pageMetadata } from '@/lib/seo-config'

export const metadata = generateMetaTags(
  pageMetadata.blog.title,
  pageMetadata.blog.description,
  ['journal', 'software essays', 'systems thinking', 'building in public', 'AI notes'],
  '/blog'
)

export default async function BlogPage() {
  const posts = await getPosts()
  const featured = posts.find((post) => post.featured) ?? posts[0]
  const topics = Array.from(new Set(posts.flatMap((post) => post.tags))).slice(0, 10)
  const latest = posts[0]?.publishedAt

  return (
    <>
      <section className="aurora grain relative overflow-hidden border-b border-white/10 pb-14 pt-32 sm:pt-36 lg:pt-40">
        <div className="orb -right-24 top-24 h-72 w-72 opacity-25" aria-hidden="true" />
        <div className="shell-wide relative">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="k-mono flex items-center gap-2 text-white/45">
              <span className="k-dot-live" aria-hidden="true" />
              Journal · field notes
            </p>
            <p className="k-mono text-white/30">Lagos · {formatPostDateShort(latest ?? new Date().toISOString())}</p>
          </div>

          <h1 className="mt-10">
            <SplitLines
              lines={[
                'Notes from',
                <span key="work">
                  the <span className="k-outline">work</span>
                  <span className="k-acid">.</span>
                </span>,
              ]}
              delay={140}
              stagger={110}
              lineClassName="k-title block text-[clamp(3.4rem,11vw,9.5rem)] text-white"
            />
          </h1>

          <div className="mt-10 grid gap-8 border-t border-white/10 pt-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
            <p className="max-w-2xl text-base leading-relaxed text-white/55 sm:text-lg">
              Long-form thinking on software, systems, security, AI, and the
              polymathic life. Written while doing the work, revised when the
              work disagrees with me. No content calendar, no hot takes.
            </p>
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div>
                <p className="k-oversize-num">{String(posts.length).padStart(2, '0')}</p>
                <p className="k-mono mt-3 text-white/35">Essays published</p>
              </div>
              <div className="max-w-[15rem]">
                <p className="k-mono text-white/35">Written by</p>
                <p className="mt-2 text-sm text-white/70">David Akpoviroro Oke</p>
                <p className="mt-0.5 text-xs text-white/35">Mr Iridescent · Lagos</p>
              </div>
            </div>
          </div>
        </div>

        <div className="relative mt-12 border-y border-white/10 py-4">
          <Marquee label="Journal topics" speed="slow" separator={<span className="mx-5 text-[color:var(--acid)]">/</span>}>
            {topics.map((topic) => (
              <span key={topic} className="k-serif text-xl text-white/50 sm:text-2xl">
                {topic}
              </span>
            ))}
          </Marquee>
        </div>
      </section>

      {featured ? (
        <section className="section-tight">
          <div className="shell-wide">
            <div className="flex items-center justify-between gap-4">
              <p className="k-index">
                <strong>01</strong>
                <span>Featured entry</span>
              </p>
              <span className="k-mono text-white/30">{featured.readingMinutes} min read</span>
            </div>

            <Link
              href={`/blog/${featured.slug}`}
              className="group mt-6 grid overflow-hidden border border-white/10 bg-ink-soft transition-colors hover:border-[color:var(--acid)] lg:grid-cols-[1.08fr_0.92fr]"
            >
              <PostCover
                post={featured}
                index={0}
                priority
                showTitle={false}
                className="min-h-[16rem] aspect-[16/10] lg:aspect-auto lg:h-full"
              />
              <div className="flex flex-col justify-between gap-8 p-6 sm:p-9 lg:p-12">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    {featured.tags.map((tag) => (
                      <span
                        key={tag}
                        className="border border-white/15 px-2.5 py-1 font-mono text-[0.55rem] uppercase tracking-[0.14em] text-white/45"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h2 className="k-serif mt-6 max-w-[18ch] text-[clamp(2rem,4vw,3.4rem)] leading-[0.98] text-white transition-colors group-hover:text-[color:var(--acid)]">
                    {featured.title}
                  </h2>
                  <p className="mt-5 max-w-lg text-sm leading-relaxed text-white/50 sm:text-base">
                    {featured.excerpt}
                  </p>
                </div>
                <div className="flex items-end justify-between gap-4 border-t border-white/10 pt-5">
                  <div className="font-mono text-[0.58rem] uppercase tracking-[0.14em] text-white/35">
                    <time dateTime={featured.publishedAt}>{formatPostDateShort(featured.publishedAt)}</time>
                    <span className="mx-2 text-white/20">·</span>
                    {featured.source === 'contentful' ? 'Contentful' : 'Local archive'}
                  </div>
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-white/60 transition-colors group-hover:border-[color:var(--acid)] group-hover:bg-[color:var(--acid)] group-hover:text-[color:var(--acid-ink)]">
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                </div>
              </div>
            </Link>
          </div>
        </section>
      ) : null}

      <section className="section border-t border-white/10">
        <div className="shell-wide">
          <div className="k-section-head">
            <div>
              <p className="k-index">
                <strong>02</strong>
                <span>The index</span>
              </p>
              <h2 className="k-section-title mt-5 text-white">
                Every note, <span className="k-serif italic text-white/40">filed.</span>
              </h2>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-white/40">
              Filter by topic or search the archive. Each entry is a working
              argument, not a finished sermon.
            </p>
          </div>

          <div className="mt-10">
            <JournalIndex posts={posts} />
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden border-t border-white/10 bg-ink-soft/50">
        <div className="shell relative py-20 text-center sm:py-24">
          <PenLine className="mx-auto h-5 w-5 text-[color:var(--acid)]" aria-hidden="true" />
          <h2 className="k-serif mx-auto mt-6 max-w-3xl text-[clamp(2.2rem,5vw,4rem)] text-white">
            Disagree with something?{' '}
            <span className="italic text-white/40">Good.</span>
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-white/45">
            These notes get better when someone pushes back on them. If a claim
            here does not survive your experience, tell me why.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link href="/contact" className="k-btn k-btn-acid">
              Start a conversation
              <ArrowUpRight className="h-4 w-4" />
            </Link>
            <Link href="/projects" className="k-btn">
              See the work
              <ArrowDownRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
