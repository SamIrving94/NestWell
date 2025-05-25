"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"

interface CareScenario {
  id: string
  title: string
  description: string
  monthlyCost: number
  annualCost: number
  averageDuration: string
  durationMonths: number
  nhsCoverage: string
  localAuthorityCoverage: string
  privateCoverage: string
  meansTestedThreshold: number
  icon: string
  category: "home" | "residential" | "nursing" | "respite"
  intensity: "low" | "medium" | "high"
}

interface CareRiskScenarioToolProps {
  userAge?: number
  userSavings?: number
  userIncome?: number
  onAddToTimeline?: (scenario: string, age: number, duration: number) => void
  onExploreOptions?: (scenarioType: string) => void
  onTalkToAssistant?: (question: string) => void
}

export function CareRiskScenarioTool({
  userAge = 65,
  userSavings = 50000,
  userIncome = 1500,
  onAddToTimeline,
  onExploreOptions,
  onTalkToAssistant,
}: CareRiskScenarioToolProps) {
  const [selectedAge, setSelectedAge] = useState(userAge + 10)
  const [selectedScenario, setSelectedScenario] = useState<CareScenario | null>(null)
  const [showResults, setShowResults] = useState(false)
  const [region, setRegion] = useState<"london" | "rest-of-uk">("rest-of-uk")
  const [personalContribution, setPersonalContribution] = useState(0)
  const [localAuthorityContribution, setLocalAuthorityContribution] = useState(0)
  const [nhsContribution, setNhsContribution] = useState(0)
  const [totalCost, setTotalCost] = useState(0)
  const [totalLifetimeCost, setTotalLifetimeCost] = useState(0)

  // Sample care scenarios
  const careScenarios: CareScenario[] = [
    {
      id: "daily-help",
      title: "Daily Help at Home",
      description: "Need help with daily activities like dressing, bathing, and meal preparation",
      monthlyCost: 1200,
      annualCost: 14400,
      averageDuration: "3-5 years",
      durationMonths: 48,
      nhsCoverage: "None",
      localAuthorityCoverage: "Means-tested",
      privateCoverage: "Full cost if self-funding",
      meansTestedThreshold: 23250,
      icon: "🏠",
      category: "home",
      intensity: "low",
    },
    {
      id: "live-in-carer",
      title: "Live-in Carer",
      description: "Full-time carer living in your home providing 24/7 assistance",
      monthlyCost: 4000,
      annualCost: 48000,
      averageDuration: "2-4 years",
      durationMonths: 36,
      nhsCoverage: "None",
      localAuthorityCoverage: "Partial if eligible",
      privateCoverage: "Full cost if self-funding",
      meansTestedThreshold: 23250,
      icon: "👨‍⚕️",
      category: "home",
      intensity: "high",
    },
    {
      id: "residential-care",
      title: "Residential Care Home",
      description: "Moving to a care home due to mobility decline or inability to live independently",
      monthlyCost: 3500,
      annualCost: 42000,
      averageDuration: "2-3 years",
      durationMonths: 30,
      nhsCoverage: "None",
      localAuthorityCoverage: "Means-tested",
      privateCoverage: "Full cost if self-funding",
      meansTestedThreshold: 23250,
      icon: "🏛️",
      category: "residential",
      intensity: "medium",
    },
    {
      id: "nursing-care",
      title: "Nursing Home Care",
      description: "Specialized nursing care for complex health needs",
      monthlyCost: 5000,
      annualCost: 60000,
      averageDuration: "1-3 years",
      durationMonths: 24,
      nhsCoverage: "Nursing care component only",
      localAuthorityCoverage: "Means-tested",
      privateCoverage: "Full cost if self-funding",
      meansTestedThreshold: 23250,
      icon: "🏥",
      category: "nursing",
      intensity: "high",
    },
    {
      id: "dementia-care",
      title: "Dementia Care",
      description: "Specialized care for Alzheimer's or other cognitive conditions",
      monthlyCost: 5500,
      annualCost: 66000,
      averageDuration: "4-8 years",
      durationMonths: 72,
      nhsCoverage: "Possible CHC funding if eligible",
      localAuthorityCoverage: "Means-tested",
      privateCoverage: "Full cost if self-funding",
      meansTestedThreshold: 23250,
      icon: "🧠",
      category: "nursing",
      intensity: "high",
    },
    {
      id: "respite-care",
      title: "Respite Care",
      description: "Temporary care following hospital discharge or to give family carers a break",
      monthlyCost: 3800,
      annualCost: 45600,
      averageDuration: "2-12 weeks",
      durationMonths: 2,
      nhsCoverage: "First 6 weeks possible",
      localAuthorityCoverage: "Means-tested",
      privateCoverage: "Full cost if self-funding",
      meansTestedThreshold: 23250,
      icon: "🛌",
      category: "respite",
      intensity: "medium",
    },
  ]

  // Pre-configured scenarios
  const preConfiguredScenarios = [
    {
      age: 75,
      scenarioId: "daily-help",
      description: "Need daily help with dressing and mobility",
    },
    {
      age: 82,
      scenarioId: "dementia-care",
      description: "Diagnosed with Alzheimer's",
    },
    {
      age: 70,
      scenarioId: "respite-care",
      description: "Recovering from fall, 3 months in respite care",
    },
  ]

  // Apply regional cost adjustment
  const getAdjustedCost = (baseCost: number) => {
    const multiplier = region === "london" ? 1.25 : 1
    return Math.round(baseCost * multiplier)
  }

  // Calculate contributions based on means testing
  const calculateContributions = (scenario: CareScenario) => {
    const adjustedMonthlyCost = getAdjustedCost(scenario.monthlyCost)
    let personalCost = adjustedMonthlyCost
    let localAuthorityCost = 0
    let nhsCost = 0

    // Simplified means testing logic
    if (userSavings < scenario.meansTestedThreshold) {
      // Local authority may contribute based on income assessment
      const disposableIncome = Math.max(0, userIncome - 500) // Assume £500 personal allowance
      const maxUserContribution = disposableIncome * 0.8 // User contributes up to 80% of disposable income

      if (maxUserContribution < adjustedMonthlyCost) {
        personalCost = maxUserContribution
        localAuthorityCost = adjustedMonthlyCost - personalCost
      }
    }

    // NHS Continuing Healthcare (CHC) for high nursing needs
    if (scenario.category === "nursing" && scenario.intensity === "high") {
      // Simplified: 20% chance of qualifying for CHC
      const chcEligible = Math.random() < 0.2
      if (chcEligible) {
        nhsCost = personalCost * 0.7 // NHS covers 70% in this simplified model
        personalCost = personalCost * 0.3
      } else if (scenario.category === "nursing") {
        // Funded Nursing Care contribution
        nhsCost = 200 // Approx £200/week for nursing component
        personalCost = Math.max(0, personalCost - nhsCost)
      }
    }

    // NHS covers first 6 weeks of respite care after hospital
    if (scenario.category === "respite") {
      const sixWeeksCost = (adjustedMonthlyCost / 4) * 6 // 6 weeks cost
      if (scenario.durationMonths <= 1.5) {
        // If total duration is 6 weeks or less
        nhsCost = adjustedMonthlyCost
        personalCost = 0
      } else {
        // NHS covers first 6 weeks
        const remainingCost = adjustedMonthlyCost - sixWeeksCost
        nhsCost = sixWeeksCost
        personalCost = remainingCost
      }
    }

    setPersonalContribution(Math.round(personalCost))
    setLocalAuthorityContribution(Math.round(localAuthorityCost))
    setNhsContribution(Math.round(nhsCost))
    setTotalCost(adjustedMonthlyCost)
    setTotalLifetimeCost(Math.round(adjustedMonthlyCost * scenario.durationMonths))
  }

  // Handle scenario selection
  const handleScenarioSelect = (scenarioId: string) => {
    const scenario = careScenarios.find((s) => s.id === scenarioId)
    if (scenario) {
      setSelectedScenario(scenario)
      calculateContributions(scenario)
      setShowResults(true)
    }
  }

  // Handle pre-configured scenario selection
  const handlePreConfiguredSelect = (index: number) => {
    const preConfig = preConfiguredScenarios[index]
    setSelectedAge(preConfig.age)
    handleScenarioSelect(preConfig.scenarioId)
  }

  // Update calculations when region changes
  useEffect(() => {
    if (selectedScenario) {
      calculateContributions(selectedScenario)
    }
  }, [region])

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-GB", {
      style: "currency",
      currency: "GBP",
      maximumFractionDigits: 0,
    }).format(amount)
  }

  // Get category color
  const getCategoryColor = (category: string) => {
    switch (category) {
      case "home":
        return "bg-blue-100 text-blue-800"
      case "residential":
        return "bg-amber-100 text-amber-800"
      case "nursing":
        return "bg-red-100 text-red-800"
      case "respite":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  // Get intensity label
  const getIntensityLabel = (intensity: string) => {
    switch (intensity) {
      case "low":
        return "Low Intensity"
      case "medium":
        return "Medium Intensity"
      case "high":
        return "High Intensity"
      default:
        return "Unknown Intensity"
    }
  }

  return (
    <div className="space-y-6">
      {/* Scenario Builder */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-amber-600"
            >
              <path d="M2 12h20M2 12a10 10 0 0 1 20 0M2 12a10 10 0 0 0 20 0M14 12a2 2 0 1 0-4 0 2 2 0 0 0 4 0z" />
            </svg>
            Care Risk Scenario Builder
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <label className="text-sm font-medium mb-2 block">At what age might you need care?</label>
                <Select value={selectedAge.toString()} onValueChange={(value) => setSelectedAge(Number(value))}>
                  <SelectTrigger className="h-12 text-lg">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 41 }, (_, i) => i + 60).map((age) => (
                      <SelectItem key={age} value={age.toString()}>
                        Age {age}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-4">
                <label className="text-sm font-medium mb-2 block">What type of care might you need?</label>
                <Select onValueChange={handleScenarioSelect}>
                  <SelectTrigger className="h-12 text-lg">
                    <SelectValue placeholder="Select a care scenario" />
                  </SelectTrigger>
                  <SelectContent>
                    {careScenarios.map((scenario) => (
                      <SelectItem key={scenario.id} value={scenario.id}>
                        <div className="flex items-center gap-2">
                          <span>{scenario.icon}</span>
                          <span>{scenario.title}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="pt-4 border-t">
              <p className="text-sm text-gray-600 mb-3">Or explore a common scenario:</p>
              <div className="grid md:grid-cols-3 gap-3">
                {preConfiguredScenarios.map((scenario, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    onClick={() => handlePreConfiguredSelect(index)}
                    className="h-auto py-3 px-4 flex flex-col items-start text-left"
                  >
                    <span className="font-medium">Age {scenario.age}</span>
                    <span className="text-sm text-gray-600">{scenario.description}</span>
                  </Button>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t">
              <p className="text-sm text-gray-600 mb-3">Region (affects cost estimates):</p>
              <div className="flex gap-3">
                <Button
                  variant={region === "london" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setRegion("london")}
                  className={region === "london" ? "bg-amber-500 hover:bg-amber-600" : ""}
                >
                  London & South East
                </Button>
                <Button
                  variant={region === "rest-of-uk" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setRegion("rest-of-uk")}
                  className={region === "rest-of-uk" ? "bg-amber-500 hover:bg-amber-600" : ""}
                >
                  Rest of UK
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      {showResults && selectedScenario && (
        <Card className="border-0 shadow-lg animate-fade-in">
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-xl flex items-center gap-2">
                  <span>{selectedScenario.icon}</span>
                  <span>{selectedScenario.title}</span>
                </CardTitle>
                <p className="text-gray-600 mt-1">{selectedScenario.description}</p>
                <div className="flex gap-2 mt-2">
                  <Badge variant="outline" className={getCategoryColor(selectedScenario.category)}>
                    {selectedScenario.category} care
                  </Badge>
                  <Badge variant="outline" className="bg-gray-100 text-gray-800">
                    {getIntensityLabel(selectedScenario.intensity)}
                  </Badge>
                </div>
              </div>
              <Button variant="ghost" size="sm" onClick={() => setShowResults(false)} className="text-gray-500">
                ✕
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="costs" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="costs">Cost Breakdown</TabsTrigger>
                <TabsTrigger value="planning">Planning Insights</TabsTrigger>
              </TabsList>

              <TabsContent value="costs" className="mt-6">
                <div className="space-y-6">
                  {/* Summary Stats */}
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
                      <div className="text-sm text-gray-600">Monthly Cost</div>
                      <div className="text-2xl font-bold text-amber-700">{formatCurrency(totalCost)}</div>
                      <div className="text-xs text-gray-500">per month</div>
                    </div>

                    <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                      <div className="text-sm text-gray-600">Typical Duration</div>
                      <div className="text-2xl font-bold text-blue-700">{selectedScenario.averageDuration}</div>
                      <div className="text-xs text-gray-500">average time needed</div>
                    </div>

                    <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                      <div className="text-sm text-gray-600">Potential Lifetime Cost</div>
                      <div className="text-2xl font-bold text-red-700">{formatCurrency(totalLifetimeCost)}</div>
                      <div className="text-xs text-gray-500">total over {selectedScenario.durationMonths} months</div>
                    </div>
                  </div>

                  {/* Cost Breakdown */}
                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg">Monthly Cost Breakdown</h3>

                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between mb-1 text-sm">
                          <span>Your contribution</span>
                          <span className="font-medium">{formatCurrency(personalContribution)}</span>
                        </div>
                        <Progress
                          value={(personalContribution / totalCost) * 100}
                          className="h-3 bg-gray-100"
                          indicatorClassName="bg-red-500"
                        />
                      </div>

                      <div>
                        <div className="flex justify-between mb-1 text-sm">
                          <span>Local Authority</span>
                          <span className="font-medium">{formatCurrency(localAuthorityContribution)}</span>
                        </div>
                        <Progress
                          value={(localAuthorityContribution / totalCost) * 100}
                          className="h-3 bg-gray-100"
                          indicatorClassName="bg-blue-500"
                        />
                      </div>

                      <div>
                        <div className="flex justify-between mb-1 text-sm">
                          <span>NHS Contribution</span>
                          <span className="font-medium">{formatCurrency(nhsContribution)}</span>
                        </div>
                        <Progress
                          value={(nhsContribution / totalCost) * 100}
                          className="h-3 bg-gray-100"
                          indicatorClassName="bg-green-500"
                        />
                      </div>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                      <div className="flex justify-between text-sm font-medium">
                        <span>Total Monthly Cost</span>
                        <span>{formatCurrency(totalCost)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Financial Impact Alert */}
                  <Alert className="border-amber-200 bg-amber-50">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-amber-600"
                    >
                      <path d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                    </svg>
                    <AlertDescription className="text-amber-800">
                      <strong>Financial Impact:</strong> Based on your current savings of{" "}
                      <span className="font-semibold">{formatCurrency(userSavings)}</span> and income of{" "}
                      <span className="font-semibold">{formatCurrency(userIncome)}/month</span>, you would need to fund{" "}
                      <span className="font-semibold">{formatCurrency(personalContribution)}/month</span> for this care
                      scenario.
                    </AlertDescription>
                  </Alert>
                </div>
              </TabsContent>

              <TabsContent value="planning" className="mt-6">
                <div className="space-y-6">
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                    <h3 className="font-semibold text-blue-800 mb-2">Coverage Understanding</h3>
                    <div className="space-y-3 text-sm">
                      <div className="flex items-start gap-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="text-blue-600 mt-1"
                        >
                          <path d="M9 12l2 2 4-4" />
                          <path d="M21 12c.552 0 1-.448 1-1V5c0-.552-.448-1-1-1H3c-.552 0-1 .448-1 1v6c0 .552.448 1 1 1h9l4-4-4-4H3" />
                        </svg>
                        <div>
                          <span className="font-medium">NHS Coverage:</span> {selectedScenario.nhsCoverage}
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="text-blue-600 mt-1"
                        >
                          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                          <polyline points="9 22 9 12 15 12 15 22" />
                        </svg>
                        <div>
                          <span className="font-medium">Local Authority:</span>{" "}
                          {selectedScenario.localAuthorityCoverage}
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="text-blue-600 mt-1"
                        >
                          <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                          <line x1="8" y1="21" x2="16" y2="21" />
                          <line x1="12" y1="17" x2="12" y2="21" />
                        </svg>
                        <div>
                          <span className="font-medium">Private/Self-funding:</span> {selectedScenario.privateCoverage}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                    <h3 className="font-semibold text-green-800 mb-2">Planning Recommendations</h3>
                    <ul className="space-y-2 text-sm text-green-700">
                      <li className="flex items-start gap-2">
                        <span className="text-green-500 mt-1">•</span>
                        Consider setting aside{" "}
                        <strong>
                          {formatCurrency(Math.round(personalContribution * 0.25))} per month from now until age{" "}
                          {selectedAge}
                        </strong>{" "}
                        to build a care fund
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-500 mt-1">•</span>
                        Explore care insurance options that could cover these costs
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-500 mt-1">•</span>
                        Review your home equity as a potential funding source if needed
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-500 mt-1">•</span>
                        Discuss care preferences with family members now, before a crisis
                      </li>
                    </ul>
                  </div>

                  <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                    <h3 className="font-semibold text-purple-800 mb-2">Did You Know?</h3>
                    <ul className="space-y-2 text-sm text-purple-700">
                      <li className="flex items-start gap-2">
                        <span className="text-purple-500 mt-1">•</span>
                        Over 50% of people aged 65+ will need some form of long-term care in their lifetime
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-purple-500 mt-1">•</span>
                        The average stay in a care home is 2.5 years, but can be much longer
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-purple-500 mt-1">•</span>
                        Only about 15% of care costs are fully funded by the NHS through Continuing Healthcare
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-purple-500 mt-1">•</span>
                        Local authority funding is only available if your assets are below £23,250 (in England)
                      </li>
                    </ul>
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 mt-6 pt-6 border-t">
              <Button
                onClick={() => onAddToTimeline?.(selectedScenario.title, selectedAge, selectedScenario.durationMonths)}
                className="bg-amber-500 hover:bg-amber-600 text-white flex-1"
              >
                Add to My Timeline (Age {selectedAge})
              </Button>
              <Button
                onClick={() => onExploreOptions?.(selectedScenario.category)}
                variant="outline"
                className="border-blue-300 text-blue-700 hover:bg-blue-50 flex-1"
              >
                Explore Coverage Options
              </Button>
              <Button
                onClick={() =>
                  onTalkToAssistant?.(
                    `How can I prepare financially for ${selectedScenario.title.toLowerCase()} at age ${selectedAge}?`,
                  )
                }
                variant="outline"
                className="border-green-300 text-green-700 hover:bg-green-50 flex-1"
              >
                Ask Assistant
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
