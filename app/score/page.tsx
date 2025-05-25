"use client"

import { useState, useEffect, Suspense } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import { ScoreRevealAnimation } from "@/components/score-reveal-animation"
import { ScoreBreakdownCards } from "@/components/score-breakdown-cards"
import { FeatherTransition } from "@/components/feather-transition"
import { AIAssistant } from "@/components/ai-assistant"
import { useNavigation } from "@/components/navigation-context"
import { ArrowRight, CheckCircle } from "lucide-react"

function ScoreContent() {
  const router = useRouter()
  const { state, markStepComplete, setUserScore } = useNavigation()
  const [loading, setLoading] = useState(true)
  const [showScore, setShowScore] = useState(false)
  const [showBreakdown, setShowBreakdown] = useState(false)
  const [showCTA, setShowCTA] = useState(false)
  const [score, setScore] = useState(77)
  const [userName] = useState("Sam")
  const [isCompleted, setIsCompleted] = useState(false)

  // Mock score calculation based on saved onboarding data
  useEffect(() => {
    const calculateScore = () => {
      const savedData = localStorage.getItem("nestwell-onboarding-data")
      if (savedData) {
        try {
          const data = JSON.parse(savedData)

          // Simple scoring algorithm
          let calculatedScore = 0

          // Age factor (younger = more time to prepare)
          if (data.age < 60) calculatedScore += 20
          else if (data.age < 70) calculatedScore += 15
          else calculatedScore += 10

          // Financial factors
          if (data.monthlyIncome > 2500) calculatedScore += 20
          else if (data.monthlyIncome > 1500) calculatedScore += 15
          else calculatedScore += 10

          if (data.householdSavings > 100000) calculatedScore += 20
          else if (data.householdSavings > 50000) calculatedScore += 15
          else if (data.householdSavings > 20000) calculatedScore += 10
          else calculatedScore += 5

          // Insurance coverage
          if (data.insuranceTypes?.length > 3) calculatedScore += 15
          else if (data.insuranceTypes?.length > 1) calculatedScore += 10
          else calculatedScore += 5

          // Life goals planning
          if (data.lifeGoals?.length > 3) calculatedScore += 10
          else if (data.lifeGoals?.length > 1) calculatedScore += 7
          else calculatedScore += 3

          // Employment status
          if (data.employmentStatus === "retired") calculatedScore += 10
          else if (data.employmentStatus === "semi-retired") calculatedScore += 8
          else calculatedScore += 5

          // Debt factor
          if (!data.majorDebts) calculatedScore += 5

          setScore(Math.min(calculatedScore, 100))
        } catch (error) {
          console.error("Error parsing onboarding data:", error)
          setScore(77) // Default score
        }
      } else {
        setScore(77) // Default score
      }
    }

    // Check if already completed
    if (state.hasCompletedScore) {
      setIsCompleted(true)
      const savedScore = localStorage.getItem("nestwell-user-score")
      if (savedScore) {
        setScore(Number.parseInt(savedScore))
      }
      setLoading(false)
      setShowScore(true)
      setShowBreakdown(true)
      setShowCTA(true)
      return
    }

    // Animation sequence for new completion
    const timer1 = setTimeout(() => {
      calculateScore()
      setLoading(false)
      setShowScore(true)
    }, 1500)

    const timer2 = setTimeout(() => {
      setShowBreakdown(true)
    }, 3000)

    const timer3 = setTimeout(() => {
      setShowCTA(true)
    }, 4500)

    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
      clearTimeout(timer3)
    }
  }, [state.hasCompletedScore])

  const handleCompleteAssessment = () => {
    try {
      // Mark score as completed
      markStepComplete("score")
      setUserScore(score)
      setIsCompleted(true)

      // Save additional user data
      localStorage.setItem(
        "nestwell-user-data",
        JSON.stringify({
          userName,
          userScore: score,
          scoreChange: score, // First time, so change equals score
          completedModules: ["score"],
          recentActivity: ["Completed NestWell Score assessment"],
          lastVisit: new Date().toISOString(),
        }),
      )

      // Navigate to hub
      router.push("/hub")
    } catch (error) {
      console.error("Error completing assessment:", error)
      // Show error message to user
      alert("There was an issue saving your progress. Please try again.")
    }
  }

  const handleContinueToHub = () => {
    if (state.canAccessHub) {
      router.push("/hub")
    } else {
      handleCompleteAssessment()
    }
  }

  const getScoreMessage = (score: number) => {
    if (score >= 80) return "You're soaring. Let's keep you flying high."
    if (score >= 60) return "A strong nest with room to grow."
    if (score >= 40) return "A good foundation—let's build on it."
    return "We'll help strengthen your nest step by step."
  }

  const getPersonalizedMessage = (score: number, name: string) => {
    if (score >= 70) return `${name}, you're more ready than you think.`
    if (score >= 50) return `${name}, you're on the right track.`
    return `${name}, every step forward matters.`
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-sky-100 relative overflow-hidden">
      {/* Loading transition with feathers */}
      {loading && <FeatherTransition />}

      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm relative z-10">
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

          {/* Navigation breadcrumb */}
          <div className="hidden md:flex items-center gap-2 text-sm text-gray-600">
            <span>Assessment</span>
            {isCompleted && (
              <>
                <span>→</span>
                <span className="text-green-600 flex items-center gap-1">
                  <CheckCircle className="w-4 h-4" />
                  Completed
                </span>
              </>
            )}
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 md:py-12 relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Score Reveal Section */}
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-serif font-semibold mb-8 text-gray-800">Your NestWell Score</h1>

            {/* Score Animation */}
            <div className="mb-8">
              <ScoreRevealAnimation score={score} showScore={showScore} />
            </div>

            {/* Score Messages */}
            {showScore && (
              <div className="space-y-4 animate-fade-in-up">
                <h2 className="text-2xl font-semibold text-gray-800">{getScoreMessage(score)}</h2>
                <p className="text-lg text-gray-600">{getPersonalizedMessage(score, userName)}</p>
              </div>
            )}
          </div>

          {/* Score Breakdown Cards */}
          {showBreakdown && (
            <div className="mb-12">
              <ScoreBreakdownCards score={score} />
            </div>
          )}

          {/* Call to Action Section */}
          {showCTA && (
            <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm animate-fade-in">
              <CardContent className="pt-8 pb-8">
                <div className="text-center space-y-6">
                  <div>
                    <h2 className="text-2xl font-semibold mb-4 text-gray-800">
                      {isCompleted ? "Welcome back!" : "Ready to strengthen your nest?"}
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                      {isCompleted
                        ? `Your score of ${score} shows great progress. Continue exploring your personalized planning hub.`
                        : `Your score of ${score} is a solid foundation. Let's explore personalized recommendations to help you plan for the future with confidence.`}
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button
                      onClick={handleContinueToHub}
                      size="lg"
                      className="bg-amber-500 hover:bg-amber-600 text-white px-8 py-4 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                    >
                      {isCompleted ? "Go to Your Hub" : "Continue to Your Hub"}
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>

                    <Link href="/insights">
                      <Button
                        variant="outline"
                        size="lg"
                        className="border-amber-300 text-amber-700 hover:bg-amber-50 px-8 py-4 text-lg rounded-full"
                      >
                        View Detailed Insights
                      </Button>
                    </Link>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
                    <Link href="/healthcare-costs">
                      <Button variant="outline" className="w-full h-auto p-4 text-left">
                        <div>
                          <p className="font-medium">Healthcare Costs</p>
                          <p className="text-sm text-gray-600">Compare NHS vs private options</p>
                        </div>
                      </Button>
                    </Link>

                    <Link href="/care-scenarios">
                      <Button variant="outline" className="w-full h-auto p-4 text-left">
                        <div>
                          <p className="font-medium">Care Planning</p>
                          <p className="text-sm text-gray-600">Explore future care scenarios</p>
                        </div>
                      </Button>
                    </Link>

                    <Link href="/planner">
                      <Button variant="outline" className="w-full h-auto p-4 text-left">
                        <div>
                          <p className="font-medium">Timeline Planner</p>
                          <p className="text-sm text-gray-600">Build your planning timeline</p>
                        </div>
                      </Button>
                    </Link>
                  </div>

                  <p className="text-sm text-gray-500">
                    {isCompleted
                      ? "All your planning tools are ready and waiting."
                      : "Your personalized planning hub awaits with tailored insights and recommendations."}
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </main>

      {/* AI Assistant */}
      <AIAssistant userName={userName} userScore={score} currentPage="score" />
    </div>
  )
}

export default function ScorePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-sky-100 relative overflow-hidden">
          <FeatherTransition />
        </div>
      }
    >
      <ScoreContent />
    </Suspense>
  )
}
