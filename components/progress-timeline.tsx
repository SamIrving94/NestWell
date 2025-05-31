"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, Calendar, CheckCircle } from "lucide-react"

interface ProgressTimelineProps {
  readinessScore: number
  recentActivity: string[]
}

export function ProgressTimeline({ readinessScore, recentActivity }: ProgressTimelineProps) {
  const timelineEvents = [
    {
      date: "Today",
      title: "Completed Health Assessment",
      description: "Updated your health profile and mobility status",
      type: "completed",
      scoreImpact: "+3",
    },
    {
      date: "Yesterday",
      title: "Added Pension Information",
      description: "Entered workplace pension details",
      type: "completed",
      scoreImpact: "+5",
    },
    {
      date: "3 days ago",
      title: "Started NestWell Journey",
      description: "Completed initial onboarding assessment",
      type: "completed",
      scoreImpact: "+15",
    },
    {
      date: "Next",
      title: "Upload Insurance Documents",
      description: "Add your insurance policies for gap analysis",
      type: "upcoming",
      scoreImpact: "+8",
    },
  ]

  return (
    <div className="space-y-6">
      {/* Progress Overview */}
      <Card className="border-0 shadow-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-accent-teal" />
            Your Progress Journey
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-accent-teal mb-2">{readinessScore}</div>
              <div className="text-sm text-gray-600">Current Score</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">+23</div>
              <div className="text-sm text-gray-600">Points Gained</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">{recentActivity.length}</div>
              <div className="text-sm text-gray-600">Actions Completed</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Timeline */}
      <Card className="border-0 shadow-md">
        <CardHeader>
          <CardTitle>Recent Activity Timeline</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {timelineEvents.map((event, index) => (
              <div key={index} className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  {event.type === "completed" ? (
                    <div className="w-10 h-10 bg-accent-teal rounded-full flex items-center justify-center">
                      <CheckCircle className="w-5 h-5 text-white" />
                    </div>
                  ) : (
                    <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                      <Calendar className="w-5 h-5 text-gray-500" />
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-semibold text-gray-800">{event.title}</h4>
                    {event.scoreImpact && (
                      <Badge
                        variant="outline"
                        className={
                          event.type === "completed" ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"
                        }
                      >
                        {event.scoreImpact} score
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mb-1">{event.description}</p>
                  <p className="text-xs text-gray-500">{event.date}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
