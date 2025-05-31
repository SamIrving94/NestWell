"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ReadinessScoreDial } from "@/components/readiness-score-dial"
import { ModuleSummaryCards } from "@/components/module-summary-cards"
import { AssistantNudgePanel } from "@/components/assistant-nudge-panel"
import { ActionCarousel } from "@/components/action-carousel"
import { ProgressTimeline } from "@/components/progress-timeline"
import { TrendingUp, Calendar, Target, Info } from "lucide-react"

interface MyPlanDashboardProps {
  readinessScore: number
  subScores: {
    finance: number
    coverage: number
    health: number
    planning: number
  }
  moduleStatuses: {
    [key: string]: {
      status: "excellent" | "good" | "needs-attention" | "critical"
      completeness: number
      nextAction: string
    }
  }
  recentActivity: string[]
  nextBestActions: Array<{
    id: string
    title: string
    description: string
    priority: "high" | "medium" | "low"
    module: string
    estimatedTime: string
  }>
  upcomingMilestones: Array<{
    title: string
    date: string
    category: string
    age: number
  }>
}

export function MyPlanDashboard({
  readinessScore,
  subScores,
  moduleStatuses,
  recentActivity,
  nextBestActions,
  upcomingMilestones,
}: MyPlanDashboardProps) {
  const [timeOfDay, setTimeOfDay] = useState("")
  const [showTooltip, setShowTooltip] = useState(false)

  useEffect(() => {
    const hour = new Date().getHours()
    if (hour < 12) setTimeOfDay("morning")
    else if (hour < 17) setTimeOfDay("afternoon")
    else setTimeOfDay("evening")
  }, [])

  const getReadinessLabel = (score: number) => {
    if (score >= 85) return "Excellently Prepared"
    if (score >= 70) return "Well Prepared"
    if (score >= 55) return "Moderately Prepared"
    if (score >= 40) return "Getting Started"
    return "Needs Attention"
  }

  const getReadinessColor = (score: number) => {
    if (score >= 85) return "text-accent-teal"
    if (score >= 70) return "text-accent-teal"
    if (score >= 55) return "text-accent-amber"
    if (score >= 40) return "text-accent-amber"
    return "text-destructive"
  }

  const getGreeting = () => {
    const greetings = {
      morning: "Good morning",
      afternoon: "Good afternoon",
      evening: "Good evening",
    }
    return greetings[timeOfDay as keyof typeof greetings] || "Hello"
  }

  // Enhanced next best actions to include comparison tool
  const enhancedActions = [
    {
      id: "compare-healthcare",
      title: "Compare Healthcare Options",
      description: "See costs for NHS vs self-insured vs private insurance",
      priority: "high" as const,
      module: "health",
      estimatedTime: "5 minutes",
    },
    ...nextBestActions,
  ]

  return (
    <div className="container mx-auto section-padding-responsive">
      <div className="max-w-7xl mx-auto">
        {/* Header Overview */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            {/* Welcome & Score */}
            <div className="flex-1">
              <h1 className="text-responsive-h1 text-primary mb-1 sm:mb-2 font-medium">
                {getGreeting()}, <span className="text-accent-teal">Sam</span>
              </h1>
              <p className="text-responsive-body text-muted-foreground mb-2 sm:mb-4">
                Here's your complete planning overview
              </p>

              {/* Readiness Score Overview */}
              <div className="flex items-center gap-4">
                <div className="relative">
                  <ReadinessScoreDial score={readinessScore} size="large" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className={`text-lg sm:text-xl md:text-2xl font-bold ${getReadinessColor(readinessScore)}`}>
                      {getReadinessLabel(readinessScore)}
                    </h2>
                    <button
                      onMouseEnter={() => setShowTooltip(true)}
                      onMouseLeave={() => setShowTooltip(false)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <Info className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-600">
                    Your NestWell Readiness Score: {readinessScore}/100
                  </p>

                  {/* Tooltip */}
                  {showTooltip && (
                    <div className="absolute z-10 mt-2 p-3 bg-gray-800 text-white text-sm rounded-lg shadow-lg max-w-xs">
                      <p className="font-medium mb-1">What's helping your score:</p>
                      <ul className="text-xs space-y-1">
                        <li>• Strong health planning ({subScores.health}/100)</li>
                        <li>• Good financial foundation ({subScores.finance}/100)</li>
                      </ul>
                      <p className="font-medium mt-2 mb-1">Areas to improve:</p>
                      <ul className="text-xs space-y-1">
                        <li>• Insurance coverage gaps ({subScores.coverage}/100)</li>
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Sub-scores */}
            <div className="grid grid-cols-2 gap-2 sm:gap-4 lg:grid-cols-4">
              <Card className="border-0 shadow-sm bg-gradient-to-br from-accent-teal/10 to-accent-teal/5">
                <CardContent className="p-3 sm:p-4 text-center">
                  <div className="text-xl sm:text-2xl font-semibold text-accent-teal">{subScores.finance}</div>
                  <div className="text-xs sm:text-sm text-muted-foreground">Finance</div>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-sm bg-gradient-to-br from-accent-amber/10 to-accent-amber/5">
                <CardContent className="p-3 sm:p-4 text-center">
                  <div className="text-xl sm:text-2xl font-semibold text-accent-amber">{subScores.coverage}</div>
                  <div className="text-xs sm:text-sm text-muted-foreground">Coverage</div>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-sm bg-gradient-to-br from-accent-blue-grey/10 to-accent-blue-grey/5">
                <CardContent className="p-3 sm:p-4 text-center">
                  <div className="text-xl sm:text-2xl font-semibold text-primary">{subScores.health}</div>
                  <div className="text-xs sm:text-sm text-muted-foreground">Health</div>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-sm bg-gradient-to-br from-accent-teal/10 to-accent-teal/5">
                <CardContent className="p-3 sm:p-4 text-center">
                  <div className="text-xl sm:text-2xl font-semibold text-accent-teal">{subScores.planning}</div>
                  <div className="text-xs sm:text-sm text-muted-foreground">Planning</div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Ambient Feather Animation */}
        <div className="absolute top-8 right-8 pointer-events-none">
          <div className="animate-feather-ambient opacity-30">
            <svg width="24" height="30" viewBox="0 0 24 30" className="text-accent-amber">
              <path
                d="M12 0C12 0 18 6 18 15C18 24 12 30 12 30C12 30 6 24 6 15C6 6 12 0 12 0Z"
                fill="currentColor"
                opacity="0.6"
              />
              <path
                d="M12 3C12 3 15 7.5 15 15C15 22.5 12 27 12 27C12 27 9 22.5 9 15C9 7.5 12 3 12 3Z"
                fill="currentColor"
                opacity="0.8"
              />
            </svg>
          </div>
        </div>

        {/* Assistant Nudge Panel */}
        <AssistantNudgePanel
          readinessScore={readinessScore}
          moduleStatuses={moduleStatuses}
          nextBestActions={enhancedActions}
        />

        {/* Main Content Tabs */}
        <Tabs defaultValue="overview" className="mb-8">
          <TabsList className="grid w-full grid-cols-3 gap-1 sm:gap-2 mb-4 sm:mb-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="modules">Modules</TabsTrigger>
            <TabsTrigger value="progress">Progress</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-0">
            <div className="space-y-6">
              {/* Action Carousel */}
              <ActionCarousel actions={enhancedActions} />

              {/* Quick Stats Grid */}
              <div className="grid md:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
                <Card className="border-0 shadow-md">
                  <CardHeader className="pb-1 sm:pb-2">
                    <CardTitle className="text-base sm:text-lg flex items-center gap-1 sm:gap-2">
                      <Target className="w-4 h-4 sm:w-5 sm:h-5" />
                      Actions Completed
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl sm:text-3xl font-bold text-gray-800 mb-1">{recentActivity.length}</div>
                    <p className="text-xs sm:text-sm text-gray-600">This week</p>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-md">
                  <CardHeader className="pb-1 sm:pb-2">
                    <CardTitle className="text-base sm:text-lg flex items-center gap-1 sm:gap-2">
                      <Calendar className="w-4 h-4 sm:w-5 sm:h-5" />
                      Upcoming Milestones
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl sm:text-3xl font-bold text-gray-800 mb-1">{upcomingMilestones.length}</div>
                    <p className="text-xs sm:text-sm text-gray-600">Next 3 months</p>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-md">
                  <CardHeader className="pb-1 sm:pb-2">
                    <CardTitle className="text-base sm:text-lg flex items-center gap-1 sm:gap-2">
                      <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5" />
                      Score Trend
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-2">
                      <div className="text-2xl sm:text-3xl font-bold text-green-600">+5</div>
                      <div className="text-xs sm:text-sm text-gray-600">This month</div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Upcoming Milestones */}
              <Card className="border-0 shadow-md">
                <CardHeader>
                  <CardTitle>Upcoming Milestones</CardTitle>
                </CardHeader>
                <CardContent className="p-3 sm:p-4 md:p-6">
                  <div className="space-y-4">
                    {upcomingMilestones.map((milestone, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-2 sm:p-3 md:p-4 bg-gray-50 rounded-lg"
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center ${
                              milestone.category === "finance"
                                ? "bg-teal-100 text-teal-600"
                                : milestone.category === "coverage"
                                  ? "bg-red-100 text-red-600"
                                  : milestone.category === "health"
                                    ? "bg-blue-100 text-blue-600"
                                    : "bg-purple-100 text-purple-600"
                            }`}
                          >
                            <Calendar className="w-4 h-4 sm:w-5 sm:h-5" />
                          </div>
                          <div>
                            <div className="font-medium text-sm sm:text-base">{milestone.title}</div>
                            <div className="text-xs sm:text-sm text-gray-600">
                              {milestone.date} • Age {milestone.age}
                            </div>
                          </div>
                        </div>
                        <Badge variant="outline" className="capitalize">
                          {milestone.category}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="modules" className="mt-0">
            <ModuleSummaryCards moduleStatuses={moduleStatuses} subScores={subScores} />
          </TabsContent>

          <TabsContent value="progress" className="mt-0">
            <ProgressTimeline readinessScore={readinessScore} recentActivity={recentActivity} />
          </TabsContent>
        </Tabs>

        {/* Recent Activity */}
        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent className="p-3 sm:p-4 md:p-6">
            <div className="space-y-3">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center gap-3 p-2 sm:p-3 bg-gray-50 rounded-lg">
                  <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                  <span className="text-xs sm:text-sm text-gray-700">{activity}</span>
                  <Badge variant="secondary" className="ml-auto text-xs">
                    {index === 0 ? "Today" : index === 1 ? "Yesterday" : "3 days ago"}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
