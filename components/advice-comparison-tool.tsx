"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Info, TrendingDown, TrendingUp, Calculator, Users, Bot, User } from "lucide-react"
import { FloatingFeatherAssistant } from "@/components/floating-feather-assistant"

interface AdviceModel {
  name: string
  description: string
  icon: React.ReactNode
  feeStructure: string
  calculateFee: (amount: number) => number
  serviceLevel: string
  pros: string[]
  cons: string[]
  color: string
}

export function AdviceComparisonTool() {
  const [portfolioAmount, setPortfolioAmount] = useState([250000])
  const [showComparison, setShowComparison] = useState(false)

  const adviceModels: AdviceModel[] = [
    {
      name: "Traditional % Advisor",
      description: "Typical Independent Financial Advisor charging 1% annually",
      icon: <Users className="w-5 h-5" />,
      feeStructure: "1% of assets annually",
      calculateFee: (amount) => amount * 0.01,
      serviceLevel: "Full service, face-to-face meetings, comprehensive planning",
      pros: ["Personal relationship", "Comprehensive service", "Regulatory protection"],
      cons: ["High ongoing costs", "Fees increase with portfolio", "May oversell products"],
      color: "border-red-200 bg-red-50",
    },
    {
      name: "Flat-Fee Adviser",
      description: "Modern advisors charging fixed annual fees regardless of portfolio size",
      icon: <Calculator className="w-5 h-5" />,
      feeStructure: "£500 per year",
      calculateFee: () => 500,
      serviceLevel: "Tailored advice, annual reviews, transparent pricing",
      pros: ["Predictable costs", "No conflict of interest", "Fair for larger portfolios"],
      cons: ["May be expensive for small portfolios", "Less common", "Limited ongoing support"],
      color: "border-green-200 bg-green-50",
    },
    {
      name: "Robo-Advisor",
      description: "Digital investment platforms with algorithm-based advice",
      icon: <Bot className="w-5 h-5" />,
      feeStructure: "0.3% + £36/year",
      calculateFee: (amount) => amount * 0.003 + 36,
      serviceLevel: "Digital-only, automated rebalancing, basic planning tools",
      pros: ["Low cost", "24/7 access", "Automated management"],
      cons: ["No personal touch", "Limited complex planning", "Algorithm-dependent"],
      color: "border-blue-200 bg-blue-50",
    },
    {
      name: "DIY with NestWell",
      description: "Self-directed planning with NestWell's guidance and tools",
      icon: <User className="w-5 h-5" />,
      feeStructure: "£10 per month",
      calculateFee: () => 120,
      serviceLevel: "AI-powered guidance, planning tools, educational resources",
      pros: ["Lowest cost", "Full control", "Educational", "AI assistance"],
      cons: ["Requires self-motivation", "No regulatory advice", "Learning curve"],
      color: "border-amber-200 bg-amber-50",
    },
  ]

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-GB", {
      style: "currency",
      currency: "GBP",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const calculateTenYearImpact = (annualFee: number, portfolioValue: number) => {
    // Assuming 5% annual growth, calculate compound impact of fees
    let value = portfolioValue
    let totalFees = 0

    for (let year = 0; year < 10; year++) {
      const fee =
        adviceModels.find((model) => model.calculateFee(value) === annualFee)?.calculateFee(value) || annualFee
      totalFees += fee
      value = (value - fee) * 1.05 // 5% growth after fees
    }

    return totalFees
  }

  const getBestValue = () => {
    const fees = adviceModels.map((model) => model.calculateFee(portfolioAmount[0]))
    const minFee = Math.min(...fees)
    return adviceModels.findIndex((model) => model.calculateFee(portfolioAmount[0]) === minFee)
  }

  const handleStartComparison = () => {
    setShowComparison(true)
  }

  if (!showComparison) {
    return (
      <div className="max-w-2xl mx-auto">
        <Card className="border-0 shadow-lg">
          <CardHeader className="text-center pb-4 sm:pb-6">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Calculator className="w-6 h-6 sm:w-8 sm:h-8 text-amber-600" />
            </div>
            <CardTitle className="text-xl sm:text-2xl font-serif">Financial Advice Cost Comparison</CardTitle>
            <CardDescription className="text-base sm:text-lg">
              Discover how much you could save with different advice models
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 sm:space-y-6 p-4 sm:p-6">
            <div>
              <label className="block text-xs sm:text-sm font-medium mb-2 sm:mb-3">
                Roughly how much do you have across pensions and investments?
              </label>
              <div className="px-4">
                <Slider
                  value={portfolioAmount}
                  onValueChange={setPortfolioAmount}
                  max={1000000}
                  min={50000}
                  step={25000}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-gray-500 mt-2">
                  <span>£50k</span>
                  <span className="font-semibold text-base sm:text-lg text-gray-800">
                    {formatCurrency(portfolioAmount[0])}
                  </span>
                  <span>£1M+</span>
                </div>
              </div>
            </div>

            <div className="bg-amber-50 p-4 rounded-lg">
              <p className="text-xs sm:text-sm text-amber-800">
                <Info className="w-3 h-3 sm:w-4 sm:h-4 inline mr-2" />
                This comparison will show you the real cost of different advice models over time, helping you make an
                informed decision about your financial future.
              </p>
            </div>

            <Button
              onClick={handleStartComparison}
              className="w-full bg-amber-500 hover:bg-amber-600 text-white py-2 sm:py-3"
              size="lg"
            >
              Compare Advice Costs
              <TrendingDown className="w-4 h-4 ml-2" />
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  const bestValueIndex = getBestValue()
  const traditionalFee = adviceModels[0].calculateFee(portfolioAmount[0])
  const bestFee = adviceModels[bestValueIndex].calculateFee(portfolioAmount[0])
  const potentialSavings = traditionalFee - bestFee

  return (
    <TooltipProvider>
      <div className="space-y-6">
        {/* Header with portfolio amount */}
        <Card className="border-0 shadow-sm bg-gradient-to-r from-amber-50 to-orange-50">
          <CardContent className="p-3 sm:p-4 md:p-6">
            <div className="text-center">
              <h3 className="text-base sm:text-lg font-semibold mb-2">
                Your Portfolio: {formatCurrency(portfolioAmount[0])}
              </h3>
              <p className="text-sm sm:text-base text-gray-600">Annual advice costs comparison</p>
            </div>
          </CardContent>
        </Card>

        {/* Comparison Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {adviceModels.map((model, index) => {
            const annualFee = model.calculateFee(portfolioAmount[0])
            const tenYearImpact = calculateTenYearImpact(annualFee, portfolioAmount[0])
            const feePercentage = (annualFee / portfolioAmount[0]) * 100
            const isBestValue = index === bestValueIndex

            return (
              <Card key={index} className={`relative ${model.color} ${isBestValue ? "ring-2 ring-green-400" : ""}`}>
                {isBestValue && (
                  <Badge className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-green-500 text-white">
                    Best Value
                  </Badge>
                )}
                <CardHeader className="pb-2 sm:pb-3">
                  <div className="flex items-center gap-2">
                    {model.icon}
                    <CardTitle className="text-base sm:text-lg">{model.name}</CardTitle>
                  </div>
                  <CardDescription className="text-xs sm:text-sm">{model.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3 sm:space-y-4 p-3 sm:p-4">
                  <div>
                    <div className="text-xl sm:text-2xl font-bold text-gray-900">{formatCurrency(annualFee)}</div>
                    <div className="text-xs sm:text-sm text-gray-600">{feePercentage.toFixed(2)}% annually</div>
                  </div>

                  <div className="space-y-2">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="flex justify-between items-center cursor-help">
                          <span className="text-xs sm:text-sm">10-year impact:</span>
                          <span className="font-semibold">{formatCurrency(tenYearImpact)}</span>
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Total fees paid over 10 years, assuming 5% annual growth</p>
                      </TooltipContent>
                    </Tooltip>

                    <div className="text-xs text-gray-600">
                      <strong>Service:</strong> {model.serviceLevel}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="text-2xs sm:text-xs">
                      <strong className="text-green-600">Pros:</strong>
                      <ul className="list-disc list-inside mt-1 space-y-1">
                        {model.pros.slice(0, 2).map((pro, i) => (
                          <li key={i}>{pro}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="text-2xs sm:text-xs">
                      <strong className="text-red-600">Cons:</strong>
                      <ul className="list-disc list-inside mt-1 space-y-1">
                        {model.cons.slice(0, 2).map((con, i) => (
                          <li key={i}>{con}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Insights Section */}
        <Card className="border-0 shadow-lg bg-gradient-to-r from-green-50 to-emerald-50">
          <CardContent className="p-4 sm:p-6">
            <div className="text-center space-y-4">
              <div className="flex items-center justify-center gap-2">
                <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
                <h3 className="text-lg sm:text-xl font-semibold">Your Potential Savings</h3>
              </div>

              {potentialSavings > 0 ? (
                <div>
                  <p className="text-base sm:text-lg text-gray-700 mb-2">
                    Over 10 years, you could save{" "}
                    <strong className="text-green-600 text-xl sm:text-2xl">
                      {formatCurrency(potentialSavings * 10)}
                    </strong>{" "}
                    with a lower-cost advice model.
                  </p>
                  <p className="text-xs sm:text-sm text-gray-600">
                    That's money that stays invested and compounds for your future.
                  </p>
                </div>
              ) : (
                <p className="text-base sm:text-lg text-gray-700">
                  You're already using a cost-effective advice model!
                </p>
              )}

              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 justify-center mt-4 sm:mt-6">
                <Button className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white">
                  Explore Lower-Fee Options
                </Button>
                <Button
                  variant="outline"
                  className="w-full sm:w-auto border-green-600 text-green-600 hover:bg-green-50"
                >
                  Plan Your Next Move
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Educational Note */}
        <Card className="border-amber-200 bg-amber-50">
          <CardContent className="p-3 sm:p-4">
            <div className="flex gap-3">
              <Info className="w-4 h-4 sm:w-5 sm:h-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <div className="text-xs sm:text-sm text-amber-800">
                <p className="font-semibold mb-1">Important Note:</p>
                <p>
                  This comparison is for illustration purposes. The right advice model depends on your specific needs,
                  complexity of situation, and personal preferences. Consider speaking with a qualified advisor to
                  understand what's best for your circumstances.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <FloatingFeatherAssistant />
      </div>
    </TooltipProvider>
  )
}
