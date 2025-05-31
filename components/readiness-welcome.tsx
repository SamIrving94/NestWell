"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Sparkles, ArrowRight } from "lucide-react"

interface ReadinessWelcomeProps {
  onNext: () => void
}

export function ReadinessWelcome({ onNext }: ReadinessWelcomeProps) {
  const [showContent, setShowContent] = useState(false)
  const [showButton, setShowButton] = useState(false)

  useEffect(() => {
    const timer1 = setTimeout(() => setShowContent(true), 500)
    const timer2 = setTimeout(() => setShowButton(true), 1000)

    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
    }
  }, [])

  return (
    <div className="text-center space-y-8">
      {/* Hero section */}
      <div
        className={`transition-all duration-1000 ${showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
      >
        <div className="w-24 h-24 mx-auto mb-6 relative">
          <div className="w-full h-full bg-gradient-to-br from-teal-400 to-teal-600 rounded-full flex items-center justify-center shadow-lg">
            <Sparkles className="w-12 h-12 text-white" />
          </div>
          <div className="absolute -top-2 -right-2 w-6 h-6 bg-sand-400 rounded-full animate-pulse"></div>
          <div className="absolute -bottom-1 -left-1 w-4 h-4 bg-navy-400 rounded-full animate-pulse delay-300"></div>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold text-navy-800 mb-4">Let's find out how ready you are</h1>

        <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
          We'll ask you a few friendly questions to understand where you are in life, then give you a personalized
          Readiness Score.
        </p>

        <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 max-w-md mx-auto border border-white/20">
          <div className="flex items-center justify-center gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
              <span>5 minutes</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-sand-500 rounded-full"></div>
              <span>No forms</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-navy-500 rounded-full"></div>
              <span>Instant score</span>
            </div>
          </div>
        </div>
      </div>

      {/* Call to action */}
      <div
        className={`transition-all duration-1000 delay-500 ${showButton ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
      >
        <Button
          onClick={onNext}
          size="lg"
          className="bg-teal-500 hover:bg-teal-600 text-white px-12 py-6 text-xl rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 group"
        >
          Start your score
          <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" />
        </Button>

        <p className="text-sm text-gray-500 mt-4">Join over 2 million people planning their future with confidence</p>
      </div>

      {/* Preview cards */}
      <div
        className={`grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 transition-all duration-1000 delay-700 ${showContent ? "opacity-100" : "opacity-0"}`}
      >
        <Card className="border-0 shadow-md bg-white/70 backdrop-blur-sm">
          <CardContent className="p-4 text-center">
            <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <svg className="w-4 h-4 text-teal-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4zM18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" />
              </svg>
            </div>
            <p className="text-sm font-medium text-gray-700">Finance</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md bg-white/70 backdrop-blur-sm">
          <CardContent className="p-4 text-center">
            <div className="w-8 h-8 bg-sand-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <svg className="w-4 h-4 text-sand-600" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M3 6a3 3 0 013-3h10a1 1 0 01.8 1.6L14.25 8l2.55 3.4A1 1 0 0116 13H6a1 1 0 00-1 1v3a1 1 0 11-2 0V6z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <p className="text-sm font-medium text-gray-700">Coverage</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md bg-white/70 backdrop-blur-sm">
          <CardContent className="p-4 text-center">
            <div className="w-8 h-8 bg-navy-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <svg className="w-4 h-4 text-navy-600" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <p className="text-sm font-medium text-gray-700">Health</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md bg-white/70 backdrop-blur-sm">
          <CardContent className="p-4 text-center">
            <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <svg className="w-4 h-4 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <p className="text-sm font-medium text-gray-700">Planning</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
