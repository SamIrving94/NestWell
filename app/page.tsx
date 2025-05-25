"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { NestAnimation } from "@/components/nest-animation"
import { FeatherFloat } from "@/components/feather-float"
import { FeaturesSection } from "@/components/features-section"

export default function Home() {
  const router = useRouter()
  const [showContent, setShowContent] = useState(false)
  const [showHeadline, setShowHeadline] = useState(false)
  const [showSubtitle, setShowSubtitle] = useState(false)
  const [showButton, setShowButton] = useState(false)
  const [isReturningUser, setIsReturningUser] = useState(false)

  useEffect(() => {
    // Check if user has completed onboarding and should go to hub
    const hasCompletedScore = localStorage.getItem("nestwell-score-complete")
    const hasVisitedHub = localStorage.getItem("nestwell-hub-visited")

    if (hasCompletedScore || hasVisitedHub) {
      // Redirect returning users to hub
      router.push("/hub")
      return
    }

    // Animation sequence timing for new users
    const timer1 = setTimeout(() => setShowContent(true), 2000) // After nest animation
    const timer2 = setTimeout(() => setShowHeadline(true), 2500)
    const timer3 = setTimeout(() => setShowSubtitle(true), 3500)
    const timer4 = setTimeout(() => setShowButton(true), 4200)

    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
      clearTimeout(timer3)
      clearTimeout(timer4)
    }
  }, [router])

  // New user experience
  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-amber-50 via-orange-50 to-sky-100">
      {/* Floating feathers */}
      <FeatherFloat />

      {/* Main content container */}
      <div className="flex flex-col items-center justify-center min-h-screen px-4 relative z-10">
        {/* Nest Animation */}
        <div className="mb-8">
          <NestAnimation />
        </div>

        {/* Content that appears after animation */}
        <div className={`text-center transition-opacity duration-1000 ${showContent ? "opacity-100" : "opacity-0"}`}>
          {/* Main headline with typewriter effect */}
          <h1
            className={`text-4xl md:text-6xl font-serif mb-6 text-gray-800 transition-all duration-1000 ${showHeadline ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
          >
            <span className="typewriter">{showHeadline && "Plan a life well-lived."}</span>
          </h1>

          {/* Subtitle */}
          <p
            className={`text-xl md:text-2xl mb-12 text-gray-600 max-w-2xl mx-auto transition-all duration-1000 delay-300 ${showSubtitle ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
          >
            With NestWell, you're never planning alone.
          </p>

          {/* Call to action button */}
          <div
            className={`transition-all duration-1000 delay-500 ${showButton ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
          >
            <Link href="/onboarding">
              <Button
                size="lg"
                className="bg-amber-500 hover:bg-amber-600 text-white px-8 py-4 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group"
              >
                Begin Planning
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="ml-2 group-hover:translate-x-1 transition-transform duration-300"
                >
                  <path d="M5 12h14" />
                  <path d="M12 5l7 7-7 7" />
                </svg>
              </Button>
            </Link>
          </div>

          {/* Welcome message for first-time users */}
          <p
            className={`mt-8 text-sm text-gray-500 transition-all duration-1000 delay-700 ${showButton ? "opacity-100" : "opacity-0"}`}
          >
            Welcome, we're so glad you're here.
          </p>
        </div>
      </div>

      {/* Add Features Section here */}
      {showContent && <FeaturesSection />}

      {/* Subtle brand mark in corner */}
      <div className="absolute bottom-6 left-6 flex items-center gap-2 opacity-60">
        <div className="w-6 h-6 rounded-full bg-amber-500 flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-white"
          >
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
          </svg>
        </div>
        <span className="text-sm font-medium text-gray-600">NestWell</span>
      </div>
    </div>
  )
}
