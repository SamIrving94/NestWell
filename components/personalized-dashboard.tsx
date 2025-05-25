"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { TrendingUp, Calendar, Target, Sparkles, ArrowRight } from "lucide-react"
import { FloatingFeatherReward } from "@/components/floating-feather-reward"

interface DashboardProps {
  userName?: string
  lastVisit?: string
  scoreChange?: number
  currentScore?: number
  recentActivity?: string[]
  nextMilestone?: {
    title: string
    date: string
    category: string
  }
}

export function PersonalizedDashboard({
  userName = "Sam",
  lastVisit = "3 days ago",
  scoreChange = 5,
  currentScore = 77,
  recentActivity = ["Added pension details", "Explored care costs", "Updated health assessment"],
  nextMilestone = {
    title: "Review insurance coverage",
    date: "Next month",
    category: "insurance",
  },
}: DashboardProps) {
  const [showCelebration, setShowCelebration] = useState(false)
  const [timeOfDay, setTimeOfDay] = useState("")

  useEffect(() => {
    const hour = new Date().getHours()
    if (hour < 12) setTimeOfDay("morning")
    else if (hour < 17) setTimeOfDay("afternoon")
    else setTimeOfDay("evening")

    // Show celebration if score has improved
    if (scoreChange > 0) {
      setShowCelebration(true)
      setTimeout(() => setShowCelebration(false), 3000)
    }
  }, [scoreChange])

  const getGreeting = () => {
    const greetings = {
      morning: `Good morning, ${userName}`,
      afternoon: `Good afternoon, ${userName}`,
      evening: `Good evening, ${userName}`,
    }
    return greetings[timeOfDay as keyof typeof greetings] || `Hello, ${userName}`
  }

  const getScoreChangeMessage = () => {
    if (scoreChange > 0) {
      return `Your NestWell Score has improved by +${scoreChange} since your last visit!`
    } else if (scoreChange < 0) {
      return `Your score has decreased by ${Math.abs(scoreChange)}. Let's see how we can improve it.`
    }
    return "Your score is holding steady. Great consistency!"
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "financial":
        return "bg-green-100 text-green-800"
      case "insurance":
        return "bg-blue-100 text-blue-800"
      case "health":
        return "bg-purple-100 text-purple-800"
      case "care":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      {showCelebration && <FloatingFeatherReward />}

      {/* Welcome Header */}
      <Card className="border-0 shadow-lg bg-gradient-to-r from-amber-50 via-orange-50 to-sky-100">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-serif font-semibold text-gray-800 mb-2">{getGreeting()}</h1>
              <p className="text-gray-600">Let's check in on your planning journey.</p>
              <p className="text-sm text-gray-500 mt-1">Last visit: {lastVisit}</p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-amber-600">{currentScore}</div>
              <div className="text-sm text-gray-600">NestWell Score</div>
              {scoreChange !== 0 && (
                <div
                  className={`text-sm flex items-center gap-1 ${scoreChange > 0 ? "text-green-600" : "text-red-600"}`}
                >
                  <TrendingUp className={`w-4 h-4 ${scoreChange < 0 ? "rotate-180" : ""}`} />
                  {scoreChange > 0 ? "+" : ""}
                  {scoreChange}
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Score Update Alert */}
      {scoreChange !== 0 && (
        <Card className={`border-0 shadow-md ${scoreChange > 0 ? "bg-green-50" : "bg-amber-50"}`}>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${scoreChange > 0 ? "bg-green-100" : "bg-amber-100"}`}
              >
                {scoreChange > 0 ? (
                  <Sparkles className="w-5 h-5 text-green-600" />
                ) : (
                  <Target className="w-5 h-5 text-amber-600" />
                )}
              </div>
              <div className="flex-1">
                <p className={`font-medium ${scoreChange > 0 ? "text-green-800" : "text-amber-800"}`}>
                  {getScoreChangeMessage()}
                </p>
                {scoreChange > 0 && <p className="text-sm text-green-600 mt-1">You're building something strong! 🌟</p>}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Quick Stats Grid */}
      <div className="grid md:grid-cols-3 gap-4">
        <Card className="border-0 shadow-md">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Actions Completed</p>
                <p className="text-2xl font-bold text-gray-800">{recentActivity.length}</p>
              </div>
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <Target className="w-5 h-5 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Planning Progress</p>
                <p className="text-2xl font-bold text-gray-800">73%</p>
              </div>
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Next Milestone</p>
                <p className="text-sm font-medium text-gray-800">{nextMilestone.date}</p>
              </div>
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                <Calendar className="w-5 h-5 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card className="border-0 shadow-md">
        <CardHeader>
          <CardTitle className="text-lg">Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm text-gray-700">{activity}</span>
                <Badge variant="secondary" className="ml-auto text-xs">
                  Recent
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Next Milestone */}
      <Card className="border-0 shadow-md bg-gradient-to-r from-purple-50 to-pink-50">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-gray-800 mb-1">Coming Up Next</h3>
              <p className="text-gray-600">{nextMilestone.title}</p>
              <Badge className={`mt-2 ${getCategoryColor(nextMilestone.category)}`}>{nextMilestone.category}</Badge>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600 mb-2">{nextMilestone.date}</p>
              <Link href="/planner">
                <Button size="sm" className="bg-purple-500 hover:bg-purple-600 text-white">
                  View Timeline
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* AI Assistant Suggestions */}
      <Card className="border-0 shadow-md bg-gradient-to-r from-amber-50 to-orange-50">
        <CardContent className="p-6">
          <h3 className="font-semibold text-gray-800 mb-4">Suggested Next Steps</h3>
          <div className="space-y-3">
            <Button variant="outline" className="w-full justify-start h-auto p-4 text-left">
              <div>
                <p className="font-medium">Want to add a new savings goal for 2025?</p>
                <p className="text-sm text-gray-600">Set up automatic contributions to reach your target</p>
              </div>
            </Button>
            <Button variant="outline" className="w-full justify-start h-auto p-4 text-left">
              <div>
                <p className="font-medium">Simulate care costs for your timeline</p>
                <p className="text-sm text-gray-600">You've added care planning - let's explore the numbers</p>
              </div>
            </Button>
            <Button variant="outline" className="w-full justify-start h-auto p-4 text-left">
              <div>
                <p className="font-medium">Review your pension gaps</p>
                <p className="text-sm text-gray-600">It's been a while since your last pension review</p>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Quick Access Actions */}
      <div className="grid md:grid-cols-2 gap-4">
        <Link href="/insights">
          <Card className="border-0 shadow-md hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-gray-800">View All Insights</h4>
                  <p className="text-sm text-gray-600">Explore personalized recommendations</p>
                </div>
                <ArrowRight className="w-5 h-5 text-gray-400" />
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/planner">
          <Card className="border-0 shadow-md hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-gray-800">Update Timeline</h4>
                  <p className="text-sm text-gray-600">Add or edit your planning milestones</p>
                </div>
                <ArrowRight className="w-5 h-5 text-gray-400" />
              </div>
            </CardContent>
          </Card>
        </Link>
      </div>

      {/* Micro-celebration */}
      {scoreChange > 0 && (
        <Card className="border-0 shadow-md bg-gradient-to-r from-green-50 to-emerald-50">
          <CardContent className="p-4 text-center">
            <p className="text-green-800 font-medium">
              🎉 You're {Math.floor(scoreChange / 2)} steps closer to retirement readiness!
            </p>
            <p className="text-sm text-green-600 mt-1">Keep up the great work, {userName}!</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
