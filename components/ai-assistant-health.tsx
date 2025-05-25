"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export function AIAssistantHealth() {
  const [isOpen, setIsOpen] = useState(false)
  const [currentTip, setCurrentTip] = useState(0)

  const healthTips = [
    {
      title: "Stay Social",
      content:
        "Regular social interaction can reduce the risk of cognitive decline by up to 70%. Consider joining a local club or volunteering.",
      icon: "👥",
    },
    {
      title: "Move Daily",
      content:
        "Just 30 minutes of walking daily can significantly improve your mobility and independence in later years.",
      icon: "🚶‍♀️",
    },
    {
      title: "Plan Ahead",
      content:
        "Planning for health needs now gives you more control and better outcomes. Consider what support you might need.",
      icon: "📋",
    },
  ]

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen && (
        <Card className="mb-4 w-80 shadow-lg border-emerald-200">
          <CardContent className="p-4">
            <div className="flex items-start justify-between mb-3">
              <Badge className="bg-emerald-100 text-emerald-800">Health Tip</Badge>
              <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)} className="h-6 w-6 p-0">
                ×
              </Button>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="text-2xl">{healthTips[currentTip].icon}</span>
                <h4 className="font-semibold">{healthTips[currentTip].title}</h4>
              </div>
              <p className="text-sm text-gray-600">{healthTips[currentTip].content}</p>
              <div className="flex justify-between items-center">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentTip((prev) => (prev + 1) % healthTips.length)}
                >
                  Next Tip
                </Button>
                <span className="text-xs text-gray-500">
                  {currentTip + 1} of {healthTips.length}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="rounded-full w-14 h-14 bg-emerald-500 hover:bg-emerald-600 shadow-lg"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-white"
        >
          <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.29 1.51 4.04 3 5.5l7 7Z" />
        </svg>
      </Button>
    </div>
  )
}
