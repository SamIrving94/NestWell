"use client"

import { useEffect, useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface TimelineEventProps {
  event: any
  index: number
  isVisible: boolean
  observer: IntersectionObserver | null
  onUpdate: (id: number, updates: any) => void
  onRemove: (id: number) => void
  getCategoryColor: (category: string) => string
}

export function TimelineEvent({
  event,
  index,
  isVisible,
  observer,
  onUpdate,
  onRemove,
  getCategoryColor,
}: TimelineEventProps) {
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (observer && cardRef.current) {
      observer.observe(cardRef.current)
    }

    return () => {
      if (observer && cardRef.current) {
        observer.unobserve(cardRef.current)
      }
    }
  }, [observer])

  return (
    <div className="relative flex-shrink-0 w-80">
      {/* Timeline dot */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
        <div className="w-6 h-6 bg-amber-500 rounded-full border-4 border-white shadow-lg" />
      </div>

      {/* Event card */}
      <Card
        ref={cardRef}
        data-event-id={event.id}
        className={`border-0 shadow-lg transition-all duration-700 hover:shadow-xl hover:scale-105 ${
          index % 2 === 0 ? "mt-16" : "mb-16"
        } ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        style={{ transitionDelay: `${index * 200}ms` }}
      >
        <CardContent className="pt-6">
          <div className="text-center">
            {/* Icon */}
            <div className="w-12 h-12 mx-auto mb-3 bg-amber-100 rounded-full flex items-center justify-center text-2xl">
              {event.icon}
            </div>

            {/* Age/Year */}
            <div className="mb-2">
              <div className="text-lg font-bold text-amber-600">Age {event.age}</div>
              <div className="text-sm text-gray-500">{event.year}</div>
            </div>

            {/* Title and description */}
            <h3 className="text-lg font-semibold mb-2">{event.title}</h3>
            <p className="text-gray-600 text-sm mb-4">{event.description}</p>

            {/* Category badge */}
            <Badge variant="outline" className={`${getCategoryColor(event.category)} mb-4`}>
              {event.category}
            </Badge>

            {/* Actions */}
            <div className="space-y-2">
              <Button size="sm" className="w-full bg-amber-500 hover:bg-amber-600 text-white">
                Get Ready
              </Button>

              {event.isCustom && (
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1 text-xs"
                    onClick={() => {
                      // Handle edit
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1 text-xs text-red-600 hover:text-red-700"
                    onClick={() => onRemove(event.id)}
                  >
                    Remove
                  </Button>
                </div>
              )}
            </div>

            {/* Special messaging for current age */}
            {event.id === "current" && (
              <div className="mt-3 p-2 bg-green-50 rounded-md border border-green-200">
                <p className="text-xs text-green-700 font-medium">You are here! 🌟</p>
              </div>
            )}

            {/* Upcoming milestone indicator */}
            {event.age <= new Date().getFullYear() - 1965 + 5 && event.id !== "current" && (
              <div className="mt-3 p-2 bg-amber-50 rounded-md border border-amber-200">
                <p className="text-xs text-amber-700 font-medium">Coming up soon!</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
