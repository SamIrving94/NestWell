"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import Link from "next/link"
import {
  TrendingUp,
  Calendar,
  Target,
  Sparkles,
  ArrowRight,
  Plus,
  Heart,
  Shield,
  PiggyBank,
  Users,
  Home,
  Brain,
  Calculator,
  Activity,
} from "lucide-react"
import { FloatingFeatherReward } from "@/components/floating-feather-reward"
import { AffirmationPopup } from "@/components/affirmation-popup"

interface CentralHubProps {
  userName?: string
  userScore?: number
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
  userScore = 77,
  scoreChange = 5,
  lastVisit = "3 days ago",
  recentActivity = [
    "Completed NestWell Score assessment",
    "Explored healthcare cost comparison",
    "Added pension details",
  ],
  nextMilestone = {
    title: "Review insurance coverage",
    date: "Next month",
    category: "insurance",
    age: 67,
  },
  completedModules = ["score", "health-assessment"],
  pendingActions = 4,
}: CentralHubProps) {
  const [showCelebration, setShowCelebration] = useState(false)
  const [showAffirmation, setShowAffirmation] = useState(false)
  const [timeOfDay, setTimeOfDay] = useState("")
  const [activeModule, setActiveModule] = useState<string | null>(null)

  useEffect(() => {
    const hour = new Date().getHours()
    if (hour < 12) setTimeOfDay("morning")
    else if (hour < 17) setTimeOfDay("afternoon")
    else setTimeOfDay("evening")

    // Show celebration for new score
    if (scoreChange > 0) {
      setShowCelebration(true)
      setShowAffirmation(true)
      setTimeout(() => {
        setShowCelebration(false)
        setShowAffirmation(false)
      }, 4000)
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

  const getScoreMessage = () => {
    if (userScore >= 80) return "Excellent planning! You're well-prepared for the future."
    if (userScore >= 70) return "Good foundation! A few improvements will strengthen your plan."
    if (userScore >= 60) return "Solid start! Let's build on what you have."
    return "Great beginning! Every step forward makes a difference."
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
      case "lifestyle":
        return "bg-orange-100 text-orange-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const planningModules = [
    {
      id: "financial-health",
      title: "Financial Health",
      description: "Pensions, savings, and investment planning",
      icon: <PiggyBank className="w-6 h-6" />,
      score: 75,
      status: completedModules.includes("financial") ? "completed" : "pending",
      actions: ["Add pension details", "Review investment portfolio"],
      link: "/insights",
      color: "from-green-50 to-emerald-50",
      borderColor: "border-green-200",
    },
    {
      id: "insurance-coverage",
      title: "Insurance Coverage",
      description: "Health, life, and care insurance planning",
      icon: <Shield className="w-6 h-6" />,
      score: 68,
      status: completedModules.includes("insurance") ? "completed" : "pending",
      actions: ["Compare health insurance", "Review life insurance"],
      link: "/healthcare-costs",
      color: "from-blue-50 to-sky-50",
      borderColor: "border-blue-200",
    },
    {
      id: "health-lifestyle",
      title: "Health & Lifestyle",
      description: "Wellbeing and lifestyle planning for later life",
      icon: <Heart className="w-6 h-6" />,
      score: 82,
      status: completedModules.includes("health-assessment") ? "completed" : "pending",
      actions: ["Update health assessment", "Plan social activities"],
      link: "/health-lifestyle",
      color: "from-purple-50 to-pink-50",
      borderColor: "border-purple-200",
    },
    {
      id: "care-planning",
      title: "Care Planning",
      description: "Future care needs and cost planning",
      icon: <Users className="w-6 h-6" />,
      score: 45,
      status: "pending",
      actions: ["Explore care scenarios", "Plan care funding"],
      link: "/care-scenarios",
      color: "from-red-50 to-rose-50",
      borderColor: "border-red-200",
    },
    {
      id: "family-legacy",
      title: "Family & Legacy",
      description: "Inheritance planning and family support",
      icon: <Home className="w-6 h-6" />,
      score: 60,
      status: "pending",
      actions: ["Update will", "Plan family gifts"],
      link: "/insights",
      color: "from-amber-50 to-orange-50",
      borderColor: "border-amber-200",
    },
    {
      id: "advice-costs",
      title: "Advice & Costs",
      description: "Financial advice and fee optimization",
      icon: <Calculator className="w-6 h-6" />,
      score: 90,
      status: "completed",
      actions: ["Compare advice fees", "Find flat-fee advisors"],
      link: "/advice-comparison",
      color: "from-indigo-50 to-blue-50",
      borderColor: "border-indigo-200",
    },
  ]

  const quickActions = [
    {
      title: "Add Pension Details",
      description: "Update your pension information",
      icon: <Plus className="w-4 h-4" />,
      action: () => setActiveModule("pension-modal"),
    },
    {
      title: "Explore Care Costs",
      description: "Understand potential care expenses",
      icon: <Activity className="w-4 h-4" />,
      link: "/care-scenarios",
    },
    {
      title: "Compare Healthcare Options",
      description: "NHS vs private healthcare costs",
      icon: <Heart className="w-4 h-4" />,
      link: "/healthcare-costs",
    },
    {
      title: "View Full Timeline",
      description: "See your complete planning timeline",
      icon: <Calendar className="w-4 h-4" />,
      link: "/planner",
    },
  ]

  const aiSuggestions = [
    "Want to explore care costs for your timeline?",
    "Should I help you compare health insurance options?",
    "Ready to add your next savings goal?",
    "Let's review your pension consolidation options",
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-sky-100">
      {showCelebration && <FloatingFeatherReward />}
      {showAffirmation && <AffirmationPopup message={`Congratulations on your NestWell Score of ${userScore}! 🌟`} />}

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Welcome Header */}
        <Card className="border-0 shadow-lg bg-gradient-to-r from-amber-50 via-orange-50 to-sky-100 mb-8">
          <CardContent className="p-8">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
              <div className="flex-1">
                <h1 className="text-3xl font-serif font-semibold text-gray-800 mb-2">{getGreeting()}! 👋</h1>
                <p className="text-xl text-gray-600 mb-2">Welcome to your NestWell planning hub.</p>
                <p className="text-gray-500">Last visit: {lastVisit}</p>
              </div>

              {/* Score Display */}
              <div className="bg-white rounded-2xl p-6 shadow-lg min-w-[200px]">
                <div className="text-center">
                  <div className="text-4xl font-bold text-amber-600 mb-2">{userScore}</div>
                  <div className="text-sm text-gray-600 mb-2">NestWell Score</div>
                  {scoreChange !== 0 && (
                    <div
                      className={`text-sm flex items-center justify-center gap-1 ${
                        scoreChange > 0 ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      <TrendingUp className={`w-4 h-4 ${scoreChange < 0 ? "rotate-180" : ""}`} />
                      {scoreChange > 0 ? "+" : ""}
                      {scoreChange} since last visit
                    </div>
                  )}
                  <p className="text-xs text-gray-500 mt-2">{getScoreMessage()}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="border-0 shadow-md">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Modules Completed</p>
                  <p className="text-2xl font-bold text-gray-800">{completedModules.length}/6</p>
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
                  <p className="text-2xl font-bold text-gray-800">{Math.round((completedModules.length / 6) * 100)}%</p>
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
                  <p className="text-sm text-gray-600">Pending Actions</p>
                  <p className="text-2xl font-bold text-gray-800">{pendingActions}</p>
                </div>
                <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-amber-600" />
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
                  <Sparkles className="w-5 h-5 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Planning Modules */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <h2 className="text-2xl font-serif font-semibold text-gray-800 mb-6">Your Planning Modules</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {planningModules.map((module) => (
                  <Card
                    key={module.id}
                    className={`border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 bg-gradient-to-br ${module.color} ${module.borderColor} border-2`}
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm">
                            {module.icon}
                          </div>
                          <div>
                            <CardTitle className="text-lg">{module.title}</CardTitle>
                            <p className="text-sm text-gray-600">{module.description}</p>
                          </div>
                        </div>
                        <Badge
                          variant={module.status === "completed" ? "default" : "secondary"}
                          className={module.status === "completed" ? "bg-green-500" : ""}
                        >
                          {module.status === "completed" ? "✓" : module.score}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      {module.status !== "completed" && (
                        <div className="mb-4">
                          <div className="flex justify-between text-sm mb-1">
                            <span>Progress</span>
                            <span>{module.score}%</span>
                          </div>
                          <Progress value={module.score} className="h-2" />
                        </div>
                      )}

                      <div className="space-y-2 mb-4">
                        <p className="text-sm font-medium text-gray-700">Next actions:</p>
                        {module.actions.slice(0, 2).map((action, index) => (
                          <div key={index} className="text-xs text-gray-600 flex items-center gap-2">
                            <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
                            {action}
                          </div>
                        ))}
                      </div>

                      <Link href={module.link}>
                        <Button className="w-full bg-white text-gray-800 hover:bg-gray-100 shadow-sm">
                          {module.status === "completed" ? "Review" : "Continue"}
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Recent Activity */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Activity className="w-5 h-5" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm text-gray-700">{activity}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Target className="w-5 h-5" />
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {quickActions.map((action, index) => (
                    <div key={index}>
                      {action.link ? (
                        <Link href={action.link}>
                          <Button
                            variant="outline"
                            className="w-full justify-start h-auto p-3 text-left hover:bg-amber-50"
                          >
                            <div className="flex items-start gap-3">
                              {action.icon}
                              <div>
                                <p className="font-medium text-sm">{action.title}</p>
                                <p className="text-xs text-gray-600">{action.description}</p>
                              </div>
                            </div>
                          </Button>
                        </Link>
                      ) : (
                        <Button
                          variant="outline"
                          onClick={action.action}
                          className="w-full justify-start h-auto p-3 text-left hover:bg-amber-50"
                        >
                          <div className="flex items-start gap-3">
                            {action.icon}
                            <div>
                              <p className="font-medium text-sm">{action.title}</p>
                              <p className="text-xs text-gray-600">{action.description}</p>
                            </div>
                          </div>
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* AI Assistant Suggestions */}
            <Card className="border-0 shadow-lg bg-gradient-to-r from-amber-50 to-orange-50">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Brain className="w-5 h-5" />
                  AI Suggestions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {aiSuggestions.slice(0, 3).map((suggestion, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      className="w-full text-left justify-start h-auto p-3 border-amber-200 hover:bg-amber-100"
                    >
                      <div className="text-sm">{suggestion}</div>
                    </Button>
                  ))}
                </div>
                <div className="mt-4 pt-4 border-t border-amber-200">
                  <Button className="w-full bg-amber-500 hover:bg-amber-600 text-white">Open AI Assistant</Button>
                </div>
              </CardContent>
            </Card>

            {/* Next Milestone */}
            <Card className="border-0 shadow-lg bg-gradient-to-r from-purple-50 to-pink-50">
              <CardContent className="p-6">
                <div className="text-center">
                  <h3 className="font-semibold text-gray-800 mb-2">Coming Up Next</h3>
                  <p className="text-gray-600 mb-2">{nextMilestone.title}</p>
                  <Badge className={`mb-3 ${getCategoryColor(nextMilestone.category)}`}>{nextMilestone.category}</Badge>
                  <p className="text-sm text-gray-500 mb-4">
                    {nextMilestone.date} • Age {nextMilestone.age}
                  </p>
                  <Link href="/planner">
                    <Button size="sm" className="bg-purple-500 hover:bg-purple-600 text-white">
                      View Timeline
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Micro-celebration */}
        {scoreChange > 0 && (
          <Card className="border-0 shadow-lg bg-gradient-to-r from-green-50 to-emerald-50 mt-8">
            <CardContent className="p-6 text-center">
              <p className="text-green-800 font-medium text-lg">
                🎉 Fantastic! You've improved your planning readiness by {scoreChange} points!
              </p>
              <p className="text-sm text-green-600 mt-2">
                You're {Math.floor(scoreChange * 2)} steps closer to a well-planned future, {userName}!
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
