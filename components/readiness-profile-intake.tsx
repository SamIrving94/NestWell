"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowLeft, ArrowRight, MessageCircle } from "lucide-react"

interface ProfileData {
  age: number
  livingSituation: string
  incomeRange: number
  pensionSavings: number
  hasInsurance: boolean
  insuranceTypes: string[]
  healthStatus: string
  planningConfidence: number
}

interface ReadinessProfileIntakeProps {
  profileData: ProfileData
  updateProfileData: (data: Partial<ProfileData>) => void
  onNext: () => void
  onBack: () => void
}

export function ReadinessProfileIntake({
  profileData,
  updateProfileData,
  onNext,
  onBack,
}: ReadinessProfileIntakeProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [showAssistantTip, setShowAssistantTip] = useState(false)

  const questions = [
    {
      id: "age",
      title: "First, how old are you?",
      subtitle: "This helps us understand your planning timeline",
      type: "slider",
      min: 50,
      max: 85,
      step: 1,
      value: profileData.age,
      onChange: (value: number) => updateProfileData({ age: value }),
      format: (value: number) => `${value} years old`,
    },
    {
      id: "living",
      title: "What's your living situation?",
      subtitle: "Understanding your housing helps us give better advice",
      type: "radio",
      options: [
        { value: "own-outright", label: "Own my home outright", icon: "🏠" },
        { value: "own-mortgage", label: "Own with a mortgage", icon: "🏡" },
        { value: "rent", label: "Rent my home", icon: "🏢" },
        { value: "family", label: "Live with family", icon: "👨‍👩‍👧‍👦" },
      ],
      value: profileData.livingSituation,
      onChange: (value: string) => updateProfileData({ livingSituation: value }),
    },
    {
      id: "income",
      title: "What's your monthly income?",
      subtitle: "Include pensions, benefits, and any other regular income",
      type: "slider",
      min: 500,
      max: 5000,
      step: 100,
      value: profileData.incomeRange,
      onChange: (value: number) => updateProfileData({ incomeRange: value }),
      format: (value: number) => `£${value.toLocaleString()}/month`,
    },
    {
      id: "savings",
      title: "How much do you have in pensions and savings?",
      subtitle: "Just a rough estimate is fine",
      type: "slider",
      min: 0,
      max: 500000,
      step: 5000,
      value: profileData.pensionSavings,
      onChange: (value: number) => updateProfileData({ pensionSavings: value }),
      format: (value: number) => `£${value.toLocaleString()}`,
    },
    {
      id: "insurance",
      title: "Do you have any insurance?",
      subtitle: "This includes health, life, or care insurance",
      type: "insurance",
      value: profileData.hasInsurance,
      types: profileData.insuranceTypes,
      onChange: (hasInsurance: boolean, types: string[]) => updateProfileData({ hasInsurance, insuranceTypes: types }),
    },
    {
      id: "health",
      title: "How would you describe your health?",
      subtitle: "Be honest - this helps us give you the right advice",
      type: "radio",
      options: [
        { value: "excellent", label: "Excellent - I feel great!", icon: "💪" },
        { value: "good", label: "Good - mostly healthy", icon: "😊" },
        { value: "okay", label: "Okay - some concerns", icon: "😐" },
        { value: "needs-help", label: "I need regular support", icon: "🤗" },
      ],
      value: profileData.healthStatus,
      onChange: (value: string) => updateProfileData({ healthStatus: value }),
    },
    {
      id: "confidence",
      title: "How confident do you feel about planning for later life?",
      subtitle: "There's no wrong answer - we're here to help!",
      type: "emoji-scale",
      min: 1,
      max: 5,
      value: profileData.planningConfidence,
      onChange: (value: number) => updateProfileData({ planningConfidence: value }),
      emojis: ["😰", "😟", "😐", "😊", "😎"],
      labels: ["Very worried", "A bit worried", "Neutral", "Quite confident", "Very confident"],
    },
  ]

  const currentQ = questions[currentQuestion]
  const isLastQuestion = currentQuestion === questions.length - 1

  const handleNext = () => {
    if (isLastQuestion) {
      onNext()
    } else {
      setCurrentQuestion((prev) => prev + 1)
      setShowAssistantTip(Math.random() > 0.7) // Show tips occasionally
    }
  }

  const handleBack = () => {
    if (currentQuestion === 0) {
      onBack()
    } else {
      setCurrentQuestion((prev) => prev - 1)
    }
  }

  const canProceed = () => {
    switch (currentQ.type) {
      case "radio":
        return currentQ.value && currentQ.value !== ""
      case "insurance":
        return true // Always can proceed
      default:
        return true
    }
  }

  const renderQuestion = () => {
    switch (currentQ.type) {
      case "slider":
        return (
          <div className="space-y-6">
            <div className="px-4">
              <Slider
                value={[currentQ.value as number]}
                onValueChange={(value) => currentQ.onChange(value[0])}
                max={currentQ.max}
                min={currentQ.min}
                step={currentQ.step}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-gray-500 mt-2">
                <span>{currentQ.format ? currentQ.format(currentQ.min) : currentQ.min}</span>
                <span className="font-bold text-teal-600 text-lg">
                  {currentQ.format ? currentQ.format(currentQ.value as number) : currentQ.value}
                </span>
                <span>{currentQ.format ? currentQ.format(currentQ.max) : currentQ.max}</span>
              </div>
            </div>
          </div>
        )

      case "radio":
        return (
          <RadioGroup value={currentQ.value as string} onValueChange={currentQ.onChange} className="space-y-3">
            {currentQ.options?.map((option) => (
              <div
                key={option.value}
                className="flex items-center space-x-4 rounded-xl border-2 p-4 hover:border-teal-200 transition-colors cursor-pointer"
              >
                <RadioGroupItem value={option.value} id={option.value} className="h-5 w-5" />
                <div className="flex items-center gap-3 flex-1">
                  <span className="text-2xl">{option.icon}</span>
                  <Label htmlFor={option.value} className="text-base font-medium cursor-pointer flex-1">
                    {option.label}
                  </Label>
                </div>
              </div>
            ))}
          </RadioGroup>
        )

      case "insurance":
        return (
          <div className="space-y-6">
            <RadioGroup
              value={profileData.hasInsurance ? "yes" : "no"}
              onValueChange={(value) => {
                const hasInsurance = value === "yes"
                updateProfileData({ hasInsurance, insuranceTypes: hasInsurance ? profileData.insuranceTypes : [] })
              }}
              className="space-y-3"
            >
              <div className="flex items-center space-x-4 rounded-xl border-2 p-4 hover:border-teal-200 transition-colors cursor-pointer">
                <RadioGroupItem value="yes" id="insurance-yes" className="h-5 w-5" />
                <Label htmlFor="insurance-yes" className="text-base font-medium cursor-pointer flex-1">
                  Yes, I have insurance
                </Label>
              </div>
              <div className="flex items-center space-x-4 rounded-xl border-2 p-4 hover:border-teal-200 transition-colors cursor-pointer">
                <RadioGroupItem value="no" id="insurance-no" className="h-5 w-5" />
                <Label htmlFor="insurance-no" className="text-base font-medium cursor-pointer flex-1">
                  No, I don't have insurance
                </Label>
              </div>
            </RadioGroup>

            {profileData.hasInsurance && (
              <div className="space-y-3 mt-6">
                <Label className="text-base font-medium">What types do you have?</Label>
                {[
                  { id: "health", label: "Private health insurance" },
                  { id: "life", label: "Life insurance" },
                  { id: "care", label: "Long-term care insurance" },
                  { id: "critical", label: "Critical illness cover" },
                ].map((type) => (
                  <div key={type.id} className="flex items-center space-x-3">
                    <Checkbox
                      id={type.id}
                      checked={profileData.insuranceTypes.includes(type.id)}
                      onCheckedChange={(checked) => {
                        const newTypes = checked
                          ? [...profileData.insuranceTypes, type.id]
                          : profileData.insuranceTypes.filter((t) => t !== type.id)
                        updateProfileData({ insuranceTypes: newTypes })
                      }}
                    />
                    <Label htmlFor={type.id} className="text-sm cursor-pointer">
                      {type.label}
                    </Label>
                  </div>
                ))}
              </div>
            )}
          </div>
        )

      case "emoji-scale":
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center px-4">
              {currentQ.emojis?.map((emoji, index) => (
                <button
                  key={index}
                  onClick={() => currentQ.onChange(index + 1)}
                  className={`text-4xl p-3 rounded-full transition-all duration-200 ${
                    profileData.planningConfidence === index + 1
                      ? "bg-teal-100 scale-125 shadow-lg"
                      : "hover:bg-gray-100 hover:scale-110"
                  }`}
                >
                  {emoji}
                </button>
              ))}
            </div>
            <div className="text-center">
              <p className="text-lg font-medium text-gray-700">
                {currentQ.labels?.[profileData.planningConfidence - 1]}
              </p>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      {/* Question card */}
      <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-sm">
        <CardContent className="p-8">
          {/* Question header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-2 text-sm text-gray-500 mb-4">
              <MessageCircle className="w-4 h-4" />
              <span>
                Question {currentQuestion + 1} of {questions.length}
              </span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-navy-800 mb-3">{currentQ.title}</h2>
            <p className="text-gray-600 text-lg">{currentQ.subtitle}</p>
          </div>

          {/* Question content */}
          <div className="mb-8">{renderQuestion()}</div>

          {/* Navigation */}
          <div className="flex justify-between items-center">
            <Button variant="outline" onClick={handleBack} className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>

            <div className="flex gap-2">
              {questions.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentQuestion ? "bg-teal-500" : index < currentQuestion ? "bg-teal-300" : "bg-gray-200"
                  }`}
                />
              ))}
            </div>

            <Button
              onClick={handleNext}
              disabled={!canProceed()}
              className="bg-teal-500 hover:bg-teal-600 text-white flex items-center gap-2"
            >
              {isLastQuestion ? "See my score" : "Continue"}
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Assistant tip */}
      {showAssistantTip && (
        <div className="mt-6 bg-teal-50 border border-teal-200 rounded-xl p-4 animate-fade-in">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-teal-500 rounded-full flex items-center justify-center flex-shrink-0">
              <MessageCircle className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="text-sm text-teal-800">
                <strong>Tip:</strong> Don't worry about being exact with numbers - we're looking for a general picture
                to help guide you.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
