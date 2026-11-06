/**
 * Generates the brand raster assets from source vectors.
 * Run with: node scripts/generate-brand-assets.mjs
 */
import sharp from 'sharp'
import { fileURLToPath } from 'node:url'

const root = new URL('../', import.meta.url)
const path = (relative) => fileURLToPath(new URL(relative, root))

// Favicons are generated separately from the Mr Iridescent mark:
//   npm run generate:favicon
// This script owns the social card only, so the two sources never overwrite
// each other.

const logoMark = await sharp(path('public/media/brand/mr-iridescent-mark.png'))
  .resize(52, 52, { fit: 'contain', background: '#f7f5ef' })
  .toBuffer()

const logoPlate = await sharp(
  Buffer.from(
    '<svg width="76" height="76" xmlns="http://www.w3.org/2000/svg"><rect width="76" height="76" rx="16" fill="#f7f5ef"/></svg>'
  )
)
  .composite([{ input: logoMark, top: 12, left: 12 }])
  .png()
  .toBuffer()

const portrait = await sharp(path('public/media/portraits/david-akpoviroro-oke.jpg'))
  .resize(360, 450, { fit: 'cover', position: 'attention' })
  .toBuffer()

const portraitMask = Buffer.from(
  `<svg width="360" height="450" xmlns="http://www.w3.org/2000/svg">
    <rect width="360" height="450" rx="24" fill="#fff"/>
  </svg>`
)

const portraitRounded = await sharp(portrait)
  .composite([{ input: portraitMask, blend: 'dest-in' }])
  .png()
  .toBuffer()

const background = Buffer.from(`
<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="spectral" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#8b5cf6"/>
      <stop offset="0.36" stop-color="#06b6d4"/>
      <stop offset="0.68" stop-color="#f59e0b"/>
      <stop offset="1" stop-color="#ec4899"/>
    </linearGradient>
    <radialGradient id="violet" cx="0.12" cy="0.1" r="0.65">
      <stop offset="0" stop-color="#8b5cf6" stop-opacity="0.30"/>
      <stop offset="1" stop-color="#8b5cf6" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="cyan" cx="0.86" cy="0.78" r="0.6">
      <stop offset="0" stop-color="#06b6d4" stop-opacity="0.20"/>
      <stop offset="1" stop-color="#06b6d4" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="rose" cx="0.55" cy="1.05" r="0.5">
      <stop offset="0" stop-color="#ec4899" stop-opacity="0.16"/>
      <stop offset="1" stop-color="#ec4899" stop-opacity="0"/>
    </radialGradient>
    <pattern id="grid" width="72" height="72" patternUnits="userSpaceOnUse">
      <path d="M72 0H0V72" fill="none" stroke="#ffffff" stroke-opacity="0.035" stroke-width="1"/>
    </pattern>
  </defs>

  <rect width="1200" height="630" fill="#08090c"/>
  <rect width="1200" height="630" fill="url(#violet)"/>
  <rect width="1200" height="630" fill="url(#cyan)"/>
  <rect width="1200" height="630" fill="url(#rose)"/>
  <rect width="1200" height="630" fill="url(#grid)"/>

  <rect x="72" y="94" width="44" height="2" fill="url(#spectral)"/>
  <text x="128" y="101" font-family="Arial, Helvetica, sans-serif" font-size="15" letter-spacing="5" fill="#a7a9b1">MR. IRIDESCENT</text>

  <text x="70" y="228" font-family="Georgia, 'Times New Roman', serif" font-size="84" fill="#f7f5ef">David Akpoviroro</text>
  <text x="70" y="316" font-family="Georgia, 'Times New Roman', serif" font-size="84" fill="url(#spectral)" font-style="italic">Oke</text>

  <text x="72" y="386" font-family="Arial, Helvetica, sans-serif" font-size="25" fill="#f7f5ef" opacity="0.86">I build systems that think, secure, and scale.</text>
  <text x="72" y="424" font-family="Arial, Helvetica, sans-serif" font-size="20" fill="#a7a9b1">Software engineering · Applied AI · Security</text>

  <rect x="72" y="520" width="600" height="1" fill="#ffffff" fill-opacity="0.12"/>
  <text x="72" y="559" font-family="Arial, Helvetica, sans-serif" font-size="17" letter-spacing="2.4" fill="#a7a9b1">MRIRIDESCENT.AFRICA</text>
  <text x="72" y="586" font-family="Arial, Helvetica, sans-serif" font-size="15" letter-spacing="1.6" fill="#6f717a">LAGOS, NIGERIA · WORKING WORLDWIDE</text>

  <rect x="840" y="90" width="362" height="452" rx="26" fill="none" stroke="#ffffff" stroke-opacity="0.18" stroke-width="1"/>
</svg>`)

await sharp({
  create: {
    width: 1200,
    height: 630,
    channels: 3,
    background: '#08090c',
  },
})
  .composite([
    { input: background, top: 0, left: 0 },
    { input: portraitRounded, top: 91, left: 841 },
    { input: logoPlate, top: 536, left: 1052 },
  ])
  .jpeg({ quality: 90, mozjpeg: true })
  .toFile(path('public/media/brand/og-card.jpg'))

console.log('Social card generated: public/media/brand/og-card.jpg')
