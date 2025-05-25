"use client"

import { useState } from "react"

export function TimelinePlanner() {
  const currentYear = new Date().getFullYear()
  const [currentAge, setCurrentAge] = useState(65)

  const timelineEvents = [
    {
      age: currentAge,
      year: currentYear,
      title: "Now",
      description: "Current situation assessment",
      category: "current",
    },
    {
      age: currentAge + 1,
      year: currentYear + 1,
      title: "Insurance Review",
      description: "Review and update insurance coverage",
      category: "insurance",
    },
    {
      age: currentAge + 2,
      year: currentYear + 2,
      title: "Will Update",
      description: "Update will and power of attorney",
      category: "legacy",
    },
    {
      age: currentAge + 5,
      year: currentYear + 5,
      title: "Pension Drawdown",
      description: "Begin pension drawdown strategy",
      category: "financial",
    },
    {
      age: currentAge + 8,
      year: currentYear + 8,
      title: "Downsizing Consideration",
      description: "Evaluate housing needs and options",
      category: "housing",
    },
    {
      age: currentAge + 12,
      year: currentYear + 12,
      title: "Care Planning Review",
      description: "Review long-term care preferences and funding",
      category: "care",
    },
    {
      age: currentAge + 15,
      year: currentYear + 15,
      title: "Estate Planning Update",
      description: "Comprehensive review of estate plans",
      category: "legacy",
    },
  ]

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "current":
        return "bg-gray-200"
      case "financial":
        return "bg-green-100 border-green-300"
      case "insurance":
        return "bg-blue-100 border-blue-300"
      case "legacy":
        return "bg-purple-100 border-purple-300"
      case "housing":
        return "bg-amber-100 border-amber-300"
      case "care":
        return "bg-red-100 border-red-300"
      default:
        return "bg-gray-100 border-gray-300"
    }
  }

  return (
    <div className="relative">
      {/* Timeline line */}
      <div className="absolute left-16 top-8 bottom-0 w-0.5 bg-gray-200"></div>

      {/* Timeline events */}
      <div className="space-y-8">
        {timelineEvents.map((event, index) => (
          <div key={index} className="relative flex items-start gap-4">
            {/* Year/Age marker */}
            <div className="w-32 flex-shrink-0 text-right">
              <div className="text-sm font-medium">{event.year}</div>
              <div className="text-xs text-gray-500">Age {event.age}</div>
            </div>

            {/* Timeline dot */}
            <div className="relative z-10 mt-1 w-4 h-4 rounded-full bg-white border-2 border-amber-500 flex-shrink-0"></div>

            {/* Event content */}
            <div className={`flex-1 p-3 rounded-md border ${getCategoryColor(event.category)}`}>
              <h4 className="text-sm font-medium">{event.title}</h4>
              <p className="text-xs text-gray-600">{event.description}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 pt-4 border-t text-center text-sm text-gray-500">
        This timeline is a suggestion based on your information and can be adjusted as your needs change.
      </div>
    </div>
  )
}
