'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import {
  ArrowUpRight,
  Check,
  Copy,
  Download,
  FileCode2,
  ImageDown,
  Loader2,
  ScanLine,
} from 'lucide-react'
import type { QRCode } from 'qrcode'
import { site } from '@/lib/profile'
import {
  downloadBrandCardBlob,
  loadBrandCardImage,
  resolveBrandCardFonts,
  waitForBrandCardFonts,
} from '@/lib/brand-card'
import {
  QR_DESTINATIONS,
  QR_DESTINATION_GROUPS,
  QR_STYLES,
  buildQrCaption,
  buildQrSvg,
  createQrMatrix,
  downloadQrSvg,
  findQrDestination,
  findQrStyle,
  isQrStyleKey,
  qrDestinationUrl,
  qrPosterFileName,
  qrSvgFileName,
  renderQrPoster,
  type QrDestination,
  type QrStyle,
} from '@/lib/qr-studio'
import { cn } from '@/lib/utils'

function useQrMatrix(destination: QrDestination) {
  const [state, setState] = useState<{
    slug: string
    matrix: QRCode | null
    error: boolean
  }>({ slug: '', matrix: null, error: false })

  useEffect(() => {
    let cancelled = false
    createQrMatrix(destination)
      .then((matrix) => {
        if (!cancelled) setState({ slug: destination.slug, matrix, error: false })
      })
      .catch(() => {
        if (!cancelled) setState({ slug: destination.slug, matrix: null, error: true })
      })
    return () => {
      cancelled = true
    }
  }, [destination])

  return state
}

type DownloadState = 'idle' | 'busy' | 'done' | 'error'

function EditionCard({
  destination,
  destinationIndex,
  style,
  styleIndex,
  matrix,
  brand,
}: {
  destination: QrDestination
  destinationIndex: number
  style: QrStyle
  styleIndex: number
  matrix: QRCode | null
  brand: HTMLImageElement | null
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const [state, setState] = useState<DownloadState>('idle')
  const [note, setNote] = useState('')

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || !matrix) return
    let cancelled = false
    async function paint() {
      await waitForBrandCardFonts()
      if (cancelled) return
      renderQrPoster(canvas as HTMLCanvasElement, {
        matrix: matrix as QRCode,
        destination,
        destinationIndex,
        style,
        brand,
        fonts: resolveBrandCardFonts(),
        scale: 0.34,
      })
    }
    paint()
    return () => {
      cancelled = true
    }
  }, [matrix, destination, destinationIndex, style, brand])

  async function download() {
    if (!matrix) return
    setState('busy')
    setNote('')
    try {
      const canvas = document.createElement('canvas')
      const ok = renderQrPoster(canvas, {
        matrix,
        destination,
        destinationIndex,
        style,
        brand,
        fonts: resolveBrandCardFonts(),
      })
      if (!ok) {
        setState('error')
        setNote('This browser could not render the poster.')
        return
      }
      const blob = await new Promise<Blob | null>((resolve) => {
        canvas.toBlob((value) => resolve(value), 'image/png')
      })
      if (!blob) {
        setState('error')
        setNote('This browser could not export the PNG.')
        return
      }
      downloadBrandCardBlob(blob, qrPosterFileName(destination, style))
      setState('done')
      setNote('1080 × 1080 PNG downloaded.')
      window.setTimeout(() => setState('idle'), 2200)
    } finally {
      if (state === 'busy') setState('idle')
    }
  }

  return (
    <article
      className="flex h-full min-w-0 flex-col rounded-2xl border border-white/10 bg-ink-soft p-3.5"
      data-qr-edition={style.key}
    >
      <div className="flex items-start justify-between gap-3 px-1">
        <div className="min-w-0">
          <p className="font-mono text-[0.55rem] uppercase tracking-[0.14em] text-[#c9f24b]/80">
            Edition {String(styleIndex + 1).padStart(2, '0')}
          </p>
          <h3 className="mt-1.5 text-sm font-semibold text-white">{style.label}</h3>
          <p className="mt-0.5 text-[0.66rem] leading-snug text-white/35">{style.note}</p>
        </div>
        <span className="mt-0.5 shrink-0 font-mono text-[0.5rem] uppercase tracking-[0.1em] text-white/25">
          PNG
        </span>
      </div>

      <div className="relative mt-3 overflow-hidden rounded-lg border border-white/10 bg-[#0b0d12]">
        <canvas
          ref={canvasRef}
          role="img"
          aria-label={`${style.label} QR poster for ${destination.label}`}
          className="block h-auto w-full"
        />
        {!matrix && (
          <div className="absolute inset-0 flex items-center justify-center bg-[#0b0d12]/70">
            <Loader2 className="h-4 w-4 animate-spin text-white/40" />
          </div>
        )}
      </div>

      <div className="mt-auto flex items-center justify-between gap-2 px-1 pt-3">
        <span className="font-mono text-[0.5rem] uppercase tracking-[0.1em] text-white/25">
          1080 sq
        </span>
        <button
          type="button"
          onClick={download}
          disabled={!matrix || state === 'busy'}
          data-qr-edition-download={style.key}
          className="inline-flex items-center gap-1.5 rounded-full border border-white/15 px-2.5 py-1.5 text-[0.64rem] font-medium text-white/65 transition-colors hover:border-white/35 hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
        >
          {state === 'busy' ? (
            <Loader2 className="h-3 w-3 animate-spin" />
          ) : state === 'done' ? (
            <Check className="h-3 w-3 text-emerald-300" />
          ) : (
            <Download className="h-3 w-3" />
          )}
          {state === 'done' ? 'Saved' : 'PNG'}
        </button>
      </div>
      {note && (
        <p role="status" className="mt-1 px-1 text-[0.6rem] leading-snug text-emerald-200/75">
          {note}
        </p>
      )}
    </article>
  )
}

export function QrAtelier() {
  const [doorSlug, setDoorSlug] = useState(QR_DESTINATIONS[0].slug)
  const [styleKey, setStyleKey] = useState(QR_STYLES[0].key)
  const [brand, setBrand] = useState<HTMLImageElement | null>(null)
  const [copied, setCopied] = useState<'link' | 'caption' | null>(null)
  const [note, setNote] = useState('')
  const [state, setState] = useState<DownloadState>('idle')
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  const destination = findQrDestination(doorSlug)
  const destinationIndex = Math.max(
    0,
    QR_DESTINATIONS.findIndex((item) => item.slug === destination.slug)
  )
  const style = findQrStyle(styleKey)
  const styleIndex = Math.max(0, QR_STYLES.findIndex((item) => item.key === style.key))
  const qr = useQrMatrix(destination)
  const matrix = qr.slug === destination.slug ? qr.matrix : null
  const trackedUrl = useMemo(() => qrDestinationUrl(destination), [destination])
  const caption = useMemo(() => buildQrCaption(destination), [destination])

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const requestedDoor = params.get('door')
    const requestedStyle = params.get('edition')
    if (requestedDoor && QR_DESTINATIONS.some((item) => item.slug === requestedDoor)) {
      setDoorSlug(requestedDoor)
    }
    if (isQrStyleKey(requestedStyle)) {
      setStyleKey(requestedStyle)
    }
  }, [])

  useEffect(() => {
    let cancelled = false
    loadBrandCardImage('/media/brand/mr-iridescent-mark.png').then((image) => {
      if (!cancelled) setBrand(image)
    })
    return () => {
      cancelled = true
    }
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || !matrix) return
    let cancelled = false
    async function paint() {
      await waitForBrandCardFonts()
      if (cancelled) return
      renderQrPoster(canvas as HTMLCanvasElement, {
        matrix: matrix as QRCode,
        destination,
        destinationIndex,
        style,
        brand,
        fonts: resolveBrandCardFonts(),
      })
    }
    paint()
    return () => {
      cancelled = true
    }
  }, [matrix, destination, destinationIndex, style, brand])

  const chooseDoor = useCallback((slug: string) => {
    setDoorSlug(slug)
    setNote('')
    const url = new URL(window.location.href)
    url.searchParams.set('door', slug)
    url.searchParams.set('edition', styleKey)
    window.history.replaceState(null, '', url)
  }, [styleKey])

  const chooseStyle = useCallback((key: string) => {
    setStyleKey(key)
    setNote('')
    const url = new URL(window.location.href)
    url.searchParams.set('door', doorSlug)
    url.searchParams.set('edition', key)
    window.history.replaceState(null, '', url)
  }, [doorSlug])

  async function copyText(value: string, kind: 'link' | 'caption') {
    try {
      await navigator.clipboard.writeText(value)
    } catch {
      const area = document.createElement('textarea')
      area.value = value
      area.setAttribute('readonly', '')
      area.style.position = 'fixed'
      area.style.opacity = '0'
      document.body.appendChild(area)
      area.select()
      document.execCommand('copy')
      document.body.removeChild(area)
    }
    setCopied(kind)
    setNote(kind === 'link' ? 'Tracked link copied.' : 'Caption copied.')
    window.setTimeout(() => setCopied(null), 2200)
  }

  async function downloadPoster() {
    if (!matrix) return
    setState('busy')
    setNote('')
    try {
      const canvas = document.createElement('canvas')
      const ok = renderQrPoster(canvas, {
        matrix,
        destination,
        destinationIndex,
        style,
        brand,
        fonts: resolveBrandCardFonts(),
      })
      if (!ok) {
        setState('error')
        setNote('This browser could not render the poster.')
        return
      }
      const blob = await new Promise<Blob | null>((resolve) => {
        canvas.toBlob((value) => resolve(value), 'image/png')
      })
      if (!blob) {
        setState('error')
        setNote('This browser could not export the PNG.')
        return
      }
      downloadBrandCardBlob(blob, qrPosterFileName(destination, style))
      setState('done')
      setNote('1080 × 1080 poster downloaded.')
      window.setTimeout(() => setState('idle'), 2200)
    } finally {
      if (state === 'busy') setState('idle')
    }
  }

  function downloadVector() {
    if (!matrix) return
    downloadQrSvg(buildQrSvg(matrix, destination, style), qrSvgFileName(destination, style))
    setNote('Vector SVG downloaded — the code alone, with its quiet zone.')
  }

  return (
    <div className="grid gap-8 xl:grid-cols-[1.06fr_0.94fr] xl:gap-10">
      <div className="min-w-0">
        <div className="rounded-2xl border border-white/10 bg-ink-soft p-4 sm:p-6">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <ScanLine className="h-4 w-4 text-[#c9f24b]" />
              <p className="font-mono text-[0.58rem] uppercase tracking-[0.16em] text-white/40">
                Live proof
                <span className="hidden sm:inline"> · {destination.path}</span>
              </p>
            </div>
            <span className="whitespace-nowrap font-mono text-[0.5rem] uppercase tracking-[0.12em] text-white/25">
              Q · 25%
            </span>
          </div>

          <div className="relative mt-4 overflow-hidden rounded-xl border border-white/10 bg-[#0b0d12]">
            <canvas
              ref={canvasRef}
              role="img"
              aria-label={`${style.label} QR poster for ${destination.label}, opening ${qrDestinationUrl(destination)}`}
              data-qr-poster="main"
              className="block h-auto w-full"
            />
            {!matrix && (
              <div className="absolute inset-0 flex items-center justify-center bg-[#0b0d12]/70">
                <Loader2 className="h-6 w-6 animate-spin text-white/50" />
              </div>
            )}
          </div>

          <div className="mt-4 flex flex-col gap-3 border-t border-white/10 pt-4">
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={downloadPoster}
                disabled={!matrix || state === 'busy'}
                data-qr-download="poster"
                className="btn btn-primary !min-h-0 !px-4 !py-2.5 !text-[0.78rem]"
              >
                {state === 'busy' ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : state === 'done' ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <ImageDown className="h-4 w-4" />
                )}
                {state === 'done' ? 'Downloaded' : 'Download poster'}
              </button>
              <button
                type="button"
                onClick={downloadVector}
                disabled={!matrix}
                data-qr-download="svg"
                className="btn btn-ghost !min-h-0 !px-4 !py-2.5 !text-[0.78rem]"
              >
                <FileCode2 className="h-4 w-4" />
                Vector SVG
              </button>
              <button
                type="button"
                onClick={() => copyText(trackedUrl, 'link')}
                className="btn btn-ghost !min-h-0 !px-4 !py-2.5 !text-[0.78rem]"
              >
                {copied === 'link' ? (
                  <Check className="h-4 w-4 text-emerald-300" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
                {copied === 'link' ? 'Copied' : 'Copy link'}
              </button>
              <a
                href={destination.path}
                className="btn btn-ghost !min-h-0 !px-4 !py-2.5 !text-[0.78rem]"
              >
                Open page
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            </div>

            <div className="rounded-xl border border-white/[0.07] bg-black/20 px-3 py-2.5">
              <p className="font-mono text-[0.5rem] uppercase tracking-[0.14em] text-white/25">
                Encoded destination · UTM tracked
              </p>
              <p className="mt-1 break-all font-mono text-[0.62rem] leading-relaxed text-white/55">
                {trackedUrl}
              </p>
            </div>

            {note && (
              <p role="status" className="inline-flex items-center gap-1.5 text-[0.7rem] text-emerald-200/80">
                <Check className="h-3.5 w-3.5" />
                {note}
              </p>
            )}
            {qr.error && (
              <p role="alert" className="text-[0.7rem] text-amber-200/80">
                The QR could not be generated in this browser. Try a different edition or reload.
              </p>
            )}
          </div>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 rounded-xl border border-white/10 px-4 py-3 font-mono text-[0.52rem] uppercase tracking-[0.12em] text-white/30">
          <span>Door {String(destinationIndex + 1).padStart(2, '0')} / {QR_DESTINATIONS.length}</span>
          <span className="text-[#c9f24b]/70">Edition {String(styleIndex + 1).padStart(2, '0')} / 06</span>
          <span>1080 × 1080 PNG</span>
          <span>SVG · print</span>
          <span>No inbox on card</span>
        </div>
      </div>

      <div className="min-w-0">
        <div className="rounded-2xl border border-white/10 bg-ink-soft p-4 sm:p-5">
          <div className="flex items-center justify-between gap-3">
            <p className="font-mono text-[0.56rem] uppercase tracking-[0.16em] text-white/40">
              Step 1 · choose the door
            </p>
            <span className="font-mono text-[0.5rem] uppercase tracking-[0.1em] text-white/25">
              {QR_DESTINATIONS.length} live pages
            </span>
          </div>

          <div className="mt-4 space-y-4">
            {QR_DESTINATION_GROUPS.map((group) => (
              <div key={group}>
                <p className="font-mono text-[0.5rem] uppercase tracking-[0.14em] text-white/25">
                  {group}
                </p>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {QR_DESTINATIONS.filter((item) => item.group === group).map((item) => {
                    const active = item.slug === destination.slug
                    return (
                      <button
                        key={item.slug}
                        type="button"
                        onClick={() => chooseDoor(item.slug)}
                        data-qr-door={item.slug}
                        aria-pressed={active}
                        className={cn(
                          'rounded-full border px-2.5 py-1.5 text-left text-[0.66rem] leading-tight transition-colors',
                          active
                            ? 'border-[#c9f24b]/60 bg-[#c9f24b]/10 text-white'
                            : 'border-white/10 text-white/55 hover:border-white/30 hover:text-white'
                        )}
                      >
                        {item.posterLabel}
                      </button>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-4 rounded-2xl border border-white/10 bg-ink-soft p-4 sm:p-5">
          <div className="flex items-center justify-between gap-3">
            <p className="font-mono text-[0.56rem] uppercase tracking-[0.16em] text-white/40">
              Step 2 · choose the edition
            </p>
            <span className="font-mono text-[0.5rem] uppercase tracking-[0.1em] text-white/25">
              Same code, six moods
            </span>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-2">
            {QR_STYLES.map((item, index) => {
              const active = item.key === style.key
              return (
                <button
                  key={item.key}
                  type="button"
                  onClick={() => chooseStyle(item.key)}
                  data-qr-style={item.key}
                  aria-pressed={active}
                  className={cn(
                    'group rounded-xl border p-2.5 text-left transition-colors',
                    active
                      ? 'border-[#c9f24b]/60 bg-[#c9f24b]/[0.07]'
                      : 'border-white/10 hover:border-white/30'
                  )}
                >
                  <span
                    className="flex h-8 items-center justify-between overflow-hidden rounded-md border border-white/10 px-2"
                    style={{ backgroundColor: item.paper }}
                  >
                    <span className="font-mono text-[0.46rem] uppercase tracking-[0.1em]" style={{ color: item.text }}>
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: item.plate }} />
                      <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: item.code }} />
                      <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: item.accent }} />
                    </span>
                  </span>
                  <span className="mt-2 block text-[0.72rem] font-medium text-white">{item.label}</span>
                  <span className="mt-0.5 block text-[0.58rem] leading-tight text-white/35">{item.note}</span>
                </button>
              )
            })}
          </div>

          <button
            type="button"
            onClick={() => copyText(caption, 'caption')}
            className="mt-4 inline-flex items-center gap-1.5 text-[0.68rem] text-white/45 transition-colors hover:text-white"
          >
            {copied === 'caption' ? (
              <Check className="h-3 w-3 text-emerald-300" />
            ) : (
              <Copy className="h-3 w-3" />
            )}
            {copied === 'caption' ? 'Caption copied' : 'Copy a caption for this door'}
          </button>
        </div>
      </div>

      <div className="xl:col-span-2">
        <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="eyebrow">The edition rack</p>
            <h3 className="display mt-2 text-2xl text-white sm:text-3xl">
              Six treatments, <span className="text-white/35">one destination.</span>
            </h3>
          </div>
          <p className="max-w-md text-xs leading-relaxed text-white/35">
            Every card below is the same encoded URL in a different wardrobe.
            Download any one at 1080 × 1080, or take the vector code for print.
          </p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          {QR_STYLES.map((item, index) => (
            <EditionCard
              key={item.key}
              destination={destination}
              destinationIndex={destinationIndex}
              style={item}
              styleIndex={index}
              matrix={matrix}
              brand={brand}
            />
          ))}
        </div>
      </div>

      <p className="text-xs leading-relaxed text-white/30 xl:col-span-2">
        Every code points at{' '}
        <Link
          href={destination.path}
          className="text-white/60 underline decoration-white/15 underline-offset-4 hover:decoration-white"
        >
          {destination.path}
        </Link>{' '}
        with <span className="text-white/50">utm_source=qr-atelier</span> and the door
        as the campaign, so a scan can be traced back to the piece of work it came
        from. QR version and module count vary with the URL length; the quiet zone
        never does. Contact lives on the site: {site.email} and WhatsApp{' '}
        {site.phone}. No personal inbox is printed on a code.
      </p>
    </div>
  )
}
