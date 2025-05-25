"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface AIAssistantPlannerProps {
  currentAge: number
  viewMode: "age" | "lifestage"
  onAddMilestone: () => void
}

export function AIAssistantPlanner({ currentAge, viewMode, onAddMilestone }: AIAssistantPlannerProps) {
  const [showTip, setShowTip] = useState(false)
  const [tipIndex, setTipIndex] = useState(0)

  const plannerTips = [
    {
      title: "Timeline Tip",
      content: "Try adding personal milestones like travel plans or family events to make your timeline truly yours.",
      icon: "✈️",
    },
    {
      title: "Planning Insight",
      content: `At age ${currentAge + 5}, many people consider reviewing their housing needs. Would you like to add this to your timeline?`,
      icon: "🏠",
    },
    {
      title: "Did You Know?",
      content: "Switching between Age and Life Stage views can help you see your journey in different perspectives.",
      icon: "🔄",
    },
  ]

  useEffect(() => {
    // Show a random tip after 5 seconds
    const timer = setTimeout(() => {
      setTipIndex(Math.floor(Math.random() * plannerTips.length))
      setShowTip(true)
    }, 5000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      {showTip && (
        <div className="fixed bottom-24 right-6 w-80 z-40 animate-assistant-expand">
          <Card className="border-0 shadow-lg bg-gradient-to-r from-amber-50 to-orange-50">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center text-xl flex-shrink-0">
                  {plannerTips[tipIndex].icon}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-sm font-semibold text-amber-800">{plannerTips[tipIndex].title}</h3>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowTip(false)}
                      className="h-6 w-6 p-0 rounded-full text-gray-400 hover:text-gray-600"
                    >
                      ✕
                    </Button>
                  </div>
                  <p className="text-sm text-gray-700">{plannerTips[tipIndex].content}</p>
                  <div className="mt-3 flex gap-2">
                    {tipIndex === 1 && (
                      <Button
                        size="sm"
                        className="bg-amber-500 hover:bg-amber-600 text-white text-xs"
                        onClick={() => {
                          onAddMilestone()
                          setShowTip(false)
                        }}
                      >
                        Add to Timeline
                      </Button>
                    )}
                    <Badge
                      variant="outline"
                      className="cursor-pointer bg-white text-amber-700 border-amber-200 hover:bg-amber-50 text-xs"
                      onClick={() => {
                        setTipIndex((tipIndex + 1) % plannerTips.length)
                      }}
                    >
                      More Tips
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  )
}
