'use client'

import { useState } from 'react'
import { Check, Link2, Share2 } from 'lucide-react'

type ShareRowProps = {
  url: string
  title: string
}

export function ShareRow({ url, title }: ShareRowProps) {
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2200)
    } catch {
      setCopied(false)
    }
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      <button
        type="button"
        onClick={copy}
        className="inline-flex items-center gap-1.5 border border-white/15 px-3 py-2 font-mono text-[0.58rem] uppercase tracking-[0.14em] text-white/55 transition-colors hover:border-[color:var(--acid)] hover:text-white"
      >
        {copied ? <Check className="h-3 w-3 text-[color:var(--acid)]" /> : <Link2 className="h-3 w-3" />}
        {copied ? 'Link copied' : 'Copy link'}
      </button>

      <a
        href={`https://x.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 border border-white/15 px-3 py-2 font-mono text-[0.58rem] uppercase tracking-[0.14em] text-white/55 transition-colors hover:border-white/35 hover:text-white"
      >
        <Share2 className="h-3 w-3" />
        Post on X
      </a>

      <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 border border-white/15 px-3 py-2 font-mono text-[0.58rem] uppercase tracking-[0.14em] text-white/55 transition-colors hover:border-white/35 hover:text-white"
      >
        LinkedIn
      </a>
    </div>
  )
}
