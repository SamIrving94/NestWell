"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Progress } from "@/components/ui/progress"
import Link from "next/link"
import { ReadinessWelcome } from "@/components/readiness-welcome"
import { ReadinessProfileIntake } from "@/components/readiness-profile-intake"
import { ReadinessScoreDisplay } from "@/components/readiness-score-display"
import { ReadinessFinalScreen } from "@/components/readiness-final-screen"
import { FloatingAssistant } from "@/components/floating-assistant"
import { FeatherFloat } from "@/components/feather-float"

export default function ReadinessPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(0)
  const [profileData, setProfileData] = useState({
    age: 65,
    livingSituation: "",
    incomeRange: 2000,
    pensionSavings: 50000,
    hasInsurance: false,
    insuranceTypes: [],
    healthStatus: "",
    planningConfidence: 3,
  })
  const [readinessScore, setReadinessScore] = useState({
    overall: 0,
    finance: 0,
    coverage: 0,
    health: 0,
    planning: 0,
  })
  const [showAssistant, setShowAssistant] = useState(false)

  const steps = ["welcome", "profile", "score", "final"]
  const currentStepName = steps[currentStep]
  const progress = (currentStep / (steps.length - 1)) * 100

  // Calculate readiness score based on profile data
  useEffect(() => {
    const calculateScore = () => {
      let finance = 0
      let coverage = 0
      let health = 0
      let planning = 0

      // Finance score (0-100)
      if (profileData.incomeRange >= 3000) finance += 40
      else if (profileData.incomeRange >= 2000) finance += 30
      else finance += 20

      if (profileData.pensionSavings >= 100000) finance += 40
      else if (profileData.pensionSavings >= 50000) finance += 30
      else if (profileData.pensionSavings >= 20000) finance += 20
      else finance += 10

      if (profileData.age < 65) finance += 20
      else finance += 10

      // Coverage score (0-100)
      if (profileData.hasInsurance) {
        coverage += 50
        coverage += Math.min(profileData.insuranceTypes.length * 15, 50)
      } else {
        coverage = 20
      }

      // Health score (0-100)
      switch (profileData.healthStatus) {
        case "excellent":
          health = 90
          break
        case "good":
          health = 75
          break
        case "okay":
          health = 60
          break
        case "needs-help":
          health = 40
          break
        default:
          health = 50
      }

      // Planning score (0-100)
      planning = Math.min(profileData.planningConfidence * 20, 100)

      // Overall score (weighted average)
      const overall = Math.round(finance * 0.3 + coverage * 0.25 + health * 0.25 + planning * 0.2)

      setReadinessScore({
        overall: Math.min(overall, 100),
        finance: Math.min(finance, 100),
        coverage: Math.min(coverage, 100),
        health: Math.min(health, 100),
        planning: Math.min(planning, 100),
      })
    }

    calculateScore()
  }, [profileData])

  const updateProfileData = (data: Partial<typeof profileData>) => {
    setProfileData((prev) => ({ ...prev, ...data }))
  }

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1)
      window.scrollTo(0, 0)

      // Show assistant after profile intake
      if (currentStep === 1) {
        setShowAssistant(true)
      }
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1)
      window.scrollTo(0, 0)
    }
  }

  const handleComplete = () => {
    // Save readiness data
    localStorage.setItem("nestwell-readiness-data", JSON.stringify(profileData))
    localStorage.setItem("nestwell-readiness-score", JSON.stringify(readinessScore))
    localStorage.setItem("nestwell-readiness-complete", "true")

    // Navigate to hub
    router.push("/hub")
  }

  const renderCurrentStep = () => {
    switch (currentStepName) {
      case "welcome":
        return <ReadinessWelcome onNext={handleNext} />
      case "profile":
        return (
          <ReadinessProfileIntake
            profileData={profileData}
            updateProfileData={updateProfileData}
            onNext={handleNext}
            onBack={handleBack}
          />
        )
      case "score":
        return (
          <ReadinessScoreDisplay
            score={readinessScore}
            profileData={profileData}
            onNext={handleNext}
            onBack={handleBack}
          />
        )
      case "final":
        return (
          <ReadinessFinalScreen
            score={readinessScore}
            profileData={profileData}
            onComplete={handleComplete}
            onBack={handleBack}
          />
        )
      default:
        return <ReadinessWelcome onNext={handleNext} />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-sand-50 to-navy-50 relative overflow-hidden">
      {/* Floating elements */}
      <FeatherFloat />

      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm relative z-10">
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
            <span className="text-xl font-semibold text-navy-800">NestWell</span>
          </Link>

          {/* Skip option */}
          <Link href="/hub" className="text-sm text-teal-600 hover:text-teal-700">
            Skip to Hub
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Progress indicator (hidden on welcome and final) */}
          {currentStepName !== "welcome" && currentStepName !== "final" && (
            <div className="mb-8">
              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span>Getting to know you</span>
                <span>{Math.round(progress)}% complete</span>
              </div>
              <Progress value={progress} className="h-2 bg-white/50" />
            </div>
          )}

          {/* Main content */}
          <div className="relative">{renderCurrentStep()}</div>
        </div>
      </main>

      {/* Floating Assistant */}
      {showAssistant && (
        <FloatingAssistant
          currentStep={currentStepName}
          score={readinessScore}
          profileData={profileData}
          onClose={() => setShowAssistant(false)}
        />
      )}
    </div>
  )
}
