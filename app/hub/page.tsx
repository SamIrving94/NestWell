"use client"

import { useState, useEffect } from "react"
import { CentralHub } from "@/components/central-hub"
import { AIAssistant } from "@/components/ai-assistant"

export default function HubPage() {
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
    // Load user data from localStorage or API
    const savedUserData = localStorage.getItem("nestwell-user-data")
    if (savedUserData) {
      const parsed = JSON.parse(savedUserData)
      setUserData((prev) => ({ ...prev, ...parsed }))
    }

    // Mark that user has reached the hub
    localStorage.setItem("nestwell-hub-visited", "true")
  }, [])

  return (
    <div className="min-h-screen">
      {/* Header Navigation */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-30">
        <div className="container mx-auto py-4 px-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
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
          </div>

          <nav className="hidden md:flex items-center gap-6">
            <a href="/hub" className="text-amber-600 font-medium">
              Dashboard
            </a>
            <a href="/insights" className="text-gray-600 hover:text-gray-800 transition-colors">
              Insights
            </a>
            <a href="/planner" className="text-gray-600 hover:text-gray-800 transition-colors">
              Timeline
            </a>
            <a href="/healthcare-costs" className="text-gray-600 hover:text-gray-800 transition-colors">
              Healthcare
            </a>
            <a href="/care-scenarios" className="text-gray-600 hover:text-gray-800 transition-colors">
              Care Planning
            </a>
            <a href="/advice-comparison" className="text-gray-600 hover:text-gray-800 transition-colors">
              Advice Costs
            </a>
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
