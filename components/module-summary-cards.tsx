"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import Link from "next/link"
import { ArrowRight, AlertTriangle, CheckCircle, Clock, TrendingUp } from "lucide-react"

interface ModuleSummaryCardsProps {
  moduleStatuses: {
    [key: string]: {
      status: "excellent" | "good" | "needs-attention" | "critical"
      completeness: number
      nextAction: string
    }
  }
  subScores: {
    finance: number
    coverage: number
    health: number
    planning: number
  }
}

export function ModuleSummaryCards({ moduleStatuses, subScores }: ModuleSummaryCardsProps) {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "excellent":
        return <CheckCircle className="w-5 h-5 text-accent-teal" />
      case "good":
        return <TrendingUp className="w-5 h-5 text-accent-teal" />
      case "needs-attention":
        return <Clock className="w-5 h-5 text-accent-amber" />
      case "critical":
        return <AlertTriangle className="w-5 h-5 text-red-500" />
      default:
        return <Clock className="w-5 h-5 text-gray-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "excellent":
        return "bg-accent-teal/10 border-accent-teal/20"
      case "good":
        return "bg-accent-teal/5 border-accent-teal/10"
      case "needs-attention":
        return "bg-accent-amber/10 border-accent-amber/20"
      case "critical":
        return "bg-red-50 border-red-200"
      default:
        return "bg-gray-50 border-gray-200"
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "excellent":
        return <Badge className="bg-accent-teal/20 text-accent-teal">Excellent</Badge>
      case "good":
        return <Badge className="bg-accent-teal/10 text-accent-teal">Good</Badge>
      case "needs-attention":
        return <Badge className="bg-accent-amber/20 text-accent-amber">Needs Attention</Badge>
      case "critical":
        return <Badge className="bg-red-100 text-red-800">Critical</Badge>
      default:
        return <Badge variant="secondary">Unknown</Badge>
    }
  }

  const modules = [
    {
      key: "finance",
      title: "Pension & Savings",
      description: "Track pensions, savings, and retirement income projections",
      icon: (
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
          className="text-accent-teal"
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M16 8h-6.5a2.5 2.5 0 0 0 0 5h3a2.5 2.5 0 0 1 0 5H6" />
          <path d="M12 18v2" />
          <path d="M12 6V4" />
        </svg>
      ),
      link: "/pension-savings",
      score: subScores.finance,
    },
    {
      key: "coverage",
      title: "Coverage Summary",
      description: "Insurance policies, gap analysis, and protection planning",
      icon: (
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
          className="text-accent-amber"
        >
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
        </svg>
      ),
      link: "/coverage",
      score: subScores.coverage,
    },
    {
      key: "planning",
      title: "Timeline Planner",
      description: "Life milestones and future goal planning by age",
      icon: (
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
          className="text-accent-blue-grey"
        >
          <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
          <line x1="16" x2="16" y1="2" y2="6" />
          <line x1="8" x2="8" y1="2" y2="6" />
          <line x1="3" x2="21" y1="10" y2="10" />
          <path d="m9 16 2 2 4-4" />
        </svg>
      ),
      link: "/planner",
      score: subScores.planning,
    },
    {
      key: "health",
      title: "Health & Care Planning",
      description: "Health profile, care scenarios, and self-insurance planning",
      icon: (
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
          className="text-accent-teal"
        >
          <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
        </svg>
      ),
      link: "/health-care-planning",
      score: subScores.health,
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {modules.map((module) => {
        const status = moduleStatuses[module.key]
        return (
          <Card
            key={module.key}
            className={`border-0 shadow-md hover:shadow-lg transition-all animate-tile-settle ${getStatusColor(status?.status || "good")}`}
          >
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {module.icon}
                  <div>
                    <CardTitle className="text-lg">{module.title}</CardTitle>
                    <p className="text-sm text-gray-600">{module.description}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-gray-800">{module.score}</div>
                  <div className="text-xs text-gray-600">Score</div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Status and Progress */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {getStatusIcon(status?.status || "good")}
                  {getStatusBadge(status?.status || "good")}
                </div>
                <div className="text-sm text-gray-600">{status?.completeness || 0}% complete</div>
              </div>

              {/* Progress Bar */}
              <Progress value={status?.completeness || 0} className="h-2" />

              {/* Next Action */}
              <div className="bg-white/50 p-3 rounded-lg">
                <p className="text-sm font-medium text-gray-800 mb-1">Next Action:</p>
                <p className="text-sm text-gray-600">{status?.nextAction || "Review module"}</p>
              </div>

              {/* CTA Button */}
              <Link href={module.link}>
                <Button className="w-full" variant="outline">
                  View {module.title}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
