"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import Link from "next/link"
import { OnboardingWelcome } from "@/components/onboarding-welcome"
import { OnboardingStep1 } from "@/components/onboarding-step-1-enhanced"
import { OnboardingStep2 } from "@/components/onboarding-step-2-enhanced"
import { OnboardingStep3 } from "@/components/onboarding-step-3-enhanced"
import { OnboardingStep4 } from "@/components/onboarding-step-4-enhanced"
import { OnboardingStep5 } from "@/components/onboarding-step-5-enhanced"
import { FloatingFeather } from "@/components/floating-feather"

export default function OnboardingPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(0)
  const [showFeather, setShowFeather] = useState(false)
  const [formData, setFormData] = useState({
    // Step 1: Life Snapshot
    age: 65,
    maritalStatus: "married",
    employmentStatus: "retired",

    // Step 2: Financial Foundations
    pensionType: "defined-benefit",
    monthlyIncome: 2000,
    householdSavings: 75000,
    majorDebts: false,

    // Step 3: Coverage Snapshot
    healthCoverage: "nhs-only",
    insuranceTypes: ["life-insurance"],

    // Step 4: Lifestyle & Aspirations
    lifeGoals: ["travel", "family", "wellness"],
    additionalGoals: "",
  })

  const totalSteps = 6 // Welcome + 5 steps
  const progress = Math.round((currentStep / (totalSteps - 1)) * 100)

  const updateFormData = (data: Partial<typeof formData>) => {
    setFormData((prev) => ({ ...prev, ...data }))
  }

  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      // Show feather animation
      setShowFeather(true)
      setTimeout(() => setShowFeather(false), 2000)

      window.scrollTo(0, 0)
      setCurrentStep((prev) => prev + 1)
    } else {
      // Final step - complete onboarding
      completeOnboarding()
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      window.scrollTo(0, 0)
      setCurrentStep((prev) => prev - 1)
    }
  }

  const completeOnboarding = () => {
    // Save onboarding data
    localStorage.setItem("nestwell-onboarding-data", JSON.stringify(formData))
    localStorage.setItem("nestwell-onboarding-complete", "true")

    // Navigate to score page
    router.push("/score")
  }

  // Render the current step
  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <OnboardingWelcome onNext={handleNext} />
      case 1:
        return <OnboardingStep1 formData={formData} updateFormData={updateFormData} />
      case 2:
        return <OnboardingStep2 formData={formData} updateFormData={updateFormData} />
      case 3:
        return <OnboardingStep3 formData={formData} updateFormData={updateFormData} />
      case 4:
        return <OnboardingStep4 formData={formData} updateFormData={updateFormData} />
      case 5:
        return <OnboardingStep5 formData={formData} onNext={handleNext} />
      default:
        return <OnboardingWelcome onNext={handleNext} />
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

          {/* Skip to hub link for demo purposes */}
          <Link href="/hub" className="text-sm text-amber-600 hover:text-amber-700">
            Skip to Hub Demo
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          {/* Progress bar (hidden on welcome screen) */}
          {currentStep > 0 && (
            <div className="mb-8">
              <div className="flex justify-between text-sm text-gray-500 mb-2">
                <span>Getting Started</span>
                <span>
                  Step {currentStep} of {totalSteps - 1}
                </span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
          )}

          {/* Main content card */}
          {currentStep > 0 ? (
            <Card className="p-8 shadow-lg border-0 bg-white/90 backdrop-blur-sm">
              {renderStep()}

              {/* Navigation buttons */}
              {currentStep > 0 && currentStep < totalSteps - 1 && (
                <div className="flex justify-between mt-12">
                  <Button variant="outline" onClick={handleBack}>
                    Back
                  </Button>
                  <Button onClick={handleNext} className="bg-amber-500 hover:bg-amber-600 text-white">
                    Continue
                  </Button>
                </div>
              )}
            </Card>
          ) : (
            // Welcome screen doesn't need a card
            renderStep()
          )}
        </div>
      </main>
    </div>
  )
}
