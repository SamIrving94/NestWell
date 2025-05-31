"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { Calculator, TrendingUp, AlertTriangle, CheckCircle } from "lucide-react"

interface IncomeProjectorProps {
  projections: {
    age60: { totalPot: number; monthlyIncome: number }
    age65: { totalPot: number; monthlyIncome: number }
    age70: { totalPot: number; monthlyIncome: number }
    age75: { totalPot: number; monthlyIncome: number }
  }
  benchmarks: {
    basic: { monthly: number; annual: number }
    moderate: { monthly: number; annual: number }
    comfortable: { monthly: number; annual: number }
  }
}

export function IncomeProjector({ projections, benchmarks }: IncomeProjectorProps) {
  const [selectedAge, setSelectedAge] = useState(65)

  const chartData = [
    {
      age: "60",
      projected: projections.age60.monthlyIncome,
      basic: benchmarks.basic.monthly,
      moderate: benchmarks.moderate.monthly,
      comfortable: benchmarks.comfortable.monthly,
    },
    {
      age: "65",
      projected: projections.age65.monthlyIncome,
      basic: benchmarks.basic.monthly,
      moderate: benchmarks.moderate.monthly,
      comfortable: benchmarks.comfortable.monthly,
    },
    {
      age: "70",
      projected: projections.age70.monthlyIncome,
      basic: benchmarks.basic.monthly,
      moderate: benchmarks.moderate.monthly,
      comfortable: benchmarks.comfortable.monthly,
    },
    {
      age: "75",
      projected: projections.age75.monthlyIncome,
      basic: benchmarks.basic.monthly,
      moderate: benchmarks.moderate.monthly,
      comfortable: benchmarks.comfortable.monthly,
    },
  ]

  const getProjectionForAge = (age: number) => {
    switch (age) {
      case 60:
        return projections.age60
      case 65:
        return projections.age65
      case 70:
        return projections.age70
      case 75:
        return projections.age75
      default:
        return projections.age65
    }
  }

  const getLifestyleLevel = (monthlyIncome: number) => {
    if (monthlyIncome >= benchmarks.comfortable.monthly) return "comfortable"
    if (monthlyIncome >= benchmarks.moderate.monthly) return "moderate"
    if (monthlyIncome >= benchmarks.basic.monthly) return "basic"
    return "below-basic"
  }

  const getLifestyleLevelColor = (level: string) => {
    switch (level) {
      case "comfortable":
        return "text-green-600 bg-green-50 border-green-200"
      case "moderate":
        return "text-blue-600 bg-blue-50 border-blue-200"
      case "basic":
        return "text-amber-600 bg-amber-50 border-amber-200"
      case "below-basic":
        return "text-red-600 bg-red-50 border-red-200"
      default:
        return "text-gray-600 bg-gray-50 border-gray-200"
    }
  }

  const getLifestyleLevelIcon = (level: string) => {
    switch (level) {
      case "comfortable":
        return <CheckCircle className="w-5 h-5 text-green-600" />
      case "moderate":
        return <TrendingUp className="w-5 h-5 text-blue-600" />
      case "basic":
        return <Calculator className="w-5 h-5 text-amber-600" />
      case "below-basic":
        return <AlertTriangle className="w-5 h-5 text-red-600" />
      default:
        return <Calculator className="w-5 h-5 text-gray-600" />
    }
  }

  const getLifestyleLevelLabel = (level: string) => {
    switch (level) {
      case "comfortable":
        return "Comfortable Lifestyle"
      case "moderate":
        return "Moderate Lifestyle"
      case "basic":
        return "Basic Lifestyle"
      case "below-basic":
        return "Below Basic Needs"
      default:
        return "Unknown"
    }
  }

  const selectedProjection = getProjectionForAge(selectedAge)
  const lifestyleLevel = getLifestyleLevel(selectedProjection.monthlyIncome)

  return (
    <Card className="border-0 shadow-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calculator className="w-6 h-6 text-blue-600" />
          Retirement Income Projector
        </CardTitle>
        <p className="text-sm text-gray-600">
          See how your projected retirement income compares to lifestyle benchmarks
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Age Selector */}
        <div className="flex flex-wrap gap-2">
          <span className="text-sm font-medium text-gray-700 self-center mr-2">Project income at age:</span>
          {[60, 65, 70, 75].map((age) => (
            <Button
              key={age}
              variant={selectedAge === age ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedAge(age)}
              className={selectedAge === age ? "bg-blue-500 hover:bg-blue-600" : ""}
            >
              {age}
            </Button>
          ))}
        </div>

        {/* Selected Age Projection */}
        <div className={`p-4 rounded-lg border ${getLifestyleLevelColor(lifestyleLevel)}`}>
          <div className="flex items-center gap-3 mb-3">
            {getLifestyleLevelIcon(lifestyleLevel)}
            <div>
              <h3 className="font-semibold">{getLifestyleLevelLabel(lifestyleLevel)}</h3>
              <p className="text-sm opacity-80">At age {selectedAge}</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <div className="text-sm opacity-80">Projected Monthly Income</div>
              <div className="text-2xl font-bold">£{selectedProjection.monthlyIncome.toLocaleString()}</div>
            </div>
            <div>
              <div className="text-sm opacity-80">Total Pension Pot</div>
              <div className="text-2xl font-bold">£{selectedProjection.totalPot.toLocaleString()}</div>
            </div>
          </div>
        </div>

        {/* Chart */}
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="age" />
              <YAxis />
              <Tooltip
                formatter={(value, name) => [
                  `£${value}`,
                  name === "projected"
                    ? "Your Projection"
                    : name === "basic"
                      ? "Basic Lifestyle"
                      : name === "moderate"
                        ? "Moderate Lifestyle"
                        : "Comfortable Lifestyle",
                ]}
              />
              <Bar dataKey="projected" fill="#3b82f6" name="projected" />
              <Bar dataKey="basic" fill="#f59e0b" name="basic" opacity={0.7} />
              <Bar dataKey="moderate" fill="#10b981" name="moderate" opacity={0.7} />
              <Bar dataKey="comfortable" fill="#8b5cf6" name="comfortable" opacity={0.7} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Benchmark Comparison */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
            <div className="text-sm text-amber-600 font-medium">Basic Lifestyle</div>
            <div className="text-lg font-bold text-amber-800">£{benchmarks.basic.monthly}/month</div>
            <div className="text-xs text-amber-600">Essential needs covered</div>
          </div>
          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <div className="text-sm text-green-600 font-medium">Moderate Lifestyle</div>
            <div className="text-lg font-bold text-green-800">£{benchmarks.moderate.monthly}/month</div>
            <div className="text-xs text-green-600">Some luxuries included</div>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
            <div className="text-sm text-purple-600 font-medium">Comfortable Lifestyle</div>
            <div className="text-lg font-bold text-purple-800">£{benchmarks.comfortable.monthly}/month</div>
            <div className="text-xs text-purple-600">Regular luxuries & travel</div>
          </div>
        </div>

        {/* Recommendations */}
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <h4 className="font-medium text-blue-800 mb-2">Recommendations</h4>
          <div className="space-y-2 text-sm text-blue-700">
            {lifestyleLevel === "below-basic" && (
              <p>• Consider increasing pension contributions or extending working years</p>
            )}
            {lifestyleLevel === "basic" && (
              <p>• You're meeting basic needs. Consider additional savings for a more comfortable retirement</p>
            )}
            {lifestyleLevel === "moderate" && <p>• You're on track for a moderate lifestyle. Great progress!</p>}
            {lifestyleLevel === "comfortable" && <p>• Excellent! You're projected for a comfortable retirement</p>}
            <p>• Review your projections annually and adjust contributions as needed</p>
            <p>• Consider the impact of inflation on your future purchasing power</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
