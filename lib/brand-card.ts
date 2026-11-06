/**
 * Branded service-card renderer.
 *
 * One drawing routine powers both the interactive studio on /share and the
 * download gallery on /media. The canvas is always laid out in the design space
 * (1080 × 1080, 1080 × 1350, or 1200 × 630) and scaled at draw time, so a
 * preview and a full-resolution download are the same artwork.
 */
import { services, site, type Service } from '@/lib/profile'

export const BRAND_CARD_FORMATS = {
  square: {
    key: 'square',
    label: 'Square',
    note: 'Feed post · 1:1',
    width: 1080,
    height: 1080,
  },
  story: {
    key: 'story',
    label: 'Portrait',
    note: 'Story · 4:5',
    width: 1080,
    height: 1350,
  },
  wide: {
    key: 'wide',
    label: 'Landscape',
    note: 'Link preview · 1.91:1',
    width: 1200,
    height: 630,
  },
} as const

export type BrandCardFormat = keyof typeof BRAND_CARD_FORMATS

export const BRAND_CARD_INK = '#0b0d12'
export const BRAND_CARD_IVORY = '#f7f5ef'
const ACID = '#c9f24b'
const CYAN = '#67e8f9'

export type BrandCardFonts = {
  display: string
  body: string
  mono: string
}

export type BrandCardOptions = {
  service: Service
  index: number
  format: BrandCardFormat
  reason?: string
  qr: HTMLImageElement
  brand: HTMLImageElement | null
  fonts: BrandCardFonts
  scale?: number
}

export function brandCardDestination(service: Service) {
  const base = site.url.replace(/\/+$/, '')
  const params = new URLSearchParams({
    utm_source: 'share-card',
    utm_medium: 'image',
    utm_campaign: service.slug,
  })
  if (service.href) {
    return `${base}${service.href}?${params.toString()}`
  }
  return `${base}/services?${params.toString()}#${service.slug}`
}

export function brandCardPath(service: Service) {
  return service.href ?? `/services#${service.slug}`
}

function absoluteDisplayUrl(service: Service) {
  return `${site.url.replace(/\/+$/, '')}${brandCardPath(service)}`
}

export function brandCardFileName(service: Service, format: BrandCardFormat) {
  return `mr-iridescent-${service.slug}-${format}.png`
}

export function buildBrandCardCaption(service: Service, reason: string) {
  const note = reason.trim()
  const lines = [
    `${service.name} — ${service.kicker}.`,
    note ? `“${note}”` : service.summary,
    `Growth partner · PR & reputation · Digital product delivery. ${site.motto}.`,
    'David Akpoviroro Oke (Mr Iridescent) · Growth Partner & Digital Product Delivery Architect · Lagos, working worldwide.',
    `${absoluteDisplayUrl(service)} · WhatsApp ${site.phone}`,
  ]
  return lines.join('\n\n')
}

export function resolveBrandCardFonts(): BrandCardFonts {
  if (typeof window === 'undefined') {
    return {
      display: 'Georgia, "Times New Roman", serif',
      body: 'system-ui, -apple-system, "Segoe UI", sans-serif',
      mono: 'ui-monospace, SFMono-Regular, Menlo, monospace',
    }
  }
  const styles = getComputedStyle(document.documentElement)
  const read = (name: string, fallback: string) =>
    styles.getPropertyValue(name).trim() || fallback
  return {
    display: read('--font-display', 'Georgia, "Times New Roman", serif'),
    body: read('--font-body', 'system-ui, -apple-system, "Segoe UI", sans-serif'),
    mono: read('--font-mono', 'ui-monospace, SFMono-Regular, Menlo, monospace'),
  }
}

export async function loadBrandCardImage(src: string) {
  if (typeof window === 'undefined') return null
  const image = new window.Image()
  image.decoding = 'async'
  image.src = src
  try {
    await image.decode()
    return image
  } catch {
    return null
  }
}

export async function renderServiceQr(service: Service) {
  const QRCode = (await import('qrcode')).default
  return QRCode.toDataURL(brandCardDestination(service), {
    errorCorrectionLevel: 'M',
    margin: 1,
    width: 640,
    color: { dark: BRAND_CARD_INK, light: BRAND_CARD_IVORY },
  })
}

function roundedRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number
) {
  const r = Math.min(radius, width / 2, height / 2)
  ctx.beginPath()
  ctx.moveTo(x + r, y)
  ctx.lineTo(x + width - r, y)
  ctx.quadraticCurveTo(x + width, y, x + width, y + r)
  ctx.lineTo(x + width, y + height - r)
  ctx.quadraticCurveTo(x + width, y + height, x + width - r, y + height)
  ctx.lineTo(x + r, y + height)
  ctx.quadraticCurveTo(x, y + height, x, y + height - r)
  ctx.lineTo(x, y + r)
  ctx.quadraticCurveTo(x, y, x + r, y)
  ctx.closePath()
}

function wrapLines(
  ctx: CanvasRenderingContext2D,
  text: string,
  maxWidth: number
) {
  const words = text.split(/\s+/).filter(Boolean)
  const lines: string[] = []
  let current = ''

  for (const word of words) {
    const candidate = current ? `${current} ${word}` : word
    if (ctx.measureText(candidate).width <= maxWidth || !current) {
      current = candidate
    } else {
      lines.push(current)
      current = word
    }
  }
  if (current) lines.push(current)
  return lines
}

function fitLines(
  ctx: CanvasRenderingContext2D,
  text: string,
  maxWidth: number,
  maxLines: number
) {
  const lines = wrapLines(ctx, text, maxWidth)
  if (lines.length <= maxLines) return lines

  const kept = lines.slice(0, maxLines)
  let last = kept[maxLines - 1]
  while (last.length > 1 && ctx.measureText(`${last}…`).width > maxWidth) {
    last = last.slice(0, -1)
  }
  kept[maxLines - 1] = `${last.trimEnd()}…`
  return kept
}

function fitTitle(
  ctx: CanvasRenderingContext2D,
  text: string,
  maxWidth: number,
  startSize: number,
  minSize: number,
  maxLines: number,
  family: string
) {
  for (let size = startSize; size >= minSize; size -= 2) {
    ctx.font = `400 ${size}px ${family}`
    const lines = wrapLines(ctx, text, maxWidth)
    if (lines.length <= maxLines) {
      return { size, lines }
    }
  }
  ctx.font = `400 ${minSize}px ${family}`
  return { size: minSize, lines: fitLines(ctx, text, maxWidth, maxLines) }
}

function drawTracking(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  tracking: number,
  align: 'left' | 'right' | 'center' = 'left'
) {
  const chars = Array.from(text)
  const widths = chars.map((char) => ctx.measureText(char).width)
  const total =
    widths.reduce((sum, width) => sum + width, 0) +
    tracking * Math.max(chars.length - 1, 0)
  let cursor =
    align === 'right' ? x - total : align === 'center' ? x - total / 2 : x

  for (let i = 0; i < chars.length; i += 1) {
    ctx.fillText(chars[i], cursor, y)
    cursor += widths[i] + tracking
  }
}

function drawCheck(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  size: number,
  color: string
) {
  ctx.save()
  ctx.strokeStyle = color
  ctx.lineWidth = 1.8
  ctx.lineCap = 'round'
  ctx.lineJoin = 'round'
  ctx.beginPath()
  ctx.moveTo(x, y + size * 0.52)
  ctx.lineTo(x + size * 0.4, y + size * 0.88)
  ctx.lineTo(x + size, y + size * 0.12)
  ctx.stroke()
  ctx.restore()
}

function paintBrandCard(ctx: CanvasRenderingContext2D, options: BrandCardOptions) {
  const { service, index, format, reason = '', qr, brand, fonts } = options
  const { width, height } = BRAND_CARD_FORMATS[format]
  const wide = format === 'wide'
  const pad = wide ? 40 : 60
  const brandRadius = wide ? 20 : 28
  const qrSize = wide ? 128 : 190
  const qrPlate = qrSize + 22
  const qrPlateX = width - pad - qrPlate
  const qrPlateY = height - pad - (wide ? 30 : 38) - qrPlate
  const contentLeft = pad
  const textWidth = wide ? qrPlateX - pad - 42 : width - pad * 2
  const numeral = String(index + 1).padStart(2, '0')
  const note = reason.trim()

  // Base ink and spectral atmosphere.
  ctx.fillStyle = BRAND_CARD_INK
  ctx.fillRect(0, 0, width, height)

  const glowOne = ctx.createRadialGradient(
    width * 0.86,
    height * 0.12,
    0,
    width * 0.86,
    height * 0.12,
    width * 0.68
  )
  glowOne.addColorStop(0, 'rgba(103, 232, 249, 0.16)')
  glowOne.addColorStop(1, 'rgba(103, 232, 249, 0)')
  ctx.fillStyle = glowOne
  ctx.fillRect(0, 0, width, height)

  const glowTwo = ctx.createRadialGradient(
    width * 0.08,
    height * 0.9,
    0,
    width * 0.08,
    height * 0.9,
    width * 0.62
  )
  glowTwo.addColorStop(0, 'rgba(167, 139, 250, 0.14)')
  glowTwo.addColorStop(1, 'rgba(167, 139, 250, 0)')
  ctx.fillStyle = glowTwo
  ctx.fillRect(0, 0, width, height)

  const glowThree = ctx.createRadialGradient(
    width * 0.45,
    height * 0.34,
    0,
    width * 0.45,
    height * 0.34,
    width * 0.42
  )
  glowThree.addColorStop(0, 'rgba(201, 242, 75, 0.05)')
  glowThree.addColorStop(1, 'rgba(201, 242, 75, 0)')
  ctx.fillStyle = glowThree
  ctx.fillRect(0, 0, width, height)

  // Technical grid.
  ctx.strokeStyle = 'rgba(247, 245, 239, 0.04)'
  ctx.lineWidth = 1
  const gridStep = wide ? 64 : 72
  for (let x = contentLeft; x <= width - pad; x += gridStep) {
    ctx.beginPath()
    ctx.moveTo(x, pad)
    ctx.lineTo(x, height - pad)
    ctx.stroke()
  }
  for (let y = pad; y <= height - pad; y += gridStep) {
    ctx.beginPath()
    ctx.moveTo(pad, y)
    ctx.lineTo(width - pad, y)
    ctx.stroke()
  }

  // Inner frame.
  ctx.strokeStyle = 'rgba(247, 245, 239, 0.12)'
  ctx.strokeRect(28, 28, width - 56, height - 56)

  // Ghost numeral.
  ctx.save()
  ctx.font = `400 ${wide ? 270 : 430}px ${fonts.display}`
  ctx.fillStyle = 'rgba(247, 245, 239, 0.045)'
  ctx.textAlign = 'right'
  ctx.textBaseline = 'alphabetic'
  ctx.fillText(numeral, width - pad + (wide ? 6 : 12), height * (wide ? 0.9 : 0.74))
  ctx.restore()

  // Brand mark.
  const brandCx = pad + brandRadius
  const brandCy = pad + brandRadius
  ctx.save()
  ctx.beginPath()
  ctx.arc(brandCx, brandCy, brandRadius, 0, Math.PI * 2)
  ctx.clip()
  ctx.fillStyle = BRAND_CARD_IVORY
  ctx.fillRect(brandCx - brandRadius, brandCy - brandRadius, brandRadius * 2, brandRadius * 2)
  if (brand) {
    const inner = brandRadius * 2 - 8
    ctx.drawImage(brand, brandCx - inner / 2, brandCy - inner / 2, inner, inner)
  } else {
    ctx.fillStyle = BRAND_CARD_INK
    ctx.font = `400 ${brandRadius}px ${fonts.display}`
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText('MI', brandCx, brandCy + 1)
  }
  ctx.restore()

  const brandTextX = brandCx + brandRadius + (wide ? 12 : 16)
  ctx.textAlign = 'left'
  ctx.textBaseline = 'alphabetic'
  ctx.fillStyle = BRAND_CARD_IVORY
  ctx.font = `600 ${wide ? 15 : 18}px ${fonts.body}`
  ctx.fillText('DAVID AKPOVIRORO OKE', brandTextX, brandCy - 2)
  ctx.fillStyle = 'rgba(247, 245, 239, 0.42)'
  ctx.font = `400 ${wide ? 9 : 10}px ${fonts.mono}`
  drawTracking(
    ctx,
    'MR IRIDESCENT · YOUR IT PARTNER',
    brandTextX,
    brandCy + (wide ? 13 : 16),
    wide ? 1 : 1.3
  )

  ctx.textAlign = 'right'
  ctx.fillStyle = 'rgba(247, 245, 239, 0.38)'
  ctx.font = `400 ${wide ? 9 : 10}px ${fonts.mono}`
  drawTracking(ctx, 'SERVICE CARD', width - pad, pad + 14, 2, 'right')
  ctx.fillStyle = ACID
  ctx.font = `400 ${wide ? 10 : 11}px ${fonts.mono}`
  drawTracking(
    ctx,
    `${numeral} / ${String(services.length).padStart(2, '0')}`,
    width - pad,
    pad + (wide ? 30 : 34),
    2,
    'right'
  )

  // Footer geometry is measured first so the lower content block can sit above
  // the rule without colliding with the summary or the QR plate.
  const footerBase = height - pad
  const domainBaseline = wide ? footerBase - 2 : footerBase - 34
  const pathBaseline = domainBaseline - (wide ? 38 : 42)
  const dividerY = pathBaseline - (wide ? 18 : 22)
  const leftColumnRight = qrPlateX - (wide ? 26 : 34)

  // Kicker.
  const contentTop = pad + brandRadius * 2 + (wide ? 34 : 54)
  ctx.textAlign = 'left'
  ctx.fillStyle = CYAN
  ctx.font = `400 ${wide ? 10 : 12}px ${fonts.mono}`
  drawTracking(ctx, service.kicker.toUpperCase(), contentLeft, contentTop, wide ? 1.6 : 2.1)

  // Title. Fit first, then offset the baseline by the cap height so the kicker
  // never collides with the ascenders.
  const title = fitTitle(
    ctx,
    service.name,
    textWidth,
    wide ? 46 : format === 'story' ? 82 : 78,
    wide ? 34 : 52,
    wide ? 2 : 3,
    fonts.display
  )
  const titleY = contentTop + (wide ? 58 : Math.round(title.size + 18))
  const titleLineHeight = title.size * 1.04
  ctx.fillStyle = BRAND_CARD_IVORY
  ctx.font = `400 ${title.size}px ${fonts.display}`
  title.lines.forEach((line, lineIndex) => {
    ctx.fillText(line, contentLeft, titleY + lineIndex * titleLineHeight)
  })
  const titleBottom = titleY + (title.lines.length - 1) * titleLineHeight

  // Lower block: the sharer's reason when present, otherwise three outcomes.
  const labelSize = wide ? 9 : 10
  const labelGap = wide ? 10 : 12
  const outcomeSize = wide ? 14 : 16
  const outcomeLineHeight = wide ? 23 : 28
  const reasonSize = wide ? 17 : 21
  const reasonLineHeight = reasonSize * 1.5
  const lowerWidth = (wide ? textWidth : leftColumnRight - contentLeft) - 26

  ctx.font = `italic 400 ${reasonSize}px ${fonts.body}`
  const reasonLines = note ? fitLines(ctx, note, lowerWidth, wide ? 2 : 3) : []
  ctx.font = `400 ${outcomeSize}px ${fonts.body}`
  const lowerOutcomes = note
    ? []
    : service.outcomes
        .slice(0, wide ? 2 : 3)
        .map((outcome) => fitLines(ctx, outcome, lowerWidth - 24, 1)[0] ?? outcome)

  const lowerHeight = note
    ? 18 + labelGap + reasonLines.length * reasonLineHeight
    : 18 + labelGap + lowerOutcomes.length * outcomeLineHeight
  const lowerTop = dividerY - (wide ? 20 : 30) - lowerHeight

  // Summary.
  const textBottomLimit = lowerTop - (wide ? 22 : 32)
  const summarySize = wide ? 17.5 : 24
  const summaryLineHeight = summarySize * 1.55
  const summaryGap = wide ? 28 : 46
  const summaryTop = titleBottom + summaryGap
  const available = textBottomLimit - summaryTop
  const maxSummaryLines = Math.max(
    1,
    Math.min(Math.floor(available / summaryLineHeight) + 1, wide ? 3 : 5)
  )
  ctx.font = `400 ${summarySize}px ${fonts.body}`
  const summaryLines = fitLines(ctx, service.summary, textWidth, maxSummaryLines)
  ctx.fillStyle = 'rgba(247, 245, 239, 0.64)'
  ctx.font = `400 ${summarySize}px ${fonts.body}`
  summaryLines.forEach((line, lineIndex) => {
    ctx.fillText(line, contentLeft, summaryTop + lineIndex * summaryLineHeight)
  })

  // Draw the anchored lower block.
  ctx.fillStyle = ACID
  ctx.fillRect(contentLeft, lowerTop - 8, 3, lowerHeight + 4)

  ctx.fillStyle = 'rgba(201, 242, 75, 0.78)'
  ctx.font = `400 ${labelSize}px ${fonts.mono}`
  drawTracking(
    ctx,
    note ? 'WHY I AM SHARING THIS' : 'WHAT THIS COVERS',
    contentLeft + 16,
    lowerTop + 2,
    1.8
  )

  if (note) {
    ctx.fillStyle = 'rgba(247, 245, 239, 0.84)'
    ctx.font = `italic 400 ${reasonSize}px ${fonts.body}`
    const firstBaseline = lowerTop + 18 + labelGap + reasonSize
    reasonLines.forEach((line, lineIndex) => {
      ctx.fillText(line, contentLeft + 16, firstBaseline + lineIndex * reasonLineHeight)
    })
  } else {
    ctx.font = `400 ${outcomeSize}px ${fonts.body}`
    const firstBaseline = lowerTop + 18 + labelGap + outcomeSize
    lowerOutcomes.forEach((line, lineIndex) => {
      const baseline = firstBaseline + lineIndex * outcomeLineHeight
      drawCheck(ctx, contentLeft + 17, baseline - 11, 11, 'rgba(201, 242, 75, 0.85)')
      ctx.fillStyle = 'rgba(247, 245, 239, 0.6)'
      ctx.fillText(line, contentLeft + 38, baseline)
    })
  }

  // Footer: motto, path, URL, WhatsApp.
  ctx.strokeStyle = 'rgba(247, 245, 239, 0.16)'
  ctx.lineWidth = 1
  ctx.beginPath()
  ctx.moveTo(contentLeft, dividerY)
  ctx.lineTo(leftColumnRight, dividerY)
  ctx.stroke()

  ctx.fillStyle = 'rgba(201, 242, 75, 0.82)'
  ctx.font = `400 ${wide ? 8.5 : 10}px ${fonts.mono}`
  drawTracking(
    ctx,
    site.motto.toUpperCase(),
    contentLeft,
    pathBaseline - (wide ? 10 : 12),
    1.8
  )

  ctx.fillStyle = 'rgba(247, 245, 239, 0.72)'
  ctx.font = `400 ${wide ? 10 : 11}px ${fonts.mono}`
  ctx.fillText(brandCardPath(service), contentLeft, pathBaseline + 2)

  ctx.fillStyle = BRAND_CARD_IVORY
  ctx.font = `400 ${wide ? 30 : 36}px ${fonts.display}`
  ctx.fillText('mriridescent.africa', contentLeft, domainBaseline)
  const domainWidth = ctx.measureText('mriridescent.africa').width

  ctx.fillStyle = 'rgba(247, 245, 239, 0.66)'
  ctx.font = `400 ${wide ? 13 : 16}px ${fonts.mono}`
  if (wide) {
    ctx.fillText(`${site.phone} · WhatsApp`, contentLeft + domainWidth + 24, domainBaseline)
  } else {
    ctx.fillText(`${site.phone} · WhatsApp`, contentLeft, footerBase)
  }

  // QR plate.
  ctx.save()
  ctx.shadowColor = 'rgba(0, 0, 0, 0.45)'
  ctx.shadowBlur = 26
  ctx.shadowOffsetY = 10
  ctx.fillStyle = BRAND_CARD_IVORY
  roundedRect(ctx, qrPlateX, qrPlateY, qrPlate, qrPlate, wide ? 12 : 16)
  ctx.fill()
  ctx.restore()

  ctx.drawImage(qr, qrPlateX + 11, qrPlateY + 11, qrSize, qrSize)

  ctx.fillStyle = 'rgba(247, 245, 239, 0.44)'
  ctx.font = `400 ${wide ? 8 : 9}px ${fonts.mono}`
  drawTracking(
    ctx,
    'SCAN FOR THE FULL OFFER',
    qrPlateX + qrPlate / 2,
    qrPlateY + qrPlate + (wide ? 18 : 22),
    wide ? 1.4 : 1.7,
    'center'
  )
}

/**
 * Draw a card into a canvas at design resolution × scale. Returns false when
 * the 2D context is unavailable.
 */
export function renderBrandCard(
  canvas: HTMLCanvasElement,
  options: BrandCardOptions
) {
  const { width, height } = BRAND_CARD_FORMATS[options.format]
  const scale = options.scale ?? 1
  canvas.width = Math.max(1, Math.round(width * scale))
  canvas.height = Math.max(1, Math.round(height * scale))
  const ctx = canvas.getContext('2d')
  if (!ctx) return false
  ctx.setTransform(scale, 0, 0, scale, 0, 0)
  ctx.clearRect(0, 0, width, height)
  paintBrandCard(ctx, options)
  return true
}

/** Wait for webfonts so the first paint matches the exported file. */
export async function waitForBrandCardFonts() {
  try {
    if (typeof document !== 'undefined' && document.fonts?.ready) {
      await document.fonts.ready
    }
  } catch {
    // Fall back to whatever the browser already has.
  }
}

export async function loadBrandCardQrImage(dataUrl: string) {
  if (typeof window === 'undefined') return null
  const image = new window.Image()
  image.decoding = 'sync'
  image.src = dataUrl
  try {
    await image.decode()
    return image
  } catch {
    return null
  }
}

export function downloadBrandCardBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  window.setTimeout(() => URL.revokeObjectURL(url), 1500)
}
