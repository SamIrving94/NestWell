"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, ArrowRight, TrendingUp, AlertCircle, CheckCircle } from "lucide-react"

interface ReadinessScore {
  overall: number
  finance: number
  coverage: number
  health: number
  planning: number
}

interface ProfileData {
  age: number
  livingSituation: string
  incomeRange: number
  pensionSavings: number
  hasInsurance: boolean
  insuranceTypes: string[]
  healthStatus: string
  planningConfidence: number
}

interface ReadinessScoreDisplayProps {
  score: ReadinessScore
  profileData: ProfileData
  onNext: () => void
  onBack: () => void
}

export function ReadinessScoreDisplay({ score, profileData, onNext, onBack }: ReadinessScoreDisplayProps) {
  const [animatedScore, setAnimatedScore] = useState(0)
  const [showSubScores, setShowSubScores] = useState(false)
  const [showInsights, setShowInsights] = useState(false)

  useEffect(() => {
    // Animate main score
    const timer1 = setTimeout(() => {
      let current = 0
      const increment = score.overall / 50
      const scoreTimer = setInterval(() => {
        current += increment
        if (current >= score.overall) {
          current = score.overall
          clearInterval(scoreTimer)
          setShowSubScores(true)
        }
        setAnimatedScore(Math.round(current))
      }, 20)
    }, 500)

    // Show insights after sub-scores
    const timer2 = setTimeout(() => setShowInsights(true), 2000)

    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
    }
  }, [score.overall])

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600"
    if (score >= 60) return "text-yellow-600"
    return "text-red-500"
  }

  const getScoreBackground = (score: number) => {
    if (score >= 80) return "from-green-400 to-green-600"
    if (score >= 60) return "from-yellow-400 to-yellow-600"
    return "from-red-400 to-red-600"
  }

  const getScoreMessage = (score: number) => {
    if (score >= 80) return "You're in great shape!"
    if (score >= 60) return "You're on the right track"
    if (score >= 40) return "There's room to improve"
    return "Let's build your confidence"
  }

  const getScoreIcon = (score: number) => {
    if (score >= 80) return <CheckCircle className="w-6 h-6 text-green-600" />
    if (score >= 60) return <TrendingUp className="w-6 h-6 text-yellow-600" />
    return <AlertCircle className="w-6 h-6 text-red-500" />
  }

  const subScores = [
    {
      name: "Finance",
      score: score.finance,
      icon: "💰",
      description: "Income, savings & pensions",
    },
    {
      name: "Coverage",
      score: score.coverage,
      icon: "🛡️",
      description: "Insurance protection",
    },
    {
      name: "Health",
      score: score.health,
      icon: "❤️",
      description: "Wellbeing & care planning",
    },
    {
      name: "Planning",
      score: score.planning,
      icon: "📋",
      description: "Confidence & preparation",
    },
  ]

  const getInsights = () => {
    const insights = []

    if (score.finance < 60) {
      insights.push({
        type: "improvement",
        title: "Boost your financial score",
        message: "Consider reviewing your pension contributions or exploring additional savings options.",
        action: "View financial planning",
      })
    }

    if (score.coverage < 50) {
      insights.push({
        type: "improvement",
        title: "Protect yourself with insurance",
        message: "Insurance can provide peace of mind and protect your savings from unexpected costs.",
        action: "Explore coverage options",
      })
    }

    if (score.health < 70) {
      insights.push({
        type: "improvement",
        title: "Plan for health & care",
        message: "Understanding care options early can help you make better decisions later.",
        action: "Learn about care planning",
      })
    }

    if (score.planning < 60) {
      insights.push({
        type: "improvement",
        title: "Build your planning confidence",
        message: "Our timeline planner can help you create a step-by-step plan for your future.",
        action: "Start planning",
      })
    }

    // Add positive insights for high scores
    if (score.overall >= 80) {
      insights.unshift({
        type: "positive",
        title: "Excellent work!",
        message: "You're well-prepared for later life. Consider fine-tuning your plan or helping others.",
        action: "Optimize your plan",
      })
    }

    return insights.slice(0, 2) // Show max 2 insights
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Main Score Display */}
      <Card className="border-0 shadow-2xl bg-white/95 backdrop-blur-sm overflow-hidden">
        <CardContent className="p-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-navy-800 mb-6">Your Readiness Score</h2>

          {/* Animated Score Circle */}
          <div className="relative w-48 h-48 mx-auto mb-6">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              {/* Background circle */}
              <circle
                cx="50"
                cy="50"
                r="40"
                stroke="currentColor"
                strokeWidth="8"
                fill="transparent"
                className="text-gray-200"
              />
              {/* Progress circle */}
              <circle
                cx="50"
                cy="50"
                r="40"
                stroke="url(#gradient)"
                strokeWidth="8"
                fill="transparent"
                strokeDasharray={`${(animatedScore / 100) * 251.2} 251.2`}
                strokeLinecap="round"
                className="transition-all duration-1000 ease-out"
              />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" className={`stop-color-teal-400`} />
                  <stop offset="100%" className={`stop-color-teal-600`} />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className={`text-4xl font-bold ${getScoreColor(animatedScore)}`}>{animatedScore}</div>
                <div className="text-sm text-gray-500">out of 100</div>
              </div>
            </div>
          </div>

          {/* Score Message */}
          <div className="flex items-center justify-center gap-3 mb-6">
            {getScoreIcon(animatedScore)}
            <p className="text-xl font-semibold text-gray-700">{getScoreMessage(animatedScore)}</p>
          </div>

          <p className="text-gray-600 max-w-md mx-auto">
            This score reflects your current preparedness across four key areas of later life planning.
          </p>
        </CardContent>
      </Card>

      {/* Sub-Scores */}
      {showSubScores && (
        <div
          className={`grid grid-cols-2 md:grid-cols-4 gap-4 transition-all duration-1000 ${
            showSubScores ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          {subScores.map((item, index) => (
            <Card
              key={item.name}
              className={`border-0 shadow-lg bg-white/90 backdrop-blur-sm transition-all duration-500 hover:shadow-xl hover:scale-105`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardContent className="p-6 text-center">
                <div className="text-3xl mb-3">{item.icon}</div>
                <h3 className="font-semibold text-gray-800 mb-2">{item.name}</h3>
                <div className={`text-2xl font-bold mb-2 ${getScoreColor(item.score)}`}>{item.score}</div>
                <p className="text-xs text-gray-500">{item.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Insights */}
      {showInsights && (
        <div
          className={`space-y-4 transition-all duration-1000 ${
            showInsights ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <h3 className="text-xl font-bold text-navy-800 text-center mb-6">What this means for you</h3>
          {getInsights().map((insight, index) => (
            <Card
              key={index}
              className={`border-0 shadow-md ${
                insight.type === "positive" ? "bg-green-50 border-green-200" : "bg-blue-50 border-blue-200"
              }`}
            >
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      insight.type === "positive" ? "bg-green-100" : "bg-blue-100"
                    }`}
                  >
                    {insight.type === "positive" ? (
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    ) : (
                      <TrendingUp className="w-5 h-5 text-blue-600" />
                    )}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-800 mb-2">{insight.title}</h4>
                    <p className="text-gray-600 mb-3">{insight.message}</p>
                    <Button
                      variant="outline"
                      size="sm"
                      className={`${
                        insight.type === "positive"
                          ? "border-green-300 text-green-700 hover:bg-green-50"
                          : "border-blue-300 text-blue-700 hover:bg-blue-50"
                      }`}
                    >
                      {insight.action}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Navigation */}
      <div className="flex justify-between items-center pt-8">
        <Button variant="outline" onClick={onBack} className="flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" />
          Back to questions
        </Button>

        <Button onClick={onNext} className="bg-teal-500 hover:bg-teal-600 text-white flex items-center gap-2 px-8">
          See what's next
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  )
}
