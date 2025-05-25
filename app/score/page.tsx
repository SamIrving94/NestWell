"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import { ScoreRevealAnimation } from "@/components/score-reveal-animation"
import { ScoreBreakdownCards } from "@/components/score-breakdown-cards"
import { FeatherTransition } from "@/components/feather-transition"
import { AIAssistant } from "@/components/ai-assistant"

export default function ScorePage() {
  const router = useRouter()
  const [showScore, setShowScore] = useState(false)
  const [showBreakdown, setShowBreakdown] = useState(false)
  const [showCTA, setShowCTA] = useState(false)
  const [userScore] = useState(77) // Would come from assessment
  const [userName] = useState("Sam") // Would come from user data

  useEffect(() => {
    // Animation sequence
    const timer1 = setTimeout(() => setShowScore(true), 1000)
    const timer2 = setTimeout(() => setShowBreakdown(true), 3000)
    const timer3 = setTimeout(() => setShowCTA(true), 5000)

    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
      clearTimeout(timer3)
    }
  }, [])

  const handleContinueToHub = () => {
    // Save score completion
    localStorage.setItem("nestwell-score-complete", "true")
    localStorage.setItem("nestwell-user-score", userScore.toString())
    localStorage.setItem(
      "nestwell-user-data",
      JSON.stringify({
        userName,
        userScore,
        scoreChange: userScore, // First time, so change equals score
        completedModules: ["score"],
        recentActivity: ["Completed NestWell Score assessment"],
      }),
    )

    // Redirect to hub
    router.push("/hub")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-sky-100 relative overflow-hidden">
      <FeatherTransition />

      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto py-4 px-4 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-amber-500 flex items-center justify-center">
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
                className="text-white"
              >
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
              </svg>
            </div>
            <span className="text-xl font-semibold">NestWell</span>
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-4xl mx-auto">
          {/* Score Reveal */}
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-serif font-semibold mb-8 text-gray-800">Your NestWell Score</h1>

            {showScore && <ScoreRevealAnimation score={userScore} userName={userName} />}
          </div>

          {/* Score Breakdown */}
          {showBreakdown && (
            <div className="mb-12">
              <ScoreBreakdownCards score={userScore} />
            </div>
          )}

          {/* Call to Action */}
          {showCTA && (
            <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm animate-fade-in">
              <CardContent className="pt-8 pb-8">
                <div className="text-center space-y-6">
                  <div>
                    <h2 className="text-2xl font-semibold mb-4 text-gray-800">Ready to strengthen your nest?</h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                      Your score of {userScore} is a great foundation. Let's explore personalized recommendations to
                      help you plan for the future with confidence.
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button
                      onClick={handleContinueToHub}
                      size="lg"
                      className="bg-amber-500 hover:bg-amber-600 text-white px-8 py-4 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                    >
                      Continue to Your Hub
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
                        className="ml-2"
                      >
                        <path d="M5 12h14" />
                        <path d="M12 5l7 7-7 7" />
                      </svg>
                    </Button>

                    <Button
                      variant="outline"
                      size="lg"
                      className="border-amber-300 text-amber-700 hover:bg-amber-50 px-8 py-4 text-lg rounded-full"
                    >
                      Learn More About Your Score
                    </Button>
                  </div>

                  <p className="text-sm text-gray-500">
                    Your personalized planning hub awaits with tailored insights and recommendations.
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </main>

      {/* AI Assistant */}
      <AIAssistant userName={userName} userScore={userScore} currentPage="score" />
    </div>
  )
}
