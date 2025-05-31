"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { InteractiveTimeline } from "@/components/interactive-timeline"
import { AddMilestoneModal } from "@/components/add-milestone-modal"
import { FloatingQuote } from "@/components/floating-quote"
import { SoundscapeToggle } from "@/components/soundscape-toggle"
import { AIAssistant } from "@/components/ai-assistant"
import { TimelineSmartSuggestions } from "@/components/timeline-smart-suggestions"
import { Plus, Target, TrendingUp, Clock } from "lucide-react"

export default function PlannerPage() {
  const [userName] = useState("Sam") // Would come from user data
  const [currentAge] = useState(65) // Would come from user data
  const [userScore, setUserScore] = useState(72) // From readiness score
  const [showAddModal, setShowAddModal] = useState(false)
  const [customMilestones, setCustomMilestones] = useState<any[]>([])
  const [showQuote, setShowQuote] = useState(false)
  const [currentQuote, setCurrentQuote] = useState("")
  const [soundscapeEnabled, setSoundscapeEnabled] = useState(false)
  const [selectedMilestone, setSelectedMilestone] = useState<any>(null)

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
    const newMilestones = [
      ...customMilestones,
      {
        ...milestone,
        id: Date.now(),
        isCustom: true,
        scoreImpact: calculateScoreImpact(milestone.category),
      },
    ]
    setCustomMilestones(newMilestones)
    localStorage.setItem("nestwell-custom-milestones", JSON.stringify(newMilestones))

    // Update user score based on milestone
    setUserScore((prev) => prev + milestone.scoreImpact || 0)
  }

  const calculateScoreImpact = (category: string) => {
    const impacts = {
      financial: 3,
      health: 2,
      insurance: 4,
      care: 3,
      lifestyle: 1,
      family: 2,
    }
    return impacts[category as keyof typeof impacts] || 1
  }

  const removeMilestone = (id: number) => {
    const milestone = customMilestones.find((m) => m.id === id)
    const filtered = customMilestones.filter((m) => m.id !== id)
    setCustomMilestones(filtered)
    localStorage.setItem("nestwell-custom-milestones", JSON.stringify(filtered))

    // Decrease score
    if (milestone?.scoreImpact) {
      setUserScore((prev) => Math.max(0, prev - milestone.scoreImpact))
    }
  }

  const updateMilestone = (id: number, updates: any) => {
    const updated = customMilestones.map((m) => (m.id === id ? { ...m, ...updates } : m))
    setCustomMilestones(updated)
    localStorage.setItem("nestwell-custom-milestones", JSON.stringify(updated))
  }

  const totalMilestones = customMilestones.length
  const completedMilestones = customMilestones.filter((m) => m.completed).length

  return (
    <div className="min-h-screen bg-gradient-to-br from-sand-50 via-amber-50 to-teal-50 relative overflow-hidden">
      {/* AI Assistant */}
      <AIAssistant
        userName={userName}
        userScore={userScore}
        currentPage="planner"
        recentInsights={customMilestones.map((m) => m.title)}
      />

      {/* Floating quote */}
      {showQuote && <FloatingQuote quote={currentQuote} />}

      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto py-4 px-4 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-teal-500 flex items-center justify-center">
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
            <Link href="/readiness" className="text-gray-600 hover:text-gray-800">
              My Score
            </Link>
            <Link href="/insights" className="text-gray-600 hover:text-gray-800">
              Insights
            </Link>
            <Link href="/planner" className="text-teal-600 font-medium">
              Planner
            </Link>
            <SoundscapeToggle enabled={soundscapeEnabled} onToggle={setSoundscapeEnabled} />
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-7xl mx-auto">
          {/* Module Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center">
                <Target className="w-6 h-6 text-teal-600" />
              </div>
              <div>
                <h1 className="text-3xl font-serif font-semibold text-gray-800">Your Planning Timeline</h1>
                <p className="text-gray-600">Map your future milestones and watch your readiness score grow</p>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
              <Card className="border-0 shadow-sm bg-white/90">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Readiness Score</p>
                      <p className="text-2xl font-bold text-teal-600">{userScore}</p>
                    </div>
                    <TrendingUp className="w-8 h-8 text-teal-500" />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-sm bg-white/90">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Milestones</p>
                      <p className="text-2xl font-bold text-gray-800">{totalMilestones}</p>
                    </div>
                    <Target className="w-8 h-8 text-gray-500" />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-sm bg-white/90">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Completed</p>
                      <p className="text-2xl font-bold text-green-600">{completedMilestones}</p>
                    </div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="32"
                      height="32"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-green-500"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-sm bg-white/90">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Years Planned</p>
                      <p className="text-2xl font-bold text-purple-600">
                        {Math.max(...customMilestones.map((m) => m.age), currentAge) - currentAge || 0}
                      </p>
                    </div>
                    <Clock className="w-8 h-8 text-purple-500" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Smart Suggestions */}
          <TimelineSmartSuggestions
            userAge={currentAge}
            existingMilestones={customMilestones}
            onAddSuggestion={addCustomMilestone}
          />

          {/* Add Milestone CTA */}
          <div className="text-center mb-8">
            <Button
              onClick={() => setShowAddModal(true)}
              size="lg"
              className="bg-teal-500 hover:bg-teal-600 text-white px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              <Plus className="w-5 h-5 mr-2" />
              Add a Milestone
            </Button>
            <p className="text-sm text-gray-500 mt-2">Each milestone you add improves your Planning Score</p>
          </div>

          {/* Interactive Timeline */}
          <div className="mb-12">
            <Card className="border-0 shadow-xl bg-gradient-to-br from-white via-teal-50/30 to-sand-50/30 backdrop-blur-sm overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-teal-400 via-sand-400 to-teal-400"></div>
              <CardContent className="p-8">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg">
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
                        className="text-white"
                      >
                        <path d="M3 3v18h18" />
                        <path d="M18.7 8l-5.1 5.2-2.8-2.7L7 14.3" />
                      </svg>
                    </div>
                    <div>
                      <h2 className="text-2xl font-serif font-semibold text-gray-800">Your Life Timeline</h2>
                      <p className="text-gray-600">Visualize your journey through the years ahead</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant="outline" className="bg-teal-50 text-teal-700 border-teal-200 px-4 py-2 font-medium">
                      <Clock className="w-4 h-4 mr-2" />
                      {currentAge} → {currentAge + 35} years
                    </Badge>
                    <div className="text-right">
                      <div className="text-sm text-gray-500">Planning Horizon</div>
                      <div className="text-lg font-semibold text-teal-600">{35} Years</div>
                    </div>
                  </div>
                </div>

                <div className="bg-white/80 rounded-xl p-6 shadow-inner border border-teal-100/50">
                  <InteractiveTimeline
                    currentAge={currentAge}
                    viewMode="age"
                    customMilestones={customMilestones}
                    onUpdateMilestone={updateMilestone}
                    onRemoveMilestone={removeMilestone}
                    onShowQuote={showRandomQuote}
                    onSelectMilestone={setSelectedMilestone}
                  />
                </div>

                {customMilestones.length === 0 && (
                  <div className="text-center py-8 border-2 border-dashed border-teal-200 rounded-xl mt-6 bg-teal-50/30">
                    <div className="w-16 h-16 mx-auto mb-4 bg-teal-100 rounded-full flex items-center justify-center">
                      <Target className="w-8 h-8 text-teal-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-700 mb-2">Start Planning Your Future</h3>
                    <p className="text-gray-600 mb-4">Add your first milestone to begin mapping your journey</p>
                    <Button
                      onClick={() => setShowAddModal(true)}
                      className="bg-teal-500 hover:bg-teal-600 text-white px-6 py-2 rounded-lg"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add First Milestone
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Progress Tracker */}
          <div className="mb-12">
            <Card className="border-0 shadow-lg bg-gradient-to-r from-teal-50 to-sand-50">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">Your Planning Progress</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Milestones Added</span>
                    <span className="text-sm font-medium">{totalMilestones}/10 target</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-teal-500 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${Math.min((totalMilestones / 10) * 100, 100)}%` }}
                    />
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                    {["Financial", "Health", "Insurance", "Lifestyle"].map((category) => {
                      const count = customMilestones.filter((m) => m.category === category.toLowerCase()).length
                      return (
                        <div key={category} className="text-center">
                          <div className="text-2xl font-bold text-teal-600">{count}</div>
                          <div className="text-xs text-gray-600">{category}</div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Action Cards */}
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="w-12 h-12 mx-auto mb-4 bg-teal-100 rounded-full flex items-center justify-center">
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
                      className="text-teal-600"
                    >
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                      <polyline points="14,2 14,8 20,8" />
                      <line x1="16" y1="13" x2="8" y2="13" />
                      <line x1="16" y1="17" x2="8" y2="17" />
                      <polyline points="10,9 9,9 8,9" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Export Timeline</h3>
                  <p className="text-gray-600 mb-4">Download your personalized planning timeline</p>
                  <Button variant="outline" className="border-teal-300 text-teal-700 hover:bg-teal-50">
                    Download PDF
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="w-12 h-12 mx-auto mb-4 bg-sand-100 rounded-full flex items-center justify-center">
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
                      className="text-sand-600"
                    >
                      <path d="M9 11H5a2 2 0 0 0-2 2v3c0 1.1.9 2 2 2h4l3 3h7a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-7l-3 3z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Get Guidance</h3>
                  <p className="text-gray-600 mb-4">Chat with our AI about your timeline</p>
                  <Button variant="outline" className="border-sand-300 text-sand-700 hover:bg-sand-50">
                    Ask Assistant
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Encouraging Footer */}
          <div className="text-center bg-gradient-to-r from-teal-100 to-sand-100 p-8 rounded-lg border border-teal-200">
            <h3 className="text-xl font-semibold mb-2 text-teal-800">Building your future, step by step</h3>
            <p className="text-teal-700 mb-4">Every milestone you add strengthens your readiness for what's ahead.</p>
            <p className="text-sm text-teal-600">
              Your timeline improves your Planning Score by{" "}
              <span className="font-semibold">+{totalMilestones * 2}</span> points
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
