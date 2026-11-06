import type { Metadata } from 'next'
import Link from 'next/link'
import {
  ArrowUpRight,
  Contrast,
  FileCode2,
  Frame,
  MessageCircle,
  Printer,
  QrCode,
  ScanLine,
  Share2,
  Sparkles,
} from 'lucide-react'
import { QrAtelier } from '@/components/site/QrAtelier'
import { SectionHeading } from '@/components/site/SectionHeading'
import { generateMetaTags, pageMetadata } from '@/lib/seo-config'
import { site, whatsappLink } from '@/lib/profile'
import { QR_DESTINATIONS, QR_STYLES } from '@/lib/qr-studio'

export const metadata: Metadata = generateMetaTags(
  pageMetadata.qrAtelier.title,
  pageMetadata.qrAtelier.description,
  [
    'QR code atelier',
    'branded QR codes',
    'QR code for portfolio',
    'QR code design',
    'David Akpoviroro Oke QR',
    'scannable brand codes',
  ],
  '/qr'
)

const useCases = [
  {
    icon: Frame,
    title: 'A proposal cover',
    body: 'One code to the case study that matches the conversation, instead of a homepage that asks the reader to find it.',
  },
  {
    icon: Printer,
    title: 'A printed leave-behind',
    body: 'The vector SVG holds its edge at any size. Put a résumé door on a business card and a work door on a deck.',
  },
  {
    icon: Share2,
    title: 'A social detail',
    body: 'Post the poster, then let the scan carry the context: offer, proof, résumé, or the first message.',
  },
  {
    icon: MessageCircle,
    title: 'A WhatsApp handoff',
    body: 'Send the code for the exact offer being discussed. The tracked URL shows which door the conversation came through.',
  },
]

const printNotes = [
  {
    icon: QrCode,
    title: 'Four modules of quiet',
    body: 'The white space around the code is part of the code. Nothing in the artwork crosses it — not the frame, not the type.',
  },
  {
    icon: Contrast,
    title: 'Dark on light, always',
    body: 'Every edition keeps near-black modules on an ivory plate with error correction Q. The poster can change; the contrast does not.',
  },
  {
    icon: FileCode2,
    title: 'Vector when it leaves the screen',
    body: 'The PNG is for feeds and slides. The SVG is the code alone, drawn as paths, for anything that will be printed or enlarged.',
  },
]

export default function QrPage() {
  return (
    <div className="pt-16">
      <section className="aurora grain border-b border-white/10 pb-14 pt-20 sm:pt-24">
        <div className="shell grid items-end gap-10 lg:grid-cols-[1.25fr_0.75fr]">
          <div>
            <p className="eyebrow">QR atelier · codes with a point of view</p>
            <h1 className="display mt-6 max-w-4xl text-5xl text-white sm:text-6xl lg:text-7xl">
              Every door,{' '}
              <span className="iridescent-text italic">its own code.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/55">
              {QR_DESTINATIONS.length} real pages, {QR_STYLES.length} art-directed
              editions. Each code opens a specific part of the practice with
              campaign tracking, and each one downloads as a 1080 × 1080 poster or
              a vector SVG for print. Same scan, different room.
            </p>
            <p className="mt-4 font-mono text-[0.6rem] uppercase tracking-[0.16em] text-[#c9f24b]/75">
              {site.positioning} · {site.motto}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#atelier" className="btn btn-primary">
                <ScanLine className="h-4 w-4" />
                Open the atelier
              </a>
              <Link href="/share" className="btn btn-ghost">
                <Share2 className="h-4 w-4" />
                Pair it with a service card
              </Link>
            </div>
          </div>

          <div className="glass-panel rounded-2xl p-6">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-[#c9f24b]">
                <Sparkles className="h-4 w-4" />
              </span>
              <div>
                <p className="font-mono text-[0.58rem] uppercase tracking-[0.16em] text-white/35">
                  Atelier status
                </p>
                <p className="text-sm font-medium text-white">Open · render on demand</p>
              </div>
            </div>
            <dl className="mt-6 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-white/10 bg-white/10">
              <div className="bg-ink-soft p-4">
                <dt className="font-mono text-[0.55rem] uppercase tracking-[0.12em] text-white/30">
                  Doors
                </dt>
                <dd className="display mt-1 text-2xl text-white">
                  {String(QR_DESTINATIONS.length).padStart(2, '0')}
                </dd>
              </div>
              <div className="bg-ink-soft p-4">
                <dt className="font-mono text-[0.55rem] uppercase tracking-[0.12em] text-white/30">
                  Editions
                </dt>
                <dd className="display mt-1 text-2xl text-white">
                  {String(QR_STYLES.length).padStart(2, '0')}
                </dd>
              </div>
              <div className="bg-ink-soft p-4">
                <dt className="font-mono text-[0.55rem] uppercase tracking-[0.12em] text-white/30">
                  Output
                </dt>
                <dd className="mt-1 font-mono text-xs text-white/70">PNG · SVG</dd>
              </div>
              <div className="bg-ink-soft p-4">
                <dt className="font-mono text-[0.55rem] uppercase tracking-[0.12em] text-white/30">
                  Contact
                </dt>
                <dd className="mt-1 font-mono text-xs text-white/70">Email + WhatsApp</dd>
              </div>
            </dl>
            <p className="mt-4 text-[0.68rem] leading-relaxed text-white/35">
              Every code is generated in the browser from the real page URL. No
              third-party redirect service, no expiring short link, and no
              personal inbox printed on the artwork.
            </p>
          </div>
        </div>
      </section>

      <section id="atelier" className="section scroll-mt-24 border-t border-white/10">
        <div className="shell">
          <SectionHeading
            eyebrow="The atelier"
            title={
              <>
                Choose a door.{' '}
                <span className="text-white/35">Give it a wardrobe.</span>
              </>
            }
            body="The destination decides what the scan is for; the edition decides how it feels. The preview is the exact artwork you download, rendered at full size before a single pixel leaves the browser."
          />
          <div className="mt-10">
            <QrAtelier />
          </div>
        </div>
      </section>

      <section className="paper section border-t border-black/10">
        <div className="shell">
          <div className="max-w-3xl">
            <p className="eyebrow !text-[#5b4b8a]">A code is a promise to scan</p>
            <h2 className="display mt-5 text-4xl text-[#15161a] sm:text-5xl">
              The rules that keep the{' '}
              <span className="italic text-[#5b4b8a]">artwork honest.</span>
            </h2>
            <p className="mt-6 text-base leading-relaxed text-[#4b4d54]">
              A dressed QR code still has to work in bad light, at an angle, on a
              phone held too far away. These three constraints are non-negotiable;
              everything else is style.
            </p>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {printNotes.map((item) => (
              <article
                key={item.title}
                className="rounded-2xl border border-black/10 bg-white/55 p-6"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-black/10 bg-white text-[#5b4b8a]">
                  <item.icon className="h-4 w-4" />
                </span>
                <h3 className="mt-5 text-base font-semibold text-[#15161a]">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[#5b5d64]">
                  {item.body}
                </p>
              </article>
            ))}
          </div>

          <p className="mt-8 max-w-3xl text-xs leading-relaxed text-[#6b6d74]">
            Practical minimums: 3 cm on a business card, 5 cm on a flyer, and a
            little more when the URL is long. Test the final print with the phone
            that will actually scan it. If a code is going onto a dark surface,
            print the light plate with it — do not invert the code.
          </p>
        </div>
      </section>

      <section className="section border-t border-white/10">
        <div className="shell">
          <SectionHeading
            eyebrow="Where a code earns its place"
            title={
              <>
                Not everywhere.{' '}
                <span className="text-white/35">Where it removes a step.</span>
              </>
            }
            body="A QR code is useful when the person is already holding something and the next action should be one motion. These are the places it does real work."
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {useCases.map((item, index) => (
              <article
                key={item.title}
                className="card card-glass h-full p-5"
              >
                <div className="card-spot" aria-hidden="true" />
                <div className="flex items-start justify-between gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-[#c9f24b]">
                    <item.icon className="h-4 w-4" />
                  </span>
                  <span className="font-mono text-[0.52rem] uppercase tracking-[0.1em] text-white/25">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>
                <h3 className="mt-5 text-base font-semibold text-white">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/45">{item.body}</p>
              </article>
            ))}
          </div>

          <div className="mt-10 flex flex-col items-start justify-between gap-5 rounded-2xl border border-white/10 bg-ink-soft p-6 sm:flex-row sm:items-center">
            <div>
              <p className="eyebrow">The human fallback</p>
              <p className="mt-2 max-w-xl text-sm leading-relaxed text-white/50">
                A code is not a replacement for a conversation. If the scan is the
                start, WhatsApp {site.phone} is the next step — and the first
                consultation is still $0.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <a
                href={whatsappLink(
                  'Hi David — I scanned one of your QR codes and would like to talk about a project.'
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
              >
                <MessageCircle className="h-4 w-4" />
                Start on WhatsApp
              </a>
              <Link href="/contact" className="btn btn-ghost">
                The brief form
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
