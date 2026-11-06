'use client'

import { useEffect, useMemo, useState } from 'react'
import Image from 'next/image'
import {
  ArrowUpRight,
  Check,
  Copy,
  Link2,
  Share2,
  Sparkles,
} from 'lucide-react'
import {
  channelShareUrl,
  shareChannels,
  shareIntent,
  shareIntents,
  trackedShareUrl,
} from '@/lib/share'
import { site } from '@/lib/profile'

type CopyState = 'message' | 'link' | null

export function ShareKit() {
  const [intentSlug, setIntentSlug] = useState('general')
  const [message, setMessage] = useState(shareIntents[5].template)
  const [copyState, setCopyState] = useState<CopyState>(null)
  const [shareNote, setShareNote] = useState('')

  const intent = useMemo(
    () => shareIntent(intentSlug) ?? shareIntents[5],
    [intentSlug]
  )
  const link = useMemo(() => trackedShareUrl(intent.slug, 'copy'), [intent.slug])

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const requested = params.get('via') ?? params.get('intent')
    const match = shareIntent(requested)
    if (match) {
      setIntentSlug(match.slug)
      setMessage(match.template)
    }
  }, [])

  function chooseIntent(slug: string) {
    const next = shareIntent(slug)
    if (!next) return
    setIntentSlug(next.slug)
    setMessage(next.template)
    setShareNote('')
  }

  async function copy(value: string, kind: Exclude<CopyState, null>) {
    try {
      await navigator.clipboard.writeText(value)
      setCopyState(kind)
      window.setTimeout(() => setCopyState(null), 2200)
      return
    } catch {
      // Fall through to a manual selection fallback.
    }
    const area = document.createElement('textarea')
    area.value = value
    area.setAttribute('readonly', '')
    area.style.position = 'fixed'
    area.style.opacity = '0'
    document.body.appendChild(area)
    area.select()
    try {
      document.execCommand('copy')
      setCopyState(kind)
      window.setTimeout(() => setCopyState(null), 2200)
    } finally {
      document.body.removeChild(area)
    }
  }

  async function shareNative() {
    const url = trackedShareUrl(intent.slug, 'webshare')
    const payload = {
      title: `${site.name} — ${site.role}`,
      text: message,
      url,
    }

    if (navigator.share) {
      try {
        await navigator.share(payload)
        setShareNote('Shared.')
        return
      } catch {
        setShareNote('Share cancelled. You can copy the message instead.')
        return
      }
    }

    await copy(`${message}\n\n${url}`, 'message')
    setShareNote('Your device has no share sheet, so the message and link were copied.')
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:gap-12">
      <div className="min-w-0 rounded-2xl border border-white/10 bg-ink-soft p-5 sm:p-7">
        <div className="flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-[#67e8f9]" />
          <p className="font-mono text-[0.58rem] uppercase tracking-[0.16em] text-white/40">
            Step 1 · choose the intent
          </p>
        </div>

        <div className="mt-4 grid gap-2 sm:grid-cols-2">
          {shareIntents.map((item) => {
            const active = item.slug === intent.slug
            return (
              <button
                key={item.slug}
                type="button"
                onClick={() => chooseIntent(item.slug)}
                aria-pressed={active}
                className={`rounded-xl border px-3.5 py-3 text-left transition-colors ${
                  active
                    ? 'border-[#67e8f9]/40 bg-[#67e8f9]/[0.08]'
                    : 'border-white/10 bg-white/[0.02] hover:border-white/25'
                }`}
              >
                <span className="block text-sm font-medium text-white">
                  {item.label}
                </span>
                <span className="mt-0.5 block font-mono text-[0.52rem] uppercase tracking-[0.1em] text-white/35">
                  {item.eyebrow}
                </span>
              </button>
            )
          })}
        </div>

        <div className="mt-7 flex items-center gap-2">
          <p className="font-mono text-[0.58rem] uppercase tracking-[0.16em] text-white/40">
            Step 2 · make it yours
          </p>
        </div>

        <label htmlFor="share-message" className="sr-only">
          Share message
        </label>
        <textarea
          id="share-message"
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          rows={7}
          className="mt-3 w-full resize-y rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm leading-relaxed text-white focus:border-white/30 focus:outline-none"
        />
        <p className="mt-2 text-[0.68rem] leading-relaxed text-white/30">
          Written for: {intent.audience}. Edit it so it sounds like you — the
          template is a starting point, not a script.
        </p>

        <div className="mt-6 flex items-center gap-2">
          <p className="font-mono text-[0.58rem] uppercase tracking-[0.16em] text-white/40">
            Step 3 · share
          </p>
        </div>

        <div className="mt-3 flex flex-col gap-2 sm:flex-row">
          <button type="button" onClick={shareNative} className="btn btn-primary flex-1">
            <Share2 className="h-4 w-4" />
            Share via device
          </button>
          <button
            type="button"
            onClick={() => copy(`${message}\n\n${link}`, 'message')}
            className="btn btn-ghost flex-1"
          >
            {copyState === 'message' ? (
              <Check className="h-4 w-4 text-emerald-300" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
            {copyState === 'message' ? 'Copied' : 'Copy message + link'}
          </button>
        </div>

        <div className="mt-4 flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.02] p-2 pl-3">
          <Link2 className="h-3.5 w-3.5 shrink-0 text-white/30" />
          <span className="min-w-0 flex-1 truncate font-mono text-[0.62rem] text-white/45">
            {link}
          </span>
          <button
            type="button"
            onClick={() => copy(link, 'link')}
            className="inline-flex shrink-0 items-center gap-1 rounded-lg border border-white/10 px-2.5 py-1.5 text-[0.62rem] text-white/55 transition-colors hover:border-white/30 hover:text-white"
          >
            {copyState === 'link' ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
            {copyState === 'link' ? 'Copied' : 'Copy'}
          </button>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-2 sm:grid-cols-5">
          {shareChannels.map((channel) => (
            <a
              key={channel.slug}
              href={channelShareUrl(
                channel.slug,
                trackedShareUrl(intent.slug, channel.slug),
                message
              )}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center justify-center rounded-xl border border-white/10 px-3 py-2.5 text-xs font-medium text-white/55 transition-colors ${channel.className}`}
            >
              {channel.label}
            </a>
          ))}
        </div>

        {shareNote && (
          <p role="status" className="mt-4 text-xs text-emerald-200/80">
            {shareNote}
          </p>
        )}
      </div>

      <aside className="min-w-0 space-y-4">
        <div className="overflow-hidden rounded-2xl border border-white/12 bg-[#f7f5ef]">
          <div className="flex items-center gap-3 border-b border-black/10 p-4">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white ring-1 ring-black/10">
              <Image
                src="/media/brand/mr-iridescent-mark.png"
                alt=""
                width={512}
                height={512}
                className="h-full w-full object-contain"
              />
            </span>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-[#15161a]">
                {site.name}
              </p>
              <p className="truncate font-mono text-[0.55rem] uppercase tracking-[0.1em] text-[#15161a]/45">
                {site.role} · {site.alias}
              </p>
            </div>
          </div>
          <div className="p-5">
            <p className="text-sm leading-relaxed text-[#15161a]/80">{message}</p>
            <p className="mt-4 break-all font-mono text-[0.58rem] text-[#0e7490]">
              {link}
            </p>
            <div className="mt-4 flex flex-wrap gap-1.5">
              <span className="rounded-full bg-[#15161a]/[0.06] px-2.5 py-1 font-mono text-[0.52rem] uppercase tracking-[0.08em] text-[#15161a]/55">
                via {intent.slug}
              </span>
              <span className="rounded-full bg-[#15161a]/[0.06] px-2.5 py-1 font-mono text-[0.52rem] uppercase tracking-[0.08em] text-[#15161a]/55">
                Lagos · worldwide
              </span>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-ink-soft p-5">
          <p className="font-mono text-[0.58rem] uppercase tracking-[0.16em] text-white/35">
            What happens next
          </p>
          <p className="mt-3 text-sm leading-relaxed text-white/55">
            The link carries the intent in <code className="text-white/75">?via={intent.slug}</code>.
            When someone opens it, the site acknowledges what they were sent for
            and points them to {intent.ctaLabel.toLowerCase()}.
          </p>
          <a
            href={`${intent.ctaHref}?via=${intent.slug}`}
            className="mt-4 inline-flex items-center gap-1.5 text-xs font-medium text-[#67e8f9] hover:text-white"
          >
            Preview that experience
            <ArrowUpRight className="h-3 w-3" />
          </a>
        </div>

        <div className="rounded-2xl border border-white/10 bg-ink-soft p-5">
          <p className="font-mono text-[0.58rem] uppercase tracking-[0.16em] text-white/35">
            A useful ask
          </p>
          <p className="mt-3 text-sm leading-relaxed text-white/55">
            The most effective share is specific: name the role, the problem, or
            the person you think should see it. A short personal note beats a
            broadcast every time.
          </p>
        </div>
      </aside>
    </div>
  )
}
