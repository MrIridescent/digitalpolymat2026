import type { Metadata } from 'next'
import { generateMetaTags, pageMetadata } from '@/lib/seo-config'

export const metadata: Metadata = generateMetaTags(
  pageMetadata.quotes.title,
  pageMetadata.quotes.description,
  ['quotes', 'polymath', 'craft', 'learning', 'technology'],
  '/quotes'
)

export default function QuotesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
