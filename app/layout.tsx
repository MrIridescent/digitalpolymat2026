import type { Metadata, Viewport } from 'next'
import {
  Bricolage_Grotesque,
  Inter,
  Instrument_Serif,
  JetBrains_Mono,
} from 'next/font/google'
import './globals.css'
import '../styles/dynamic-themes.css'
import '../styles/kinetic.css'
import { generateMetaTags } from '@/lib/seo-config'
import {
  PersonStructuredData,
  WebsiteStructuredData,
  OrganizationStructuredData,
  FAQStructuredData,
} from '@/components/StructuredData'
import { DynamicLayoutSystem } from '@/components/DynamicLayoutSystem'
import { SmoothScroll } from '@/components/motion/SmoothScroll'
import { GsapEffects } from '@/components/motion/GsapEffects'
import { ScrollProgress } from '@/components/motion/ScrollProgress'
import { CursorAura } from '@/components/motion/CursorAura'
import { RouteTransition } from '@/components/motion/RouteTransition'
import { EditorialFrame } from '@/components/kinetic/EditorialFrame'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-instrument-serif',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
})

const bricolage = Bricolage_Grotesque({
  subsets: ['latin'],
  variable: '--font-grotesk',
  display: 'swap',
})

export const metadata: Metadata = generateMetaTags()

export const viewport: Viewport = {
  themeColor: '#08090c',
  colorScheme: 'dark',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${instrumentSerif.variable} ${jetbrainsMono.variable} ${bricolage.variable}`}
    >
      <head>
        <PersonStructuredData />
        <WebsiteStructuredData />
        <OrganizationStructuredData />
        <FAQStructuredData />
      </head>
      <body className="antialiased" suppressHydrationWarning>
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        <SmoothScroll />
        <GsapEffects />
        <RouteTransition />
        <ScrollProgress />
        <CursorAura />
        <EditorialFrame />
        <DynamicLayoutSystem>{children}</DynamicLayoutSystem>
      </body>
    </html>
  )
}
