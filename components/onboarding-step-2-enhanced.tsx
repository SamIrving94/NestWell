"use client"

import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { useState, useEffect } from "react"

interface OnboardingStep2Props {
  formData: {
    pensionType: string
    monthlyIncome: number
    householdSavings: number
    majorDebts: boolean
  }
  updateFormData: (data: Partial<OnboardingStep2Props["formData"]>) => void
}

export function OnboardingStep2({ formData, updateFormData }: OnboardingStep2Props) {
  const [showBubbles, setShowBubbles] = useState(false)
  const [showTooltip, setShowTooltip] = useState(false)

  useEffect(() => {
    if (formData.pensionType && formData.monthlyIncome > 0) {
      setShowBubbles(true)
      setShowTooltip(true)
      const timer = setTimeout(() => {
        setShowBubbles(false)
        setShowTooltip(false)
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [formData.pensionType, formData.monthlyIncome])

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-GB", {
      style: "currency",
      currency: "GBP",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)
  }

  return (
    <div className="space-y-8 relative">
      {/* Animated bubbles */}
      {showBubbles && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="absolute w-4 h-4 bg-amber-200 rounded-full animate-bounce opacity-60"
              style={{
                left: `${20 + i * 15}%`,
                top: `${30 + i * 10}%`,
                animationDelay: `${i * 0.2}s`,
                animationDuration: "2s",
              }}
            />
          ))}
        </div>
      )}

      <div className="text-center mb-8">
        <div className="w-16 h-16 mx-auto mb-4 relative">
          <svg width="64" height="64" viewBox="0 0 64 64" className="text-amber-500">
            <circle cx="32" cy="32" r="25" fill="none" stroke="currentColor" strokeWidth="2" />
            <rect x="20" y="25" width="24" height="14" rx="2" fill="none" stroke="#92400e" strokeWidth="2" />
            <circle cx="32" cy="32" r="3" fill="#92400e" />
          </svg>
        </div>
        <h2 className="text-2xl font-semibold mb-2">Financial Foundations</h2>
        <p className="text-gray-600">Help us understand your financial situation.</p>
      </div>

      <div className="space-y-8">
        {/* Pension Type */}
        <div className="space-y-4">
          <Label className="text-lg font-medium">Pension type</Label>
          <Select value={formData.pensionType} onValueChange={(value) => updateFormData({ pensionType: value })}>
            <SelectTrigger className="h-12 text-lg">
              <SelectValue placeholder="What type of pension do you have?" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="defined-benefit">Defined Benefit (Final Salary)</SelectItem>
              <SelectItem value="defined-contribution">Defined Contribution (Money Purchase)</SelectItem>
              <SelectItem value="state-only">State Pension Only</SelectItem>
              <SelectItem value="multiple">Multiple Pensions</SelectItem>
              <SelectItem value="none">No Pension Yet</SelectItem>
              <SelectItem value="unsure">I'm not sure</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Monthly Income Slider */}
        <div className="space-y-4">
          <Label className="text-lg font-medium">Expected monthly retirement income</Label>
          <div className="px-4">
            <Slider
              value={[formData.monthlyIncome]}
              onValueChange={(value) => updateFormData({ monthlyIncome: value[0] })}
              max={5000}
              min={500}
              step={100}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-gray-500 mt-2">
              <span>£500</span>
              <span className="font-medium text-amber-600 text-lg">{formatCurrency(formData.monthlyIncome)}</span>
              <span>£5,000+</span>
            </div>
          </div>
          <p className="text-sm text-gray-500">Include pension, benefits, and any other regular income</p>
        </div>

        {/* Household Savings */}
        <div className="space-y-4">
          <Label htmlFor="savings" className="text-lg font-medium">
            Total household savings & investments
          </Label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <span className="text-gray-500">£</span>
            </div>
            <Input
              id="savings"
              type="number"
              placeholder="0"
              className="pl-8 text-lg h-12"
              value={formData.householdSavings}
              onChange={(e) => updateFormData({ householdSavings: Number.parseInt(e.target.value) || 0 })}
            />
          </div>
          <p className="text-sm text-gray-500">Include ISAs, savings accounts, investments, but not your home</p>
        </div>

        {/* Major Debts Toggle */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-lg font-medium">Do you have major debts?</Label>
              <p className="text-sm text-gray-500">Mortgage, loans, credit cards over £5,000</p>
            </div>
            <Switch
              checked={formData.majorDebts}
              onCheckedChange={(checked) => updateFormData({ majorDebts: checked })}
            />
          </div>
        </div>

        {/* Encouraging tooltip */}
        {showTooltip && (
          <div className="text-center py-4">
            <div className="inline-block bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium animate-pulse">
              You're doing better than you think! 💙
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
