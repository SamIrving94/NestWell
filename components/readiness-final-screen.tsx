"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, ArrowRight, Target, Shield, Heart, Calendar, Sparkles } from "lucide-react"

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

interface ReadinessFinalScreenProps {
  score: ReadinessScore
  profileData: ProfileData
  onComplete: () => void
  onBack: () => void
}

export function ReadinessFinalScreen({ score, profileData, onComplete, onBack }: ReadinessFinalScreenProps) {
  const [selectedAction, setSelectedAction] = useState<string | null>(null)

  const getPersonalizedMessage = () => {
    if (score.overall >= 80) {
      return {
        title: "You're in excellent shape!",
        message: "Your planning is well advanced. Consider fine-tuning your strategy and exploring advanced options.",
        emoji: "🌟",
      }
    } else if (score.overall >= 60) {
      return {
        title: "You're on the right track",
        message: "You've made good progress. Let's identify the key areas where you can strengthen your plan.",
        emoji: "📈",
      }
    } else if (score.overall >= 40) {
      return {
        title: "There's room to improve",
        message:
          "Don't worry - you're taking the right steps. Let's focus on the areas that will make the biggest difference.",
        emoji: "💪",
      }
    } else {
      return {
        title: "Let's build your confidence",
        message:
          "Everyone starts somewhere. We'll guide you step-by-step to build a plan that gives you peace of mind.",
        emoji: "🌱",
      }
    }
  }

  const getRecommendedActions = () => {
    const actions = []

    // Prioritize based on lowest scores
    const scoreAreas = [
      { name: "finance", score: score.finance, priority: 1 },
      { name: "coverage", score: score.coverage, priority: 2 },
      { name: "health", score: score.health, priority: 3 },
      { name: "planning", score: score.planning, priority: 4 },
    ].sort((a, b) => a.score - b.score)

    // Add actions based on lowest scores
    scoreAreas.forEach((area, index) => {
      if (index < 2 || area.score < 60) {
        // Show top 2 lowest or any below 60
        switch (area.name) {
          case "finance":
            actions.push({
              id: "financial-planning",
              title: "Strengthen Your Financial Foundation",
              description: "Review your pension, savings, and income strategy for later life",
              icon: Target,
              color: "bg-green-500",
              route: "/planner",
              priority: area.priority,
            })
            break
          case "coverage":
            actions.push({
              id: "insurance-review",
              title: "Explore Insurance Options",
              description: "Understand what coverage could protect you and your family",
              icon: Shield,
              color: "bg-blue-500",
              route: "/healthcare-costs",
              priority: area.priority,
            })
            break
          case "health":
            actions.push({
              id: "health-planning",
              title: "Plan for Health & Care",
              description: "Learn about care options and health planning for your future",
              icon: Heart,
              color: "bg-red-500",
              route: "/care-scenarios",
              priority: area.priority,
            })
            break
          case "planning":
            actions.push({
              id: "timeline-planning",
              title: "Create Your Timeline",
              description: "Build a step-by-step plan with milestones and goals",
              icon: Calendar,
              color: "bg-purple-500",
              route: "/planner",
              priority: area.priority,
            })
            break
        }
      }
    })

    // Always include hub as an option
    actions.push({
      id: "explore-hub",
      title: "Explore Your Personal Hub",
      description: "See your complete planning dashboard and all available tools",
      icon: Sparkles,
      color: "bg-teal-500",
      route: "/hub",
      priority: 5,
    })

    return actions.slice(0, 3) // Show max 3 actions
  }

  const personalizedMessage = getPersonalizedMessage()
  const recommendedActions = getRecommendedActions()

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center">
        <div className="text-6xl mb-4">{personalizedMessage.emoji}</div>
        <h1 className="text-3xl md:text-4xl font-bold text-navy-800 mb-4">{personalizedMessage.title}</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">{personalizedMessage.message}</p>
      </div>

      {/* Score Summary */}
      <Card className="border-0 shadow-lg bg-gradient-to-r from-teal-50 to-blue-50">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Your Readiness Score</h3>
              <p className="text-gray-600">Based on your profile and planning confidence</p>
            </div>
            <div className="text-right">
              <div className="text-4xl font-bold text-teal-600">{score.overall}</div>
              <div className="text-sm text-gray-500">out of 100</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recommended Actions */}
      <div>
        <h2 className="text-2xl font-bold text-navy-800 mb-6 text-center">Here's where to start improving it</h2>
        <div className="grid gap-4">
          {recommendedActions.map((action, index) => (
            <Card
              key={action.id}
              className={`border-0 shadow-md cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-[1.02] ${
                selectedAction === action.id ? "ring-2 ring-teal-500 bg-teal-50" : "bg-white"
              }`}
              onClick={() => setSelectedAction(action.id)}
            >
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 ${action.color} rounded-full flex items-center justify-center`}>
                    <action.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">{action.title}</h3>
                    <p className="text-gray-600">{action.description}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    {index === 0 && (
                      <span className="bg-teal-100 text-teal-700 text-xs px-2 py-1 rounded-full font-medium">
                        Recommended
                      </span>
                    )}
                    <ArrowRight className="w-5 h-5 text-gray-400" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className="text-center space-y-4">
        <Button
          onClick={onComplete}
          size="lg"
          className="bg-teal-500 hover:bg-teal-600 text-white px-12 py-6 text-xl rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
        >
          Plan your next move
        </Button>
        <p className="text-sm text-gray-500">
          Your score and profile have been saved. You can always come back to review and update them.
        </p>
      </div>

      {/* Navigation */}
      <div className="flex justify-between items-center pt-8 border-t">
        <Button variant="outline" onClick={onBack} className="flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" />
          Back to score
        </Button>

        <div className="text-sm text-gray-500">Ready to start planning • NestWell</div>
      </div>
    </div>
  )
}
