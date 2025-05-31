"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Building2, Plus, TrendingUp, Calendar } from "lucide-react"

interface PensionAccount {
  id: string
  name: string
  type: string
  provider: string
  currentValue: number
  monthlyContribution: number
  employerContribution: number
  startAge: number
  currentAge: number
}

interface PensionAccountsListProps {
  pensions: PensionAccount[]
  onUpdate: (pensions: PensionAccount[]) => void
  onAdd: () => void
}

export function PensionAccountsList({ pensions, onUpdate, onAdd }: PensionAccountsListProps) {
  const [expandedCard, setExpandedCard] = useState<string | null>(null)

  const getPensionTypeLabel = (type: string) => {
    switch (type) {
      case "workplace":
        return "Workplace Pension"
      case "private":
        return "Private Pension"
      case "state":
        return "State Pension"
      case "sipp":
        return "SIPP"
      default:
        return "Pension"
    }
  }

  const getPensionTypeColor = (type: string) => {
    switch (type) {
      case "workplace":
        return "bg-teal-100 text-teal-800"
      case "private":
        return "bg-blue-100 text-blue-800"
      case "state":
        return "bg-green-100 text-green-800"
      case "sipp":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const calculateYearsContributing = (startAge: number, currentAge: number) => {
    return Math.max(0, currentAge - startAge)
  }

  const calculateProjectedValue = (pension: PensionAccount, targetAge: number) => {
    const yearsToGrow = Math.max(0, targetAge - pension.currentAge)
    const annualContribution = (pension.monthlyContribution + pension.employerContribution) * 12
    const growthRate = 0.05 // 5% annual growth assumption

    // Simple compound growth calculation
    const futureContributions = annualContribution * yearsToGrow * (1 + growthRate / 2)
    const currentValueGrowth = pension.currentValue * Math.pow(1 + growthRate, yearsToGrow)

    return currentValueGrowth + futureContributions
  }

  const totalCurrentValue = pensions.reduce((sum, pension) => sum + pension.currentValue, 0)
  const totalMonthlyContributions = pensions.reduce(
    (sum, pension) => sum + pension.monthlyContribution + pension.employerContribution,
    0,
  )

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-0 shadow-md bg-gradient-to-br from-teal-50 to-teal-100">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Building2 className="w-8 h-8 text-teal-600" />
              <div>
                <div className="text-2xl font-bold text-teal-800">£{totalCurrentValue.toLocaleString()}</div>
                <div className="text-sm text-teal-600">Total Pension Value</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md bg-gradient-to-br from-blue-50 to-blue-100">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <TrendingUp className="w-8 h-8 text-blue-600" />
              <div>
                <div className="text-2xl font-bold text-blue-800">£{totalMonthlyContributions}</div>
                <div className="text-sm text-blue-600">Monthly Contributions</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md bg-gradient-to-br from-purple-50 to-purple-100">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Calendar className="w-8 h-8 text-purple-600" />
              <div>
                <div className="text-2xl font-bold text-purple-800">{pensions.length}</div>
                <div className="text-sm text-purple-600">Pension Accounts</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Pension Accounts */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-800">Your Pension Accounts</h2>
          <Button onClick={onAdd} className="bg-teal-500 hover:bg-teal-600">
            <Plus className="w-4 h-4 mr-2" />
            Add Pension
          </Button>
        </div>

        {pensions.length === 0 ? (
          <Card className="border-0 shadow-md">
            <CardContent className="p-8 text-center">
              <Building2 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-800 mb-2">No pension accounts yet</h3>
              <p className="text-gray-600 mb-4">
                Add your workplace and private pensions to track your retirement savings.
              </p>
              <Button onClick={onAdd} className="bg-teal-500 hover:bg-teal-600">
                Add Your First Pension
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4">
            {pensions.map((pension) => (
              <Card key={pension.id} className="border-0 shadow-md hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Building2 className="w-6 h-6 text-teal-600" />
                      <div>
                        <CardTitle className="text-lg">{pension.name}</CardTitle>
                        <p className="text-sm text-gray-600">{pension.provider}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge className={getPensionTypeColor(pension.type)}>{getPensionTypeLabel(pension.type)}</Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Current Value and Contributions */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <div className="text-sm text-gray-600">Current Value</div>
                      <div className="text-xl font-bold text-gray-800">£{pension.currentValue.toLocaleString()}</div>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <div className="text-sm text-gray-600">Your Contribution</div>
                      <div className="text-xl font-bold text-gray-800">£{pension.monthlyContribution}/month</div>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <div className="text-sm text-gray-600">Employer Contribution</div>
                      <div className="text-xl font-bold text-gray-800">£{pension.employerContribution}/month</div>
                    </div>
                  </div>

                  {/* Years Contributing */}
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">
                      Contributing for {calculateYearsContributing(pension.startAge, pension.currentAge)} years
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setExpandedCard(expandedCard === pension.id ? null : pension.id)}
                    >
                      {expandedCard === pension.id ? "Hide" : "Show"} Projections
                    </Button>
                  </div>

                  {/* Expanded Projections */}
                  {expandedCard === pension.id && (
                    <div className="border-t pt-4 space-y-4">
                      <h4 className="font-medium text-gray-800">Projected Values</h4>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {[60, 65, 70, 75].map((age) => (
                          <div key={age} className="bg-blue-50 p-3 rounded-lg text-center">
                            <div className="text-sm text-blue-600">Age {age}</div>
                            <div className="text-lg font-bold text-blue-800">
                              £{Math.round(calculateProjectedValue(pension, age)).toLocaleString()}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
