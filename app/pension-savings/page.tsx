"use client"

import { useState, useEffect } from "react"
import { PensionSavingsTracker } from "@/components/pension-savings-tracker"
import { AdviceComparisonTool } from "@/components/advice-comparison-tool"
import { AIAssistant } from "@/components/ai-assistant"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

export default function Page() {
  const [trackerData, setTrackerData] = useState({
    pensions: [
      {
        id: "1",
        name: "Current Workplace Pension",
        type: "workplace",
        provider: "Aviva",
        currentValue: 45000,
        monthlyContribution: 350,
        employerContribution: 175,
        startAge: 25,
        currentAge: 52,
      },
      {
        id: "2",
        name: "Previous Employer Pension",
        type: "workplace",
        provider: "Scottish Widows",
        currentValue: 28000,
        monthlyContribution: 0,
        employerContribution: 0,
        startAge: 30,
        currentAge: 52,
      },
    ],
    savings: [
      {
        id: "1",
        name: "Stocks & Shares ISA",
        type: "isa",
        currentValue: 15000,
        monthlyContribution: 200,
        target: 20000,
        targetDate: "2025-04-05",
      },
      {
        id: "2",
        name: "Emergency Fund",
        type: "savings",
        currentValue: 8000,
        monthlyContribution: 100,
        target: 12000,
        targetDate: "2025-12-31",
      },
    ],
    goals: [
      {
        id: "1",
        title: "Build Long-term Care Buffer",
        targetAmount: 50000,
        currentValue: 8000,
        targetAge: 75,
        priority: "high",
        linkedToTimeline: true,
      },
      {
        id: "2",
        title: "Top up ISA for Retirement",
        targetAmount: 100000,
        currentValue: 15000,
        targetAge: 65,
        priority: "medium",
        linkedToTimeline: false,
      },
    ],
    projections: {
      age60: { totalPot: 185000, monthlyIncome: 850 },
      age65: { totalPot: 245000, monthlyIncome: 1150 },
      age70: { totalPot: 285000, monthlyIncome: 1350 },
      age75: { totalPot: 310000, monthlyIncome: 1450 },
    },
    benchmarks: {
      basic: { monthly: 800, annual: 9600 },
      moderate: { monthly: 1200, annual: 14400 },
      comfortable: { monthly: 1800, annual: 21600 },
    },
  })

  useEffect(() => {
    // Load tracker data from localStorage or API
    const savedData = localStorage.getItem("nestwell-pension-savings-data")
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData)
        setTrackerData((prev) => ({ ...prev, ...parsed }))
      } catch (error) {
        console.error("Failed to parse pension savings data:", error)
      }
    }
  }, [])

  const updateTrackerData = (newData: Partial<typeof trackerData>) => {
    const updated = { ...trackerData, ...newData }
    setTrackerData(updated)
    localStorage.setItem("nestwell-pension-savings-data", JSON.stringify(updated))
  }

  const [state, setState] = useState({
    userScore: 72,
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-teal-50 to-blue-50">
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
            <Link href="/my-plan" className="text-gray-600 hover:text-gray-800 transition-colors">
              My Plan
            </Link>
            <Link href="/readiness" className="text-gray-600 hover:text-gray-800 transition-colors">
              Readiness
            </Link>
            <Link href="/coverage" className="text-gray-600 hover:text-gray-800 transition-colors">
              Coverage
            </Link>
            <Link href="/pension-savings" className="text-teal-600 font-medium">
              Pension & Savings
            </Link>
            <Link href="/planner" className="text-gray-600 hover:text-gray-800 transition-colors">
              Timeline
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

      {/* Main Content */}
      <div className="container mx-auto py-8 px-4 space-y-8">
        {/* Financial Advice Comparison */}
        <Card className="border-0 shadow-lg bg-gradient-to-r from-teal-50/50 to-amber-50/50 backdrop-blur-sm">
          <CardHeader className="pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 flex items-center justify-center">
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
                  <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                </svg>
              </div>
              <div>
                <CardTitle className="text-xl">Financial Advice Options</CardTitle>
                <p className="text-gray-600 text-sm mt-1">
                  Compare different ways to get financial advice and understand the true cost of each approach.
                </p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <AdviceComparisonTool />
          </CardContent>
        </Card>

        {/* Pension & Savings Tracker */}
        <PensionSavingsTracker data={trackerData} onUpdate={updateTrackerData} />
      </div>

      {/* AI Assistant */}
      <AIAssistant
        userName="Sam"
        userScore={state.userScore || 72}
        currentPage="pension-savings"
        recentInsights={["Added workplace pension", "Set care buffer goal", "Projected retirement income"]}
      />
    </div>
  )
}
