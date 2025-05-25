"use client"

import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

interface OnboardingStep4Props {
  formData: {
    lifeGoals: string[]
  }
  updateFormData: (data: Partial<{ lifeGoals: string[] }>) => void
}

export default function OnboardingStep4({ formData, updateFormData }: OnboardingStep4Props) {
  const handleGoalChange = (value: string, checked: boolean) => {
    if (checked) {
      updateFormData({
        lifeGoals: [...formData.lifeGoals, value],
      })
    } else {
      updateFormData({
        lifeGoals: formData.lifeGoals.filter((item) => item !== value),
      })
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold mb-4">Lifestyle aspirations</h2>
        <p className="text-gray-600 mb-6">What matters most to you in the years ahead?</p>
      </div>

      <div>
        <div className="mb-4">
          <Label className="text-base">Select your priorities</Label>
          <p className="text-sm text-gray-500 mt-1">Choose all that apply to you</p>
        </div>

        <div className="space-y-3">
          <div className="flex items-start space-x-3 rounded-md border p-4">
            <Checkbox
              id="travel"
              className="h-5 w-5 mt-0.5"
              checked={formData.lifeGoals.includes("travel")}
              onCheckedChange={(checked) => handleGoalChange("travel", checked as boolean)}
            />
            <div>
              <Label htmlFor="travel" className="text-base font-medium">
                Travel and exploration
              </Label>
              <p className="text-sm text-gray-500 mt-1">Seeing new places and having new experiences</p>
            </div>
          </div>

          <div className="flex items-start space-x-3 rounded-md border p-4">
            <Checkbox
              id="family"
              className="h-5 w-5 mt-0.5"
              checked={formData.lifeGoals.includes("family")}
              onCheckedChange={(checked) => handleGoalChange("family", checked as boolean)}
            />
            <div>
              <Label htmlFor="family" className="text-base font-medium">
                Supporting family
              </Label>
              <p className="text-sm text-gray-500 mt-1">Helping children, grandchildren or other family members</p>
            </div>
          </div>

          <div className="flex items-start space-x-3 rounded-md border p-4">
            <Checkbox
              id="downsizing"
              className="h-5 w-5 mt-0.5"
              checked={formData.lifeGoals.includes("downsizing")}
              onCheckedChange={(checked) => handleGoalChange("downsizing", checked as boolean)}
            />
            <div>
              <Label htmlFor="downsizing" className="text-base font-medium">
                Downsizing home
              </Label>
              <p className="text-sm text-gray-500 mt-1">Moving to a smaller, more manageable property</p>
            </div>
          </div>

          <div className="flex items-start space-x-3 rounded-md border p-4">
            <Checkbox
              id="hobbies"
              className="h-5 w-5 mt-0.5"
              checked={formData.lifeGoals.includes("hobbies")}
              onCheckedChange={(checked) => handleGoalChange("hobbies", checked as boolean)}
            />
            <div>
              <Label htmlFor="hobbies" className="text-base font-medium">
                Pursuing hobbies and interests
              </Label>
              <p className="text-sm text-gray-500 mt-1">Spending time on activities you enjoy</p>
            </div>
          </div>

          <div className="flex items-start space-x-3 rounded-md border p-4">
            <Checkbox
              id="volunteering"
              className="h-5 w-5 mt-0.5"
              checked={formData.lifeGoals.includes("volunteering")}
              onCheckedChange={(checked) => handleGoalChange("volunteering", checked as boolean)}
            />
            <div>
              <Label htmlFor="volunteering" className="text-base font-medium">
                Volunteering and giving back
              </Label>
              <p className="text-sm text-gray-500 mt-1">Contributing to causes and communities you care about</p>
            </div>
          </div>

          <div className="flex items-start space-x-3 rounded-md border p-4">
            <Checkbox
              id="health"
              className="h-5 w-5 mt-0.5"
              checked={formData.lifeGoals.includes("health")}
              onCheckedChange={(checked) => handleGoalChange("health", checked as boolean)}
            />
            <div>
              <Label htmlFor="health" className="text-base font-medium">
                Maintaining health and independence
              </Label>
              <p className="text-sm text-gray-500 mt-1">Staying active and self-sufficient for as long as possible</p>
            </div>
          </div>

          <div className="flex items-start space-x-3 rounded-md border p-4">
            <Checkbox
              id="legacy"
              className="h-5 w-5 mt-0.5"
              checked={formData.lifeGoals.includes("legacy")}
              onCheckedChange={(checked) => handleGoalChange("legacy", checked as boolean)}
            />
            <div>
              <Label htmlFor="legacy" className="text-base font-medium">
                Creating a legacy
              </Label>
              <p className="text-sm text-gray-500 mt-1">Planning what you'll leave behind for loved ones</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
