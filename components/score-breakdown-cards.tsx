"use client"

import type React from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { useState, useEffect } from "react"

interface ScoreBreakdownCardsProps {
  score: number
}

export function ScoreBreakdownCards({ score }: ScoreBreakdownCardsProps) {
  const [showCards, setShowCards] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setShowCards(true), 500)
    return () => clearTimeout(timer)
  }, [])

  // Calculate individual scores based on overall score
  const financialScore = Math.min(score + 10, 100)
  const insuranceScore = Math.max(score - 20, 0)
  const lifestyleScore = score

  const cards = [
    {
      title: "Financial Strength",
      score: financialScore,
      insight: "Your pension and savings are on track, but consider increasing contributions.",
      icon: "💰",
      color: "green",
      delay: 0,
    },
    {
      title: "Insurance Coverage",
      score: insuranceScore,
      insight: "Consider private health insurance to reduce NHS waiting times.",
      icon: "🛡️",
      color: "blue",
      delay: 200,
    },
    {
      title: "Lifestyle Planning",
      score: lifestyleScore,
      insight: "Great goals! Let's create a timeline to achieve them.",
      icon: "🌟",
      color: "purple",
      delay: 400,
    },
  ]

  const getColorClasses = (color: string) => {
    const colors = {
      green: {
        bg: "bg-green-50",
        border: "border-green-200",
        text: "text-green-800",
        progress: "bg-green-500",
      },
      blue: {
        bg: "bg-blue-50",
        border: "border-blue-200",
        text: "text-blue-800",
        progress: "bg-blue-500",
      },
      purple: {
        bg: "bg-purple-50",
        border: "border-purple-200",
        text: "text-purple-800",
        progress: "bg-purple-500",
      },
    }
    return colors[color as keyof typeof colors]
  }

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-semibold mb-2">Score Breakdown</h2>
        <p className="text-gray-600">Here's how you're doing in each key area</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {cards.map((card, index) => {
          const colorClasses = getColorClasses(card.color)
          return (
            <Card
              key={card.title}
              className={`border-0 shadow-lg transition-all duration-700 ${colorClasses.bg} ${colorClasses.border} ${
                showCards ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${card.delay}ms` }}
            >
              <CardHeader className="pb-2">
                <CardTitle className={`flex items-center gap-3 ${colorClasses.text}`}>
                  <span className="text-2xl">{card.icon}</span>
                  <div>
                    <div className="text-lg">{card.title}</div>
                    <div className="text-2xl font-bold">{card.score}/100</div>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Progress
                    value={card.score}
                    className="h-3"
                    style={
                      {
                        "--progress-background": colorClasses.progress.replace("bg-", ""),
                      } as React.CSSProperties
                    }
                  />

                  <p className="text-sm text-gray-700">{card.insight}</p>

                  <Button
                    variant="outline"
                    size="sm"
                    className={`w-full ${colorClasses.border} ${colorClasses.text} hover:${colorClasses.bg}`}
                  >
                    Show me how
                  </Button>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
