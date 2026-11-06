/**
 * Generates the complete favicon set from the Mr Iridescent monogram.
 *
 * Source: public/media/brand/mr-iridescent-mark.png
 * Output: favicon.ico (multi-size), PNG favicons, Apple touch icon,
 *         Android icons, and an SVG wrapper that embeds the 512px mark.
 *
 * Run with: npm run generate:favicon
 */
import sharp from 'sharp'
import { readFile, writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'

const root = new URL('../', import.meta.url)
const path = (relative) => fileURLToPath(new URL(relative, root))

const source = path('public/media/brand/mr-iridescent-mark.png')

// The mark is full-colour artwork: a black disc with transparent corners.
// Trim any residual transparent edge and composite it intact onto the plate.
const trimmed = await sharp(source).trim({ threshold: 12 }).png().toBuffer()
const trimmedMeta = await sharp(trimmed).metadata()
const artWidth = trimmedMeta.width ?? 512
const artHeight = trimmedMeta.height ?? 512

const PLATE = '#f7f5ef'
const CONTENT_RATIO = 0.9

function plateSvg(size) {
  const radius = Math.round(size * 0.22)
  return Buffer.from(
    `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
      <rect width="${size}" height="${size}" rx="${radius}" fill="${PLATE}"/>
    </svg>`
  )
}

async function render(size) {
  const content = Math.round(size * CONTENT_RATIO)
  const art = await sharp(trimmed)
    .resize(content, content, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer()
  const artMeta = await sharp(art).metadata()
  const left = Math.round((size - (artMeta.width ?? content)) / 2)
  const top = Math.round((size - (artMeta.height ?? content)) / 2)

  return sharp(plateSvg(size))
    .composite([{ input: art, top, left }])
    .png({ palette: true, quality: 92, compressionLevel: 9 })
    .toBuffer()
}

const outputs = [
  ['public/favicon-16x16.png', 16],
  ['public/favicon-32x32.png', 32],
  ['public/favicon-48x48.png', 48],
  ['public/favicon-96x96.png', 96],
  ['public/apple-touch-icon.png', 180],
  ['public/android-chrome-192x192.png', 192],
  ['public/android-chrome-512x512.png', 512],
]

const rendered = new Map()
for (const [file, size] of outputs) {
  const buffer = await render(size)
  rendered.set(size, buffer)
  await writeFile(path(file), buffer)
}

// Multi-size ICO: 16, 32, 48, 64, 128, 256.
const icoSizes = [16, 32, 48, 64, 128, 256]
const images = []
for (const size of icoSizes) {
  images.push({ size, buffer: rendered.get(size) ?? (await render(size)) })
}

const header = Buffer.alloc(6)
header.writeUInt16LE(0, 0)
header.writeUInt16LE(1, 2)
header.writeUInt16LE(images.length, 4)

let offset = 6 + images.length * 16
const entries = []
for (const { size, buffer } of images) {
  const entry = Buffer.alloc(16)
  entry[0] = size >= 256 ? 0 : size
  entry[1] = size >= 256 ? 0 : size
  entry[2] = 0
  entry[3] = 0
  entry.writeUInt16LE(1, 4)
  entry.writeUInt16LE(32, 6)
  entry.writeUInt32LE(buffer.length, 8)
  entry.writeUInt32LE(offset, 12)
  entries.push(entry)
  offset += buffer.length
}

await writeFile(
  path('public/favicon.ico'),
  Buffer.concat([header, ...entries, ...images.map((image) => image.buffer)])
)

// SVG wrapper with a 192px plate embedded. Browsers render favicons at small
// sizes, so 192px stays crisp while keeping the SVG around 20 KB instead of
// embedding the full 512px master.
const svgArt = rendered.get(192) ?? (await render(192))
const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" role="img" aria-label="Mr Iridescent monogram">
  <image width="512" height="512" href="data:image/png;base64,${svgArt.toString('base64')}"/>
</svg>
`
await writeFile(path('public/favicon.svg'), svg)

const manifest = {
  name: 'David Akpoviroro Oke — Mr Iridescent',
  short_name: 'Mr Iridescent',
  description:
    'David Akpoviroro Oke, Mr Iridescent — Digital Product Delivery Architect, systems engineer, and Creative Renaissance Man.',
  start_url: '/',
  display: 'standalone',
  background_color: '#08090c',
  theme_color: '#08090c',
  icons: [
    {
      src: '/android-chrome-192x192.png',
      sizes: '192x192',
      type: 'image/png',
      purpose: 'any',
    },
    {
      src: '/android-chrome-512x512.png',
      sizes: '512x512',
      type: 'image/png',
      purpose: 'any',
    },
  ],
}
await writeFile(path('public/site.webmanifest'), `${JSON.stringify(manifest, null, 2)}\n`)

console.log(`Favicon set generated from the ${artWidth}×${artHeight} mark.`)
console.log('favicon.ico, favicon.svg, PNG icons, apple-touch-icon, Android icons, site.webmanifest')
