"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { X, Plus, TrendingUp } from "lucide-react"

interface TimelineSmartSuggestionsProps {
  userAge: number
  existingMilestones: any[]
  onAddSuggestion: (milestone: any) => void
}

export function TimelineSmartSuggestions({
  userAge,
  existingMilestones,
  onAddSuggestion,
}: TimelineSmartSuggestionsProps) {
  const [dismissedSuggestions, setDismissedSuggestions] = useState<string[]>([])

  // Generate smart suggestions based on user age and existing milestones
  const generateSuggestions = () => {
    const suggestions = []
    const existingTypes = existingMilestones.map((m) => m.category)

    // Age-based suggestions
    if (userAge < 65 && !existingTypes.includes("financial")) {
      suggestions.push({
        id: "pension-review",
        title: "Review Pension Options",
        description: "Most people review their pension strategy by age 60",
        age: Math.max(60, userAge + 2),
        category: "financial",
        icon: "💰",
        scoreImpact: 4,
        reason: "Planning ahead",
      })
    }

    if (userAge >= 65 && !existingTypes.includes("health")) {
      suggestions.push({
        id: "health-check",
        title: "Annual Health Assessment",
        description: "Regular health checks become more important after 65",
        age: userAge + 1,
        category: "health",
        icon: "🏥",
        scoreImpact: 3,
        reason: "Preventive care",
      })
    }

    if (userAge >= 70 && !existingTypes.includes("care")) {
      suggestions.push({
        id: "care-planning",
        title: "Care Needs Planning",
        description: "Consider future care options and funding",
        age: Math.min(75, userAge + 5),
        category: "care",
        icon: "🤝",
        scoreImpact: 5,
        reason: "Future security",
      })
    }

    if (!existingTypes.includes("lifestyle")) {
      suggestions.push({
        id: "downsizing",
        title: "Consider Downsizing",
        description: "Many people downsize to free up equity",
        age: userAge + 8,
        category: "lifestyle",
        icon: "🏠",
        scoreImpact: 2,
        reason: "Financial flexibility",
      })
    }

    if (userAge < 75 && !existingTypes.includes("family")) {
      suggestions.push({
        id: "family-legacy",
        title: "Family Financial Support",
        description: "Plan for helping children or grandchildren",
        age: userAge + 10,
        category: "family",
        icon: "👨‍👩‍👧‍👦",
        scoreImpact: 2,
        reason: "Family support",
      })
    }

    return suggestions.filter((s) => !dismissedSuggestions.includes(s.id))
  }

  const suggestions = generateSuggestions()

  const handleAddSuggestion = (suggestion: any) => {
    onAddSuggestion({
      title: suggestion.title,
      description: suggestion.description,
      age: suggestion.age,
      category: suggestion.category,
      icon: suggestion.icon,
      scoreImpact: suggestion.scoreImpact,
      year: new Date().getFullYear() + (suggestion.age - userAge),
    })
    setDismissedSuggestions([...dismissedSuggestions, suggestion.id])
  }

  const handleDismiss = (suggestionId: string) => {
    setDismissedSuggestions([...dismissedSuggestions, suggestionId])
  }

  if (suggestions.length === 0) return null

  return (
    <Card className="border-0 shadow-lg bg-gradient-to-r from-teal-50 to-sand-50 mb-8">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center">
            <TrendingUp className="w-4 h-4 text-teal-600" />
          </div>
          Smart Suggestions
        </CardTitle>
        <p className="text-sm text-gray-600">
          Based on your age and planning gaps, here are some milestones to consider
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {suggestions.slice(0, 3).map((suggestion) => (
            <div
              key={suggestion.id}
              className="flex items-start justify-between p-4 bg-white rounded-lg border border-gray-100 hover:border-teal-200 transition-colors"
            >
              <div className="flex items-start gap-3 flex-1">
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-xl">
                  {suggestion.icon}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-medium">{suggestion.title}</h4>
                    <Badge variant="outline" className="text-xs bg-teal-50 text-teal-700 border-teal-200">
                      Age {suggestion.age}
                    </Badge>
                    <Badge variant="outline" className="text-xs bg-green-50 text-green-700 border-green-200">
                      +{suggestion.scoreImpact} score
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{suggestion.description}</p>
                  <p className="text-xs text-gray-500">💡 {suggestion.reason}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 ml-4">
                <Button
                  size="sm"
                  onClick={() => handleAddSuggestion(suggestion)}
                  className="bg-teal-500 hover:bg-teal-600 text-white"
                >
                  <Plus className="w-4 h-4 mr-1" />
                  Add
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => handleDismiss(suggestion.id)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
