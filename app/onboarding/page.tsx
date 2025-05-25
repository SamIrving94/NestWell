"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { OnboardingWelcome } from "@/components/onboarding-welcome"
import { OnboardingStep1 } from "@/components/onboarding-step-1-enhanced"
import { OnboardingStep2 } from "@/components/onboarding-step-2-enhanced"
import { OnboardingStep3 } from "@/components/onboarding-step-3-enhanced"
import { OnboardingStep4 } from "@/components/onboarding-step-4-enhanced"
import { OnboardingStep5 } from "@/components/onboarding-step-5-enhanced"
import { NestProgress } from "@/components/nest-progress"
import { FloatingFeather } from "@/components/floating-feather"

export default function OnboardingPage() {
  const [step, setStep] = useState(0) // 0 = welcome, 1-5 = steps
  const [formData, setFormData] = useState({
    age: 65,
    maritalStatus: "",
    employmentStatus: "",
    pensionType: "",
    monthlyIncome: 2000,
    householdSavings: 50000,
    majorDebts: false,
    healthCoverage: "",
    insuranceTypes: [],
    lifeGoals: [],
    additionalGoals: "",
  })
  const [showFeather, setShowFeather] = useState(false)
  const [encouragementMessage, setEncouragementMessage] = useState("")

  const router = useRouter()
  const totalSteps = 5
  const progress = step === 0 ? 0 : (step / totalSteps) * 100

  const encouragementMessages = [
    "You're doing brilliantly.",
    "Take your time—we're here when you're ready.",
    "Every step brings you closer to peace of mind.",
    "You're building something wonderful.",
    "Your future self will thank you for this.",
  ]

  useEffect(() => {
    // Save progress to localStorage
    if (step > 0) {
      localStorage.setItem("nestwell-onboarding-step", step.toString())
      localStorage.setItem("nestwell-onboarding-data", JSON.stringify(formData))
    }
  }, [step, formData])

  useEffect(() => {
    // Load saved progress
    const savedStep = localStorage.getItem("nestwell-onboarding-step")
    const savedData = localStorage.getItem("nestwell-onboarding-data")

    if (savedStep && savedData) {
      setStep(Number.parseInt(savedStep))
      setFormData(JSON.parse(savedData))
    }
  }, [])

  const handleNext = () => {
    if (step < totalSteps) {
      // Show encouragement message between steps
      if (step > 0 && step < totalSteps) {
        const randomMessage = encouragementMessages[Math.floor(Math.random() * encouragementMessages.length)]
        setEncouragementMessage(randomMessage)
        setTimeout(() => setEncouragementMessage(""), 3000)
      }

      // Trigger feather animation
      setShowFeather(true)
      setTimeout(() => setShowFeather(false), 2000)

      setStep(step + 1)
      window.scrollTo(0, 0)
    } else {
      // Clear saved progress and go to score
      localStorage.removeItem("nestwell-onboarding-step")
      localStorage.removeItem("nestwell-onboarding-data")
      router.push("/score")
    }
  }

  const handleBack = () => {
    if (step > 0) {
      setStep(step - 1)
      window.scrollTo(0, 0)
    }
  }

  const updateFormData = (data: Partial<typeof formData>) => {
    setFormData({ ...formData, ...data })
  }

  const getStepTitle = () => {
    switch (step) {
      case 1:
        return "Life Snapshot"
      case 2:
        return "Financial Foundations"
      case 3:
        return "Coverage Snapshot"
      case 4:
        return "Lifestyle & Aspirations"
      case 5:
        return "Your Journey Summary"
      default:
        return ""
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-sky-100 relative overflow-hidden">
      {/* Floating feathers */}
      {showFeather && <FloatingFeather />}

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

          {step > 0 && (
            <div className="flex items-center gap-4">
              <NestProgress step={step} totalSteps={totalSteps} />
              <div className="text-sm text-gray-600">
                Step {step} of {totalSteps}
              </div>
            </div>
          )}
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-3xl mx-auto">
          {/* Progress bar for steps 1-5 */}
          {step > 0 && (
            <div className="mb-8">
              <div className="mb-2 flex justify-between text-sm">
                <span className="font-medium">{getStepTitle()}</span>
                <span>{Math.round(progress)}% complete</span>
              </div>
              <Progress value={progress} className="h-3 bg-white/50" />
            </div>
          )}

          {/* Encouragement message */}
          {encouragementMessage && (
            <div className="mb-6 text-center">
              <div className="inline-block bg-amber-100 text-amber-800 px-4 py-2 rounded-full text-sm font-medium animate-fade-in">
                {encouragementMessage}
              </div>
            </div>
          )}

          {/* Step content */}
          <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
            <CardContent className="pt-6">
              {step === 0 && <OnboardingWelcome onNext={handleNext} />}
              {step === 1 && <OnboardingStep1 formData={formData} updateFormData={updateFormData} />}
              {step === 2 && <OnboardingStep2 formData={formData} updateFormData={updateFormData} />}
              {step === 3 && <OnboardingStep3 formData={formData} updateFormData={updateFormData} />}
              {step === 4 && <OnboardingStep4 formData={formData} updateFormData={updateFormData} />}
              {step === 5 && <OnboardingStep5 formData={formData} onNext={handleNext} />}

              {/* Navigation buttons for steps 1-4 */}
              {step > 0 && step < 5 && (
                <div className="flex justify-between mt-8">
                  <Button variant="outline" onClick={handleBack} className="bg-white/50 hover:bg-white/80">
                    Back
                  </Button>
                  <Button onClick={handleNext} className="bg-amber-500 hover:bg-amber-600 text-white px-8">
                    Continue
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Reassuring message */}
          {step > 0 && step < 5 && (
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">Over 2 million people are planning with us. You're not alone.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
