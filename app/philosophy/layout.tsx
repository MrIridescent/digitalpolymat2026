import type { Metadata } from 'next'
import { generateMetaTags, pageMetadata } from '@/lib/seo-config'

export const metadata: Metadata = generateMetaTags(
  pageMetadata.philosophy.title,
  pageMetadata.philosophy.description,
  ['engineering philosophy', 'systems thinking', 'security by default', 'craft'],
  '/philosophy'
)

export default function PhilosophyLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
