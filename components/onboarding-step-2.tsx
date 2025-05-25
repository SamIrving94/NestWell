"use client"

import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface OnboardingStep2Props {
  formData: {
    pensionAmount: string
    savingsAmount: string
  }
  updateFormData: (data: Partial<{ pensionAmount: string; savingsAmount: string }>) => void
}

export default function OnboardingStep2({ formData, updateFormData }: OnboardingStep2Props) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold mb-4">Financial overview</h2>
        <p className="text-gray-600 mb-6">
          This helps us understand your financial readiness. All information is kept private.
        </p>
      </div>

      <div className="space-y-6">
        <div>
          <Label htmlFor="pension-type" className="text-base">
            Pension type
          </Label>
          <Select>
            <SelectTrigger className="mt-1 text-lg h-12">
              <SelectValue placeholder="Select your pension type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="defined-benefit">Defined Benefit (Final Salary)</SelectItem>
              <SelectItem value="defined-contribution">Defined Contribution</SelectItem>
              <SelectItem value="state-pension">State Pension Only</SelectItem>
              <SelectItem value="multiple">Multiple Pensions</SelectItem>
              <SelectItem value="none">No Pension</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="pension-amount" className="text-base">
            Expected monthly pension income (£)
          </Label>
          <div className="relative mt-1">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <span className="text-gray-500">£</span>
            </div>
            <Input
              id="pension-amount"
              type="number"
              placeholder="0"
              className="pl-8 text-lg h-12"
              value={formData.pensionAmount}
              onChange={(e) => updateFormData({ pensionAmount: e.target.value })}
            />
          </div>
          <p className="text-sm text-gray-500 mt-1">Your best estimate is fine</p>
        </div>

        <div>
          <Label htmlFor="savings-amount" className="text-base">
            Total savings & investments (£)
          </Label>
          <div className="relative mt-1">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <span className="text-gray-500">£</span>
            </div>
            <Input
              id="savings-amount"
              type="number"
              placeholder="0"
              className="pl-8 text-lg h-12"
              value={formData.savingsAmount}
              onChange={(e) => updateFormData({ savingsAmount: e.target.value })}
            />
          </div>
          <p className="text-sm text-gray-500 mt-1">Include ISAs, savings accounts, investments, etc.</p>
        </div>

        <div>
          <Label htmlFor="property" className="text-base">
            Property status
          </Label>
          <Select>
            <SelectTrigger className="mt-1 text-lg h-12">
              <SelectValue placeholder="Select your property status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="own-outright">Own outright</SelectItem>
              <SelectItem value="mortgage">Own with mortgage</SelectItem>
              <SelectItem value="rent">Renting</SelectItem>
              <SelectItem value="living-with-family">Living with family</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  )
}
