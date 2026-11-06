'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { ArrowUpRight, Check, Download, Loader2, SlidersHorizontal } from 'lucide-react'
import { services, site, type Service } from '@/lib/profile'
import {
  BRAND_CARD_FORMATS,
  brandCardFileName,
  downloadBrandCardBlob,
  loadBrandCardImage,
  loadBrandCardQrImage,
  renderBrandCard,
  renderServiceQr,
  resolveBrandCardFonts,
  waitForBrandCardFonts,
} from '@/lib/brand-card'

type KitCardProps = {
  service: Service
  index: number
  brand: HTMLImageElement | null
}

function KitCard({ service, index, brand }: KitCardProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const qrRef = useRef<HTMLImageElement | null>(null)
  const [qrDataUrl, setQrDataUrl] = useState('')
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading')
  const [busy, setBusy] = useState(false)
  const [note, setNote] = useState('')

  useEffect(() => {
    let cancelled = false
    setQrDataUrl('')
    setStatus('loading')
    renderServiceQr(service)
      .then((dataUrl) => {
        if (!cancelled) setQrDataUrl(dataUrl)
      })
      .catch(() => {
        if (!cancelled) setStatus('error')
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

      qrRef.current = qr
      const ok = renderBrandCard(canvas as HTMLCanvasElement, {
        service,
        index,
        format: 'square',
        qr,
        brand,
        fonts: resolveBrandCardFonts(),
        scale: 0.5,
      })
      if (!cancelled) setStatus(ok ? 'ready' : 'error')
    }

    paint()
    return () => {
      cancelled = true
    }
  }, [qrDataUrl, brand, service, index])

  async function download() {
    setBusy(true)
    setNote('')
    try {
      const qr = qrRef.current
      if (!qr) {
        setNote('Still rendering. Try again in a moment.')
        return
      }

      const canvas = document.createElement('canvas')
      const ok = renderBrandCard(canvas, {
        service,
        index,
        format: 'square',
        qr,
        brand,
        fonts: resolveBrandCardFonts(),
      })
      if (!ok) {
        setNote('This browser could not render the card.')
        return
      }

      const blob = await new Promise<Blob | null>((resolve) => {
        canvas.toBlob((value) => resolve(value), 'image/png')
      })
      if (!blob) {
        setNote('This browser could not export the PNG.')
        return
      }
      downloadBrandCardBlob(blob, brandCardFileName(service, 'square'))
      setNote('1080 × 1080 PNG downloaded.')
    } finally {
      setBusy(false)
    }
  }

  return (
    <article
      className="flex h-full min-w-0 flex-col rounded-2xl border border-white/10 bg-ink-soft p-4"
      data-kit-service={service.slug}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="font-mono text-[0.55rem] uppercase tracking-[0.14em] text-[#c9f24b]">
            {String(index + 1).padStart(2, '0')} · {service.kicker}
          </p>
          <h3 className="mt-2 text-sm font-semibold leading-snug text-white">
            {service.name}
          </h3>
        </div>
        <span className="shrink-0 font-mono text-[0.52rem] uppercase tracking-[0.1em] text-white/25">
          1:1
        </span>
      </div>

      <div className="relative mt-4 overflow-hidden rounded-xl border border-white/10 bg-[#0b0d12]">
        <canvas
          ref={canvasRef}
          role="img"
          aria-label={`Downloadable square card for ${service.name}, carrying mriridescent.africa, “${site.motto}”, and WhatsApp ${site.phone}`}
          className="block h-auto w-full"
        />
        {status !== 'ready' && (
          <div className="absolute inset-0 flex items-center justify-center bg-[#0b0d12]/70">
            {status === 'loading' ? (
              <Loader2 className="h-5 w-5 animate-spin text-white/50" />
            ) : (
              <p className="max-w-[14rem] px-4 text-center text-xs leading-relaxed text-white/45">
                Preview unavailable. The download still renders at full size.
              </p>
            )}
          </div>
        )}
      </div>

      <div className="mt-4 flex items-center justify-between gap-3 border-t border-white/10 pt-4">
        <p className="font-mono text-[0.52rem] uppercase tracking-[0.1em] text-white/30">
          PNG · 1080 sq
        </p>
        <button
          type="button"
          onClick={download}
          disabled={busy || status !== 'ready'}
          data-kit-download={service.slug}
          className="inline-flex items-center gap-1.5 rounded-full border border-white/15 px-3 py-1.5 text-[0.68rem] font-medium text-white/70 transition-colors hover:border-white/35 hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
        >
          {busy ? (
            <Loader2 className="h-3.5 w-3.5 animate-spin" />
          ) : (
            <Download className="h-3.5 w-3.5" />
          )}
          Download
        </button>
      </div>

      <div className="mt-3 flex items-center justify-between gap-3">
        <Link
          href={`/share?service=${service.slug}#service-cards`}
          className="inline-flex items-center gap-1.5 text-[0.68rem] text-white/45 transition-colors hover:text-white"
        >
          <SlidersHorizontal className="h-3 w-3" />
          Customize size or add a reason
          <ArrowUpRight className="h-3 w-3" />
        </Link>
      </div>

      {note && (
        <p role="status" className="mt-2 inline-flex items-center gap-1.5 text-[0.66rem] text-emerald-200/80">
          <Check className="h-3 w-3" />
          {note}
        </p>
      )}
    </article>
  )
}

export function BrandKitGallery() {
  const [brand, setBrand] = useState<HTMLImageElement | null>(null)

  useEffect(() => {
    let cancelled = false
    loadBrandCardImage('/media/brand/mr-iridescent-mark.png').then((image) => {
      if (!cancelled) setBrand(image)
    })
    return () => {
      cancelled = true
    }
  }, [])

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center gap-x-6 gap-y-2 border-y border-white/10 py-3 font-mono text-[0.55rem] uppercase tracking-[0.12em] text-white/35">
        <span>{services.length} service cards</span>
        <span className="text-[#c9f24b]/70">1080 × 1080 PNG</span>
        <span>mriridescent.africa</span>
        <span>WhatsApp {site.phone}</span>
        <span>“{site.motto}”</span>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {services.map((service, index) => (
          <KitCard
            key={service.slug}
            service={service}
            index={index}
            brand={brand}
          />
        ))}
      </div>

      <p className="mt-6 max-w-3xl text-xs leading-relaxed text-white/35">
        Every card is a finished 1080 × 1080 PNG. The QR opens that service’s page
        with campaign tracking, so a shared image can be traced back to the offer
        it carried. The full studio on{' '}
        <Link
          href="/share#service-cards"
          className="text-white/70 underline decoration-white/20 underline-offset-4 hover:decoration-white"
        >
          the share kit
        </Link>{' '}
        adds portrait and landscape formats, a personal reason line, and a ready
        caption. Card format: {BRAND_CARD_FORMATS.square.width} ×{' '}
        {BRAND_CARD_FORMATS.square.height}.
      </p>
    </div>
  )
}
