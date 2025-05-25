"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"
import { ScoreRevealAnimation } from "@/components/score-reveal-animation"
import { ScoreBreakdownCards } from "@/components/score-breakdown-cards"
import { TimelinePlanner } from "@/components/timeline-planner"
import { FeatherTransition } from "@/components/feather-transition"

export default function ScorePage() {
  const [loading, setLoading] = useState(true)
  const [showScore, setShowScore] = useState(false)
  const [showBreakdown, setShowBreakdown] = useState(false)
  const [score, setScore] = useState(0)
  const [userName] = useState("Sam") // Would come from user data

  // Mock score calculation based on saved onboarding data
  useEffect(() => {
    const calculateScore = () => {
      const savedData = localStorage.getItem("nestwell-onboarding-data")
      if (savedData) {
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
      } else {
        setScore(62) // Default score
      }
    }

    // Animation sequence
    const timer1 = setTimeout(() => {
      calculateScore()
      setLoading(false)
      setShowScore(true)
    }, 2500)

    const timer2 = setTimeout(() => {
      setShowBreakdown(true)
    }, 4000)

    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
    }
  }, [])

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

          {/* Tabs for detailed insights */}
          {showBreakdown && (
            <Tabs defaultValue="insights" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-8">
                <TabsTrigger value="insights">Detailed Insights</TabsTrigger>
                <TabsTrigger value="timeline">Your Planning Timeline</TabsTrigger>
              </TabsList>

              <TabsContent value="insights" className="mt-0">
                <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-2xl">Your Personalized Recommendations</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="bg-amber-50 p-6 rounded-lg border border-amber-200">
                        <h3 className="font-semibold text-lg mb-3 text-amber-800">Top Priority Actions</h3>
                        <ul className="space-y-3">
                          <li className="flex items-start gap-3">
                            <div className="w-6 h-6 bg-amber-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                              <span className="text-white text-sm font-bold">1</span>
                            </div>
                            <div>
                              <p className="font-medium">Consider a small monthly pension top-up</p>
                              <p className="text-sm text-gray-600">
                                Adding £100/month could prevent a shortfall by age 80
                              </p>
                            </div>
                          </li>
                          <li className="flex items-start gap-3">
                            <div className="w-6 h-6 bg-amber-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                              <span className="text-white text-sm font-bold">2</span>
                            </div>
                            <div>
                              <p className="font-medium">Explore private health insurance</p>
                              <p className="text-sm text-gray-600">Reduce NHS waiting times for elective procedures</p>
                            </div>
                          </li>
                          <li className="flex items-start gap-3">
                            <div className="w-6 h-6 bg-amber-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                              <span className="text-white text-sm font-bold">3</span>
                            </div>
                            <div>
                              <p className="font-medium">Plan for potential care needs</p>
                              <p className="text-sm text-gray-600">
                                Set aside funds for future care costs (£800-£1,500/week)
                              </p>
                            </div>
                          </li>
                        </ul>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-green-50 p-6 rounded-lg border border-green-200">
                          <h4 className="font-semibold text-green-800 mb-2">What You're Doing Well</h4>
                          <ul className="space-y-2 text-sm">
                            <li className="flex items-center gap-2">
                              <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                <path
                                  fillRule="evenodd"
                                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                  clipRule="evenodd"
                                />
                              </svg>
                              Good pension foundation
                            </li>
                            <li className="flex items-center gap-2">
                              <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                <path
                                  fillRule="evenodd"
                                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                  clipRule="evenodd"
                                />
                              </svg>
                              Clear life goals
                            </li>
                            <li className="flex items-center gap-2">
                              <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                <path
                                  fillRule="evenodd"
                                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                  clipRule="evenodd"
                                />
                              </svg>
                              Proactive planning mindset
                            </li>
                          </ul>
                        </div>

                        <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
                          <h4 className="font-semibold text-blue-800 mb-2">Areas to Strengthen</h4>
                          <ul className="space-y-2 text-sm">
                            <li className="flex items-center gap-2">
                              <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                                <path
                                  fillRule="evenodd"
                                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                                  clipRule="evenodd"
                                />
                              </svg>
                              Insurance coverage gaps
                            </li>
                            <li className="flex items-center gap-2">
                              <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                                <path
                                  fillRule="evenodd"
                                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                                  clipRule="evenodd"
                                />
                              </svg>
                              Emergency fund size
                            </li>
                            <li className="flex items-center gap-2">
                              <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                                <path
                                  fillRule="evenodd"
                                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                                  clipRule="evenodd"
                                />
                              </svg>
                              Long-term care planning
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="timeline" className="mt-0">
                <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-2xl">Your Planning Timeline</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <TimelinePlanner />
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          )}

          {/* Sticky CTA Section */}
          {showBreakdown && (
            <div className="mt-12 text-center bg-white/90 backdrop-blur-sm p-8 rounded-lg shadow-lg border">
              <h3 className="text-2xl font-semibold mb-4">Ready to strengthen your nest?</h3>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                Get personalized guidance from our experts and start implementing your plan today.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/insights">
                  <Button size="lg" className="bg-amber-500 hover:bg-amber-600 text-white px-8">
                    See My Recommendations
                  </Button>
                </Link>
                <Button size="lg" variant="outline" className="border-amber-300 text-amber-700 hover:bg-amber-50">
                  Book Free Consultation
                </Button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
