"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import { CareRiskScenarioTool } from "@/components/care-risk-scenario-tool"
import { AIAssistant } from "@/components/ai-assistant"

export default function CareScenarioPage() {
  const [userName] = useState("Sam") // Would come from user data
  const [userAge] = useState(65) // Would come from user data
  const [userSavings] = useState(50000) // Would come from user data
  const [userIncome] = useState(1500) // Would come from user data
  const [assistantQuestion, setAssistantQuestion] = useState("")

  const handleAddToTimeline = (scenario: string, age: number, durationMonths: number) => {
    // Save to timeline
    const savedMilestones = localStorage.getItem("nestwell-custom-milestones")
    const milestones = savedMilestones ? JSON.parse(savedMilestones) : []

    const newMilestone = {
      id: Date.now(),
      title: `Potential ${scenario}`,
      description: `Plan for possible care needs: ${scenario}`,
      age: age,
      year: new Date().getFullYear() + (age - userAge),
      category: "care",
      icon: "🏥",
      isCustom: true,
    }

    milestones.push(newMilestone)
    localStorage.setItem("nestwell-custom-milestones", JSON.stringify(milestones))

    // Show success message
    alert(`Added "${scenario}" to your timeline at age ${age}`)
  }

  const handleExploreOptions = (scenarioType: string) => {
    // Navigate to insurance exploration or show modal
    alert(`Exploring coverage options for ${scenarioType} care. Feature coming soon!`)
  }

  const handleTalkToAssistant = (question: string) => {
    setAssistantQuestion(question)
    // This would trigger the AI assistant to open with this question
    // For now, we'll just alert
    alert(`Opening assistant with question: ${question}`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-sky-100 relative overflow-hidden">
      {/* AI Assistant */}
      <AIAssistant
        userName={userName}
        userScore={72}
        currentPage="care-scenarios"
        recentInsights={[]}
        initialQuestion={assistantQuestion}
      />

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
            <Link href="/healthcare-costs" className="text-gray-600 hover:text-gray-800">
              Healthcare Costs
            </Link>
            <Link href="/care-scenarios" className="text-amber-600 font-medium">
              Care Scenarios
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
                <svg width="64" height="64" viewBox="0 0 64 64" className="text-amber-600">
                  <path
                    d="M32 8 C32 8 16 16 16 32 C16 48 32 56 32 56 C32 56 48 48 48 32 C48 16 32 8 32 8 Z"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <path
                    d="M32 20 C26 20 22 26 22 32 C22 38 26 44 32 44 C38 44 42 38 42 32 C42 26 38 20 32 20 Z"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <path d="M32 28 L32 36" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  <path d="M28 32 L36 32" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </div>
            </div>

            <h1 className="text-3xl md:text-4xl font-serif font-semibold mb-4 text-gray-800">Explore Care Scenarios</h1>
            <p className="text-xl text-gray-600 mb-2">
              {userName}, understand the potential costs and impacts of care in later life.
            </p>
            <p className="text-gray-500 max-w-2xl mx-auto">
              Most people don't plan for care needs until it's too late. Explore different scenarios now to prepare
              financially and emotionally for what might lie ahead.
            </p>
          </div>

          {/* Care Risk Scenario Tool */}
          <CareRiskScenarioTool
            userAge={userAge}
            userSavings={userSavings}
            userIncome={userIncome}
            onAddToTimeline={handleAddToTimeline}
            onExploreOptions={handleExploreOptions}
            onTalkToAssistant={handleTalkToAssistant}
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
                      <path d="M9 12l2 2 4-4" />
                      <path d="M21 12c.552 0 1-.448 1-1V5c0-.552-.448-1-1-1H3c-.552 0-1 .448-1 1v6c0 .552.448 1 1 1h9l4-4-4-4H3" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">NHS Continuing Healthcare</h3>
                  <p className="text-gray-600 mb-4">
                    Learn about NHS funding for long-term health needs and how to apply for it.
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
                  <h3 className="text-lg font-semibold mb-2">Care Insurance Options</h3>
                  <p className="text-gray-600 mb-4">
                    Explore insurance products designed to help cover the costs of long-term care.
                  </p>
                  <Button variant="outline" className="border-green-300 text-green-700 hover:bg-green-50">
                    Explore Options
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Call to Action */}
          <div className="mt-12 text-center bg-gradient-to-r from-amber-100 to-orange-100 p-8 rounded-lg border border-amber-200">
            <h3 className="text-xl font-semibold mb-2 text-amber-800">Plan Now for Peace of Mind Later</h3>
            <p className="text-amber-700 mb-4 max-w-2xl mx-auto">
              Understanding potential care needs and costs now helps you make informed decisions about savings,
              insurance, and family discussions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/planner">
                <Button className="bg-amber-500 hover:bg-amber-600 text-white">Add to My Timeline</Button>
              </Link>
              <Button
                variant="outline"
                className="border-amber-300 text-amber-700 hover:bg-amber-50"
                onClick={() =>
                  handleTalkToAssistant("What's the best way to prepare financially for care in later life?")
                }
              >
                Ask the Assistant
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
