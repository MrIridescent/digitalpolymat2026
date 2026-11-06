'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowUpRight, Download, Mail, Menu, MessageCircle, X } from 'lucide-react'
import { OrgLogo } from '@/components/site/OrgLogo'
import { Magnetic } from '@/components/kinetic/Magnetic'
import { LocalClock } from '@/components/kinetic/LocalClock'
import { cn } from '@/lib/utils'
import { brandMark, site, socials, whatsappLink } from '@/lib/profile'

const primary = [
  { name: 'Work', href: '/projects' },
  { name: 'Growth', href: '/growth' },
  { name: 'Services', href: '/services' },
  { name: 'About', href: '/about' },
  { name: 'Credentials', href: '/credentials' },
  { name: 'Journal', href: '/blog' },
]

const secondary = [
  { name: 'Case studies', href: '/case-studies' },
  { name: 'Manifesto', href: '/manifesto' },
  { name: 'Green software & Agenda 2063', href: '/advocacy' },
  { name: 'Practice at a glance', href: '/statistics' },
  { name: 'Philosophy', href: '/philosophy' },
  { name: 'Emerging technology', href: '/emerging-tech' },
  { name: 'Quotes', href: '/quotes' },
  { name: 'Résumé', href: '/resume' },
  { name: 'Share kit', href: '/share' },
  { name: 'QR atelier', href: '/qr' },
  { name: 'Media library', href: '/media' },
]

function isActive(pathname: string, href: string) {
  if (href === '/blog') return pathname === '/blog' || pathname.startsWith('/blog/') || pathname === '/writings'
  return pathname === href || pathname.startsWith(`${href}/`)
}

export function Navigation() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  useEffect(() => {
    if (!open) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = previous
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-[85] px-3 pt-3 sm:px-5">
        <div
          className={cn(
            'mx-auto flex h-14 max-w-[1440px] items-center justify-between gap-3 rounded-full border px-3 transition-all duration-500 sm:px-4',
            scrolled || open
              ? 'border-white/10 bg-ink/80 shadow-[0_18px_60px_rgba(0,0,0,0.45)] backdrop-blur-2xl'
              : 'border-transparent bg-transparent'
          )}
        >
          <Link
            href="/"
            className="group flex min-w-0 items-center gap-2.5"
            aria-label={`${site.name} — home`}
          >
            <span className="relative flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#f7f5ef] p-0.5 ring-1 ring-white/20 transition-transform duration-500 group-hover:rotate-[14deg]">
              <Image
                src={brandMark.src}
                alt=""
                width={brandMark.width}
                height={brandMark.height}
                className="h-full w-full object-contain"
              />
            </span>
            <span className="flex min-w-0 flex-col leading-none">
              <span className="truncate text-[0.78rem] font-semibold tracking-tight text-white sm:text-[0.9rem]">
                David Akpoviroro Oke
              </span>
              <span className="mt-1 hidden truncate font-mono text-[0.44rem] uppercase tracking-[0.14em] text-white/40 sm:block">
                Growth partner · Creative Renaissance Man
              </span>
            </span>
          </Link>

          <nav className="hidden items-center gap-0.5 lg:flex" aria-label="Primary">
            {primary.map((item) => {
              const active = isActive(pathname, item.href)
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? 'page' : undefined}
                  className={cn(
                    'relative rounded-full px-3 py-2 text-[0.8rem] font-medium transition-colors',
                    active ? 'text-ink' : 'text-white/55 hover:text-white'
                  )}
                >
                  {active && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-0 rounded-full bg-paper"
                      transition={{ type: 'spring', stiffness: 380, damping: 34 }}
                    />
                  )}
                  <span className="relative z-10">{item.name}</span>
                </Link>
              )
            })}
          </nav>

          <div className="hidden items-center gap-2 lg:flex">
            <a
              href="/documents/David-Oke-Resume-2026.pdf"
              download
              className="hidden items-center gap-1.5 px-3 py-2 font-mono text-[0.58rem] uppercase tracking-[0.14em] text-white/40 transition-colors hover:text-white xl:inline-flex"
            >
              <Download className="h-3 w-3" />
              Résumé
            </a>
            <Magnetic strength={8}>
              <Link
                href="/contact"
                className="k-btn k-btn-acid !min-h-0 !px-4 !py-2.5 !text-[0.78rem]"
              >
                Let’s talk
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            </Magnetic>
          </div>

          <button
            type="button"
            className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/15 text-white/80 transition-colors hover:border-white/35 hover:text-white lg:hidden"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
            animate={reduceMotion ? { opacity: 1 } : { opacity: 1, clipPath: 'inset(0 0 0% 0)' }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[80] overflow-y-auto bg-[#08090c] lg:hidden"
          >
            <div className="absolute inset-0 bg-[radial-gradient(60%_45%_at_20%_10%,rgba(139,92,246,0.18),transparent_70%),radial-gradient(45%_40%_at_85%_60%,rgba(201,242,75,0.1),transparent_70%)]" />
            <div className="grain absolute inset-0" aria-hidden="true" />

            <div className="shell relative flex min-h-[100svh] flex-col justify-between pb-10 pt-24">
              <div>
                <div className="flex items-center justify-between">
                  <p className="k-mono text-white/35">Index</p>
                  <LocalClock />
                </div>

                <nav className="mt-6" aria-label="Mobile primary">
                  {primary.map((item, index) => (
                    <motion.div
                      key={item.href}
                      initial={reduceMotion ? false : { opacity: 0, y: 24 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.55, delay: 0.08 + index * 0.055, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <Link
                        href={item.href}
                        className={cn(
                          'group flex items-baseline justify-between gap-4 border-b border-white/10 py-3.5',
                          isActive(pathname, item.href) ? 'text-white' : 'text-white/60'
                        )}
                      >
                        <span className="k-serif text-[clamp(2.5rem,12vw,4rem)] leading-none transition-colors group-hover:text-[#c9f24b]">
                          {item.name}
                        </span>
                        <span className="k-mono text-white/30">
                          {String(index + 1).padStart(2, '0')}
                        </span>
                      </Link>
                    </motion.div>
                  ))}
                </nav>

                <motion.div
                  initial={reduceMotion ? false : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.35 }}
                  className="mt-8 grid grid-cols-2 gap-x-5 gap-y-2.5"
                >
                  {secondary.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="text-[0.82rem] text-white/45 transition-colors hover:text-white"
                    >
                      {item.name}
                    </Link>
                  ))}
                </motion.div>
              </div>

              <motion.div
                initial={reduceMotion ? false : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.4 }}
                className="mt-10 space-y-4"
              >
                <Link href="/contact" className="k-btn k-btn-acid w-full !justify-between">
                  Start a conversation
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
                <a
                  href="/documents/David-Oke-Resume-2026.pdf"
                  download
                  className="k-btn w-full !justify-between"
                >
                  Download résumé
                  <Download className="h-4 w-4" />
                </a>
                <a
                  href={site.emailHref}
                  className="flex w-fit items-center gap-2 pt-1 text-sm text-white/55 hover:text-white"
                >
                  <Mail className="h-4 w-4 text-[#c4b5fd]" />
                  {site.email}
                </a>
                <a
                  href={whatsappLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-fit items-center gap-2 pt-1 text-sm text-white/55 hover:text-white"
                >
                  <MessageCircle className="h-4 w-4 text-emerald-300" />
                  Chat on WhatsApp
                </a>
                <div className="flex flex-wrap gap-x-4 gap-y-3 pt-2">
                  {socials.map((social) => (
                    <a
                      key={social.href}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 font-mono text-[0.6rem] uppercase tracking-[0.12em] text-white/40 hover:text-white"
                    >
                      <OrgLogo name={social.label} size={16} />
                      {social.label}
                    </a>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
