'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import {
  Check,
  Copy,
  Download,
  ImageDown,
  Loader2,
  Share2,
  Sparkles,
} from 'lucide-react'
import { services, site } from '@/lib/profile'
import {
  BRAND_CARD_FORMATS,
  brandCardFileName,
  buildBrandCardCaption,
  downloadBrandCardBlob,
  loadBrandCardImage,
  loadBrandCardQrImage,
  renderBrandCard,
  renderServiceQr,
  resolveBrandCardFonts,
  waitForBrandCardFonts,
  type BrandCardFormat,
} from '@/lib/brand-card'

export function BrandCardStudio() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const [serviceSlug, setServiceSlug] = useState<string>(services[0].slug)
  const [format, setFormat] = useState<BrandCardFormat>('square')
  const [reason, setReason] = useState('')
  const [qrDataUrl, setQrDataUrl] = useState('')
  const [brandImage, setBrandImage] = useState<HTMLImageElement | null>(null)
  const [copyState, setCopyState] = useState<'caption' | null>(null)
  const [note, setNote] = useState('')
  const [busy, setBusy] = useState(false)

  const serviceIndex = Math.max(
    0,
    services.findIndex((item) => item.slug === serviceSlug)
  )
  const service = services[serviceIndex] ?? services[0]
  const selectedFormat = BRAND_CARD_FORMATS[format]

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const requestedService = params.get('service')
    if (requestedService && services.some((item) => item.slug === requestedService)) {
      setServiceSlug(requestedService)
    }
    const requestedFormat = params.get('format')
    if (requestedFormat && requestedFormat in BRAND_CARD_FORMATS) {
      setFormat(requestedFormat as BrandCardFormat)
    }
  }, [])

  useEffect(() => {
    let cancelled = false
    loadBrandCardImage('/media/brand/mr-iridescent-mark.png').then((image) => {
      if (!cancelled) setBrandImage(image)
    })
    return () => {
      cancelled = true
    }
  }, [])

  useEffect(() => {
    let cancelled = false
    setQrDataUrl('')
    renderServiceQr(service)
      .then((dataUrl) => {
        if (!cancelled) setQrDataUrl(dataUrl)
      })
      .catch(() => {
        if (!cancelled) {
          setQrDataUrl('')
          setNote('The QR code could not be generated in this browser. The rest of the card still works.')
        }
      })
    return () => {
      cancelled = true
    }
  }, [service])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || !qrDataUrl) return

    let cancelled = false

    async function paint() {
      await waitForBrandCardFonts()
      if (cancelled) return

      const qr = await loadBrandCardQrImage(qrDataUrl)
      if (cancelled || !qr) return

      renderBrandCard(canvas as HTMLCanvasElement, {
        service,
        index: serviceIndex,
        format,
        reason,
        qr,
        brand: brandImage,
        fonts: resolveBrandCardFonts(),
      })
    }

    paint()
    return () => {
      cancelled = true
    }
  }, [service, serviceIndex, format, reason, qrDataUrl, brandImage])

  const caption = useMemo(
    () => buildBrandCardCaption(service, reason),
    [service, reason]
  )

  const copyText = useCallback(async (value: string) => {
    try {
      await navigator.clipboard.writeText(value)
      return true
    } catch {
      const area = document.createElement('textarea')
      area.value = value
      area.setAttribute('readonly', '')
      area.style.position = 'fixed'
      area.style.opacity = '0'
      document.body.appendChild(area)
      area.select()
      try {
        document.execCommand('copy')
        return true
      } finally {
        document.body.removeChild(area)
      }
    }
  }, [])

  async function copyCaption() {
    const copied = await copyText(caption)
    setNote(
      copied
        ? 'Caption copied. Paste it wherever the card is going.'
        : 'Your browser blocked the clipboard. Select the caption text and copy it manually.'
    )
    if (copied) {
      setCopyState('caption')
      window.setTimeout(() => setCopyState(null), 2200)
    }
  }

  function canvasBlob() {
    return new Promise<Blob | null>((resolve) => {
      const canvas = canvasRef.current
      if (!canvas) {
        resolve(null)
        return
      }
      canvas.toBlob((blob) => resolve(blob), 'image/png')
    })
  }

  async function downloadCard() {
    setBusy(true)
    try {
      const blob = await canvasBlob()
      if (!blob) {
        setNote('The card is still rendering. Try again in a moment.')
        return
      }
      downloadBrandCardBlob(blob, brandCardFileName(service, format))
      setNote(`${selectedFormat.label} card downloaded as a PNG.`)
    } finally {
      setBusy(false)
    }
  }

  async function shareCard() {
    setBusy(true)
    try {
      const blob = await canvasBlob()
      if (!blob) {
        setNote('The card is still rendering. Try again in a moment.')
        return
      }
      const file = new File([blob], brandCardFileName(service, format), {
        type: 'image/png',
      })
      const nav = navigator as Navigator & {
        canShare?: (data?: ShareData) => boolean
        share?: (data?: ShareData) => Promise<void>
      }
      const payload = {
        files: [file],
        title: `${service.name} — ${site.name}`,
        text: caption,
      } as unknown as ShareData

      if (typeof nav.share === 'function' && nav.canShare?.(payload)) {
        try {
          await nav.share(payload)
          setNote('Shared.')
        } catch {
          setNote('Share cancelled. You can download the card instead.')
        }
        return
      }

      downloadBrandCardBlob(blob, brandCardFileName(service, format))
      await copyText(caption)
      setNote(
        'This browser cannot share image files directly, so the card was downloaded and the caption copied.'
      )
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:gap-12">
      <div className="min-w-0 rounded-2xl border border-white/10 bg-ink-soft p-5 sm:p-7">
        <div className="flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-[#c9f24b]" />
          <p className="font-mono text-[0.58rem] uppercase tracking-[0.16em] text-white/40">
            Step 1 · choose the offer
          </p>
        </div>

        <div className="mt-4 grid gap-2 sm:grid-cols-2">
          {services.map((item, index) => {
            const active = item.slug === service.slug
            return (
              <button
                key={item.slug}
                type="button"
                data-card-service={item.slug}
                onClick={() => {
                  setServiceSlug(item.slug)
                  setNote('')
                }}
                aria-pressed={active}
                className={`rounded-xl border px-3.5 py-3 text-left transition-colors ${
                  active
                    ? 'border-[#c9f24b]/45 bg-[#c9f24b]/[0.07]'
                    : 'border-white/10 bg-white/[0.02] hover:border-white/25'
                }`}
              >
                <span className="flex items-start gap-2">
                  <span
                    className={`mt-0.5 font-mono text-[0.52rem] ${
                      active ? 'text-[#c9f24b]' : 'text-white/25'
                    }`}
                  >
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className="text-sm font-medium leading-snug text-white">
                    {item.name}
                  </span>
                </span>
              </button>
            )
          })}
        </div>

        <div className="mt-7">
          <p className="font-mono text-[0.58rem] uppercase tracking-[0.16em] text-white/40">
            Step 2 · pick the format
          </p>
          <div className="mt-3 grid grid-cols-1 gap-2 min-[360px]:grid-cols-3">
            {(Object.keys(BRAND_CARD_FORMATS) as BrandCardFormat[]).map((key) => {
              const item = BRAND_CARD_FORMATS[key]
              const active = key === format
              return (
                <button
                  key={key}
                  type="button"
                  data-card-format={key}
                  onClick={() => {
                    setFormat(key)
                    setNote('')
                  }}
                  aria-pressed={active}
                  className={`rounded-xl border px-3 py-3 text-left transition-colors ${
                    active
                      ? 'border-[#67e8f9]/45 bg-[#67e8f9]/[0.07]'
                      : 'border-white/10 bg-white/[0.02] hover:border-white/25'
                  }`}
                >
                  <span className="block text-sm font-medium text-white">
                    {item.label}
                  </span>
                  <span className="mt-0.5 block font-mono text-[0.5rem] uppercase tracking-[0.08em] text-white/35">
                    {item.note}
                  </span>
                </button>
              )
            })}
          </div>
        </div>

        <div className="mt-7">
          <div className="flex items-baseline justify-between gap-4">
            <label
              htmlFor="card-reason"
              className="font-mono text-[0.58rem] uppercase tracking-[0.16em] text-white/40"
            >
              Step 3 · add a reason
            </label>
            <span className="font-mono text-[0.55rem] text-white/30">
              {reason.length}/180
            </span>
          </div>
          <textarea
            id="card-reason"
            value={reason}
            onChange={(event) => {
              setReason(event.target.value)
              setNote('')
            }}
            maxLength={180}
            rows={3}
            placeholder="e.g. The clearest thinker I know on shipping complex products without losing the plot."
            className="mt-3 w-full resize-y rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm leading-relaxed text-white placeholder:text-white/25 focus:border-white/30 focus:outline-none"
          />
          <p className="mt-2 text-[0.68rem] leading-relaxed text-white/30">
            Optional. Appears on the card as “Why I am sharing this.” Leave it
            empty and the card carries the offer outcomes instead.
          </p>
        </div>

        <div className="mt-7">
          <p className="font-mono text-[0.58rem] uppercase tracking-[0.16em] text-white/40">
            Step 4 · take it with you
          </p>
          <div className="mt-3 flex flex-col gap-2 sm:flex-row">
            <button
              type="button"
              onClick={downloadCard}
              disabled={busy || !qrDataUrl}
              className="btn btn-primary flex-1 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {busy ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Download className="h-4 w-4" />
              )}
              Download PNG
            </button>
            <button
              type="button"
              onClick={shareCard}
              disabled={busy || !qrDataUrl}
              className="btn btn-ghost flex-1 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Share2 className="h-4 w-4" />
              Share image
            </button>
          </div>
          <button
            type="button"
            onClick={copyCaption}
            className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/10 px-4 py-3 text-sm text-white/60 transition-colors hover:border-white/30 hover:text-white"
          >
            {copyState === 'caption' ? (
              <Check className="h-4 w-4 text-emerald-300" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
            {copyState === 'caption' ? 'Caption copied' : 'Copy caption'}
          </button>
        </div>

        {note && (
          <p role="status" className="mt-4 text-xs leading-relaxed text-emerald-200/80">
            {note}
          </p>
        )}

        <div className="mt-5 rounded-xl border border-white/10 bg-white/[0.02] p-4">
          <p className="font-mono text-[0.55rem] uppercase tracking-[0.12em] text-white/30">
            Caption preview
          </p>
          <p className="mt-2 whitespace-pre-line break-words text-xs leading-relaxed text-white/50">
            {caption}
          </p>
        </div>
      </div>

      <aside className="min-w-0">
        <div className="lg:sticky lg:top-24">
          <div className="flex items-center justify-between gap-3 rounded-t-2xl border border-white/10 bg-white/[0.04] px-4 py-3">
            <div className="flex items-center gap-2">
              <ImageDown className="h-3.5 w-3.5 text-[#67e8f9]" />
              <p className="font-mono text-[0.55rem] uppercase tracking-[0.14em] text-white/45">
                Live preview
              </p>
            </div>
            <p className="font-mono text-[0.55rem] uppercase tracking-[0.1em] text-white/30">
              {selectedFormat.width} × {selectedFormat.height}
            </p>
          </div>
          <div className="rounded-b-2xl border border-t-0 border-white/10 bg-black/40 p-3 sm:p-4">
            <canvas
              ref={canvasRef}
              role="img"
              aria-label={`Shareable card for ${service.name}, ${selectedFormat.label} format`}
              className="block h-auto w-full rounded-lg bg-[#0b0d12]"
            />
          </div>
          <p className="mt-3 text-[0.68rem] leading-relaxed text-white/30">
            Every card carries the offer, {site.phone}, mriridescent.africa,
            “{site.motto}”, and a QR code that opens the matching service
            destination. The card stays phone-first; full contact details live on
            the site.
          </p>
        </div>
      </aside>
    </div>
  )
}
