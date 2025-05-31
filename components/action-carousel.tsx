"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, ChevronRight, Clock, ArrowRight } from "lucide-react"
import Link from "next/link"

interface ActionCarouselProps {
  actions: Array<{
    id: string
    title: string
    description: string
    priority: "high" | "medium" | "low"
    module: string
    estimatedTime: string
  }>
}

export function ActionCarousel({ actions }: ActionCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextAction = () => {
    setCurrentIndex((prev) => (prev + 1) % actions.length)
  }

  const prevAction = () => {
    setCurrentIndex((prev) => (prev - 1 + actions.length) % actions.length)
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800"
      case "medium":
        return "bg-accent-amber/20 text-accent-amber"
      case "low":
        return "bg-accent-teal/20 text-accent-teal"
      default:
        return "bg-accent-blue-grey/20 text-primary"
    }
  }

  const getModuleColor = (module: string) => {
    switch (module) {
      case "finance":
        return "bg-accent-teal/20 text-accent-teal"
      case "coverage":
        return "bg-accent-amber/20 text-accent-amber"
      case "health":
        return "bg-accent-blue-grey/20 text-primary"
      case "planning":
        return "bg-accent-teal/20 text-accent-teal"
      default:
        return "bg-accent-blue-grey/20 text-primary"
    }
  }

  const getActionLink = (action: any) => {
    if (action.id === "compare-healthcare") {
      return "/health-care-planning"
    }
    return `/${action.module}`
  }

  if (actions.length === 0) return null

  return (
    <Card className="border-0 shadow-md bg-gradient-to-r from-accent-blue-grey/5 to-accent-teal/5">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-800">Your Next Best Steps</h3>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={prevAction}
              disabled={actions.length <= 1}
              className="w-8 h-8 p-0"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <span className="text-sm text-gray-600">
              {currentIndex + 1} of {actions.length}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={nextAction}
              disabled={actions.length <= 1}
              className="w-8 h-8 p-0"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div className="relative overflow-hidden">
          <div
            className="flex transition-transform duration-300 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {actions.map((action, index) => (
              <div key={action.id} className="w-full flex-shrink-0">
                <div className="bg-white/70 p-6 rounded-lg">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-800 mb-2">{action.title}</h4>
                      <p className="text-gray-600 mb-3">{action.description}</p>

                      <div className="flex items-center gap-2 mb-4">
                        <Badge className={getPriorityColor(action.priority)} variant="secondary">
                          {action.priority} priority
                        </Badge>
                        <Badge className={getModuleColor(action.module)} variant="secondary">
                          {action.module}
                        </Badge>
                        <div className="flex items-center gap-1 text-sm text-gray-500">
                          <Clock className="w-3 h-3" />
                          {action.estimatedTime}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Link href={getActionLink(action)}>
                      <Button className="bg-accent-teal hover:bg-accent-teal/90 text-white">
                        Start Now
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </Link>
                    <Button variant="outline" size="sm">
                      Learn More
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dots indicator */}
        {actions.length > 1 && (
          <div className="flex justify-center gap-2 mt-4">
            {actions.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentIndex ? "bg-accent-teal" : "bg-accent-blue-grey/30"
                }`}
              />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
