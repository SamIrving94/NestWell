"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { MessageCircle, X, Lightbulb, TrendingUp } from "lucide-react"

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

interface FloatingAssistantProps {
  currentStep: string
  score: ReadinessScore
  profileData: ProfileData
  onClose: () => void
}

export function FloatingAssistant({ currentStep, score, profileData, onClose }: FloatingAssistantProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [currentMessage, setCurrentMessage] = useState(0)
  const [showPulse, setShowPulse] = useState(true)

  const getContextualMessages = () => {
    const messages = []

    switch (currentStep) {
      case "score":
        if (score.overall >= 80) {
          messages.push({
            type: "positive",
            title: "Excellent work!",
            message:
              "Your score shows you're well-prepared. The areas where you scored highest will be your strengths as you continue planning.",
            icon: TrendingUp,
          })
        } else if (score.overall >= 60) {
          messages.push({
            type: "encouraging",
            title: "You're doing well",
            message:
              "Your score shows good progress. Focus on the areas with lower scores to boost your overall readiness.",
            icon: Lightbulb,
          })
        } else {
          messages.push({
            type: "supportive",
            title: "Every journey starts somewhere",
            message:
              "Don't worry about a lower score - it just shows where you can make the biggest improvements. We're here to help!",
            icon: MessageCircle,
          })
        }

        // Add specific insights based on sub-scores
        if (score.finance < 50) {
          messages.push({
            type: "tip",
            title: "Boost your financial score",
            message:
              "Your financial score is based on income, savings, and pension contributions. Small increases in savings can make a big difference over time.",
            icon: Lightbulb,
          })
        }

        if (score.coverage < 40) {
          messages.push({
            type: "tip",
            title: "Consider insurance protection",
            message:
              "Insurance might seem expensive now, but it can protect your savings from unexpected costs later. Even basic coverage helps your score.",
            icon: Lightbulb,
          })
        }

        break

      case "final":
        messages.push({
          type: "celebration",
          title: "You've completed your assessment!",
          message:
            "Your Readiness Score is now your personal benchmark. As you take action and update your profile, watch it improve over time.",
          icon: TrendingUp,
        })

        if (score.planning < 60) {
          messages.push({
            type: "next-step",
            title: "Build your confidence",
            message:
              "The timeline planner is perfect for people who want to feel more in control. It breaks everything down into manageable steps.",
            icon: Lightbulb,
          })
        }
        break

      default:
        messages.push({
          type: "welcome",
          title: "I'm here to help",
          message:
            "I'll give you tips and explanations as you go through your assessment. Feel free to close this if you prefer to focus.",
          icon: MessageCircle,
        })
    }

    return messages
  }

  const messages = getContextualMessages()

  useEffect(() => {
    // Show pulse animation for a few seconds
    const timer = setTimeout(() => setShowPulse(false), 3000)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    // Cycle through messages if there are multiple
    if (messages.length > 1) {
      const timer = setInterval(() => {
        setCurrentMessage((prev) => (prev + 1) % messages.length)
      }, 8000)
      return () => clearInterval(timer)
    }
  }, [messages.length])

  if (messages.length === 0) return null

  const currentMsg = messages[currentMessage]

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {!isOpen ? (
        <Button
          onClick={() => setIsOpen(true)}
          className={`w-14 h-14 rounded-full bg-teal-500 hover:bg-teal-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 ${
            showPulse ? "animate-pulse" : ""
          }`}
        >
          <MessageCircle className="w-6 h-6" />
        </Button>
      ) : (
        <Card className="w-80 border-0 shadow-2xl bg-white/95 backdrop-blur-sm">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-teal-500 rounded-full flex items-center justify-center flex-shrink-0">
                <currentMsg.icon className="w-4 h-4 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-gray-800 mb-2">{currentMsg.title}</h4>
                <p className="text-sm text-gray-600 leading-relaxed">{currentMsg.message}</p>
                {messages.length > 1 && (
                  <div className="flex gap-1 mt-3">
                    {messages.map((_, index) => (
                      <div
                        key={index}
                        className={`w-2 h-2 rounded-full transition-colors ${
                          index === currentMessage ? "bg-teal-500" : "bg-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                )}
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setIsOpen(false)
                  onClose()
                }}
                className="h-8 w-8 p-0 hover:bg-gray-100"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
