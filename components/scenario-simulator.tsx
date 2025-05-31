"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"

interface Coverage {
  id: number
  type: string
  amount: string
  category: string
}

interface ScenarioSimulatorProps {
  currentCoverages: Coverage[]
}

export function ScenarioSimulator({ currentCoverages }: ScenarioSimulatorProps) {
  const [selectedScenario, setSelectedScenario] = useState<string | null>(null)
  const [simulationResults, setSimulationResults] = useState<any>(null)

  const scenarios = [
    {
      id: "care-85",
      title: "Need Care at Age 85",
      description: "Require residential care for 2 years",
      icon: "🏥",
      estimatedCost: "£100,000",
      likelihood: "1 in 4 chance",
    },
    {
      id: "surgery-72",
      title: "Major Surgery at 72",
      description: "Hip replacement with private treatment",
      icon: "🏥",
      estimatedCost: "£15,000",
      likelihood: "1 in 8 chance",
    },
    {
      id: "income-loss-60",
      title: "Income Loss at 60",
      description: "Unable to work for 6 months due to illness",
      icon: "💼",
      estimatedCost: "£18,000",
      likelihood: "1 in 12 chance",
    },
    {
      id: "critical-illness-65",
      title: "Critical Illness at 65",
      description: "Heart attack requiring extended recovery",
      icon: "❤️",
      estimatedCost: "£25,000",
      likelihood: "1 in 6 chance",
    },
  ]

  const runSimulation = (scenarioId: string) => {
    setSelectedScenario(scenarioId)

    // Simulate calculation based on scenario and current coverages
    const scenario = scenarios.find((s) => s.id === scenarioId)
    const totalCost = Number.parseInt(scenario?.estimatedCost.replace(/[£,]/g, "") || "0")

    // Calculate coverage
    let coveredAmount = 0
    const coverageDetails = []

    if (scenarioId === "care-85") {
      // Check for long-term care coverage
      const ltcCoverage = currentCoverages.find((c) => c.type.includes("Care"))
      if (ltcCoverage) {
        const amount = Number.parseInt(ltcCoverage.amount.replace(/[£,]/g, "").replace("Unlimited", "100000"))
        coveredAmount = Math.min(amount, totalCost)
        coverageDetails.push({
          policy: ltcCoverage.type,
          covers: `£${coveredAmount.toLocaleString()}`,
          gap: totalCost - coveredAmount > 0 ? `£${(totalCost - coveredAmount).toLocaleString()}` : "£0",
        })
      }
    } else if (scenarioId === "surgery-72") {
      // Check for health insurance
      const healthCoverage = currentCoverages.find((c) => c.category === "health")
      if (healthCoverage) {
        coveredAmount = totalCost // Assume full coverage for demo
        coverageDetails.push({
          policy: healthCoverage.type,
          covers: `£${coveredAmount.toLocaleString()}`,
          gap: "£0",
        })
      }
    } else if (scenarioId === "income-loss-60") {
      // Check for income protection
      const incomeCoverage = currentCoverages.find((c) => c.category === "income")
      if (incomeCoverage) {
        const monthlyAmount = Number.parseInt(incomeCoverage.amount.replace(/[£,/month]/g, ""))
        coveredAmount = monthlyAmount * 6 // 6 months
        coverageDetails.push({
          policy: incomeCoverage.type,
          covers: `£${coveredAmount.toLocaleString()}`,
          gap: totalCost - coveredAmount > 0 ? `£${(totalCost - coveredAmount).toLocaleString()}` : "£0",
        })
      }
    }

    const results = {
      scenario: scenario,
      totalCost,
      coveredAmount,
      gap: totalCost - coveredAmount,
      coverageDetails,
      recommendations: generateRecommendations(scenarioId, totalCost - coveredAmount),
    }

    setSimulationResults(results)
  }

  const generateRecommendations = (scenarioId: string, gap: number) => {
    const recommendations = []

    if (gap > 0) {
      if (scenarioId === "care-85") {
        recommendations.push({
          type: "insurance",
          title: "Consider Long-term Care Insurance",
          description: `Cover the £${gap.toLocaleString()} gap with dedicated care insurance`,
          action: "Get Quote",
        })
        recommendations.push({
          type: "savings",
          title: "Self-Insurance Plan",
          description: `Save £${Math.round(gap / 20).toLocaleString()} annually for 20 years`,
          action: "Add to Timeline",
        })
      } else if (scenarioId === "surgery-72") {
        recommendations.push({
          type: "insurance",
          title: "Upgrade Health Insurance",
          description: "Consider comprehensive private health coverage",
          action: "Compare Plans",
        })
      }
    } else {
      recommendations.push({
        type: "success",
        title: "You're Well Covered!",
        description: "Your current policies would handle this scenario",
        action: "Review Coverage",
      })
    }

    return recommendations
  }

  return (
    <div className="space-y-6">
      {/* Scenario Selection */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {scenarios.map((scenario) => (
          <Card
            key={scenario.id}
            className={`border-0 shadow-md hover:shadow-lg transition-all cursor-pointer ${
              selectedScenario === scenario.id ? "ring-2 ring-blue-500" : ""
            }`}
            onClick={() => runSimulation(scenario.id)}
          >
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="text-3xl">{scenario.icon}</div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg mb-2">{scenario.title}</h3>
                  <p className="text-gray-600 text-sm mb-3">{scenario.description}</p>

                  <div className="flex justify-between items-center mb-3">
                    <span className="text-sm text-gray-500">Estimated Cost</span>
                    <span className="font-bold text-red-600">{scenario.estimatedCost}</span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">Likelihood</span>
                    <Badge variant="secondary">{scenario.likelihood}</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Simulation Results */}
      {simulationResults && (
        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-blue-500"
              >
                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
              </svg>
              Scenario Analysis: {simulationResults.scenario.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="coverage">Coverage Details</TabsTrigger>
                <TabsTrigger value="actions">Recommended Actions</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center p-6 bg-red-50 rounded-lg">
                    <div className="text-3xl font-bold text-red-600 mb-2">
                      £{simulationResults.totalCost.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-600">Total Cost</div>
                  </div>

                  <div className="text-center p-6 bg-green-50 rounded-lg">
                    <div className="text-3xl font-bold text-green-600 mb-2">
                      £{simulationResults.coveredAmount.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-600">Covered by Insurance</div>
                  </div>

                  <div className="text-center p-6 bg-yellow-50 rounded-lg">
                    <div className="text-3xl font-bold text-yellow-600 mb-2">
                      £{simulationResults.gap.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-600">Your Responsibility</div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="coverage" className="mt-6">
                {simulationResults.coverageDetails.length > 0 ? (
                  <div className="space-y-4">
                    {simulationResults.coverageDetails.map((detail, index) => (
                      <div key={index} className="p-4 bg-gray-50 rounded-lg">
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-medium">{detail.policy}</span>
                          <Badge className="bg-green-100 text-green-800">Active</Badge>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="text-gray-600">Covers: </span>
                            <span className="font-medium text-green-600">{detail.covers}</span>
                          </div>
                          <div>
                            <span className="text-gray-600">Gap: </span>
                            <span className={`font-medium ${detail.gap === "£0" ? "text-green-600" : "text-red-600"}`}>
                              {detail.gap}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="32"
                        height="32"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-red-600"
                      >
                        <circle cx="12" cy="12" r="10" />
                        <line x1="12" y1="8" x2="12" y2="12" />
                        <line x1="12" y1="16" x2="12.01" y2="16" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold mb-2">No Coverage Found</h3>
                    <p className="text-gray-600">You don't have insurance that would cover this scenario</p>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="actions" className="mt-6">
                <div className="space-y-4">
                  {simulationResults.recommendations.map((rec, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <div className="flex items-start gap-4">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            rec.type === "success"
                              ? "bg-green-100"
                              : rec.type === "insurance"
                                ? "bg-blue-100"
                                : "bg-amber-100"
                          }`}
                        >
                          {rec.type === "success" ? (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="20"
                              height="20"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="text-green-600"
                            >
                              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                              <polyline points="22 4 12 14.01 9 11.01" />
                            </svg>
                          ) : rec.type === "insurance" ? (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="20"
                              height="20"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="text-blue-600"
                            >
                              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
                            </svg>
                          ) : (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="20"
                              height="20"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="text-amber-600"
                            >
                              <circle cx="12" cy="12" r="10" />
                              <path d="M16 8h-6.5a2.5 2.5 0 0 0 0 5h3a2.5 2.5 0 0 1 0 5H6" />
                              <path d="M12 18v2" />
                              <path d="M12 6V4" />
                            </svg>
                          )}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold mb-2">{rec.title}</h4>
                          <p className="text-gray-600 text-sm mb-3">{rec.description}</p>
                          <div className="flex gap-2">
                            <Button className="bg-blue-500 hover:bg-blue-600 text-white">{rec.action}</Button>
                            <Link href="/planner">
                              <Button variant="outline">Add to Timeline</Button>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      )}

      {/* Educational Content */}
      <Card className="border-0 shadow-md bg-blue-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-blue-600"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M12 6v6l4 2" />
            </svg>
            Understanding Scenario Planning
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-blue-800">
              Scenario planning helps you understand the financial impact of life events and make informed decisions
              about insurance coverage.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Why Test Scenarios?</h4>
                <ul className="text-sm space-y-1 text-gray-700">
                  <li>• Identify coverage gaps before you need them</li>
                  <li>• Compare insurance vs. self-insurance costs</li>
                  <li>• Plan for major life events proactively</li>
                  <li>• Make informed financial decisions</li>
                </ul>
              </div>

              <div className="bg-white p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Next Steps</h4>
                <ul className="text-sm space-y-1 text-gray-700">
                  <li>• Run multiple scenarios to see patterns</li>
                  <li>• Add planning milestones to your timeline</li>
                  <li>• Review and update coverage annually</li>
                  <li>• Consider both insurance and savings strategies</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
