"use client"

import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"

interface OnboardingWelcomeProps {
  onNext: () => void
}

export function OnboardingWelcome({ onNext }: OnboardingWelcomeProps) {
  const [showContent, setShowContent] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setShowContent(true), 300)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div
      className={`text-center py-12 transition-all duration-1000 ${showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
    >
      <div className="mb-8">
        <div className="w-24 h-24 mx-auto mb-6 relative">
          <svg width="96" height="96" viewBox="0 0 96 96" className="animate-pulse">
            <circle cx="48" cy="48" r="35" fill="none" stroke="#f59e0b" strokeWidth="2" strokeDasharray="5,5" />
            <circle cx="48" cy="48" r="20" fill="#fbbf24" opacity="0.3" />
            <circle cx="48" cy="45" r="2" fill="#92400e" />
            <circle cx="44" cy="50" r="1.5" fill="#92400e" />
            <circle cx="52" cy="52" r="1.5" fill="#92400e" />
          </svg>
        </div>

        <h1 className="text-3xl md:text-4xl font-serif font-semibold mb-4 text-gray-800">Let's get to know you</h1>

        <p className="text-xl text-gray-600 mb-2">So we can help you plan what matters.</p>

        <p className="text-sm text-gray-500 mb-8">
          This will take about 3-4 minutes, and we'll save your progress as you go.
        </p>
      </div>

      <Button
        onClick={onNext}
        size="lg"
        className="bg-amber-500 hover:bg-amber-600 text-white px-8 py-4 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
      >
        I'm ready
      </Button>

      <div className="mt-8 text-xs text-gray-400">Your information is private and secure</div>
    </div>
  )
}
