"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useState } from "react"

interface InsightCardProps {
  insight: {
    id: string
    category: string
    title: string
    insight: string
    priority: "high" | "medium" | "low"
    icon: string
    estimatedTime: string
    impact: string
  }
  status: "completed" | "inProgress" | "notStarted"
  onStatusChange: (status: "completed" | "inProgress" | "notStarted") => void
  delay: number
  showCards: boolean
}

export function InsightCard({ insight, status, onStatusChange, delay, showCards }: InsightCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  const getStatusIcon = () => {
    switch (status) {
      case "completed":
        return "✅"
      case "inProgress":
        return "⏳"
      default:
        return "🔔"
    }
  }

  const getStatusText = () => {
    switch (status) {
      case "completed":
        return "Done"
      case "inProgress":
        return "In progress"
      default:
        return "Not started"
    }
  }

  const getStatusColor = () => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800 hover:bg-green-100"
      case "inProgress":
        return "bg-amber-100 text-amber-800 hover:bg-amber-100"
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-100"
    }
  }

  const getPriorityColor = () => {
    switch (insight.priority) {
      case "high":
        return "bg-red-100 text-red-800"
      case "medium":
        return "bg-amber-100 text-amber-800"
      default:
        return "bg-blue-100 text-blue-800"
    }
  }

  const getCategoryColor = () => {
    switch (insight.category) {
      case "Financial Planning":
        return "text-green-600"
      case "Insurance Gaps":
        return "text-blue-600"
      case "Lifestyle & Long-Term Care":
        return "text-purple-600"
      case "Family & Legacy":
        return "text-orange-600"
      default:
        return "text-gray-600"
    }
  }

  return (
    <Card
      className={`border-0 shadow-lg transition-all duration-700 hover:shadow-xl hover:scale-105 cursor-pointer ${
        showCards ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      } ${status === "completed" ? "ring-2 ring-green-200" : ""}`}
      style={{ transitionDelay: `${delay}ms` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl">{insight.icon}</span>
            <div>
              <div className={`text-sm font-medium ${getCategoryColor()}`}>{insight.category}</div>
              <CardTitle className="text-lg">{insight.title}</CardTitle>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <Badge variant="outline" className={getStatusColor()}>
              {getStatusIcon()} {getStatusText()}
            </Badge>
            <Badge variant="outline" className={getPriorityColor()}>
              {insight.priority}
            </Badge>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <div className="space-y-4">
          <p className="text-gray-700">{insight.insight}</p>

          <div className="flex justify-between text-sm text-gray-500">
            <span>⏱️ {insight.estimatedTime}</span>
            <span>📈 {insight.impact} impact</span>
          </div>

          <div className="flex gap-2">
            <Button
              size="sm"
              className="flex-1 bg-amber-500 hover:bg-amber-600 text-white"
              onClick={(e) => {
                e.stopPropagation()
                // Handle "Show me how" action
              }}
            >
              Show me how
            </Button>

            {status !== "completed" && (
              <Button
                size="sm"
                variant="outline"
                onClick={(e) => {
                  e.stopPropagation()
                  const nextStatus = status === "notStarted" ? "inProgress" : "completed"
                  onStatusChange(nextStatus)
                }}
                className="border-amber-300 text-amber-700 hover:bg-amber-50"
              >
                {status === "notStarted" ? "Start" : "Complete"}
              </Button>
            )}

            {status === "completed" && (
              <Button
                size="sm"
                variant="outline"
                onClick={(e) => {
                  e.stopPropagation()
                  onStatusChange("notStarted")
                }}
                className="border-gray-300 text-gray-700 hover:bg-gray-50"
              >
                Reset
              </Button>
            )}
          </div>
        </div>

        {/* Hover effect indicator */}
        {isHovered && (
          <div className="absolute inset-0 bg-amber-50 opacity-20 rounded-lg pointer-events-none transition-opacity duration-200" />
        )}
      </CardContent>
    </Card>
  )
}
