"use client"

import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState, useEffect } from "react"

interface OnboardingStep1Props {
  formData: {
    age: number
    maritalStatus: string
    employmentStatus: string
  }
  updateFormData: (data: Partial<OnboardingStep1Props["formData"]>) => void
}

export function OnboardingStep1({ formData, updateFormData }: OnboardingStep1Props) {
  const [showDelight, setShowDelight] = useState(false)

  useEffect(() => {
    if (formData.age && formData.maritalStatus && formData.employmentStatus) {
      setShowDelight(true)
      const timer = setTimeout(() => setShowDelight(false), 4000)
      return () => clearTimeout(timer)
    }
  }, [formData.age, formData.maritalStatus, formData.employmentStatus])

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <div className="w-16 h-16 mx-auto mb-4 relative">
          <svg width="64" height="64" viewBox="0 0 64 64" className="text-amber-500">
            <circle cx="32" cy="32" r="25" fill="none" stroke="currentColor" strokeWidth="2" />
            <path d="M20 30 Q25 25 30 30" fill="none" stroke="#92400e" strokeWidth="2" strokeLinecap="round" />
            <path d="M44 30 Q39 25 34 30" fill="none" stroke="#92400e" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </div>
        <h2 className="text-2xl font-semibold mb-2">Life Snapshot</h2>
        <p className="text-gray-600">Tell us a bit about where you are in life right now.</p>
      </div>

      <div className="space-y-8">
        {/* Age Slider */}
        <div className="space-y-4">
          <Label className="text-lg font-medium">Your age</Label>
          <div className="px-4">
            <Slider
              value={[formData.age]}
              onValueChange={(value) => updateFormData({ age: value[0] })}
              max={90}
              min={50}
              step={1}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-gray-500 mt-2">
              <span>50</span>
              <span className="font-medium text-amber-600 text-lg">{formData.age}</span>
              <span>90</span>
            </div>
          </div>
        </div>

        {/* Marital Status */}
        <div className="space-y-4">
          <Label className="text-lg font-medium">Marital status</Label>
          <RadioGroup
            value={formData.maritalStatus}
            onValueChange={(value) => updateFormData({ maritalStatus: value })}
            className="grid grid-cols-2 gap-4"
          >
            <div className="flex items-center space-x-3 rounded-lg border-2 p-4 hover:border-amber-200 transition-colors">
              <RadioGroupItem value="single" id="single" className="h-5 w-5" />
              <Label htmlFor="single" className="text-base font-normal cursor-pointer">
                Single
              </Label>
            </div>
            <div className="flex items-center space-x-3 rounded-lg border-2 p-4 hover:border-amber-200 transition-colors">
              <RadioGroupItem value="married" id="married" className="h-5 w-5" />
              <Label htmlFor="married" className="text-base font-normal cursor-pointer">
                Married/Partner
              </Label>
            </div>
            <div className="flex items-center space-x-3 rounded-lg border-2 p-4 hover:border-amber-200 transition-colors">
              <RadioGroupItem value="divorced" id="divorced" className="h-5 w-5" />
              <Label htmlFor="divorced" className="text-base font-normal cursor-pointer">
                Divorced
              </Label>
            </div>
            <div className="flex items-center space-x-3 rounded-lg border-2 p-4 hover:border-amber-200 transition-colors">
              <RadioGroupItem value="widowed" id="widowed" className="h-5 w-5" />
              <Label htmlFor="widowed" className="text-base font-normal cursor-pointer">
                Widowed
              </Label>
            </div>
          </RadioGroup>
        </div>

        {/* Employment Status */}
        <div className="space-y-4">
          <Label className="text-lg font-medium">Employment status</Label>
          <Select
            value={formData.employmentStatus}
            onValueChange={(value) => updateFormData({ employmentStatus: value })}
          >
            <SelectTrigger className="h-12 text-lg">
              <SelectValue placeholder="Select your current situation" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="working-full">Working full-time</SelectItem>
              <SelectItem value="working-part">Working part-time</SelectItem>
              <SelectItem value="semi-retired">Semi-retired</SelectItem>
              <SelectItem value="retired">Fully retired</SelectItem>
              <SelectItem value="unemployed">Currently unemployed</SelectItem>
              <SelectItem value="self-employed">Self-employed</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Delight message */}
        {showDelight && (
          <div className="text-center py-4">
            <div className="inline-block bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium animate-bounce">
              Great start! You're not alone—over 2 million people are planning with us.
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
