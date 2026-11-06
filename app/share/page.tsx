import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight, Download, MessageCircle, QrCode, Share2 } from 'lucide-react'
import { BrandCardStudio } from '@/components/site/BrandCardStudio'
import { ShareKit } from '@/components/site/ShareKit'
import { SectionHeading } from '@/components/site/SectionHeading'
import { generateMetaTags, pageMetadata } from '@/lib/seo-config'
import { site, whatsappLink } from '@/lib/profile'

export const metadata: Metadata = generateMetaTags(
  pageMetadata.share.title,
  pageMetadata.share.description,
  [
    'share David Akpoviroro Oke',
    'refer a product delivery architect',
    'hire a systems engineer Lagos',
    'share portfolio',
  ],
  '/share'
)

const reasons = [
  {
    title: 'A specific referral travels further',
    body:
      'A short note that names the role, the problem, or the person beats a generic link. The templates here give you that starting point without writing from scratch.',
  },
  {
    title: 'The intent stays attached',
    body:
      'Every shared link carries the reason it was sent. When someone opens it, the site shows a relevant next step instead of the same homepage for everyone.',
  },
  {
    title: 'Nothing is inflated',
    body:
      'The work, credentials, and claims are public and checkable. Share the record, not a promise — it holds up better in a hiring or client conversation.',
  },
]

export default function SharePage() {
  return (
    <div className="pt-16">
      <section className="aurora grain border-b border-white/10 pb-14 pt-20 sm:pt-24">
        <div className="shell grid items-end gap-10 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <p className="eyebrow">Share kit · referrals that convert</p>
            <h1 className="display mt-6 max-w-4xl text-5xl text-white sm:text-6xl lg:text-7xl">
              Help the right person{' '}
              <span className="iridescent-text italic">find the work.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/55">
              Most good opportunities arrive through a recommendation, not an
              advert. Choose a service card or a message template, and send it to
              one person who should see it.
            </p>
            <p className="mt-4 font-mono text-[0.6rem] uppercase tracking-[0.16em] text-[#c9f24b]/75">
              {site.positioning} · {site.motto}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={whatsappLink(
                  'Hi David — I would like to share your work with someone. Which link should I use?'
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
              >
                <MessageCircle className="h-4 w-4" />
                Ask me what fits
              </a>
              <Link href="/projects" className="btn btn-ghost">
                See the work first
                <ArrowUpRight className="h-4 w-4" />
              </Link>
              <Link href="/qr" className="btn btn-ghost">
                <QrCode className="h-4 w-4" />
                QR atelier
              </Link>
              <a href="#service-cards" className="btn btn-ghost">
                <Download className="h-4 w-4" />
                Download a service card
              </a>
            </div>
          </div>

          <div className="glass-panel p-5">
            <div className="overflow-hidden rounded-xl bg-[#f7f5ef] p-4">
              <Image
                src="/media/brand/mr-iridescent-logo.png"
                alt="Mr Iridescent — Creative Renaissance Man brand lockup"
                width={1200}
                height={704}
                className="h-auto w-full"
              />
            </div>
            <div className="mt-4 flex items-center justify-between gap-3">
              <p className="font-mono text-[0.56rem] uppercase tracking-[0.14em] text-white/40">
                Press-ready lockup
              </p>
              <Link
                href="/media"
                className="inline-flex items-center gap-1 text-xs text-white/55 hover:text-white"
              >
                <Share2 className="h-3 w-3" />
                Media library
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section
        id="service-cards"
        className="section scroll-mt-24 border-t border-white/10"
      >
        <div className="shell">
          <SectionHeading
            eyebrow="Downloadable service cards"
            title={
              <>
                One image, one offer,{' '}
                <span className="text-white/35">ready to send.</span>
              </>
            }
            body="Pick the service you are recommending, choose a format, and add the reason you are sharing it. Every card carries the offer, the website, the phone number, and a QR code that opens the matching destination — phone-first, no guesswork."
          />
          <div className="mt-10">
            <BrandCardStudio />
          </div>
        </div>
      </section>

      <section className="section border-t border-white/10">
        <div className="shell">
          <SectionHeading
            eyebrow="Message templates"
            title={
              <>
                Write the note{' '}
                <span className="text-white/35">that travels with it.</span>
              </>
            }
            body="The image does the visual work. The message carries the intent, so the person receiving it knows exactly why it was sent."
          />
          <div className="mt-10">
            <ShareKit />
          </div>
        </div>
      </section>

      <section className="section border-t border-white/10 bg-ink-soft/40">
        <div className="shell">
          <SectionHeading
            eyebrow="Why this works"
            title={
              <>
                A referral is a{' '}
                <span className="text-white/35">trust transfer.</span>
              </>
            }
            body="The share kit exists so the recommendation is easy, specific, and honest."
          />
          <div className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 md:grid-cols-3">
            {reasons.map((reason, index) => (
              <div key={reason.title} className="bg-ink-soft p-7">
                <span className="font-mono text-[0.6rem] text-white/25">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h3 className="mt-5 text-lg font-semibold text-white">
                  {reason.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-white/50">
                  {reason.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-tight border-t border-white/10">
        <div className="shell flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <div>
            <p className="eyebrow">The other side</p>
            <h2 className="display mt-3 text-3xl text-white sm:text-4xl">
              Received a link from someone?
            </h2>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/50">
              Start with the intent you were sent for, or message {site.name}{' '}
              directly. A two-line context is enough.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              <MessageCircle className="h-4 w-4" />
              Chat on WhatsApp
            </a>
            <Link href="/contact" className="btn btn-ghost">
              Contact form
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
