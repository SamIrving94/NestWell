"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ReadinessScoreDial } from "@/components/readiness-score-dial"
import { FloatingFeather } from "@/components/floating-feather"
import { AssistantMessage } from "@/components/assistant-message"
import Link from "next/link"
import { ArrowRight, TrendingUp, Calendar, Target, Shield, Heart, PiggyBank } from "lucide-react"

interface CentralHubProps {
  userName: string
  userScore: number
  scoreChange: number
  lastVisit: string
  recentActivity: string[]
  nextMilestone: {
    title: string
    date: string
    category: string
    age: number
  }
  completedModules: string[]
  pendingActions: number
}

export function CentralHub({
  userName,
  userScore,
  scoreChange,
  lastVisit,
  recentActivity,
  nextMilestone,
  completedModules,
  pendingActions,
}: CentralHubProps) {
  const [showFeathers, setShowFeathers] = useState(false)
  const [currentTime, setCurrentTime] = useState("")

  useEffect(() => {
    const now = new Date()
    const hour = now.getHours()
    if (hour < 12) setCurrentTime("morning")
    else if (hour < 17) setCurrentTime("afternoon")
    else setCurrentTime("evening")

    // Show feathers on load
    setShowFeathers(true)
    setTimeout(() => setShowFeathers(false), 3000)
  }, [])

  const getGreeting = () => {
    const greetings = {
      morning: "Good morning",
      afternoon: "Good afternoon",
      evening: "Good evening",
    }
    return greetings[currentTime as keyof typeof greetings] || "Hello"
  }

  const modules = [
    {
      id: "pension-savings",
      title: "Pension & Savings",
      description: "Track your retirement funds and projections",
      icon: <PiggyBank className="w-6 h-6" />,
      status: completedModules.includes("pension-savings") ? "completed" : "pending",
      link: "/pension-savings",
      color: "bg-accent-teal/10 border-accent-teal/20",
    },
    {
      id: "coverage",
      title: "Coverage Summary",
      description: "Insurance policies and gap analysis",
      icon: <Shield className="w-6 h-6" />,
      status: completedModules.includes("coverage") ? "completed" : "pending",
      link: "/coverage",
      color: "bg-accent-amber/10 border-accent-amber/20",
    },
    {
      id: "planner",
      title: "Timeline Planner",
      description: "Plan your future milestones by age",
      icon: <Calendar className="w-6 h-6" />,
      status: completedModules.includes("planner") ? "completed" : "pending",
      link: "/planner",
      color: "bg-accent-blue-grey/10 border-accent-blue-grey/20",
    },
    {
      id: "health-care",
      title: "Health & Care Planning",
      description: "Health profile and care scenarios",
      icon: <Heart className="w-6 h-6" />,
      status: completedModules.includes("health-care") ? "completed" : "pending",
      link: "/health-care-planning",
      color: "bg-accent-teal/10 border-accent-teal/20",
    },
  ]

  return (
    <div className="min-h-screen bg-canvas">
      {showFeathers && <FloatingFeather />}

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Welcome Header */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-medium text-primary">
              {getGreeting()}, <span className="text-accent-teal">{userName}</span>
            </h1>
            <p className="text-xl text-muted-foreground">Welcome to your planning hub. Here's where you stand today.</p>
          </div>

          {/* Score Overview */}
          <Card className="border-0 shadow-lg bg-gradient-to-r from-accent-teal/10 to-accent-blue-grey/5">
            <CardContent className="p-8">
              <div className="flex flex-col lg:flex-row items-center gap-8">
                <div className="flex-shrink-0">
                  <ReadinessScoreDial score={userScore} size="large" />
                </div>
                <div className="flex-1 text-center lg:text-left">
                  <h2 className="text-2xl font-semibold text-primary mb-2">Your NestWell Readiness Score</h2>
                  <div className="flex items-center justify-center lg:justify-start gap-2 mb-4">
                    <Badge className="bg-accent-teal/20 text-accent-teal">
                      {scoreChange > 0 ? `+${scoreChange}` : scoreChange} this week
                    </Badge>
                    <TrendingUp className="w-4 h-4 text-accent-teal" />
                  </div>
                  <p className="text-muted-foreground mb-4">
                    You're making steady progress on your planning journey. Keep building your nest!
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Link href="/score">
                      <Button className="bg-accent-teal hover:bg-accent-teal/90">
                        View Score Breakdown
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </Link>
                    <Link href="/insights">
                      <Button variant="outline">See Insights</Button>
                    </Link>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Module Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {modules.map((module) => (
              <Card key={module.id} className={`border-0 shadow-md hover:shadow-lg transition-all ${module.color}`}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="text-accent-teal">{module.icon}</div>
                    <Badge variant={module.status === "completed" ? "default" : "secondary"}>
                      {module.status === "completed" ? "Complete" : "Pending"}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg">{module.title}</CardTitle>
                  <p className="text-sm text-gray-600">{module.description}</p>
                </CardHeader>
                <CardContent>
                  <Link href={module.link}>
                    <Button className="w-full" variant="outline">
                      {module.status === "completed" ? "Review" : "Start"}
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Quick Actions */}
          <Card className="border-0 shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5 text-accent-amber" />
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4">
                <Link href="/health-care-planning">
                  <Button className="w-full h-20 flex flex-col gap-2 bg-accent-teal hover:bg-accent-teal/90">
                    <Heart className="w-6 h-6" />
                    Compare Healthcare Options
                  </Button>
                </Link>
                <Link href="/planner">
                  <Button className="w-full h-20 flex flex-col gap-2 bg-accent-blue-grey hover:bg-accent-blue-grey/90">
                    <Calendar className="w-6 h-6" />
                    Add Milestone
                  </Button>
                </Link>
                <Link href="/coverage">
                  <Button className="w-full h-20 flex flex-col gap-2 bg-accent-amber hover:bg-accent-amber/90">
                    <Shield className="w-6 h-6" />
                    Upload Documents
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card className="border-0 shadow-md">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-2 h-2 bg-accent-teal rounded-full"></div>
                    <span className="text-sm text-gray-700">{activity}</span>
                    <Badge variant="secondary" className="ml-auto text-xs">
                      {index === 0 ? "Today" : index === 1 ? "Yesterday" : "3 days ago"}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Assistant Message */}
          <AssistantMessage
            message="I notice you haven't uploaded your insurance documents yet. This could help improve your coverage score by 15-20 points!"
            actionText="Upload Documents"
            actionLink="/coverage"
          />
        </div>
      </div>
    </div>
  )
}
