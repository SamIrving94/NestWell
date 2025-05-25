"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"
import { CircularProgressBar } from "@/components/circular-progress-bar"
import { FinancialHealthCard } from "@/components/financial-health-card"
import { HealthLifestyleCard } from "@/components/health-lifestyle-card"
import { InsuranceCard } from "@/components/insurance-card"
import { LongTermCareCard } from "@/components/long-term-care-card"
import { FamilyLegacyCard } from "@/components/family-legacy-card"
import { TimelinePlanner } from "@/components/timeline-planner"
import { AIAssistantPlanner } from "@/components/ai-assistant-planner"

interface CentralHubProps {
  userName?: string
  userScore: number
  scoreChange?: number
  lastVisit?: string
  recentActivity?: string[]
  nextMilestone?: {
    title: string
    date: string
    category: string
    age: number
  }
  completedModules?: string[]
  pendingActions?: number
}

export function CentralHub({
  userName = "Sam",
  userScore = 72,
  scoreChange = 0,
  lastVisit = "2 days ago",
  recentActivity = [],
  nextMilestone = {
    title: "Review pension options",
    date: "Next month",
    category: "financial",
    age: 65,
  },
  completedModules = [],
  pendingActions = 3,
}: CentralHubProps) {
  const [showAddMilestone, setShowAddMilestone] = useState(false)
  const currentAge = 65 // Would come from user data
  const timeOfDay = getTimeOfDay()

  function getTimeOfDay() {
    const hour = new Date().getHours()
    if (hour < 12) return "morning"
    if (hour < 18) return "afternoon"
    return "evening"
  }

  const getGreeting = () => {
    switch (timeOfDay) {
      case "morning":
        return "Good morning"
      case "afternoon":
        return "Good afternoon"
      case "evening":
        return "Good evening"
      default:
        return "Hello"
    }
  }

  const getScoreChangeIndicator = () => {
    if (scoreChange > 0) return { text: `+${scoreChange}`, color: "text-green-600" }
    if (scoreChange < 0) return { text: scoreChange.toString(), color: "text-red-600" }
    return { text: "0", color: "text-gray-600" }
  }

  const scoreChangeIndicator = getScoreChangeIndicator()

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-7xl mx-auto">
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-serif font-semibold text-gray-800">
            {getGreeting()}, <span className="text-amber-600">{userName}</span>
          </h1>
          <p className="text-gray-600">Your personalized planning hub</p>
        </div>

        {/* Score and Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* NestWell Score */}
          <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Your NestWell Score</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="w-24 h-24">
                  <CircularProgressBar percentage={userScore} />
                </div>
                <div className="text-right">
                  <div className="text-4xl font-bold">{userScore}</div>
                  <div className={`text-sm font-medium ${scoreChangeIndicator.color}`}>
                    {scoreChangeIndicator.text} since last visit
                  </div>
                  <Link href="/score">
                    <Button variant="link" className="text-amber-600 p-0 h-auto text-sm">
                      View details
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Planning Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-amber-50 p-3 rounded-lg">
                  <div className="text-2xl font-bold text-amber-700">
                    {completedModules?.length || 0}
                    <span className="text-sm text-amber-600 font-normal">/6</span>
                  </div>
                  <div className="text-sm text-gray-600">Modules Completed</div>
                </div>
                <div className="bg-blue-50 p-3 rounded-lg">
                  <div className="text-2xl font-bold text-blue-700">{pendingActions}</div>
                  <div className="text-sm text-gray-600">Pending Actions</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Next Milestone */}
          <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Next Milestone</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-start gap-3">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                    nextMilestone.category === "financial"
                      ? "bg-green-100 text-green-600"
                      : nextMilestone.category === "health"
                        ? "bg-blue-100 text-blue-600"
                        : nextMilestone.category === "insurance"
                          ? "bg-purple-100 text-purple-600"
                          : "bg-amber-100 text-amber-600"
                  }`}
                >
                  {nextMilestone.category === "financial" ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <path d="M16 8h-6.5a2.5 2.5 0 0 0 0 5h3a2.5 2.5 0 0 1 0 5H6" />
                      <path d="M12 18v2" />
                      <path d="M12 6V4" />
                    </svg>
                  ) : nextMilestone.category === "health" ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                    </svg>
                  ) : nextMilestone.category === "insurance" ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2" />
                      <path d="M7 2v20" />
                      <path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7" />
                    </svg>
                  )}
                </div>
                <div>
                  <div className="font-medium">{nextMilestone.title}</div>
                  <div className="text-sm text-gray-600">
                    {nextMilestone.date} • Age {nextMilestone.age}
                  </div>
                  <Link href="/planner">
                    <Button variant="link" className="text-amber-600 p-0 h-auto text-sm">
                      View timeline
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="modules" className="mb-12">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="modules">Planning Modules</TabsTrigger>
            <TabsTrigger value="timeline">Your Timeline</TabsTrigger>
          </TabsList>

          <TabsContent value="modules" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Financial Health */}
              <FinancialHealthCard />

              {/* Insurance Coverage */}
              <InsuranceCard />

              {/* Health & Lifestyle */}
              <HealthLifestyleCard />

              {/* Long-term Care */}
              <LongTermCareCard />

              {/* Family & Legacy */}
              <FamilyLegacyCard />

              {/* Advice & Costs */}
              <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-purple-500"
                      >
                        <path d="M12 2H2v10l9.29 9.29c.94.94 2.48.94 3.42 0l6.58-6.58c.94-.94.94-2.48 0-3.42L12 2Z" />
                        <path d="M7 7h.01" />
                      </svg>
                      Advice & Costs
                    </CardTitle>
                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">Coming Soon</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4">
                    Compare advice options and understand the costs of financial guidance.
                  </p>
                  <Link href="/advice-comparison">
                    <Button className="w-full bg-purple-500 hover:bg-purple-600 text-white">
                      Explore Advice Options
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="timeline" className="mt-0">
            <Card className="border-0 shadow-md">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Your Planning Timeline</CardTitle>
                  <Button
                    onClick={() => setShowAddMilestone(true)}
                    className="bg-amber-500 hover:bg-amber-600 text-white"
                  >
                    Add Milestone
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <TimelinePlanner />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Recent Activity */}
        <Card className="border-0 shadow-md mb-12">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.length > 0 ? (
                recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-amber-600"
                      >
                        <polyline points="22 12 16 12 14 15 10 15 8 12 2 12" />
                        <path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" />
                      </svg>
                    </div>
                    <div>
                      <div className="font-medium">{activity}</div>
                      <div className="text-xs text-gray-500">
                        {index === 0 ? "Today" : index === 1 ? "Yesterday" : "3 days ago"}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-6 text-gray-500">No recent activity to show</div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="mb-12">
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link href="/healthcare-costs">
              <Button variant="outline" className="w-full h-auto py-4 px-4 flex flex-col items-center gap-2">
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
                  className="text-blue-500"
                >
                  <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                </svg>
                <span className="text-sm">Healthcare Costs</span>
              </Button>
            </Link>
            <Link href="/care-scenarios">
              <Button variant="outline" className="w-full h-auto py-4 px-4 flex flex-col items-center gap-2">
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
                  className="text-purple-500"
                >
                  <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
                <span className="text-sm">Care Scenarios</span>
              </Button>
            </Link>
            <Link href="/planner">
              <Button variant="outline" className="w-full h-auto py-4 px-4 flex flex-col items-center gap-2">
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
                  className="text-amber-500"
                >
                  <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
                  <line x1="16" x2="16" y1="2" y2="6" />
                  <line x1="8" x2="8" y1="2" y2="6" />
                  <line x1="3" x2="21" y1="10" y2="10" />
                  <path d="m9 16 2 2 4-4" />
                </svg>
                <span className="text-sm">Timeline</span>
              </Button>
            </Link>
            <Link href="/insights">
              <Button variant="outline" className="w-full h-auto py-4 px-4 flex flex-col items-center gap-2">
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
                  className="text-green-500"
                >
                  <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                  <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                </svg>
                <span className="text-sm">Insights</span>
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* AI Assistant Planner */}
      <AIAssistantPlanner currentAge={currentAge} viewMode="age" onAddMilestone={() => setShowAddMilestone(true)} />
    </div>
  )
}
