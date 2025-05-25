"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import { HealthcareCostTool } from "@/components/healthcare-cost-tool"
import { AIAssistant } from "@/components/ai-assistant"

export default function HealthcareCostsPage() {
  const [userName] = useState("Sam") // Would come from user data
  const [userAge] = useState(65) // Would come from user data

  const handleAddToTimeline = (procedure: string, age: number) => {
    // Save to timeline
    const savedMilestones = localStorage.getItem("nestwell-custom-milestones")
    const milestones = savedMilestones ? JSON.parse(savedMilestones) : []

    const newMilestone = {
      id: Date.now(),
      title: `Plan for ${procedure}`,
      description: `Consider healthcare options and costs for ${procedure}`,
      age: age,
      year: new Date().getFullYear() + (age - userAge),
      category: "health",
      icon: "🏥",
      isCustom: true,
    }

    milestones.push(newMilestone)
    localStorage.setItem("nestwell-custom-milestones", JSON.stringify(milestones))

    // Show success message
    alert(`Added "${procedure}" to your timeline at age ${age}`)
  }

  const handleExploreInsurance = () => {
    // Navigate to insurance exploration or show modal
    alert("Insurance exploration feature coming soon!")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-sky-100 relative overflow-hidden">
      {/* AI Assistant */}
      <AIAssistant userName={userName} userScore={72} currentPage="healthcare-costs" recentInsights={[]} />

      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto py-4 px-4 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2">
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

          <nav className="flex items-center gap-4">
            <Link href="/score" className="text-gray-600 hover:text-gray-800">
              My Score
            </Link>
            <Link href="/insights" className="text-gray-600 hover:text-gray-800">
              Insights
            </Link>
            <Link href="/planner" className="text-gray-600 hover:text-gray-800">
              Planner
            </Link>
            <Link href="/healthcare-costs" className="text-blue-600 font-medium">
              Healthcare Costs
            </Link>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-5xl mx-auto">
          {/* Introduction */}
          <div className="text-center mb-12">
            <div className="mb-6">
              <div className="w-16 h-16 mx-auto mb-4 relative">
                <svg width="64" height="64" viewBox="0 0 64 64" className="text-blue-600">
                  <rect x="8" y="12" width="48" height="32" rx="4" fill="none" stroke="currentColor" strokeWidth="2" />
                  <path d="M20 20h24M20 28h16M20 36h20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  <circle cx="44" cy="28" r="6" fill="none" stroke="#ef4444" strokeWidth="2" />
                  <path d="M41 28h6M44 25v6" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </div>
            </div>

            <h1 className="text-3xl md:text-4xl font-serif font-semibold mb-4 text-gray-800">
              Healthcare Cost Comparison
            </h1>
            <p className="text-xl text-gray-600 mb-2">
              {userName}, understand the real costs of healthcare as you age.
            </p>
            <p className="text-gray-500">Compare NHS, private, and insured options for common procedures.</p>
          </div>

          {/* Healthcare Cost Tool */}
          <HealthcareCostTool
            userAge={userAge}
            onAddToTimeline={handleAddToTimeline}
            onExploreInsurance={handleExploreInsurance}
          />

          {/* Educational Content */}
          <div className="mt-12 grid md:grid-cols-2 gap-6">
            <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="w-12 h-12 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
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
                      className="text-blue-600"
                    >
                      <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Understanding NHS Wait Times</h3>
                  <p className="text-gray-600 mb-4">
                    Learn about current NHS waiting lists and how they might affect your treatment timeline.
                  </p>
                  <Button variant="outline" className="border-blue-300 text-blue-700 hover:bg-blue-50">
                    Learn More
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="w-12 h-12 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
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
                      className="text-green-600"
                    >
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                      <path d="M9 12l2 2 4-4" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Private Health Insurance Guide</h3>
                  <p className="text-gray-600 mb-4">
                    Explore different insurance options and find the right coverage for your needs and budget.
                  </p>
                  <Button variant="outline" className="border-green-300 text-green-700 hover:bg-green-50">
                    Explore Options
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Call to Action */}
          <div className="mt-12 text-center bg-gradient-to-r from-blue-100 to-green-100 p-8 rounded-lg border border-blue-200">
            <h3 className="text-xl font-semibold mb-2 text-blue-800">Plan Ahead for Peace of Mind</h3>
            <p className="text-blue-700 mb-4">
              Understanding healthcare costs now helps you make informed decisions about insurance and savings.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/planner">
                <Button className="bg-amber-500 hover:bg-amber-600 text-white">Add to My Timeline</Button>
              </Link>
              <Link href="/insights">
                <Button variant="outline" className="border-blue-300 text-blue-700 hover:bg-blue-50">
                  View My Recommendations
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
