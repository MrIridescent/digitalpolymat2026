'use client'

import { ArrowLeft } from 'lucide-react'

interface BackButtonProps {
  className?: string
  children?: React.ReactNode
}

export function BackButton({ className = '', children = 'Go Back' }: BackButtonProps) {
  const handleBack = () => {
    if (window.history.length > 1) {
      window.history.back()
    } else {
      window.location.href = '/'
    }
  }

  return (
    <button
      onClick={handleBack}
      className={`btn btn-ghost ${className}`}
    >
      <ArrowLeft className="h-4 w-4" />
      {children}
    </button>
  )
}
