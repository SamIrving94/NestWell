"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"
import { InteractiveTimeline } from "@/components/interactive-timeline"
import { AddMilestoneModal } from "@/components/add-milestone-modal"
import { FloatingQuote } from "@/components/floating-quote"
import { SoundscapeToggle } from "@/components/soundscape-toggle"
import { AIAssistant } from "@/components/ai-assistant"
import { AIAssistantPlanner } from "@/components/ai-assistant-planner"

export default function PlannerPage() {
  const [userName] = useState("Sam") // Would come from user data
  const [currentAge] = useState(65) // Would come from user data
  const [viewMode, setViewMode] = useState<"age" | "lifestage">("age")
  const [showAddModal, setShowAddModal] = useState(false)
  const [customMilestones, setCustomMilestones] = useState<any[]>([])
  const [showQuote, setShowQuote] = useState(false)
  const [currentQuote, setCurrentQuote] = useState("")
  const [soundscapeEnabled, setSoundscapeEnabled] = useState(false)

  const inspirationalQuotes = [
    "The best time to plant a tree was 20 years ago. The second best time is now.",
    "Life is what happens while you're making other plans.",
    "The future belongs to those who prepare for it today.",
    "Every ending is a new beginning in disguise.",
    "Your story is still being written.",
  ]

  // Load custom milestones from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("nestwell-custom-milestones")
    if (saved) {
      setCustomMilestones(JSON.parse(saved))
    }
  }, [])

  // Show random quote on scroll or interaction
  const showRandomQuote = () => {
    const randomQuote = inspirationalQuotes[Math.floor(Math.random() * inspirationalQuotes.length)]
    setCurrentQuote(randomQuote)
    setShowQuote(true)
    setTimeout(() => setShowQuote(false), 4000)
  }

  const addCustomMilestone = (milestone: any) => {
    const newMilestones = [...customMilestones, { ...milestone, id: Date.now(), isCustom: true }]
    setCustomMilestones(newMilestones)
    localStorage.setItem("nestwell-custom-milestones", JSON.stringify(newMilestones))
  }

  const removeMilestone = (id: number) => {
    const filtered = customMilestones.filter((m) => m.id !== id)
    setCustomMilestones(filtered)
    localStorage.setItem("nestwell-custom-milestones", JSON.stringify(filtered))
  }

  const updateMilestone = (id: number, updates: any) => {
    const updated = customMilestones.map((m) => (m.id === id ? { ...m, ...updates } : m))
    setCustomMilestones(updated)
    localStorage.setItem("nestwell-custom-milestones", JSON.stringify(updated))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-sky-100 relative overflow-hidden">
      {/* AI Assistant */}
      <AIAssistant
        userName={userName}
        userScore={65}
        currentPage="planner"
        recentInsights={customMilestones.map((m) => m.title)}
      />

      {/* Floating quote */}
      {showQuote && <FloatingQuote quote={currentQuote} />}

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
            <Link href="/planner" className="text-amber-600 font-medium">
              Planner
            </Link>
            <SoundscapeToggle enabled={soundscapeEnabled} onToggle={setSoundscapeEnabled} />
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-6xl mx-auto">
          {/* Introduction */}
          <div className="text-center mb-12">
            <div className="mb-6">
              <div className="w-20 h-20 mx-auto mb-4 relative">
                <svg width="80" height="80" viewBox="0 0 80 80" className="text-amber-500">
                  {/* Tree/timeline metaphor */}
                  <path
                    d="M40 10 L40 70"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    className="opacity-60"
                  />
                  {/* Branches */}
                  <path d="M40 20 Q50 15 60 20" fill="none" stroke="#92400e" strokeWidth="2" strokeLinecap="round" />
                  <path d="M40 35 Q30 30 20 35" fill="none" stroke="#92400e" strokeWidth="2" strokeLinecap="round" />
                  <path d="M40 50 Q55 45 65 50" fill="none" stroke="#92400e" strokeWidth="2" strokeLinecap="round" />
                  <path d="M40 65 Q25 60 15 65" fill="none" stroke="#92400e" strokeWidth="2" strokeLinecap="round" />
                  {/* Nest at top */}
                  <circle cx="40" cy="15" r="8" fill="#fbbf24" opacity="0.6" />
                  <circle cx="40" cy="15" r="3" fill="#92400e" />
                </svg>
              </div>
            </div>

            <h1 className="text-3xl md:text-4xl font-serif font-semibold mb-4 text-gray-800">
              Here's what the next 20+ years could look like
            </h1>
            <p className="text-xl text-gray-600 mb-6">
              {userName}, we'll help you prepare for life's milestones—big and small.
            </p>

            {/* View Toggle */}
            <Tabs
              value={viewMode}
              onValueChange={(value) => setViewMode(value as "age" | "lifestage")}
              className="mb-8"
            >
              <TabsList className="grid w-full max-w-md mx-auto grid-cols-2">
                <TabsTrigger value="age">Age-based View</TabsTrigger>
                <TabsTrigger value="lifestage">Life Stage View</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          {/* Interactive Timeline */}
          <div className="mb-12">
            <InteractiveTimeline
              currentAge={currentAge}
              viewMode={viewMode}
              customMilestones={customMilestones}
              onUpdateMilestone={updateMilestone}
              onRemoveMilestone={removeMilestone}
              onShowQuote={showRandomQuote}
            />
          </div>

          {/* Add Milestone Button */}
          <div className="text-center mb-12">
            <Button
              onClick={() => setShowAddModal(true)}
              size="lg"
              className="bg-amber-500 hover:bg-amber-600 text-white px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              + Add a Milestone
            </Button>
            <p className="text-sm text-gray-500 mt-2">Make this timeline truly yours</p>
          </div>

          {/* Action Cards */}
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="w-12 h-12 mx-auto mb-4 bg-amber-100 rounded-full flex items-center justify-center">
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
                      className="text-amber-600"
                    >
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                      <polyline points="14,2 14,8 20,8" />
                      <line x1="16" y1="13" x2="8" y2="13" />
                      <line x1="16" y1="17" x2="8" y2="17" />
                      <polyline points="10,9 9,9 8,9" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Download My Timeline</h3>
                  <p className="text-gray-600 mb-4">Get a beautiful PDF of your personalized life plan</p>
                  <Button variant="outline" className="border-amber-300 text-amber-700 hover:bg-amber-50">
                    Generate PDF
                  </Button>
                </div>
              </CardContent>
            </Card>

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
                      <path d="M9 11H5a2 2 0 0 0-2 2v3c0 1.1.9 2 2 2h4l3 3h7a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-7l-3 3z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Get Personalized Guidance</h3>
                  <p className="text-gray-600 mb-4">Chat with our AI assistant about your timeline</p>
                  <Button variant="outline" className="border-blue-300 text-blue-700 hover:bg-blue-50">
                    Ask Assistant
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Planner-specific AI Assistant Tips */}
          <AIAssistantPlanner
            currentAge={currentAge}
            viewMode={viewMode}
            onAddMilestone={() => setShowAddModal(true)}
          />

          {/* Encouraging Footer */}
          <div className="text-center bg-gradient-to-r from-amber-100 to-orange-100 p-8 rounded-lg border border-amber-200">
            <h3 className="text-xl font-semibold mb-2 text-amber-800">Your journey is unique</h3>
            <p className="text-amber-700 mb-4">
              This timeline is a guide, not a prescription. Life has wonderful surprises in store.
            </p>
            <p className="text-sm text-amber-600">
              Remember: you're not planning alone. We're here every step of the way.
            </p>
          </div>
        </div>
      </main>

      {/* Add Milestone Modal */}
      <AddMilestoneModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onAdd={addCustomMilestone}
        currentAge={currentAge}
      />
    </div>
  )
}
