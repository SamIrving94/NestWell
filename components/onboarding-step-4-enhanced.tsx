"use client"

import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useState, useEffect } from "react"

interface OnboardingStep4Props {
  formData: {
    lifeGoals: string[]
    additionalGoals: string
  }
  updateFormData: (data: Partial<OnboardingStep4Props["formData"]>) => void
}

export function OnboardingStep4({ formData, updateFormData }: OnboardingStep4Props) {
  const [showCelebration, setShowCelebration] = useState(false)

  const goalOptions = [
    { id: "travel", label: "Travel & Exploration", icon: "✈️", description: "See new places and cultures" },
    { id: "family", label: "Supporting Family", icon: "👨‍👩‍👧‍👦", description: "Help children and grandchildren" },
    { id: "stability", label: "Financial Stability", icon: "🏦", description: "Peace of mind about money" },
    { id: "wellness", label: "Health & Wellness", icon: "🌱", description: "Stay active and healthy" },
    { id: "legacy", label: "Creating a Legacy", icon: "🌟", description: "Leave something meaningful behind" },
    { id: "hobbies", label: "Pursuing Interests", icon: "🎨", description: "Time for hobbies and passions" },
    { id: "volunteering", label: "Giving Back", icon: "🤝", description: "Help others and community" },
    { id: "independence", label: "Independence", icon: "🏠", description: "Maintain autonomy and choice" },
  ]

  const handleGoalToggle = (goalId: string) => {
    const newGoals = formData.lifeGoals.includes(goalId)
      ? formData.lifeGoals.filter((id) => id !== goalId)
      : [...formData.lifeGoals, goalId]

    updateFormData({ lifeGoals: newGoals })
  }

  useEffect(() => {
    if (formData.lifeGoals.length >= 3 && !showCelebration) {
      setShowCelebration(true)
      const timer = setTimeout(() => setShowCelebration(false), 4000)
      return () => clearTimeout(timer)
    }
  }, [formData.lifeGoals.length, showCelebration])

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <div className="w-16 h-16 mx-auto mb-4 relative">
          <svg width="64" height="64" viewBox="0 0 64 64" className="text-amber-500">
            <path
              d="M32 8l8 16h16l-12 12 4 16-16-8-16 8 4-16-12-12h16z"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            />
            <circle cx="32" cy="32" r="6" fill="#fbbf24" opacity="0.5" />
          </svg>
        </div>
        <h2 className="text-2xl font-semibold mb-2">Lifestyle & Aspirations</h2>
        <p className="text-gray-600">What matters most to you in the years ahead?</p>
      </div>

      <div className="space-y-6">
        <div>
          <Label className="text-lg font-medium mb-4 block">Select your priorities</Label>
          <p className="text-sm text-gray-500 mb-6">Choose all that resonate with you</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {goalOptions.map((goal) => (
              <button
                key={goal.id}
                onClick={() => handleGoalToggle(goal.id)}
                className={`p-4 rounded-lg border-2 text-left transition-all duration-300 hover:scale-105 ${
                  formData.lifeGoals.includes(goal.id)
                    ? "border-amber-300 bg-amber-50 shadow-md"
                    : "border-gray-200 hover:border-amber-200"
                }`}
              >
                <div className="flex items-start gap-3">
                  <span className="text-2xl">{goal.icon}</span>
                  <div>
                    <h3 className="font-medium text-base">{goal.label}</h3>
                    <p className="text-sm text-gray-500 mt-1">{goal.description}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Additional Goals */}
        <div className="space-y-4">
          <Label htmlFor="additional-goals" className="text-lg font-medium">
            Anything else that's important to you?
          </Label>
          <Textarea
            id="additional-goals"
            placeholder="Tell us about any other goals, dreams, or concerns you have..."
            className="min-h-[100px] text-base"
            value={formData.additionalGoals}
            onChange={(e) => updateFormData({ additionalGoals: e.target.value })}
          />
          <p className="text-sm text-gray-500">This is optional, but helps us give you better advice</p>
        </div>

        {/* Celebration message */}
        {showCelebration && (
          <div className="text-center py-6">
            <div className="inline-block bg-gradient-to-r from-amber-100 to-orange-100 text-amber-800 px-6 py-3 rounded-full text-base font-medium animate-pulse border border-amber-200">
              ✨ Your life, your way. We love seeing your vision! ✨
            </div>
          </div>
        )}

        {/* Progress indicator */}
        <div className="text-center text-sm text-gray-500">{formData.lifeGoals.length} priorities selected</div>
      </div>
    </div>
  )
}
