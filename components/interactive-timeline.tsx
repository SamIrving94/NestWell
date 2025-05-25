"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { TimelineEvent } from "@/components/timeline-event"
import { FloatingFeatherScroll } from "@/components/floating-feather-scroll"

interface InteractiveTimelineProps {
  currentAge: number
  viewMode: "age" | "lifestage"
  customMilestones: any[]
  onUpdateMilestone: (id: number, updates: any) => void
  onRemoveMilestone: (id: number) => void
  onShowQuote: () => void
}

export function InteractiveTimeline({
  currentAge,
  viewMode,
  customMilestones,
  onUpdateMilestone,
  onRemoveMilestone,
  onShowQuote,
}: InteractiveTimelineProps) {
  const [visibleEvents, setVisibleEvents] = useState<Set<string>>(new Set())
  const [showFeather, setShowFeather] = useState(false)
  const timelineRef = useRef<HTMLDivElement>(null)
  const observerRef = useRef<IntersectionObserver | null>(null)

  // Default timeline events
  const defaultEvents = [
    {
      id: "current",
      age: currentAge,
      year: new Date().getFullYear(),
      title: "Today",
      description: "Your planning journey begins",
      category: "current",
      icon: "🌱",
      isDefault: true,
    },
    {
      id: "pension-start",
      age: currentAge + 2,
      year: new Date().getFullYear() + 2,
      title: "Pension Income Starts",
      description: "Begin receiving your pension benefits",
      category: "financial",
      icon: "💰",
      isDefault: true,
    },
    {
      id: "health-review",
      age: currentAge + 3,
      year: new Date().getFullYear() + 3,
      title: "Health Insurance Review",
      description: "Reassess your health coverage needs",
      category: "health",
      icon: "🏥",
      isDefault: true,
    },
    {
      id: "downsizing",
      age: currentAge + 8,
      year: new Date().getFullYear() + 8,
      title: "Consider Downsizing",
      description: "Evaluate if a smaller home suits your needs",
      category: "lifestyle",
      icon: "🏠",
      isDefault: true,
    },
    {
      id: "grandchildren-support",
      age: currentAge + 10,
      year: new Date().getFullYear() + 10,
      title: "Grandchildren Support",
      description: "Help with education or life milestones",
      category: "family",
      icon: "👨‍👩‍👧‍👦",
      isDefault: true,
    },
    {
      id: "care-planning",
      age: currentAge + 15,
      year: new Date().getFullYear() + 15,
      title: "Care Planning Review",
      description: "Plan for potential care needs and preferences",
      category: "care",
      icon: "🤝",
      isDefault: true,
    },
    {
      id: "legacy-review",
      age: currentAge + 20,
      year: new Date().getFullYear() + 20,
      title: "Legacy Planning",
      description: "Finalize your legacy and inheritance plans",
      category: "legacy",
      icon: "🌟",
      isDefault: true,
    },
  ]

  // Life stage events for alternative view
  const lifeStageEvents = [
    {
      id: "early-retirement",
      stage: "Early Retirement",
      ageRange: "60-65",
      title: "Freedom & Exploration",
      description: "Time to pursue passions and travel",
      category: "lifestyle",
      icon: "✈️",
      isDefault: true,
    },
    {
      id: "active-retirement",
      stage: "Active Retirement",
      ageRange: "65-75",
      title: "Active & Engaged",
      description: "Volunteering, hobbies, and staying active",
      category: "lifestyle",
      icon: "🎨",
      isDefault: true,
    },
    {
      id: "supported-independence",
      stage: "Supported Independence",
      ageRange: "75-85",
      title: "Comfortable Living",
      description: "Maintaining independence with some support",
      category: "care",
      icon: "🏡",
      isDefault: true,
    },
    {
      id: "legacy-years",
      stage: "Legacy Years",
      ageRange: "85+",
      title: "Wisdom & Legacy",
      description: "Sharing wisdom and leaving your mark",
      category: "legacy",
      icon: "📚",
      isDefault: true,
    },
  ]

  // Combine default and custom events
  const allEvents = viewMode === "age" ? [...defaultEvents, ...customMilestones] : lifeStageEvents

  // Sort events by age for age-based view
  const sortedEvents = viewMode === "age" ? allEvents.sort((a, b) => a.age - b.age) : allEvents

  // Intersection Observer for animations
  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const eventId = entry.target.getAttribute("data-event-id")
            if (eventId) {
              setVisibleEvents((prev) => new Set([...prev, eventId]))

              // Trigger quote occasionally
              if (Math.random() > 0.7) {
                setTimeout(onShowQuote, 500)
              }

              // Show feather animation
              setShowFeather(true)
              setTimeout(() => setShowFeather(false), 2000)
            }
          }
        })
      },
      { threshold: 0.3 },
    )

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [onShowQuote])

  const getCategoryColor = (category: string) => {
    const colors = {
      current: "bg-amber-100 text-amber-800",
      financial: "bg-green-100 text-green-800",
      health: "bg-blue-100 text-blue-800",
      lifestyle: "bg-purple-100 text-purple-800",
      family: "bg-pink-100 text-pink-800",
      care: "bg-orange-100 text-orange-800",
      legacy: "bg-indigo-100 text-indigo-800",
    }
    return colors[category as keyof typeof colors] || "bg-gray-100 text-gray-800"
  }

  return (
    <div className="relative" ref={timelineRef}>
      {/* Floating feather */}
      {showFeather && <FloatingFeatherScroll />}

      {viewMode === "age" ? (
        // Age-based horizontal timeline
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-amber-200 via-amber-300 to-amber-400 rounded-full transform -translate-y-1/2" />

          {/* Timeline events */}
          <div className="flex overflow-x-auto pb-4 space-x-8 min-h-[400px]">
            {sortedEvents.map((event, index) => (
              <TimelineEvent
                key={event.id}
                event={event}
                index={index}
                isVisible={visibleEvents.has(event.id)}
                observer={observerRef.current}
                onUpdate={onUpdateMilestone}
                onRemove={onRemoveMilestone}
                getCategoryColor={getCategoryColor}
              />
            ))}
          </div>
        </div>
      ) : (
        // Life stage vertical layout
        <div className="space-y-8">
          {sortedEvents.map((stage, index) => (
            <Card
              key={stage.id}
              data-event-id={stage.id}
              className={`border-0 shadow-lg transition-all duration-700 ${
                visibleEvents.has(stage.id) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center text-2xl flex-shrink-0">
                    {stage.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-semibold">{stage.title}</h3>
                      <Badge variant="outline" className={getCategoryColor(stage.category)}>
                        {stage.stage}
                      </Badge>
                    </div>
                    <p className="text-gray-600 mb-3">{stage.description}</p>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <span>Ages {stage.ageRange}</span>
                    </div>
                    <div className="mt-4">
                      <Button size="sm" className="bg-amber-500 hover:bg-amber-600 text-white">
                        Get Ready
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
