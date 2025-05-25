"use client"

import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { useState, useEffect } from "react"

interface OnboardingStep3Props {
  formData: {
    healthCoverage: string
    insuranceTypes: string[]
  }
  updateFormData: (data: Partial<OnboardingStep3Props["formData"]>) => void
}

export function OnboardingStep3({ formData, updateFormData }: OnboardingStep3Props) {
  const [selectedCards, setSelectedCards] = useState<string[]>([])
  const [showFeathers, setShowFeathers] = useState<number[]>([])

  const handleInsuranceChange = (value: string, checked: boolean) => {
    let newTypes: string[]
    if (checked) {
      newTypes = [...formData.insuranceTypes, value]
      setSelectedCards([...selectedCards, value])
      // Trigger feather animation
      setShowFeathers([...showFeathers, Date.now()])
    } else {
      newTypes = formData.insuranceTypes.filter((item) => item !== value)
      setSelectedCards(selectedCards.filter((card) => card !== value))
    }
    updateFormData({ insuranceTypes: newTypes })
  }

  useEffect(() => {
    // Clean up feather animations
    if (showFeathers.length > 0) {
      const timer = setTimeout(() => {
        setShowFeathers([])
      }, 2000)
      return () => clearTimeout(timer)
    }
  }, [showFeathers])

  const insuranceOptions = [
    {
      id: "private-health",
      title: "Private Health Insurance",
      description: "Coverage for private medical treatment",
      icon: "🏥",
    },
    {
      id: "life-insurance",
      title: "Life Insurance",
      description: "Provides a payout to beneficiaries",
      icon: "🛡️",
    },
    {
      id: "critical-illness",
      title: "Critical Illness Cover",
      description: "Pays out for serious illness diagnosis",
      icon: "💊",
    },
    {
      id: "income-protection",
      title: "Income Protection",
      description: "Regular payments if unable to work",
      icon: "💰",
    },
    {
      id: "care-insurance",
      title: "Long-term Care Insurance",
      description: "Helps cover long-term care costs",
      icon: "🏠",
    },
  ]

  return (
    <div className="space-y-8 relative">
      {/* Floating feathers */}
      {showFeathers.map((timestamp, index) => (
        <div
          key={timestamp}
          className="absolute pointer-events-none animate-float-down"
          style={{
            left: `${50 + index * 10}%`,
            top: "20%",
            animationDuration: "2s",
          }}
        >
          <svg width="16" height="20" viewBox="0 0 16 20" className="text-amber-400">
            <path
              d="M8 0C8 0 12 4 12 10C12 16 8 20 8 20C8 20 4 16 4 10C4 4 8 0 8 0Z"
              fill="currentColor"
              opacity="0.7"
            />
          </svg>
        </div>
      ))}

      <div className="text-center mb-8">
        <div className="w-16 h-16 mx-auto mb-4 relative">
          <svg width="64" height="64" viewBox="0 0 64 64" className="text-amber-500">
            <path
              d="M32 10s16 8 16 20c0 12-16 20-16 20s-16-8-16-20c0-12 16-20 16-20z"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            />
            <circle cx="32" cy="30" r="8" fill="none" stroke="#92400e" strokeWidth="2" />
          </svg>
        </div>
        <h2 className="text-2xl font-semibold mb-2">Coverage Snapshot</h2>
        <p className="text-gray-600">Let's see what protection you have in place.</p>
      </div>

      <div className="space-y-8">
        {/* Health Coverage */}
        <div className="space-y-4">
          <Label className="text-lg font-medium">Health coverage</Label>
          <RadioGroup
            value={formData.healthCoverage}
            onValueChange={(value) => updateFormData({ healthCoverage: value })}
            className="space-y-3"
          >
            <div className="flex items-center space-x-3 rounded-lg border-2 p-4 hover:border-amber-200 transition-colors">
              <RadioGroupItem value="nhs-only" id="nhs-only" className="h-5 w-5" />
              <div>
                <Label htmlFor="nhs-only" className="text-base font-medium cursor-pointer">
                  NHS only
                </Label>
                <p className="text-sm text-gray-500">Relying on National Health Service</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 rounded-lg border-2 p-4 hover:border-amber-200 transition-colors">
              <RadioGroupItem value="private-only" id="private-only" className="h-5 w-5" />
              <div>
                <Label htmlFor="private-only" className="text-base font-medium cursor-pointer">
                  Private insurance only
                </Label>
                <p className="text-sm text-gray-500">Private health insurance coverage</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 rounded-lg border-2 p-4 hover:border-amber-200 transition-colors">
              <RadioGroupItem value="both" id="both" className="h-5 w-5" />
              <div>
                <Label htmlFor="both" className="text-base font-medium cursor-pointer">
                  Both NHS and private
                </Label>
                <p className="text-sm text-gray-500">Best of both worlds</p>
              </div>
            </div>
          </RadioGroup>
        </div>

        {/* Insurance Types */}
        <div className="space-y-4">
          <Label className="text-lg font-medium">Insurance types you currently have</Label>
          <p className="text-sm text-gray-500 mb-4">Select all that apply</p>

          <div className="grid gap-4">
            {insuranceOptions.map((option) => (
              <div
                key={option.id}
                className={`flex items-start space-x-3 rounded-lg border-2 p-4 transition-all duration-300 hover:border-amber-200 ${
                  selectedCards.includes(option.id) ? "border-amber-300 bg-amber-50 scale-105" : "border-gray-200"
                }`}
              >
                <Checkbox
                  id={option.id}
                  className="h-5 w-5 mt-1"
                  checked={formData.insuranceTypes.includes(option.id)}
                  onCheckedChange={(checked) => handleInsuranceChange(option.id, checked as boolean)}
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{option.icon}</span>
                    <Label htmlFor={option.id} className="text-base font-medium cursor-pointer">
                      {option.title}
                    </Label>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">{option.description}</p>
                </div>
              </div>
            ))}

            <div className="flex items-start space-x-3 rounded-lg border-2 p-4 hover:border-amber-200 transition-colors border-gray-200">
              <Checkbox
                id="none"
                className="h-5 w-5 mt-1"
                checked={formData.insuranceTypes.includes("none")}
                onCheckedChange={(checked) => handleInsuranceChange("none", checked as boolean)}
              />
              <div>
                <Label htmlFor="none" className="text-base font-medium cursor-pointer">
                  None of the above
                </Label>
                <p className="text-sm text-gray-500 mt-1">I don't currently have any of these</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
