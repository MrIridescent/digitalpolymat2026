"use client"

import React from 'react'
import { Navigation } from './Navigation'
import { Footer } from './Footer'
import { LiveChat } from './site/LiveChat'
import { ReferralBanner } from './site/ReferralBanner'
import { QuotePassage } from './site/QuotePassage'

type Props = {
  children: React.ReactNode
}

export function DynamicLayoutSystem({ children }: Props) {
  return (
    <div className="min-h-screen flex flex-col bg-ink text-[#f7f5ef]">
      <Navigation />
      <ReferralBanner />
      <main id="main-content" className="flex-1">
        {children}
      </main>
      <QuotePassage />
      <Footer />
      <LiveChat />
    </div>
  )
}
