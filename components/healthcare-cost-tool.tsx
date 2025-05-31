"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface Procedure {
  id: string
  name: string
  category: string
  nhsWaitTime: string
  nhsCost: string
  privateCost: string
  privateWithInsuranceCost: string
  excess: string
  recoveryTime: string
  description: string
  urgency: "routine" | "urgent" | "emergency"
  ageRelevance: number[]
}

interface HealthcareCostToolProps {
  userAge?: number
  onAddToTimeline?: (procedure: string, age: number) => void
  onExploreInsurance?: () => void
}

export function HealthcareCostTool({ userAge = 65, onAddToTimeline, onExploreInsurance }: HealthcareCostToolProps) {
  const [selectedProcedure, setSelectedProcedure] = useState<Procedure | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedAge, setSelectedAge] = useState(userAge)
  const [showComparison, setShowComparison] = useState(false)
  const [filteredProcedures, setFilteredProcedures] = useState<Procedure[]>([])

  const procedures: Procedure[] = [
    {
      id: "cataract-surgery",
      name: "Cataract Surgery",
      category: "Eye Care",
      nhsWaitTime: "18-24 weeks",
      nhsCost: "Free",
      privateCost: "£2,500-£4,000",
      privateWithInsuranceCost: "£200-£500",
      excess: "£200-£500",
      recoveryTime: "2-6 weeks",
      description: "Surgical removal of clouded lens in the eye",
      urgency: "routine",
      ageRelevance: [60, 65, 70, 75, 80, 85],
    },
    {
      id: "hip-replacement",
      name: "Hip Replacement",
      category: "Orthopedic",
      nhsWaitTime: "12-18 months",
      nhsCost: "Free",
      privateCost: "£12,000-£18,000",
      privateWithInsuranceCost: "£1,000-£2,000",
      excess: "£1,000-£2,000",
      recoveryTime: "3-6 months",
      description: "Total or partial replacement of hip joint",
      urgency: "routine",
      ageRelevance: [65, 70, 75, 80],
    },
    {
      id: "knee-replacement",
      name: "Knee Replacement",
      category: "Orthopedic",
      nhsWaitTime: "12-15 months",
      nhsCost: "Free",
      privateCost: "£10,000-£15,000",
      privateWithInsuranceCost: "£1,000-£1,500",
      excess: "£1,000-£1,500",
      recoveryTime: "3-4 months",
      description: "Replacement of damaged knee joint",
      urgency: "routine",
      ageRelevance: [60, 65, 70, 75],
    },
    {
      id: "hernia-repair",
      name: "Hernia Repair",
      category: "General Surgery",
      nhsWaitTime: "8-12 weeks",
      nhsCost: "Free",
      privateCost: "£3,000-£5,000",
      privateWithInsuranceCost: "£300-£600",
      excess: "£300-£600",
      recoveryTime: "2-4 weeks",
      description: "Surgical repair of abdominal hernia",
      urgency: "routine",
      ageRelevance: [50, 55, 60, 65, 70],
    },
    {
      id: "private-mri",
      name: "Private MRI Scan",
      category: "Diagnostics",
      nhsWaitTime: "6-12 weeks",
      nhsCost: "Free",
      privateCost: "£400-£800",
      privateWithInsuranceCost: "£0-£200",
      excess: "£0-£200",
      recoveryTime: "Immediate",
      description: "Magnetic resonance imaging for diagnosis",
      urgency: "urgent",
      ageRelevance: [50, 55, 60, 65, 70, 75, 80],
    },
    {
      id: "cardiac-bypass",
      name: "Cardiac Bypass Surgery",
      category: "Cardiac",
      nhsWaitTime: "2-6 weeks",
      nhsCost: "Free",
      privateCost: "£25,000-£40,000",
      privateWithInsuranceCost: "£2,000-£5,000",
      excess: "£2,000-£5,000",
      recoveryTime: "6-12 weeks",
      description: "Heart surgery to improve blood flow",
      urgency: "urgent",
      ageRelevance: [60, 65, 70, 75],
    },
    {
      id: "live-in-care",
      name: "Live-in Care (per week)",
      category: "Care Services",
      nhsWaitTime: "Assessment required",
      nhsCost: "Means tested",
      privateCost: "£800-£1,500",
      privateWithInsuranceCost: "£400-£800",
      excess: "Varies",
      recoveryTime: "Ongoing",
      description: "Professional care in your own home",
      urgency: "routine",
      ageRelevance: [75, 80, 85, 90],
    },
    {
      id: "respite-care",
      name: "Respite Care (per week)",
      category: "Care Services",
      nhsWaitTime: "4-8 weeks",
      nhsCost: "£400-£800",
      privateCost: "£800-£1,200",
      privateWithInsuranceCost: "£300-£600",
      excess: "£200-£400",
      recoveryTime: "Temporary",
      description: "Short-term care to give family carers a break",
      urgency: "routine",
      ageRelevance: [70, 75, 80, 85],
    },
  ]

  // Filter procedures based on search term
  useEffect(() => {
    if (searchTerm) {
      const filtered = procedures.filter(
        (procedure) =>
          procedure.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          procedure.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
          procedure.description.toLowerCase().includes(searchTerm.toLowerCase()),
      )
      setFilteredProcedures(filtered)
    } else {
      setFilteredProcedures([])
    }
  }, [searchTerm])

  const handleProcedureSelect = (procedure: Procedure) => {
    setSelectedProcedure(procedure)
    setShowComparison(true)
    setSearchTerm("")
    setFilteredProcedures([])
  }

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "emergency":
        return "bg-red-100 text-red-800"
      case "urgent":
        return "bg-amber-100 text-amber-800"
      default:
        return "bg-blue-100 text-blue-800"
    }
  }

  const getWaitTimeWarning = (waitTime: string) => {
    if (waitTime.includes("month") || waitTime.includes("12") || waitTime.includes("18")) {
      return "⚠️ Long wait time"
    }
    return null
  }

  const formatCost = (cost: string) => {
    if (cost === "Free" || cost === "Means tested") return cost
    return cost
  }

  const getAgeRelevanceMessage = (procedure: Procedure, age: number) => {
    if (procedure.ageRelevance.includes(age)) {
      return "Common at your age"
    } else if (Math.min(...procedure.ageRelevance) > age) {
      return `More common after age ${Math.min(...procedure.ageRelevance)}`
    } else if (Math.max(...procedure.ageRelevance) < age) {
      return "Less common at your age"
    }
    return ""
  }

  return (
    <div className="space-y-6">
      {/* Search and Selection */}
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
              className="text-blue-600"
            >
              <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
            NHS vs Self-Insured vs Private Insurance
          </CardTitle>
          <p className="text-gray-600">
            Compare your three main options for healthcare costs: free NHS care (with wait times), paying yourself
            (immediate access), or private insurance (immediate access with lower personal costs).
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="text-sm font-medium mb-2 block">What if you needed this procedure?</label>
                <div className="relative">
                  <Input
                    placeholder="Search procedures (e.g., hip replacement, cataract surgery)"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pr-10"
                  />
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
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  >
                    <circle cx="11" cy="11" r="8" />
                    <path d="m21 21-4.35-4.35" />
                  </svg>
                </div>

                {/* Search Results Dropdown */}
                {filteredProcedures.length > 0 && (
                  <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-auto">
                    {filteredProcedures.map((procedure) => (
                      <button
                        key={procedure.id}
                        onClick={() => handleProcedureSelect(procedure)}
                        className="w-full px-4 py-3 text-left hover:bg-gray-50 border-b border-gray-100 last:border-b-0"
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="font-medium">{procedure.name}</div>
                            <div className="text-sm text-gray-500">{procedure.category}</div>
                          </div>
                          <Badge variant="outline" className={getUrgencyColor(procedure.urgency)}>
                            {procedure.urgency}
                          </Badge>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="w-32">
                <label className="text-sm font-medium mb-2 block">At age</label>
                <Select value={selectedAge.toString()} onValueChange={(value) => setSelectedAge(Number(value))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 41 }, (_, i) => i + 50).map((age) => (
                      <SelectItem key={age} value={age.toString()}>
                        {age}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Quick Selection Buttons */}
            <div className="space-y-2">
              <p className="text-sm text-gray-600">Or choose a common procedure:</p>
              <div className="flex flex-wrap gap-2">
                {procedures.slice(0, 6).map((procedure) => (
                  <Button
                    key={procedure.id}
                    variant="outline"
                    size="sm"
                    onClick={() => handleProcedureSelect(procedure)}
                    className="text-sm"
                  >
                    {procedure.name}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Comparison Results */}
      {showComparison && selectedProcedure && (
        <Card className="border-0 shadow-lg animate-fade-in">
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-xl">{selectedProcedure.name}</CardTitle>
                <p className="text-gray-600 mt-1">{selectedProcedure.description}</p>
                <div className="flex gap-2 mt-2">
                  <Badge variant="outline" className={getUrgencyColor(selectedProcedure.urgency)}>
                    {selectedProcedure.urgency}
                  </Badge>
                  {getAgeRelevanceMessage(selectedProcedure, selectedAge) && (
                    <Badge variant="outline" className="bg-green-100 text-green-800">
                      {getAgeRelevanceMessage(selectedProcedure, selectedAge)}
                    </Badge>
                  )}
                </div>
              </div>
              <Button variant="ghost" size="sm" onClick={() => setShowComparison(false)} className="text-gray-500">
                ✕
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="comparison" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="comparison">Cost Comparison</TabsTrigger>
                <TabsTrigger value="insights">Planning Insights</TabsTrigger>
              </TabsList>

              <TabsContent value="comparison" className="mt-6">
                <div className="grid md:grid-cols-3 gap-4">
                  {/* NHS Column */}
                  <Card className="border-2 border-blue-200 bg-blue-50">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg flex items-center gap-2 text-blue-800">
                        NHS (Free Healthcare)
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div>
                        <div className="text-sm text-gray-600">Wait Time</div>
                        <div className="font-semibold flex items-center gap-2">
                          {selectedProcedure.nhsWaitTime}
                          {getWaitTimeWarning(selectedProcedure.nhsWaitTime) && (
                            <span className="text-xs text-amber-600">
                              {getWaitTimeWarning(selectedProcedure.nhsWaitTime)}
                            </span>
                          )}
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-600">Cost to You</div>
                        <div className="font-semibold text-lg text-green-600">
                          {formatCost(selectedProcedure.nhsCost)}
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-600">Recovery Time</div>
                        <div className="font-medium">{selectedProcedure.recoveryTime}</div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Private (No Insurance) Column */}
                  <Card className="border-2 border-gray-200 bg-gray-50">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg flex items-center gap-2 text-gray-800">
                        Self-Insured (Pay Yourself)
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div>
                        <div className="text-sm text-gray-600">Wait Time</div>
                        <div className="font-semibold text-green-600">1-2 weeks</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-600">Total Cost</div>
                        <div className="font-semibold text-lg text-red-600">
                          {formatCost(selectedProcedure.privateCost)}
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-600">Recovery Time</div>
                        <div className="font-medium">{selectedProcedure.recoveryTime}</div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Private (With Insurance) Column */}
                  <Card className="border-2 border-green-200 bg-green-50">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg flex items-center gap-2 text-green-800">
                        Private Insurance (Covered)
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div>
                        <div className="text-sm text-gray-600">Wait Time</div>
                        <div className="font-semibold text-green-600">1-2 weeks</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-600">Your Cost (Excess)</div>
                        <div className="font-semibold text-lg text-amber-600">
                          {formatCost(selectedProcedure.excess)}
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-600">Recovery Time</div>
                        <div className="font-medium">{selectedProcedure.recoveryTime}</div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Cost Savings Alert */}
                {selectedProcedure.privateCost !== "Free" && (
                  <Alert className="mt-6 border-amber-200 bg-amber-50">
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
                      <strong>Financial Impact:</strong> Private treatment could cost you up to{" "}
                      <span className="font-semibold">{selectedProcedure.privateCost}</span> without insurance. With
                      insurance, you'd typically pay just the excess of{" "}
                      <span className="font-semibold">{selectedProcedure.excess}</span>.
                    </AlertDescription>
                  </Alert>
                )}
              </TabsContent>

              <TabsContent value="insights" className="mt-6">
                <div className="space-y-4">
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                    <h3 className="font-semibold text-blue-800 mb-2">Planning Considerations</h3>
                    <ul className="space-y-2 text-sm text-blue-700">
                      <li className="flex items-start gap-2">
                        <span className="text-blue-500 mt-1">•</span>
                        NHS wait times can vary significantly by region and current demand
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-500 mt-1">•</span>
                        Private insurance premiums typically increase with age
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-500 mt-1">•</span>
                        Some procedures may not be covered by basic insurance plans
                      </li>
                    </ul>
                  </div>

                  <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                    <h3 className="font-semibold text-green-800 mb-2">Financial Planning Tips</h3>
                    <ul className="space-y-2 text-sm text-green-700">
                      <li className="flex items-start gap-2">
                        <span className="text-green-500 mt-1">•</span>
                        Consider setting aside funds specifically for healthcare costs
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-500 mt-1">•</span>
                        Review insurance options before you need them - pre-existing conditions may not be covered
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-500 mt-1">•</span>
                        Factor healthcare costs into your retirement planning calculations
                      </li>
                    </ul>
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 mt-6 pt-6 border-t">
              <Button
                onClick={() => onAddToTimeline?.(selectedProcedure.name, selectedAge)}
                className="bg-amber-500 hover:bg-amber-600 text-white flex-1"
              >
                Add to My Timeline (Age {selectedAge})
              </Button>
              <Button
                onClick={onExploreInsurance}
                variant="outline"
                className="border-blue-300 text-blue-700 hover:bg-blue-50 flex-1"
              >
                Explore Insurance Options
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
