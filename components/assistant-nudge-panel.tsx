"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Sparkles, MessageCircle, ArrowRight, X } from "lucide-react"

interface AssistantNudgePanelProps {
  readinessScore: number
  moduleStatuses: {
    [key: string]: {
      status: "excellent" | "good" | "needs-attention" | "critical"
      completeness: number
      nextAction: string
    }
  }
  nextBestActions: Array<{
    id: string
    title: string
    description: string
    priority: "high" | "medium" | "low"
    module: string
    estimatedTime: string
  }>
}

export function AssistantNudgePanel({ readinessScore, moduleStatuses, nextBestActions }: AssistantNudgePanelProps) {
  const [isDismissed, setIsDismissed] = useState(false)
  const [showFullNudge, setShowFullNudge] = useState(false)

  if (isDismissed) return null

  const getContextualNudge = () => {
    // Find the most critical module
    const criticalModules = Object.entries(moduleStatuses).filter(([_, status]) => status.status === "critical")
    const needsAttentionModules = Object.entries(moduleStatuses).filter(
      ([_, status]) => status.status === "needs-attention",
    )

    if (criticalModules.length > 0) {
      const [moduleName] = criticalModules[0]
      return {
        type: "critical",
        title: "Important: Action Needed",
        message: `Your ${moduleName} needs attention. This is a key piece of your plan — let's address it together.`,
        cta: "Take Action",
        priority: "high" as const,
      }
    }

    if (needsAttentionModules.length > 0) {
      const [moduleName] = needsAttentionModules[0]
      return {
        type: "attention",
        title: "Next Step Ready",
        message: `You're making progress. Your ${moduleName} module could use some attention to strengthen your readiness.`,
        cta: "Continue",
        priority: "medium" as const,
      }
    }

    if (readinessScore >= 80) {
      return {
        type: "excellent",
        title: "You're Well Prepared",
        message:
          "Your planning is on track. Consider exploring advanced strategies or helping family members get started.",
        cta: "Explore More",
        priority: "low" as const,
      }
    }

    return {
      type: "general",
      title: "Keep Building Your Plan",
      message: "You're making steady progress. Focus on your highest-impact actions to improve your readiness.",
      cta: "See Next Steps",
      priority: "medium" as const,
    }
  }

  const nudge = getContextualNudge()
  const topAction = nextBestActions.find((action) => action.priority === "high") || nextBestActions[0]

  const getNudgeColor = (type: string) => {
    switch (type) {
      case "critical":
        return "bg-gradient-to-r from-red-50 to-red-50/50 border-red-200"
      case "attention":
        return "bg-gradient-to-r from-accent-amber/10 to-accent-amber/5 border-accent-amber/20"
      case "excellent":
        return "bg-gradient-to-r from-accent-teal/10 to-accent-teal/5 border-accent-teal/20"
      default:
        return "bg-gradient-to-r from-accent-blue-grey/10 to-accent-blue-grey/5 border-accent-blue-grey/20"
    }
  }

  const getNudgeIcon = (type: string) => {
    switch (type) {
      case "critical":
        return "🚨"
      case "attention":
        return "💡"
      case "excellent":
        return "🌟"
      default:
        return "🎯"
    }
  }

  return (
    <Card className={`border-0 shadow-lg mb-8 ${getNudgeColor(nudge.type)}`}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/50 rounded-full flex items-center justify-center">
              <span className="text-lg">{getNudgeIcon(nudge.type)}</span>
            </div>
            <div>
              <CardTitle className="text-lg flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-accent-teal" />
                NestWell Assistant
              </CardTitle>
              <p className="text-sm text-gray-600">Personalized guidance for you</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="capitalize">
              {nudge.priority} Priority
            </Badge>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsDismissed(true)}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Main Nudge */}
          <div className="bg-white/50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-800 mb-2">{nudge.title}</h3>
            <p className="text-gray-700 mb-3">{nudge.message}</p>

            {!showFullNudge && (
              <div className="flex items-center gap-3">
                <Button
                  onClick={() => setShowFullNudge(true)}
                  className="bg-accent-teal hover:bg-accent-teal/90 text-white"
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  What's my next best move?
                </Button>
                {topAction && (
                  <Button variant="outline" size="sm">
                    {topAction.title}
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>
                )}
              </div>
            )}
          </div>

          {/* Expanded Assistant Response */}
          {showFullNudge && (
            <div className="bg-white/70 p-4 rounded-lg border-l-4 border-teal-500 animate-in slide-in-from-top-2 duration-300">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-accent-teal rounded-full flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-gray-800 mb-3">
                    Based on your current progress, here's what I recommend focusing on:
                  </p>

                  <div className="space-y-3">
                    {nextBestActions.slice(0, 2).map((action, index) => (
                      <div key={action.id} className="flex items-center justify-between p-3 bg-white rounded-lg">
                        <div>
                          <p className="font-medium text-gray-800">{action.title}</p>
                          <p className="text-sm text-gray-600">{action.description}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="outline" size="sm" className="capitalize">
                              {action.priority}
                            </Badge>
                            <span className="text-xs text-gray-500">{action.estimatedTime}</span>
                          </div>
                        </div>
                        <Button size="sm" variant="outline">
                          Start
                          <ArrowRight className="w-3 h-3 ml-1" />
                        </Button>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 pt-3 border-t border-gray-200">
                    <p className="text-sm text-muted-foreground">
                      💡 <strong>Insight:</strong> Completing your highest priority action could improve your readiness
                      score by 5-8 points.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
