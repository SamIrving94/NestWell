"use client"

import { useState, useEffect } from "react"
import { useNavigation } from "@/components/navigation-context"
import { CentralHub } from "@/components/central-hub"
import { AIAssistant } from "@/components/ai-assistant"
import Link from "next/link"

export default function HubPage() {
  const { state } = useNavigation()
  const [userData, setUserData] = useState({
    userName: "Sam",
    userScore: 77,
    scoreChange: 5,
    lastVisit: "Just completed assessment",
    recentActivity: [
      "Completed NestWell Score assessment",
      "Reviewed financial health insights",
      "Explored healthcare options",
    ],
    nextMilestone: {
      title: "Review insurance coverage",
      date: "Next month",
      category: "insurance",
      age: 67,
    },
    completedModules: ["score", "health-assessment"],
    pendingActions: 4,
  })

  useEffect(() => {
    // Mark hub as visited for demo purposes
    localStorage.setItem("nestwell-hub-visited", "true")

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
        userScore: state.userScore,
        completedModules: state.completedSteps,
      }))
    }

    // If no user data exists, populate with demo data
    if (!localStorage.getItem("nestwell-user-data")) {
      const demoUserData = {
        userName: "Sam",
        userScore: 77,
        scoreChange: 5,
        lastVisit: new Date().toISOString(),
        recentActivity: [
          "Completed NestWell Score assessment",
          "Reviewed financial health insights",
          "Explored healthcare options",
        ],
        completedModules: ["score", "health-assessment"],
      }
      localStorage.setItem("nestwell-user-data", JSON.stringify(demoUserData))
      setUserData(demoUserData)
    }

    // Set demo score if none exists
    if (!localStorage.getItem("nestwell-user-score")) {
      localStorage.setItem("nestwell-user-score", "77")
    }
  }, [state])

  return (
    <div className="min-h-screen">
      {/* Header Navigation */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-30">
        <div className="container mx-auto py-4 px-4 flex justify-between items-center">
          <Link href="/hub" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-amber-500 flex items-center justify-center">
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
            <Link href="/hub" className="text-amber-600 font-medium">
              Dashboard
            </Link>
            <Link href="/insights" className="text-gray-600 hover:text-gray-800 transition-colors">
              Insights
            </Link>
            <Link href="/planner" className="text-gray-600 hover:text-gray-800 transition-colors">
              Timeline
            </Link>
            <Link href="/healthcare-costs" className="text-gray-600 hover:text-gray-800 transition-colors">
              Healthcare
            </Link>
            <Link href="/care-scenarios" className="text-gray-600 hover:text-gray-800 transition-colors">
              Care Planning
            </Link>
            <Link href="/advice-comparison" className="text-gray-600 hover:text-gray-800 transition-colors">
              Advice Costs
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

      {/* Main Hub Content */}
      <CentralHub {...userData} />

      {/* AI Assistant */}
      <AIAssistant
        userName={userData.userName}
        userScore={userData.userScore}
        currentPage="hub"
        recentInsights={userData.recentActivity}
      />
    </div>
  )
}
