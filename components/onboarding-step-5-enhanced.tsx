"use client"

import { Button } from "@/components/ui/button"

interface OnboardingStep5Props {
  formData: {
    age: number
    maritalStatus: string
    employmentStatus: string
    pensionType: string
    monthlyIncome: number
    householdSavings: number
    majorDebts: boolean
    healthCoverage: string
    insuranceTypes: string[]
    lifeGoals: string[]
    additionalGoals: string
  }
  onNext: () => void
}

export function OnboardingStep5({ formData, onNext }: OnboardingStep5Props) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-GB", {
      style: "currency",
      currency: "GBP",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)
  }

  const getMaritalStatusLabel = (status: string) => {
    const labels: { [key: string]: string } = {
      single: "Single",
      married: "Married/Partner",
      divorced: "Divorced",
      widowed: "Widowed",
    }
    return labels[status] || status
  }

  const getEmploymentLabel = (status: string) => {
    const labels: { [key: string]: string } = {
      "working-full": "Working full-time",
      "working-part": "Working part-time",
      "semi-retired": "Semi-retired",
      retired: "Fully retired",
      unemployed: "Currently unemployed",
      "self-employed": "Self-employed",
    }
    return labels[status] || status
  }

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <div className="w-20 h-20 mx-auto mb-4 relative">
          <svg width="80" height="80" viewBox="0 0 80 80" className="text-amber-500">
            <circle cx="40" cy="40" r="35" fill="none" stroke="currentColor" strokeWidth="2" />
            <path d="M25 35 Q30 30 35 35" fill="none" stroke="#92400e" strokeWidth="2" strokeLinecap="round" />
            <path d="M55 35 Q50 30 45 35" fill="none" stroke="#92400e" strokeWidth="2" strokeLinecap="round" />
            <path
              d="M30 50 Q35 55 40 50 Q45 55 50 50"
              fill="none"
              stroke="#92400e"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <circle cx="40" cy="40" r="15" fill="#fbbf24" opacity="0.3" />
            <circle cx="40" cy="37" r="2" fill="#92400e" />
            <circle cx="36" cy="42" r="1.5" fill="#92400e" />
            <circle cx="44" cy="44" r="1.5" fill="#92400e" />
          </svg>
        </div>
        <h2 className="text-2xl font-semibold mb-2">Your Journey Summary</h2>
        <p className="text-gray-600">Here's what you've shared with us</p>
      </div>

      <div className="space-y-6">
        {/* Personal Summary */}
        <div className="bg-amber-50 p-6 rounded-lg border border-amber-100">
          <h3 className="font-semibold text-lg mb-4 text-amber-800">About You</h3>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-600">Age:</span>
              <span className="ml-2 font-medium">{formData.age}</span>
            </div>
            <div>
              <span className="text-gray-600">Status:</span>
              <span className="ml-2 font-medium">{getMaritalStatusLabel(formData.maritalStatus)}</span>
            </div>
            <div className="md:col-span-2">
              <span className="text-gray-600">Employment:</span>
              <span className="ml-2 font-medium">{getEmploymentLabel(formData.employmentStatus)}</span>
            </div>
          </div>
        </div>

        {/* Financial Summary */}
        <div className="bg-green-50 p-6 rounded-lg border border-green-100">
          <h3 className="font-semibold text-lg mb-4 text-green-800">Financial Picture</h3>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-600">Expected monthly income:</span>
              <span className="ml-2 font-medium">{formatCurrency(formData.monthlyIncome)}</span>
            </div>
            <div>
              <span className="text-gray-600">Household savings:</span>
              <span className="ml-2 font-medium">{formatCurrency(formData.householdSavings)}</span>
            </div>
            <div>
              <span className="text-gray-600">Pension type:</span>
              <span className="ml-2 font-medium">{formData.pensionType.replace("-", " ")}</span>
            </div>
            <div>
              <span className="text-gray-600">Major debts:</span>
              <span className="ml-2 font-medium">{formData.majorDebts ? "Yes" : "No"}</span>
            </div>
          </div>
        </div>

        {/* Coverage Summary */}
        <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
          <h3 className="font-semibold text-lg mb-4 text-blue-800">Protection & Coverage</h3>
          <div className="space-y-2 text-sm">
            <div>
              <span className="text-gray-600">Health coverage:</span>
              <span className="ml-2 font-medium">{formData.healthCoverage.replace("-", " ")}</span>
            </div>
            <div>
              <span className="text-gray-600">Insurance types:</span>
              <span className="ml-2 font-medium">
                {formData.insuranceTypes.length > 0
                  ? formData.insuranceTypes.join(", ").replace(/-/g, " ")
                  : "None selected"}
              </span>
            </div>
          </div>
        </div>

        {/* Goals Summary */}
        <div className="bg-purple-50 p-6 rounded-lg border border-purple-100">
          <h3 className="font-semibold text-lg mb-4 text-purple-800">Your Priorities</h3>
          <div className="space-y-2 text-sm">
            <div>
              <span className="text-gray-600">Life goals:</span>
              <div className="mt-2 flex flex-wrap gap-2">
                {formData.lifeGoals.map((goal) => (
                  <span key={goal} className="bg-purple-100 text-purple-700 px-2 py-1 rounded-full text-xs">
                    {goal.replace("-", " ")}
                  </span>
                ))}
              </div>
            </div>
            {formData.additionalGoals && (
              <div className="mt-3">
                <span className="text-gray-600">Additional thoughts:</span>
                <p className="mt-1 text-gray-700 italic">"{formData.additionalGoals}"</p>
              </div>
            )}
          </div>
        </div>

        {/* Call to action */}
        <div className="text-center py-8">
          <h3 className="text-xl font-semibold mb-4">
            Thanks! Based on what you've shared, we'll show you where you stand—and how to strengthen your nest.
          </h3>
          <p className="text-gray-600 mb-6">
            Your personalized NestWell Score is ready, along with tailored recommendations just for you.
          </p>

          <Button
            onClick={onNext}
            size="lg"
            className="bg-amber-500 hover:bg-amber-600 text-white px-8 py-4 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            View My NestWell Score
          </Button>
        </div>
      </div>
    </div>
  )
}
