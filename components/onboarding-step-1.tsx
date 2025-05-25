"use client"

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

interface OnboardingStep1Props {
  formData: {
    age: string
    householdStatus: string
    employmentStatus: string
  }
  updateFormData: (data: Partial<OnboardingStep1Props["formData"]>) => void
}

export default function OnboardingStep1({ formData, updateFormData }: OnboardingStep1Props) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold mb-4">About you</h2>
        <p className="text-gray-600 mb-6">Let's start with some basic information about you.</p>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="age" className="text-base">
            Your age
          </Label>
          <Input
            id="age"
            type="number"
            placeholder="Enter your age"
            className="mt-1 text-lg h-12"
            value={formData.age}
            onChange={(e) => updateFormData({ age: e.target.value })}
          />
        </div>

        <div className="pt-4">
          <div className="mb-3">
            <Label className="text-base">Household status</Label>
          </div>
          <RadioGroup
            value={formData.householdStatus}
            onValueChange={(value) => updateFormData({ householdStatus: value })}
            className="space-y-3"
          >
            <div className="flex items-center space-x-3 rounded-md border p-4">
              <RadioGroupItem value="single" id="single" className="h-5 w-5" />
              <Label htmlFor="single" className="text-base font-normal">
                I live alone
              </Label>
            </div>
            <div className="flex items-center space-x-3 rounded-md border p-4">
              <RadioGroupItem value="partner" id="partner" className="h-5 w-5" />
              <Label htmlFor="partner" className="text-base font-normal">
                I live with a partner
              </Label>
            </div>
            <div className="flex items-center space-x-3 rounded-md border p-4">
              <RadioGroupItem value="family" id="family" className="h-5 w-5" />
              <Label htmlFor="family" className="text-base font-normal">
                I live with family
              </Label>
            </div>
            <div className="flex items-center space-x-3 rounded-md border p-4">
              <RadioGroupItem value="other" id="other" className="h-5 w-5" />
              <Label htmlFor="other" className="text-base font-normal">
                Other arrangement
              </Label>
            </div>
          </RadioGroup>
        </div>

        <div className="pt-4">
          <div className="mb-3">
            <Label className="text-base">Employment status</Label>
          </div>
          <RadioGroup
            value={formData.employmentStatus}
            onValueChange={(value) => updateFormData({ employmentStatus: value })}
            className="space-y-3"
          >
            <div className="flex items-center space-x-3 rounded-md border p-4">
              <RadioGroupItem value="working" id="working" className="h-5 w-5" />
              <Label htmlFor="working" className="text-base font-normal">
                Working full-time
              </Label>
            </div>
            <div className="flex items-center space-x-3 rounded-md border p-4">
              <RadioGroupItem value="part-time" id="part-time" className="h-5 w-5" />
              <Label htmlFor="part-time" className="text-base font-normal">
                Working part-time
              </Label>
            </div>
            <div className="flex items-center space-x-3 rounded-md border p-4">
              <RadioGroupItem value="retired" id="retired" className="h-5 w-5" />
              <Label htmlFor="retired" className="text-base font-normal">
                Retired
              </Label>
            </div>
            <div className="flex items-center space-x-3 rounded-md border p-4">
              <RadioGroupItem value="semi-retired" id="semi-retired" className="h-5 w-5" />
              <Label htmlFor="semi-retired" className="text-base font-normal">
                Semi-retired
              </Label>
            </div>
          </RadioGroup>
        </div>
      </div>
    </div>
  )
}
