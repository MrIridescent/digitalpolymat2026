import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import {
  ArrowUpRight,
  FileText,
  FolderOpen,
  ImageIcon,
  Layers,
  Palette,
  ShieldCheck,
  Sparkles,
} from 'lucide-react'
import { CopyPathButton } from '@/components/site/CopyPathButton'
import { BrandKitGallery } from '@/components/site/BrandKitGallery'
import { OrgLogo } from '@/components/site/OrgLogo'
import { generateMetaTags, pageMetadata } from '@/lib/seo-config'
import { mediaAssets, mediaByCategory, mediaFolders } from '@/lib/media'
import { site } from '@/lib/profile'

export const metadata: Metadata = generateMetaTags(
  pageMetadata.media.title,
  pageMetadata.media.description,
  [
    'media library',
    'brand assets',
    'press kit',
    'service cards',
    'boundless creativity unleashed',
    'David Akpoviroro Oke images',
  ],
  '/media'
)

const categoryMeta = {
  portrait: {
    label: 'Portrait',
    icon: ImageIcon,
    tone: 'text-[#c4b5fd]',
    description: 'Editorial photography used across the site.',
  },
  brand: {
    label: 'Brand',
    icon: Palette,
    tone: 'text-[#67e8f9]',
    description: 'Marks, icons, and social cards generated from one visual system.',
  },
  document: {
    label: 'Document',
    icon: FileText,
    tone: 'text-[#fcd34d]',
    description: 'Print-ready files served from stable public URLs.',
  },
  evidence: {
    label: 'Evidence',
    icon: ShieldCheck,
    tone: 'text-emerald-300',
    description: 'Credential and event captures, registered as they are added.',
  },
} as const

function formatBytes(size?: string) {
  return size ? `${size}` : '—'
}

export default function MediaPage() {
  const portraits = mediaByCategory('portrait')
  const brand = mediaByCategory('brand')
  const documents = mediaByCategory('document')

  return (
    <div className="pt-16">
      <section className="aurora grain border-b border-white/10 pb-14 pt-20 sm:pt-24">
        <div className="shell grid items-end gap-10 lg:grid-cols-[1.25fr_0.75fr]">
          <div>
            <p className="eyebrow">Media library · asset registry</p>
            <h1 className="display mt-6 max-w-3xl text-5xl text-white sm:text-6xl lg:text-7xl">
              Every asset,{' '}
              <span className="iridescent-text italic">where you can edit it.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/55">
              This is the working inventory of portraits, brand files, evidence,
              and documents used by {site.name}. Each entry names the repository
              path and the pages that consume it, so a file can be found and
              replaced without hunting through components. Brand files and
              documents download directly; the portrait does not.
            </p>
            <p className="mt-4 font-mono text-[0.6rem] uppercase tracking-[0.16em] text-[#c9f24b]/75">
              {site.positioning} · {site.motto}
            </p>
          </div>

          <div className="glass-panel rounded-2xl p-6">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-[#c4b5fd]">
                <Layers className="h-4 w-4" />
              </span>
              <div>
                <p className="font-mono text-[0.58rem] uppercase tracking-[0.16em] text-white/35">
                  Registry status
                </p>
                <p className="text-sm font-medium text-white">
                  {mediaAssets.length} tracked assets
                </p>
              </div>
            </div>
            <dl className="mt-6 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-white/10 bg-white/10">
              <div className="bg-ink-soft p-4">
                <dt className="font-mono text-[0.55rem] uppercase tracking-[0.12em] text-white/30">
                  Portraits
                </dt>
                <dd className="display mt-1 text-2xl text-white">
                  {String(portraits.length).padStart(2, '0')}
                </dd>
              </div>
              <div className="bg-ink-soft p-4">
                <dt className="font-mono text-[0.55rem] uppercase tracking-[0.12em] text-white/30">
                  Brand files
                </dt>
                <dd className="display mt-1 text-2xl text-white">
                  {String(brand.length).padStart(2, '0')}
                </dd>
              </div>
              <div className="bg-ink-soft p-4">
                <dt className="font-mono text-[0.55rem] uppercase tracking-[0.12em] text-white/30">
                  Documents
                </dt>
                <dd className="display mt-1 text-2xl text-white">
                  {String(documents.length).padStart(2, '0')}
                </dd>
              </div>
              <div className="bg-ink-soft p-4">
                <dt className="font-mono text-[0.55rem] uppercase tracking-[0.12em] text-white/30">
                  Folders
                </dt>
                <dd className="display mt-1 text-2xl text-white">
                  {String(mediaFolders.length).padStart(2, '0')}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      {/* Folder map */}
      <section className="section-tight">
        <div className="shell grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div className="min-w-0">
            <p className="eyebrow">Directory map</p>
            <h2 className="display mt-5 text-4xl text-white sm:text-5xl">
              A place for every kind of file.
            </h2>
            <p className="mt-5 max-w-xl text-sm leading-relaxed text-white/55">
              Images live under <code className="font-mono text-white/75">public/media</code>{' '}
              and are served from the matching URL. Documents keep the stable{' '}
              <code className="font-mono text-white/75">/documents</code> path so
              existing links continue to work.
            </p>

            <pre className="mt-8 w-full max-w-full overflow-x-auto rounded-2xl border border-white/10 bg-[#07080b] p-4 font-mono text-[0.64rem] leading-relaxed text-white/55 sm:p-5 sm:text-[0.7rem]">
{`public/
├── media/
│   ├── portraits/   editorial photography
│   ├── brand/       social cards + marks
│   └── evidence/    badge & event captures
├── documents/       downloadable PDFs
├── favicon.svg      source vector mark
├── favicon.ico      generated
└── apple-touch-icon.png`}
            </pre>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {mediaFolders.map((folder) => (
              <div key={folder.path} className="card p-5">
                <div className="flex items-start justify-between gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-[#67e8f9]">
                    <FolderOpen className="h-4 w-4" />
                  </span>
                  <span className="font-mono text-[0.55rem] uppercase tracking-[0.1em] text-white/25">
                    {folder.contains}
                  </span>
                </div>
                <h3 className="mt-4 text-sm font-semibold text-white">
                  {folder.title}
                </h3>
                <p className="mt-2 font-mono text-[0.62rem] text-[#c4b5fd]">
                  {folder.path}
                </p>
                <p className="mt-2 text-xs leading-relaxed text-white/45">
                  {folder.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Portraits */}
      <section className="section border-t border-white/10 bg-ink-soft/40">
        <div className="shell">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="eyebrow">Portrait</p>
              <h2 className="display mt-4 text-4xl text-white sm:text-5xl">
                The face of the practice.
              </h2>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-white/45">
              One portrait, one crop, reused deliberately — so the site stays
              coherent when the photograph changes.
            </p>
          </div>

          {portraits.map((asset) => (
            <article
              key={asset.slug}
              className="mt-10 grid gap-6 overflow-hidden rounded-[1.6rem] border border-white/10 bg-ink-soft lg:grid-cols-[0.42fr_0.58fr]"
            >
              <div className="relative min-h-[22rem] bg-black/20">
                <Image
                  src={asset.src}
                  alt={asset.title}
                  width={990}
                  height={1280}
                  sizes="(max-width: 1024px) 92vw, 460px"
                  draggable={false}
                  className="h-full w-full select-none object-cover object-center"
                />
              </div>
              <div className="p-6 sm:p-9">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="tag">{categoryMeta.portrait.label}</span>
                  <span className="chip !px-3 !py-1 !text-[0.6rem]">
                    {asset.format} · {asset.dimensions}
                  </span>
                  <span className="chip !border-amber-300/25 !px-3 !py-1 !text-[0.6rem] !text-amber-200/80">
                    No download
                  </span>
                </div>
                <h3 className="display mt-5 text-3xl text-white">{asset.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/55">
                  {asset.description}
                </p>

                <dl className="mt-7 grid gap-px overflow-hidden rounded-xl border border-white/10 bg-white/10 sm:grid-cols-2">
                  <div className="bg-ink-soft p-4">
                    <dt className="font-mono text-[0.55rem] uppercase tracking-[0.12em] text-white/30">
                      Availability
                    </dt>
                    <dd className="mt-1.5 text-sm text-amber-200/80">
                      Editorial only · no download
                    </dd>
                  </div>
                  <div className="bg-ink-soft p-4">
                    <dt className="font-mono text-[0.55rem] uppercase tracking-[0.12em] text-white/30">
                      File size
                    </dt>
                    <dd className="mt-1.5 text-sm text-white/65">
                      {formatBytes(asset.size)}
                    </dd>
                  </div>
                </dl>

                <div className="mt-4 rounded-xl border border-amber-300/20 bg-amber-300/[0.04] p-4">
                  <div className="flex items-start gap-3">
                    <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-amber-200/80" />
                    <p className="text-xs leading-relaxed text-white/50">
                      The portrait is licensed for this site only. It is not
                      offered for download, reuse, or redistribution. For press
                      or speaking use, request an approved image through the
                      contact page.
                    </p>
                  </div>
                </div>

                <div className="mt-4 rounded-xl border border-white/10 bg-white/[0.02] p-4">
                  <p className="font-mono text-[0.55rem] uppercase tracking-[0.12em] text-white/30">
                    Edit this file
                  </p>
                  <div className="mt-2 flex flex-wrap items-center gap-2">
                    <code className="break-all font-mono text-[0.65rem] text-[#67e8f9]">
                      {asset.projectPath}
                    </code>
                    <CopyPathButton value={asset.projectPath} />
                  </div>
                </div>

                <p className="mt-5 text-xs leading-relaxed text-white/40">
                  {asset.note}
                </p>

                <div className="mt-6 flex flex-wrap gap-2">
                  {asset.usedIn.map((usage) => (
                    <Link
                      key={usage.href}
                      href={usage.href}
                      className="inline-flex items-center gap-1.5 rounded-full border border-white/10 px-3 py-1.5 text-[0.68rem] text-white/50 transition-colors hover:border-white/25 hover:text-white"
                    >
                      {usage.label}
                      <ArrowUpRight className="h-3 w-3" />
                    </Link>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Brand + documents */}
      <section className="section border-t border-white/10">
        <div className="shell">
          <p className="eyebrow">Brand & documents</p>
          <h2 className="display mt-4 max-w-3xl text-4xl text-white sm:text-5xl">
            One mark, in every size it needs to be.
          </h2>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/45">
            Brand files and documents download directly from this page. The
            portrait is deliberately excluded — it is editorial use only.
          </p>

          <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {[...brand, ...documents].map((asset) => {
              const meta = categoryMeta[asset.category]
              const Icon = meta.icon
              return (
                <article key={asset.slug} className="card flex h-full flex-col p-5">
                  <div className="card-spot" aria-hidden="true" />
                  <div className="flex items-start justify-between gap-3">
                    <span className={`flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] ${meta.tone}`}>
                      <Icon className="h-4 w-4" />
                    </span>
                    <span className="font-mono text-[0.55rem] uppercase tracking-[0.1em] text-white/25">
                      {asset.format} {asset.dimensions ? `· ${asset.dimensions}` : ''}
                    </span>
                  </div>

                  <div className="mt-5 flex min-h-[8rem] items-center justify-center overflow-hidden rounded-xl border border-white/10 bg-black/20 p-4">
                    {asset.format === 'PDF' ? (
                      <div className="text-center">
                        <FileText className="mx-auto h-9 w-9 text-[#fcd34d]" />
                        <p className="mt-2 font-mono text-[0.58rem] uppercase tracking-[0.12em] text-white/40">
                          Two-page PDF
                        </p>
                      </div>
                    ) : asset.format === 'SVG' ? (
                      <Image
                        src={asset.src}
                        alt={asset.title}
                        width={120}
                        height={120}
                        className="h-24 w-24 object-contain"
                      />
                    ) : (
                      <Image
                        src={asset.src}
                        alt={asset.title}
                        width={asset.category === 'brand' ? 1200 : 400}
                        height={asset.category === 'brand' ? 630 : 400}
                        className={
                          asset.category === 'brand'
                            ? 'max-h-36 w-full rounded-lg object-contain'
                            : 'h-24 w-24 rounded-xl object-contain'
                        }
                      />
                    )}
                  </div>

                  <h3 className="mt-5 text-sm font-semibold text-white">{asset.title}</h3>
                  <p className="mt-2 text-xs leading-relaxed text-white/45">
                    {asset.description}
                  </p>

                  <div className="mt-4 flex items-center justify-between gap-3 border-t border-white/10 pt-4">
                    <code className="break-all font-mono text-[0.58rem] text-white/35">
                      {asset.projectPath}
                    </code>
                    <CopyPathButton value={asset.projectPath} label="Copy" />
                  </div>

                  <a
                    href={asset.src}
                    download
                    className="mt-4 inline-flex items-center gap-1.5 text-[0.68rem] font-medium text-white/50 transition-colors hover:text-white"
                  >
                    Download asset
                    <ArrowUpRight className="h-3 w-3" />
                  </a>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      {/* Branded service designs */}
      <section
        id="service-designs"
        className="section scroll-mt-24 border-t border-white/10 bg-ink-soft/40"
      >
        <div className="shell">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-2xl">
              <p className="eyebrow">Branded service designs</p>
              <h2 className="display mt-4 text-4xl text-white sm:text-5xl">
                Nine offers.{' '}
                <span className="iridescent-text italic">One identity.</span>
              </h2>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-white/45">
              Download a finished card for any service category — from growth
              hacking and reputation management to product delivery and creative
              direction. Every card carries {site.positioning}, “{site.motto}”,{' '}
              <span className="text-white/70">mriridescent.africa</span>, and
              WhatsApp {site.phone} — so a shared image always leads back to a
              conversation.
            </p>
          </div>

          <div className="mt-10">
            <BrandKitGallery />
          </div>

          <p className="mt-6 text-xs leading-relaxed text-white/35">
            Need the code without the card? The{' '}
            <Link
              href="/qr"
              className="text-white/70 underline decoration-white/20 underline-offset-4 hover:decoration-white"
            >
              QR atelier
            </Link>{' '}
            turns any page into a standalone poster or a print-ready vector.
          </p>
        </div>
      </section>

      {/* Evidence */}
      <section className="section border-t border-white/10 bg-ink-soft/40">
        <div className="shell grid items-start gap-10 lg:grid-cols-[0.62fr_0.38fr] lg:gap-16">
          <div>
            <p className="eyebrow">Evidence</p>
            <h2 className="display mt-4 text-4xl text-white sm:text-5xl">
              Credentials, with receipts.
            </h2>
            <p className="mt-5 max-w-2xl text-sm leading-relaxed text-white/55">
              Badge screenshots, Cisco completion captures, event photography, and
              credential evidence belong in{' '}
              <code className="font-mono text-white/75">public/media/evidence/</code>.
              Add the file, then register it in{' '}
              <code className="font-mono text-white/75">lib/media.ts</code> so it
              appears in this inventory and can be referenced by the credentials
              page.
            </p>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/45">
              The public credential links on{' '}
              <Link href="/credentials" className="text-white/80 underline decoration-white/20 underline-offset-4 hover:decoration-white">
                the credentials page
              </Link>{' '}
              point to Credly, LinkedIn, Instagram, and ORCID. Screenshots here are
              supporting evidence, not a replacement for the verifiable source.
            </p>
            <div className="mt-4 flex items-center gap-2">
              <OrgLogo name="Credly" size={22} />
              <OrgLogo name="LinkedIn" size={22} />
              <OrgLogo name="Instagram" size={22} />
              <OrgLogo name="ORCID" size={22} />
            </div>
          </div>

          <div className="rounded-2xl border border-dashed border-white/15 bg-white/[0.02] p-7">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-emerald-300">
              <ShieldCheck className="h-4 w-4" />
            </span>
            <p className="mt-5 text-sm font-medium text-white">
              No evidence files registered yet.
            </p>
            <p className="mt-2 text-xs leading-relaxed text-white/40">
              Drop a PNG or JPEG into the evidence folder, add a registry entry,
              and it will show up here automatically.
            </p>
            <div className="mt-5 flex items-center gap-2">
              <code className="break-all font-mono text-[0.6rem] text-white/45">
                public/media/evidence/
              </code>
              <CopyPathButton value="public/media/evidence/" label="Copy" />
            </div>
          </div>
        </div>
      </section>

      <section className="section-tight border-t border-white/10">
        <div className="shell flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <div>
            <p className="eyebrow">Press & reuse</p>
            <h2 className="display mt-3 text-3xl text-white sm:text-4xl">
              Need a specific format?
            </h2>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/50">
              For press, speaking, or partnership use, request the format you need
              rather than cropping a social card.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/contact" className="btn btn-primary">
              <Sparkles className="h-4 w-4" />
              Request an asset
            </Link>
            <Link href="/credentials" className="btn btn-ghost">
              Credentials
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
