"use client"

import { useState, useEffect } from "react"
import { useNavigation } from "@/components/navigation-context"
import { MyPlanDashboard } from "@/components/my-plan-dashboard"
import { AIAssistant } from "@/components/ai-assistant"
import Link from "next/link"

export default function MyPlanPage() {
  const { state } = useNavigation()
  const [dashboardData, setDashboardData] = useState({
    readinessScore: 72,
    subScores: {
      finance: 78,
      coverage: 45,
      health: 82,
      planning: 75,
    },
    moduleStatuses: {
      finance: { status: "good", completeness: 85, nextAction: "Review pension contributions" },
      coverage: { status: "needs-attention", completeness: 40, nextAction: "Upload insurance documents" },
      health: { status: "excellent", completeness: 90, nextAction: "Schedule annual check-up" },
      planning: { status: "good", completeness: 70, nextAction: "Add care planning milestone" },
    },
    recentActivity: ["Completed readiness assessment", "Added retirement timeline", "Reviewed healthcare costs"],
    nextBestActions: [
      {
        id: "upload-coverage",
        title: "Upload your insurance documents",
        description: "Get a complete picture of your coverage",
        priority: "high",
        module: "coverage",
        estimatedTime: "5 minutes",
      },
      {
        id: "pension-review",
        title: "Review your pension contributions",
        description: "Ensure you're on track for retirement",
        priority: "medium",
        module: "finance",
        estimatedTime: "10 minutes",
      },
      {
        id: "care-planning",
        title: "Add care planning to your timeline",
        description: "Prepare for potential future care needs",
        priority: "medium",
        module: "planning",
        estimatedTime: "8 minutes",
      },
    ],
    upcomingMilestones: [
      {
        title: "Review insurance coverage",
        date: "Next month",
        category: "coverage",
        age: 67,
      },
      {
        title: "Pension contribution increase",
        date: "April 2025",
        category: "finance",
        age: 67,
      },
    ],
  })

  useEffect(() => {
    // Load dashboard data from localStorage or API
    const savedData = localStorage.getItem("nestwell-dashboard-data")
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData)
        setDashboardData((prev) => ({ ...prev, ...parsed }))
      } catch (error) {
        console.error("Failed to parse dashboard data:", error)
      }
    }

    // Update with navigation state
    if (state.userScore) {
      setDashboardData((prev) => ({
        ...prev,
        readinessScore: state.userScore,
      }))
    }
  }, [state])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header Navigation */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-30">
        <div className="container mx-auto py-4 px-4 flex justify-between items-center">
          <Link href="/my-plan" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-teal-500 to-blue-500 flex items-center justify-center">
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
                className="text-white"
              >
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
              </svg>
            </div>
            <span className="text-xl font-semibold">NestWell</span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <Link href="/my-plan" className="text-teal-600 font-medium">
              My Plan
            </Link>
            <Link href="/readiness" className="text-gray-600 hover:text-gray-800 transition-colors">
              Readiness
            </Link>
            <Link href="/coverage" className="text-gray-600 hover:text-gray-800 transition-colors">
              Coverage
            </Link>
            <Link href="/planner" className="text-gray-600 hover:text-gray-800 transition-colors">
              Timeline
            </Link>
            <Link href="/insights" className="text-gray-600 hover:text-gray-800 transition-colors">
              Insights
            </Link>
          </nav>

          {/* Mobile menu button */}
          <button className="md:hidden p-2">
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
            >
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>
        </div>
      </header>

      {/* Main Dashboard Content */}
      <MyPlanDashboard {...dashboardData} />

      {/* AI Assistant */}
      <AIAssistant
        userName="Sam"
        userScore={dashboardData.readinessScore}
        currentPage="my-plan"
        recentInsights={dashboardData.recentActivity}
      />
    </div>
  )
}
