"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"

interface ProgressTrackerProps {
  completed: number
  total: number
  percentage: number
  showCards: boolean
}

export function ProgressTracker({ completed, total, percentage, showCards }: ProgressTrackerProps) {
  const getEncouragementMessage = () => {
    if (completed === 0) return "Ready to start your journey?"
    if (completed < total / 2) return "You're making great progress!"
    if (completed < total) return "You're almost there!"
    return "Congratulations! You've completed all recommendations!"
  }

  const getBadgeLevel = () => {
    if (completed === 0) return "🥚 Getting Started"
    if (completed < total / 2) return "🐣 Building Momentum"
    if (completed < total) return "🐦 Flying High"
    return "🦅 Nest Master"
  }

  return (
    <Card
      className={`border-0 shadow-lg bg-gradient-to-r from-amber-50 to-orange-50 transition-all duration-1000 ${
        showCards ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}
    >
      <CardContent className="pt-6">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="flex-1">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-semibold">Your Progress</h3>
              <span className="text-sm font-medium text-amber-700">{getBadgeLevel()}</span>
            </div>

            <div className="mb-3">
              <div className="flex justify-between text-sm mb-1">
                <span>{getEncouragementMessage()}</span>
                <span className="font-medium">
                  {completed} of {total} completed
                </span>
              </div>
              <Progress value={percentage} className="h-3 bg-white/50" />
            </div>

            <p className="text-sm text-gray-600">
              {completed === total
                ? "Amazing! You've strengthened your nest significantly."
                : `${total - completed} actions remaining to complete your plan.`}
            </p>
          </div>

          <div className="flex-shrink-0">
            <Button variant="outline" className="border-amber-300 text-amber-700 hover:bg-amber-50">
              View My Plan
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
