"use client"

import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

interface OnboardingStep3Props {
  formData: {
    currentInsurance: string[]
  }
  updateFormData: (data: Partial<{ currentInsurance: string[] }>) => void
}

export default function OnboardingStep3({ formData, updateFormData }: OnboardingStep3Props) {
  const handleInsuranceChange = (value: string, checked: boolean) => {
    if (checked) {
      updateFormData({
        currentInsurance: [...formData.currentInsurance, value],
      })
    } else {
      updateFormData({
        currentInsurance: formData.currentInsurance.filter((item) => item !== value),
      })
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold mb-4">Healthcare & insurance</h2>
        <p className="text-gray-600 mb-6">Let us know what coverage you currently have in place.</p>
      </div>

      <div>
        <div className="mb-4">
          <Label className="text-base">Which of these do you currently have?</Label>
          <p className="text-sm text-gray-500 mt-1">Select all that apply</p>
        </div>

        <div className="space-y-3">
          <div className="flex items-start space-x-3 rounded-md border p-4">
            <Checkbox
              id="private-health"
              className="h-5 w-5 mt-0.5"
              checked={formData.currentInsurance.includes("private-health")}
              onCheckedChange={(checked) => handleInsuranceChange("private-health", checked as boolean)}
            />
            <div>
              <Label htmlFor="private-health" className="text-base font-medium">
                Private health insurance
              </Label>
              <p className="text-sm text-gray-500 mt-1">Coverage for private medical treatment</p>
            </div>
          </div>

          <div className="flex items-start space-x-3 rounded-md border p-4">
            <Checkbox
              id="life-insurance"
              className="h-5 w-5 mt-0.5"
              checked={formData.currentInsurance.includes("life-insurance")}
              onCheckedChange={(checked) => handleInsuranceChange("life-insurance", checked as boolean)}
            />
            <div>
              <Label htmlFor="life-insurance" className="text-base font-medium">
                Life insurance
              </Label>
              <p className="text-sm text-gray-500 mt-1">Provides a payout to beneficiaries after death</p>
            </div>
          </div>

          <div className="flex items-start space-x-3 rounded-md border p-4">
            <Checkbox
              id="critical-illness"
              className="h-5 w-5 mt-0.5"
              checked={formData.currentInsurance.includes("critical-illness")}
              onCheckedChange={(checked) => handleInsuranceChange("critical-illness", checked as boolean)}
            />
            <div>
              <Label htmlFor="critical-illness" className="text-base font-medium">
                Critical illness cover
              </Label>
              <p className="text-sm text-gray-500 mt-1">Pays out if you're diagnosed with a specific serious illness</p>
            </div>
          </div>

          <div className="flex items-start space-x-3 rounded-md border p-4">
            <Checkbox
              id="income-protection"
              className="h-5 w-5 mt-0.5"
              checked={formData.currentInsurance.includes("income-protection")}
              onCheckedChange={(checked) => handleInsuranceChange("income-protection", checked as boolean)}
            />
            <div>
              <Label htmlFor="income-protection" className="text-base font-medium">
                Income protection
              </Label>
              <p className="text-sm text-gray-500 mt-1">
                Provides regular payments if you're unable to work due to illness or injury
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3 rounded-md border p-4">
            <Checkbox
              id="care-insurance"
              className="h-5 w-5 mt-0.5"
              checked={formData.currentInsurance.includes("care-insurance")}
              onCheckedChange={(checked) => handleInsuranceChange("care-insurance", checked as boolean)}
            />
            <div>
              <Label htmlFor="care-insurance" className="text-base font-medium">
                Long-term care insurance
              </Label>
              <p className="text-sm text-gray-500 mt-1">Helps cover the cost of long-term care services</p>
            </div>
          </div>

          <div className="flex items-start space-x-3 rounded-md border p-4">
            <Checkbox
              id="none"
              className="h-5 w-5 mt-0.5"
              checked={formData.currentInsurance.includes("none")}
              onCheckedChange={(checked) => handleInsuranceChange("none", checked as boolean)}
            />
            <div>
              <Label htmlFor="none" className="text-base font-medium">
                None of the above
              </Label>
              <p className="text-sm text-gray-500 mt-1">I don't currently have any of these insurance types</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
