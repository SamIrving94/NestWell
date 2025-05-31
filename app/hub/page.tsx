"use client"

import { useState, useEffect } from "react"
import { useNavigation } from "@/components/navigation-context"
import { MyPlanDashboard } from "@/components/my-plan-dashboard"
import { AIAssistant } from "@/components/ai-assistant"
import Link from "next/link"

export default function HubPage() {
  const { state } = useNavigation()
  const [userData, setUserData] = useState({
    userName: "Sam",
    readinessScore: 77,
    subScores: {
      finance: 82,
      coverage: 45,
      health: 78,
      planning: 85,
    },
    moduleStatuses: {
      finance: {
        status: "good" as const,
        completeness: 75,
        nextAction: "Review pension projections",
      },
      coverage: {
        status: "critical" as const,
        completeness: 30,
        nextAction: "Upload insurance documents",
      },
      health: {
        status: "good" as const,
        completeness: 80,
        nextAction: "Plan for care scenarios",
      },
      planning: {
        status: "excellent" as const,
        completeness: 90,
        nextAction: "Add milestone at age 75",
      },
    },
    recentActivity: [
      "Completed NestWell Score assessment",
      "Added retirement milestone to timeline",
      "Reviewed healthcare cost scenarios",
      "Updated pension account information",
    ],
    nextBestActions: [
      {
        id: "1",
        title: "Upload Insurance Documents",
        description: "Add your life and health insurance policies to identify coverage gaps",
        priority: "high" as const,
        module: "coverage",
        estimatedTime: "5 minutes",
      },
      {
        id: "2",
        title: "Plan Care Scenarios",
        description: "Explore potential care needs and costs for your 70s and 80s",
        priority: "medium" as const,
        module: "health",
        estimatedTime: "10 minutes",
      },
      {
        id: "3",
        title: "Set Savings Goal",
        description: "Create a specific savings target for your care fund",
        priority: "medium" as const,
        module: "finance",
        estimatedTime: "3 minutes",
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
        title: "Health check and care planning",
        date: "In 3 months",
        category: "health",
        age: 67,
      },
      {
        title: "Pension review meeting",
        date: "In 6 months",
        category: "finance",
        age: 68,
      },
    ],
  })

  useEffect(() => {
    // Load user data from localStorage or navigation state
    const savedUserData = localStorage.getItem("nestwell-user-data")
    if (savedUserData) {
      try {
        const parsed = JSON.parse(savedUserData)
        setUserData((prev) => ({ ...prev, ...parsed }))
      } catch (error) {
        console.error("Failed to parse user data:", error)
      }
    }

    // Update with navigation state
    if (state.userScore) {
      setUserData((prev) => ({
        ...prev,
        readinessScore: state.userScore,
      }))
    }

    // Set demo score if none exists
    if (!localStorage.getItem("nestwell-user-score")) {
      localStorage.setItem("nestwell-user-score", "77")
    }
  }, [state])

  return (
    <div className="min-h-screen bg-canvas">
      {/* Header Navigation */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-30">
        <div className="container mx-auto py-4 px-4 flex justify-between items-center">
          <Link href="/hub" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-accent-amber flex items-center justify-center">
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
            <Link href="/hub" className="text-accent-amber font-medium">
              My Plan
            </Link>
            <Link href="/planner" className="text-gray-600 hover:text-gray-800 transition-colors">
              Timeline
            </Link>
            <Link href="/coverage" className="text-gray-600 hover:text-gray-800 transition-colors">
              Coverage
            </Link>
            <Link href="/pension-savings" className="text-gray-600 hover:text-gray-800 transition-colors">
              Finance
            </Link>
            <Link href="/health-care-planning" className="text-gray-600 hover:text-gray-800 transition-colors">
              Health & Care
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
      <MyPlanDashboard {...userData} />

      {/* AI Assistant */}
      <AIAssistant
        userName={userData.userName}
        userScore={userData.readinessScore}
        currentPage="hub"
        recentInsights={userData.recentActivity}
      />
    </div>
  )
}
