import Image from 'next/image'
import type { BlogPost } from '@/lib/contentful'

type PostCoverProps = {
  post: BlogPost
  index?: number
  className?: string
  priority?: boolean
  showTitle?: boolean
}

export function PostCover({
  post,
  index,
  className = 'aspect-[16/10]',
  priority = false,
  showTitle = true,
}: PostCoverProps) {
  const numeral = String((index ?? 0) + 1).padStart(2, '0')

  return (
    <div className={`k-cover ${className}`}>
      {post.cover ? (
        <>
          <Image
            src={post.cover.url}
            alt={post.cover.title}
            fill
            priority={priority}
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 60vw, 760px"
            className="object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
            style={post.cover.position ? { objectPosition: post.cover.position } : undefined}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/10 to-transparent" />
        </>
      ) : (
        <>
          <div className="k-cover-grid" aria-hidden="true" />
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(150deg, rgba(8,9,12,0.18), rgba(8,9,12,0.72) 74%)',
            }}
            aria-hidden="true"
          />
        </>
      )}

      {!showTitle ? (
        <div className="pointer-events-none absolute inset-0 z-[1] flex items-center justify-center overflow-hidden" aria-hidden="true">
          <span className="k-display -rotate-6 whitespace-nowrap text-[clamp(3.2rem,9vw,6.5rem)] text-white/10">
            {post.tags[0] ?? 'Journal'}
          </span>
        </div>
      ) : null}

      <div className="relative z-10 flex h-full flex-col justify-between p-5 sm:p-6">
        <div className="flex items-start justify-between gap-4">
          <span className="font-mono text-[0.58rem] uppercase tracking-[0.18em] text-white/55">
            {post.tags[0] ?? 'Journal'}
          </span>
          <span className="k-oversize-num !text-[clamp(2.6rem,6vw,4.2rem)] !leading-none text-white/20">
            {numeral}
          </span>
        </div>

        {showTitle ? (
          <div>
            <p className="font-mono text-[0.56rem] uppercase tracking-[0.18em] text-white/45">
              {post.readingMinutes} min read
            </p>
            <p className="k-display mt-2 max-w-[24ch] text-[clamp(1.35rem,2.6vw,2rem)] leading-[1.02] text-white">
              {post.title}
            </p>
          </div>
        ) : null}
      </div>
    </div>
  )
}
