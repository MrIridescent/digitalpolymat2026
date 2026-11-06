/**
 * QR atelier.
 *
 * Twenty destinations, six art-directed editions. The QR itself is drawn from
 * the module matrix so the artwork can change without ever guessing at the
 * encoding: every edition keeps a four-module quiet zone, error correction Q,
 * and dark modules on a light plate. A code that will not scan is just a poster.
 */
import type { QRCode } from 'qrcode'
import { services, site } from '@/lib/profile'
import type { BrandCardFonts } from '@/lib/brand-card'

export type QrDestinationGroup = 'Offers' | 'The practice' | 'Proof' | 'Direct'

export type QrDestination = {
  slug: string
  label: string
  posterLabel: string
  kicker: string
  path: string
  blurb: string
  group: QrDestinationGroup
}

const serviceDoors: QrDestination[] = services.map((service) => ({
  slug: service.slug,
  label: service.name,
  posterLabel:
    service.slug === 'fractional-cto'
      ? 'Fractional CTO'
      : service.slug === 'delivery-architecture'
        ? 'Delivery architecture'
        : service.slug === 'custom-software'
          ? 'Custom software'
          : service.slug === 'workflow-automation'
            ? 'Workflow automation'
            : service.slug === 'growth-partnership'
              ? 'Growth partnership'
              : service.slug === 'security-devsecops'
                ? 'Security & DevSecOps'
                : 'Creative systems',
  kicker: service.kicker,
  path: service.href ?? `/services#${service.slug}`,
  blurb: service.summary,
  group: 'Offers',
}))

export const QR_DESTINATIONS: readonly QrDestination[] = [
  ...serviceDoors,
  {
    slug: 'home',
    label: 'The practice — home',
    posterLabel: 'The practice',
    kicker: 'Digital product delivery architecture',
    path: '/',
    blurb: 'The whole practice in one page: work, offers, credentials, and the record.',
    group: 'The practice',
  },
  {
    slug: 'about',
    label: 'About David',
    posterLabel: 'About David',
    kicker: 'The person behind the systems',
    path: '/about',
    blurb: 'The biography, the long education, and the way the work is approached.',
    group: 'The practice',
  },
  {
    slug: 'manifesto',
    label: 'Renaissance manifesto',
    posterLabel: 'Manifesto',
    kicker: 'A letter of capability',
    path: '/manifesto',
    blurb: 'The systems-architecture manifesto and the case for the digital polymath.',
    group: 'The practice',
  },
  {
    slug: 'statistics',
    label: 'Practice at a glance',
    posterLabel: 'The numbers',
    kicker: 'A record, not a pitch',
    path: '/statistics',
    blurb: 'The practice measured honestly: years, systems, badges, institutions, languages.',
    group: 'The practice',
  },
  {
    slug: 'advocacy',
    label: 'Green software & Agenda 2063',
    posterLabel: 'Green software',
    kicker: 'Climate action as a design constraint',
    path: '/advocacy',
    blurb: 'Green software, the UN SDGs, and the African Union’s Agenda 2063.',
    group: 'The practice',
  },
  {
    slug: 'projects',
    label: 'Selected work',
    posterLabel: 'Selected work',
    kicker: 'Systems that shipped',
    path: '/projects',
    blurb: 'Products, platforms, and infrastructure built for real operating conditions.',
    group: 'Proof',
  },
  {
    slug: 'case-studies',
    label: 'Case studies',
    posterLabel: 'Case studies',
    kicker: 'The reasoning behind the build',
    path: '/case-studies',
    blurb: 'How the problems were framed, what was built, and what changed.',
    group: 'Proof',
  },
  {
    slug: 'credentials',
    label: 'Credentials',
    posterLabel: 'Credentials',
    kicker: 'The verifiable record',
    path: '/credentials',
    blurb: 'Six Cisco records, professional training, four institutions, six languages.',
    group: 'Proof',
  },
  {
    slug: 'media',
    label: 'Media library',
    posterLabel: 'Media library',
    kicker: 'Brand files & service cards',
    path: '/media',
    blurb: 'Logos, portraits, documents, and seven downloadable branded service cards.',
    group: 'Proof',
  },
  {
    slug: 'blog',
    label: 'The journal',
    posterLabel: 'The journal',
    kicker: 'Notes from the practice',
    path: '/blog',
    blurb: 'Essays on systems, security, green software, and the long web.',
    group: 'Proof',
  },
  {
    slug: 'contact',
    label: 'Start a project',
    posterLabel: 'Start a project',
    kicker: 'A $0 initial consultation',
    path: '/contact',
    blurb: 'The brief form, WhatsApp, and the fastest route to a real conversation.',
    group: 'Direct',
  },
  {
    slug: 'resume',
    label: 'Résumé',
    posterLabel: 'Résumé',
    kicker: 'The one-page record',
    path: '/resume',
    blurb: 'The résumé page, with the PDF one click away.',
    group: 'Direct',
  },
  {
    slug: 'share',
    label: 'Share kit',
    posterLabel: 'Share kit',
    kicker: 'Referrals that carry intent',
    path: '/share',
    blurb: 'Service cards, message templates, and a reason worth forwarding.',
    group: 'Direct',
  },
] as const

export const QR_DESTINATION_GROUPS: readonly QrDestinationGroup[] = [
  'Offers',
  'The practice',
  'Proof',
  'Direct',
]

export type QrModuleShape = 'square' | 'rounded' | 'dot' | 'diamond'
export type QrEyeShape = 'square' | 'rounded' | 'circle'
export type QrMotif = 'halo' | 'paper' | 'signal' | 'riso' | 'ledger' | 'brut'
export type QrLayout = 'right' | 'left' | 'brut'

export type QrStyle = {
  key: string
  label: string
  note: string
  theme: 'dark' | 'light' | 'acid'
  paper: string
  text: string
  muted: string
  accent: string
  secondary: string
  plate: string
  code: string
  eye: string
  shape: QrModuleShape
  eyeShape: QrEyeShape
  layout: QrLayout
  motif: QrMotif
  gradient?: [string, string]
}

export const QR_STYLES: readonly QrStyle[] = [
  {
    key: 'halo',
    label: 'Halo',
    note: 'Ink field · spectral glow',
    theme: 'dark',
    paper: '#0b0d12',
    text: '#f7f5ef',
    muted: 'rgba(247,245,239,0.55)',
    accent: '#c9f24b',
    secondary: '#67e8f9',
    plate: '#f7f5ef',
    code: '#0b0d12',
    eye: '#0b0d12',
    shape: 'square',
    eyeShape: 'rounded',
    layout: 'right',
    motif: 'halo',
  },
  {
    key: 'paper',
    label: 'Paper',
    note: 'Ivory stock · violet rule',
    theme: 'light',
    paper: '#f3efe4',
    text: '#15161a',
    muted: 'rgba(21,22,26,0.55)',
    accent: '#5b4b8a',
    secondary: '#c9f24b',
    plate: '#fffdf7',
    code: '#15161a',
    eye: '#5b4b8a',
    shape: 'square',
    eyeShape: 'square',
    layout: 'left',
    motif: 'paper',
  },
  {
    key: 'signal',
    label: 'Signal',
    note: 'Deep field · gradient ink',
    theme: 'dark',
    paper: '#080b12',
    text: '#f7f5ef',
    muted: 'rgba(247,245,239,0.5)',
    accent: '#67e8f9',
    secondary: '#c9f24b',
    plate: '#f7f5ef',
    code: '#0b0d12',
    eye: '#0e7490',
    shape: 'rounded',
    eyeShape: 'rounded',
    layout: 'right',
    motif: 'signal',
    gradient: ['#0e7490', '#3b2a6b'],
  },
  {
    key: 'riso',
    label: 'Riso',
    note: 'Violet ink · acid offset',
    theme: 'light',
    paper: '#f5f1e6',
    text: '#241d3a',
    muted: 'rgba(36,29,58,0.55)',
    accent: '#5b4b8a',
    secondary: '#c9f24b',
    plate: '#fffdf7',
    code: '#3b2a6b',
    eye: '#3b2a6b',
    shape: 'rounded',
    eyeShape: 'rounded',
    layout: 'left',
    motif: 'riso',
  },
  {
    key: 'ledger',
    label: 'Ledger',
    note: 'Ticket stock · mono rules',
    theme: 'light',
    paper: '#ece8dc',
    text: '#15161a',
    muted: 'rgba(21,22,26,0.52)',
    accent: '#5b4b8a',
    secondary: '#0e7490',
    plate: '#fffdf7',
    code: '#15161a',
    eye: '#15161a',
    shape: 'square',
    eyeShape: 'square',
    layout: 'right',
    motif: 'ledger',
  },
  {
    key: 'brut',
    label: 'Brut',
    note: 'Acid field · black type',
    theme: 'acid',
    paper: '#c9f24b',
    text: '#0b0d12',
    muted: 'rgba(11,13,18,0.62)',
    accent: '#0b0d12',
    secondary: '#5b4b8a',
    plate: '#f7f5ef',
    code: '#0b0d12',
    eye: '#0b0d12',
    shape: 'square',
    eyeShape: 'square',
    layout: 'brut',
    motif: 'brut',
  },
] as const

export type QrStyleKey = (typeof QR_STYLES)[number]['key']

export function isQrStyleKey(value: string | null | undefined): value is QrStyleKey {
  return Boolean(value) && QR_STYLES.some((style) => style.key === value)
}

export function findQrDestination(slug: string | null | undefined) {
  return QR_DESTINATIONS.find((destination) => destination.slug === slug) ?? QR_DESTINATIONS[0]
}

export function findQrStyle(key: string | null | undefined) {
  return QR_STYLES.find((style) => style.key === key) ?? QR_STYLES[0]
}

export function qrDestinationUrl(destination: QrDestination) {
  const base = site.url.replace(/\/+$/, '')
  const params = new URLSearchParams({
    utm_source: 'qr-atelier',
    utm_medium: 'qr',
    utm_campaign: destination.slug,
  })
  const [pathAndQuery, hash] = destination.path.split('#')
  const separator = pathAndQuery.includes('?') ? '&' : '?'
  return `${base}${pathAndQuery}${separator}${params.toString()}${hash ? `#${hash}` : ''}`
}

export function qrDestinationDisplay(destination: QrDestination) {
  return `mriridescent.africa${destination.path}`
}

export function qrPosterFileName(destination: QrDestination, style: QrStyle) {
  return `mr-iridescent-qr-${destination.slug}-${style.key}.png`
}

export function qrSvgFileName(destination: QrDestination, style: QrStyle) {
  return `mr-iridescent-qr-${destination.slug}-${style.key}.svg`
}

export function buildQrCaption(destination: QrDestination) {
  return [
    `${destination.posterLabel} — one scan away.`,
    destination.blurb,
    `Growth partner · PR & reputation · Digital product delivery. ${site.motto}.`,
    `${qrDestinationDisplay(destination)} · WhatsApp ${site.phone}`,
  ].join('\n\n')
}

/** Build the QR module matrix once; every renderer reads from the same truth. */
export async function createQrMatrix(destination: QrDestination) {
  const QRCode = (await import('qrcode')).default
  return QRCode.create(qrDestinationUrl(destination), {
    errorCorrectionLevel: 'Q',
  })
}

const QUIET = 4

function isFinderModule(row: number, col: number, size: number) {
  const inTopLeft = row < 8 && col < 8
  const inTopRight = row < 8 && col >= size - 8
  const inBottomLeft = row >= size - 8 && col < 8
  return inTopLeft || inTopRight || inBottomLeft
}

function modulePath(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  cell: number,
  shape: QrModuleShape
) {
  if (shape === 'square') {
    ctx.fillRect(x, y, cell, cell)
    return
  }
  if (shape === 'rounded') {
    roundedRect(ctx, x, y, cell, cell, cell * 0.3)
    ctx.fill()
    return
  }
  if (shape === 'diamond') {
    ctx.beginPath()
    ctx.moveTo(x + cell / 2, y + cell * 0.08)
    ctx.lineTo(x + cell * 0.92, y + cell / 2)
    ctx.lineTo(x + cell / 2, y + cell * 0.92)
    ctx.lineTo(x + cell * 0.08, y + cell / 2)
    ctx.closePath()
    ctx.fill()
    return
  }
  ctx.beginPath()
  ctx.arc(x + cell / 2, y + cell / 2, cell * 0.48, 0, Math.PI * 2)
  ctx.fill()
}

function drawEye(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  cell: number,
  color: string,
  light: string,
  shape: QrEyeShape
) {
  const size = cell * 7
  if (shape === 'circle') {
    ctx.fillStyle = color
    ctx.beginPath()
    ctx.arc(x + size / 2, y + size / 2, size / 2, 0, Math.PI * 2)
    ctx.fill()
    ctx.fillStyle = light
    ctx.beginPath()
    ctx.arc(x + size / 2, y + size / 2, cell * 2.5, 0, Math.PI * 2)
    ctx.fill()
    ctx.fillStyle = color
    ctx.beginPath()
    ctx.arc(x + size / 2, y + size / 2, cell * 1.5, 0, Math.PI * 2)
    ctx.fill()
    return
  }

  // The outer 7x7 finder stays square for every edition: detectors lock onto
  // those right angles. The inner 3x3 can carry the style.
  ctx.fillStyle = color
  ctx.fillRect(x, y, size, size)
  ctx.fillStyle = light
  ctx.fillRect(x + cell, y + cell, cell * 5, cell * 5)
  ctx.fillStyle = color
  if (shape === 'rounded') {
    roundedRect(ctx, x + cell * 2, y + cell * 2, cell * 3, cell * 3, cell * 0.65)
    ctx.fill()
    return
  }
  ctx.fillRect(x + cell * 2, y + cell * 2, cell * 3, cell * 3)
}

/**
 * Draw a QR matrix into a square. `size` includes the quiet zone. `gradient`
 * overrides the module colour (the eyes stay solid for reliable detection).
 */
export function drawQrMatrix(
  ctx: CanvasRenderingContext2D,
  matrix: QRCode,
  x: number,
  y: number,
  size: number,
  style: QrStyle,
  light: string
) {
  const modules = matrix.modules
  const count = modules.size
  // Integer module cells keep adjacent squares from developing hairline seams.
  // Fractional cells look fine zoomed out but can defeat a detector.
  const cell = Math.max(1, Math.floor(size / (count + QUIET * 2)))
  const used = cell * (count + QUIET * 2)
  const originX = Math.round(x + (size - used) / 2 + QUIET * cell)
  const originY = Math.round(y + (size - used) / 2 + QUIET * cell)

  ctx.save()
  ctx.fillStyle = light
  ctx.fillRect(x, y, size, size)

  let fill: string | CanvasGradient = style.code
  if (style.gradient) {
    const gradient = ctx.createLinearGradient(x + size * 0.12, y + size * 0.1, x + size * 0.88, y + size * 0.9)
    gradient.addColorStop(0, style.gradient[0])
    gradient.addColorStop(1, style.gradient[1])
    fill = gradient
  }

  ctx.fillStyle = fill
  for (let row = 0; row < count; row += 1) {
    for (let col = 0; col < count; col += 1) {
      if (!modules.get(row, col)) continue
      if (isFinderModule(row, col, count)) continue
      modulePath(ctx, originX + col * cell, originY + row * cell, cell, style.shape)
    }
  }

  drawEye(ctx, originX, originY, cell, style.eye, light, style.eyeShape)
  drawEye(ctx, originX + (count - 7) * cell, originY, cell, style.eye, light, style.eyeShape)
  drawEye(ctx, originX, originY + (count - 7) * cell, cell, style.eye, light, style.eyeShape)
  ctx.restore()
}

function roundedRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number
) {
  const r = Math.max(0, Math.min(radius, width / 2, height / 2))
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

function drawTracking(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  tracking: number,
  align: 'left' | 'right' | 'center' = 'left'
) {
  ctx.save()
  ctx.textAlign = 'left'
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
  ctx.restore()
}

function wrapLines(ctx: CanvasRenderingContext2D, text: string, maxWidth: number) {
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
    if (wrapLines(ctx, text, maxWidth).length <= maxLines) {
      return { size, lines: wrapLines(ctx, text, maxWidth) }
    }
  }
  ctx.font = `400 ${minSize}px ${family}`
  return { size: minSize, lines: wrapLines(ctx, text, maxWidth).slice(0, maxLines) }
}

function truncateLine(ctx: CanvasRenderingContext2D, text: string, maxWidth: number) {
  if (ctx.measureText(text).width <= maxWidth) return text
  let value = text
  while (value.length > 1 && ctx.measureText(`${value}…`).width > maxWidth) {
    value = value.slice(0, -1)
  }
  return `${value.trimEnd()}…`
}

function paintMotif(
  ctx: CanvasRenderingContext2D,
  style: QrStyle,
  width: number,
  height: number,
  destinationIndex: number,
  panel: { x: number; y: number; size: number }
) {
  ctx.save()
  if (style.motif === 'halo') {
    const glowA = ctx.createRadialGradient(width * 0.84, height * 0.14, 0, width * 0.84, height * 0.14, width * 0.7)
    glowA.addColorStop(0, 'rgba(103,232,249,0.17)')
    glowA.addColorStop(1, 'rgba(103,232,249,0)')
    ctx.fillStyle = glowA
    ctx.fillRect(0, 0, width, height)

    const glowB = ctx.createRadialGradient(width * 0.1, height * 0.88, 0, width * 0.1, height * 0.88, width * 0.66)
    glowB.addColorStop(0, 'rgba(167,139,250,0.16)')
    glowB.addColorStop(1, 'rgba(167,139,250,0)')
    ctx.fillStyle = glowB
    ctx.fillRect(0, 0, width, height)

    ctx.strokeStyle = 'rgba(247,245,239,0.05)'
    ctx.lineWidth = 1
    for (let x = 56; x <= width - 56; x += 72) {
      ctx.beginPath()
      ctx.moveTo(x, 56)
      ctx.lineTo(x, height - 56)
      ctx.stroke()
    }
    for (let y = 56; y <= height - 56; y += 72) {
      ctx.beginPath()
      ctx.moveTo(56, y)
      ctx.lineTo(width - 56, y)
      ctx.stroke()
    }
    ctx.strokeStyle = 'rgba(201,242,75,0.16)'
    ctx.lineWidth = 1
    ctx.beginPath()
    ctx.arc(panel.x + panel.size / 2, panel.y + panel.size / 2, panel.size * 0.64, 0, Math.PI * 2)
    ctx.stroke()
    ctx.beginPath()
    ctx.arc(panel.x + panel.size / 2, panel.y + panel.size / 2, panel.size * 0.78, 0, Math.PI * 2)
    ctx.stroke()
  }

  if (style.motif === 'paper') {
    ctx.fillStyle = 'rgba(91,75,138,0.055)'
    ctx.font = `400 520px Georgia, serif`
    ctx.textAlign = 'right'
    ctx.textBaseline = 'alphabetic'
    ctx.fillText(String(destinationIndex + 1).padStart(2, '0'), width - 30, height * 0.72)
    ctx.strokeStyle = 'rgba(21,22,26,0.12)'
    ctx.lineWidth = 1
    ctx.beginPath()
    ctx.moveTo(56, 150)
    ctx.lineTo(width - 56, 150)
    ctx.stroke()
    ctx.fillStyle = 'rgba(201,242,75,0.5)'
    ctx.fillRect(56, 168, 150, 10)
    ctx.strokeStyle = 'rgba(21,22,26,0.22)'
    for (let i = 0; i < 5; i += 1) {
      const y = 930 + i * 16
      ctx.beginPath()
      ctx.moveTo(56, y)
      ctx.lineTo(200 + i * 40, y)
      ctx.stroke()
    }
  }

  if (style.motif === 'signal') {
    ctx.strokeStyle = 'rgba(103,232,249,0.045)'
    ctx.lineWidth = 1
    for (let y = 0; y < height; y += 6) {
      ctx.beginPath()
      ctx.moveTo(0, y)
      ctx.lineTo(width, y)
      ctx.stroke()
    }
    ctx.strokeStyle = 'rgba(103,232,249,0.35)'
    ctx.lineWidth = 2
    ctx.beginPath()
    ctx.moveTo(56, 156)
    ctx.lineTo(180, 156)
    ctx.stroke()
    ctx.fillStyle = 'rgba(103,232,249,0.9)'
    for (let i = 0; i < 4; i += 1) {
      ctx.fillRect(56 + i * 18, 168, 8, 2)
    }
    ctx.fillStyle = 'rgba(201,242,75,0.06)'
    ctx.beginPath()
    ctx.arc(panel.x + panel.size / 2, panel.y + panel.size / 2, panel.size * 0.7, 0, Math.PI * 2)
    ctx.fill()
  }

  if (style.motif === 'riso') {
    ctx.fillStyle = 'rgba(201,242,75,0.55)'
    ctx.fillRect(width - 360, 118, 304, 26)
    ctx.fillStyle = 'rgba(91,75,138,0.16)'
    ctx.fillRect(panel.x + 18, panel.y + 20, panel.size, panel.size)
    ctx.fillStyle = 'rgba(201,242,75,0.18)'
    ctx.beginPath()
    ctx.arc(width - 110, height - 160, 150, 0, Math.PI * 2)
    ctx.fill()
    ctx.fillStyle = 'rgba(36,29,58,0.18)'
    for (let row = 0; row < 8; row += 1) {
      for (let col = 0; col < 10; col += 1) {
        ctx.beginPath()
        ctx.arc(70 + col * 18, 210 + row * 18, 3.2, 0, Math.PI * 2)
        ctx.fill()
      }
    }
  }

  if (style.motif === 'ledger') {
    ctx.strokeStyle = 'rgba(21,22,26,0.18)'
    ctx.lineWidth = 1
    ctx.setLineDash([6, 8])
    ctx.strokeRect(40, 40, width - 80, height - 80)
    ctx.setLineDash([])
    for (let i = 0; i < 9; i += 1) {
      const x = 40 + i * 125
      ctx.fillStyle = style.paper
      ctx.beginPath()
      ctx.arc(x, 40, 9, 0, Math.PI * 2)
      ctx.fill()
      ctx.beginPath()
      ctx.arc(x, height - 40, 9, 0, Math.PI * 2)
      ctx.fill()
    }
    ctx.strokeStyle = 'rgba(21,22,26,0.16)'
    for (let i = 0; i < 4; i += 1) {
      const y = 640 + i * 38
      ctx.beginPath()
      ctx.moveTo(56, y)
      ctx.lineTo(470, y)
      ctx.stroke()
    }
  }

  if (style.motif === 'brut') {
    ctx.fillStyle = '#0b0d12'
    ctx.fillRect(0, 0, width, 34)
    ctx.fillRect(0, height - 34, width, 34)
    ctx.fillStyle = 'rgba(11,13,18,0.09)'
    ctx.font = '400 600px Georgia, serif'
    ctx.textAlign = 'right'
    ctx.textBaseline = 'alphabetic'
    ctx.fillText(String(destinationIndex + 1).padStart(2, '0'), width + 20, height * 0.9)
    ctx.fillStyle = '#0b0d12'
    ctx.fillRect(0, 126, width, 10)
  }
  ctx.restore()
}

export type QrPosterOptions = {
  matrix: QRCode
  destination: QrDestination
  destinationIndex: number
  style: QrStyle
  brand: HTMLImageElement | null
  fonts: BrandCardFonts
  scale?: number
}

const POSTER = 1080

function paintQrPoster(ctx: CanvasRenderingContext2D, options: QrPosterOptions) {
  const { matrix, destination, destinationIndex, style, brand, fonts } = options
  const width = POSTER
  const height = POSTER
  const pad = 56
  const plateSize = style.layout === 'brut' ? 480 : 540
  const plateX =
    style.layout === 'left' || style.layout === 'brut' ? pad : width - pad - plateSize
  const plateY = style.layout === 'brut' ? 410 : 360
  const panel = { x: plateX, y: plateY, size: plateSize }
  const styleNumber = QR_STYLES.findIndex((item) => item.key === style.key) + 1

  // Base field.
  ctx.fillStyle = style.paper
  ctx.fillRect(0, 0, width, height)
  paintMotif(ctx, style, width, height, destinationIndex, panel)

  // Frame.
  ctx.strokeStyle =
    style.theme === 'dark' ? 'rgba(247,245,239,0.14)' : 'rgba(11,13,18,0.16)'
  ctx.lineWidth = 1
  ctx.strokeRect(28, 28, width - 56, height - 56)

  // Masthead.
  const markR = 22
  const markCx = pad + markR
  const markCy = 92
  ctx.save()
  ctx.beginPath()
  ctx.arc(markCx, markCy, markR, 0, Math.PI * 2)
  ctx.clip()
  ctx.fillStyle = '#f7f5ef'
  ctx.fillRect(markCx - markR, markCy - markR, markR * 2, markR * 2)
  if (brand) {
    const inner = markR * 2 - 6
    ctx.drawImage(brand, markCx - inner / 2, markCy - inner / 2, inner, inner)
  } else {
    ctx.fillStyle = '#0b0d12'
    ctx.font = `400 ${markR}px ${fonts.display}`
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText('MI', markCx, markCy + 1)
  }
  ctx.restore()

  ctx.textAlign = 'left'
  ctx.textBaseline = 'alphabetic'
  ctx.fillStyle = style.text
  ctx.font = `600 16px ${fonts.body}`
  ctx.fillText('DAVID AKPOVIRORO OKE', markCx + markR + 14, markCy - 2)
  ctx.fillStyle = style.muted
  ctx.font = `400 9px ${fonts.mono}`
  drawTracking(ctx, 'MR IRIDESCENT · YOUR IT PARTNER', markCx + markR + 14, markCy + 16, 1.3)

  ctx.textAlign = 'right'
  ctx.fillStyle = style.muted
  ctx.font = `400 9px ${fonts.mono}`
  drawTracking(ctx, `DOOR ${String(destinationIndex + 1).padStart(2, '0')} / ${QR_DESTINATIONS.length}`, width - pad, 86, 1.8, 'right')
  ctx.fillStyle = style.accent
  drawTracking(ctx, `EDITION ${String(styleNumber).padStart(2, '0')} / 06`, width - pad, 106, 1.8, 'right')

  // Text block.
  const align: 'left' | 'right' =
    style.layout === 'left' || style.layout === 'brut' ? 'right' : 'left'
  const textX = align === 'right' ? width - pad : pad
  const textWidth = style.layout === 'brut' ? 420 : 400
  const kickerY = style.layout === 'brut' ? 214 : 204
  const titleStart = style.layout === 'brut' ? 300 : 286

  ctx.textAlign = align
  ctx.fillStyle = style.accent
  ctx.font = `400 11px ${fonts.mono}`
  drawTracking(ctx, destination.kicker.toUpperCase(), textX, kickerY, 1.7, align)

  const title = fitTitle(
    ctx,
    destination.posterLabel,
    textWidth,
    style.layout === 'brut' ? 92 : 76,
    style.layout === 'brut' ? 58 : 46,
    2,
    fonts.display
  )
  ctx.fillStyle = style.text
  ctx.font = `400 ${title.size}px ${fonts.display}`
  const lineHeight = title.size * 1.02
  title.lines.forEach((line, index) => {
    ctx.fillText(line, textX, titleStart + index * lineHeight)
  })

  const titleBottom = titleStart + (title.lines.length - 1) * lineHeight
  const routeY = titleBottom + 46
  ctx.fillStyle = style.muted
  ctx.font = `400 13px ${fonts.mono}`
  ctx.fillText(truncateLine(ctx, destination.path, textWidth), textX, routeY)

  if (style.motif !== 'ledger') {
    ctx.fillStyle = style.muted
    ctx.font = `400 14px ${fonts.body}`
    const allBlurb = wrapLines(ctx, destination.blurb, textWidth)
    const blurb = allBlurb.slice(0, 2)
    if (allBlurb.length > 2 && blurb[1]) {
      let last = blurb[1]
      while (last.length > 1 && ctx.measureText(`${last}…`).width > textWidth) {
        last = last.slice(0, -1)
      }
      blurb[1] = `${last.trimEnd()}…`
    }
    blurb.forEach((line, index) => {
      ctx.fillText(line, textX, routeY + 30 + index * 21)
    })
  }

  if (style.motif === 'ledger') {
    const rows = [
      ['FORMAT', '1080 × 1080'],
      ['ERROR', 'Q · 25%'],
      ['QUIET', '4 MODULES'],
      ['TRACK', 'UTM · QR-ATELIER'],
    ]
    ctx.textAlign = 'left'
    ctx.font = `400 10px ${fonts.mono}`
    rows.forEach(([key, value], index) => {
      const y = 520 + index * 52
      ctx.fillStyle = 'rgba(21,22,26,0.4)'
      drawTracking(ctx, key, pad, y, 1.4)
      ctx.fillStyle = style.text
      ctx.fillText(value, pad, y + 20)
    })
  }

  // QR plate.
  ctx.save()
  if (style.theme !== 'acid') {
    ctx.shadowColor = 'rgba(0,0,0,0.35)'
    ctx.shadowBlur = 34
    ctx.shadowOffsetY = 14
  } else {
    ctx.shadowColor = 'rgba(0,0,0,0.35)'
    ctx.shadowBlur = 0
    ctx.shadowOffsetX = 14
    ctx.shadowOffsetY = 14
  }
  ctx.fillStyle = style.plate
  roundedRect(ctx, plateX, plateY, plateSize, plateSize, 20)
  ctx.fill()
  ctx.restore()

  ctx.strokeStyle =
    style.theme === 'dark' ? 'rgba(247,245,239,0.2)' : 'rgba(11,13,18,0.18)'
  ctx.lineWidth = 1
  roundedRect(ctx, plateX - 10, plateY - 10, plateSize + 20, plateSize + 20, 26)
  ctx.stroke()

  const qrInset = style.layout === 'brut' ? 24 : 26
  drawQrMatrix(
    ctx,
    matrix,
    plateX + qrInset,
    plateY + qrInset,
    plateSize - qrInset * 2,
    style,
    style.plate
  )

  ctx.textAlign = 'center'
  ctx.fillStyle = style.muted
  ctx.font = `400 9px ${fonts.mono}`
  drawTracking(
    ctx,
    'SCAN · OPEN THE DOOR',
    plateX + plateSize / 2,
    plateY + plateSize + 30,
    1.6,
    'center'
  )

  // Footer.
  const dividerY = 948
  ctx.strokeStyle =
    style.theme === 'dark' ? 'rgba(247,245,239,0.2)' : 'rgba(11,13,18,0.22)'
  ctx.beginPath()
  ctx.moveTo(pad, dividerY)
  ctx.lineTo(width - pad, dividerY)
  ctx.stroke()

  ctx.textAlign = 'left'
  ctx.fillStyle = style.text
  ctx.font = `400 30px ${fonts.display}`
  ctx.fillText('mriridescent.africa', pad, 992)

  ctx.textAlign = 'right'
  ctx.fillStyle = style.muted
  ctx.font = `400 12px ${fonts.mono}`
  ctx.fillText(`${site.phone} · WhatsApp`, width - pad, 980)

  ctx.textAlign = 'left'
  ctx.fillStyle = style.accent
  ctx.font = `400 9px ${fonts.mono}`
  drawTracking(ctx, site.motto.toUpperCase(), pad, 1024, 1.7)

  ctx.textAlign = 'right'
  ctx.fillStyle = style.muted
  ctx.font = `400 9px ${fonts.mono}`
  drawTracking(ctx, 'LAGOS · WORKING WORLDWIDE', width - pad, 1018, 1.2, 'right')
}

export function renderQrPoster(canvas: HTMLCanvasElement, options: QrPosterOptions) {
  const scale = options.scale ?? 1
  canvas.width = Math.max(1, Math.round(POSTER * scale))
  canvas.height = Math.max(1, Math.round(POSTER * scale))
  const ctx = canvas.getContext('2d')
  if (!ctx) return false
  ctx.setTransform(scale, 0, 0, scale, 0, 0)
  ctx.clearRect(0, 0, POSTER, POSTER)
  paintQrPoster(ctx, options)
  return true
}

function escapeXml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function svgShape(
  x: number,
  y: number,
  cell: number,
  shape: QrModuleShape,
  fill: string
) {
  if (shape === 'square') {
    return `<rect x="${x.toFixed(2)}" y="${y.toFixed(2)}" width="${cell.toFixed(2)}" height="${cell.toFixed(2)}" fill="${fill}"/>`
  }
  if (shape === 'rounded') {
    return `<rect x="${x.toFixed(2)}" y="${y.toFixed(2)}" width="${cell.toFixed(2)}" height="${cell.toFixed(2)}" rx="${(cell * 0.3).toFixed(2)}" fill="${fill}"/>`
  }
  if (shape === 'diamond') {
    const cx = x + cell / 2
    const cy = y + cell / 2
    return `<path d="M${cx.toFixed(2)} ${(y + cell * 0.08).toFixed(2)} L${(x + cell * 0.92).toFixed(2)} ${cy.toFixed(2)} L${cx.toFixed(2)} ${(y + cell * 0.92).toFixed(2)} L${(x + cell * 0.08).toFixed(2)} ${cy.toFixed(2)} Z" fill="${fill}"/>`
  }
  return `<circle cx="${(x + cell / 2).toFixed(2)}" cy="${(y + cell / 2).toFixed(2)}" r="${(cell * 0.48).toFixed(2)}" fill="${fill}"/>`
}

function svgEye(
  x: number,
  y: number,
  cell: number,
  color: string,
  light: string,
  shape: QrEyeShape
) {
  const size = cell * 7
  if (shape === 'circle') {
    const cx = x + size / 2
    const cy = y + size / 2
    return [
      `<circle cx="${cx}" cy="${cy}" r="${size / 2}" fill="${color}"/>`,
      `<circle cx="${cx}" cy="${cy}" r="${cell * 2.5}" fill="${light}"/>`,
      `<circle cx="${cx}" cy="${cy}" r="${cell * 1.5}" fill="${color}"/>`,
    ].join('')
  }
  if (shape === 'rounded') {
    return [
      `<rect x="${x}" y="${y}" width="${size}" height="${size}" rx="${cell * 1.5}" fill="${color}"/>`,
      `<rect x="${x + cell}" y="${y + cell}" width="${cell * 5}" height="${cell * 5}" rx="${cell}" fill="${light}"/>`,
      `<rect x="${x + cell * 2}" y="${y + cell * 2}" width="${cell * 3}" height="${cell * 3}" rx="${cell * 0.65}" fill="${color}"/>`,
    ].join('')
  }
  return [
    `<rect x="${x}" y="${y}" width="${size}" height="${size}" fill="${color}"/>`,
    `<rect x="${x + cell}" y="${y + cell}" width="${cell * 5}" height="${cell * 5}" fill="${light}"/>`,
    `<rect x="${x + cell * 2}" y="${y + cell * 2}" width="${cell * 3}" height="${cell * 3}" fill="${color}"/>`,
  ].join('')
}

/** A print-ready vector QR. The poster is PNG; this is the code on its own. */
export function buildQrSvg(matrix: QRCode, destination: QrDestination, style: QrStyle) {
  const count = matrix.modules.size
  const view = 1024
  const cell = view / (count + QUIET * 2)
  const origin = QUIET * cell
  const parts: string[] = []
  const fill = style.gradient ? 'url(#qr-gradient)' : style.code

  for (let row = 0; row < count; row += 1) {
    for (let col = 0; col < count; col += 1) {
      if (!matrix.modules.get(row, col)) continue
      if (isFinderModule(row, col, count)) continue
      parts.push(svgShape(origin + col * cell, origin + row * cell, cell, style.shape, fill))
    }
  }

  parts.push(svgEye(origin, origin, cell, style.eye, style.plate, style.eyeShape))
  parts.push(svgEye(origin + (count - 7) * cell, origin, cell, style.eye, style.plate, style.eyeShape))
  parts.push(svgEye(origin, origin + (count - 7) * cell, cell, style.eye, style.plate, style.eyeShape))

  const gradient = style.gradient
    ? `<defs><linearGradient id="qr-gradient" x1="12%" y1="10%" x2="88%" y2="90%"><stop offset="0" stop-color="${style.gradient[0]}"/><stop offset="1" stop-color="${style.gradient[1]}"/></linearGradient></defs>`
    : ''

  return [
    `<svg xmlns="http://www.w3.org/2000/svg" width="${view}" height="${view}" viewBox="0 0 ${view} ${view}" role="img" aria-label="${escapeXml(`QR code for ${destination.label}`)}">`,
    `<title>${escapeXml(`${destination.label} — ${qrDestinationDisplay(destination)}`)}</title>`,
    gradient,
    `<rect width="${view}" height="${view}" fill="${style.plate}"/>`,
    parts.join(''),
    '</svg>',
  ].join('')
}

export function downloadQrSvg(svg: string, filename: string) {
  const blob = new Blob([svg], { type: 'image/svg+xml;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  window.setTimeout(() => URL.revokeObjectURL(url), 1000)
}
