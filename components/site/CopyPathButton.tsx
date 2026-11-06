'use client'

import { useState } from 'react'
import { Check, Copy } from 'lucide-react'

type CopyPathButtonProps = {
  value: string
  label?: string
}

export function CopyPathButton({ value, label = 'Copy path' }: CopyPathButtonProps) {
  const [copied, setCopied] = useState(false)

  async function copy() {
    try {
      await navigator.clipboard.writeText(value)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1800)
    } catch {
      setCopied(false)
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      className="inline-flex items-center gap-1.5 rounded-full border border-white/12 bg-white/[0.03] px-3 py-1.5 font-mono text-[0.58rem] uppercase tracking-[0.1em] text-white/45 transition-colors hover:border-white/25 hover:text-white"
      aria-label={`${label}: ${value}`}
    >
      {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
      {copied ? 'Copied' : label}
    </button>
  )
}
