"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

interface Gap {
  id: number
  type: string
  severity: string
  description: string
  estimatedCost: string
  recommendation: string
}

interface Coverage {
  id: number
  type: string
  category: string
}

interface GapAnalysisProps {
  gaps: Gap[]
  currentCoverages: Coverage[]
}

export function GapAnalysis({ gaps, currentCoverages }: GapAnalysisProps) {
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high":
        return "bg-red-100 text-red-800 border-red-200"
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "low":
        return "bg-green-100 text-green-800 border-green-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case "high":
        return (
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
            className="text-red-600"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
        )
      case "medium":
        return (
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
            className="text-yellow-600"
          >
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
            <line x1="12" y1="9" x2="12" y2="13" />
            <line x1="12" y1="17" x2="12.01" y2="17" />
          </svg>
        )
      default:
        return (
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
        )
    }
  }

  return (
    <div className="space-y-6">
      {/* Coverage Summary */}
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
              <path d="M9 12l2 2 4-4" />
              <path d="M21 12c.552 0 1-.448 1-1V5c0-.552-.448-1-1-1H3c-.552 0-1 .448-1 1v6c0 .552.448 1 1 1h18z" />
              <path d="M3 12v6c0 .552.448 1 1 1h16c.552 0-1-.448-1-1v-6" />
            </svg>
            Current Coverage Analysis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-700">
                {currentCoverages.filter((c) => c.category === "life").length}
              </div>
              <div className="text-sm text-gray-600">Life Insurance</div>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-700">
                {currentCoverages.filter((c) => c.category === "health").length}
              </div>
              <div className="text-sm text-gray-600">Health Coverage</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-700">
                {currentCoverages.filter((c) => c.category === "income").length}
              </div>
              <div className="text-sm text-gray-600">Income Protection</div>
            </div>
            <div className="text-center p-4 bg-red-50 rounded-lg">
              <div className="text-2xl font-bold text-red-700">0</div>
              <div className="text-sm text-gray-600">Long-term Care</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Gap Analysis Results */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Identified Coverage Gaps</h2>

        {gaps.length === 0 ? (
          <Card className="border-0 shadow-md">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
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
                  className="text-green-600"
                >
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-green-800">Great Coverage!</h3>
              <p className="text-gray-600">No significant coverage gaps identified based on your current policies.</p>
            </CardContent>
          </Card>
        ) : (
          gaps.map((gap) => (
            <Card key={gap.id} className="border-0 shadow-md">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">{getSeverityIcon(gap.severity)}</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold">{gap.type}</h3>
                      <Badge className={getSeverityColor(gap.severity)}>
                        {gap.severity.charAt(0).toUpperCase() + gap.severity.slice(1)} Priority
                      </Badge>
                    </div>

                    <p className="text-gray-700 mb-3">{gap.description}</p>

                    <div className="bg-gray-50 p-4 rounded-lg mb-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-gray-600">Estimated Cost Impact</span>
                        <span className="font-bold text-red-600">{gap.estimatedCost}</span>
                      </div>
                      <p className="text-sm text-gray-600">{gap.recommendation}</p>
                    </div>

                    <div className="flex gap-3">
                      <Button className="bg-blue-500 hover:bg-blue-600 text-white">Get Coverage Quote</Button>
                      <Link href="/planner">
                        <Button variant="outline">Add to Timeline</Button>
                      </Link>
                      <Button variant="outline">Self-Insurance Plan</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Recommendations */}
      <Card className="border-0 shadow-md bg-amber-50">
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
              className="text-amber-600"
            >
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
            Smart Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-xs font-bold text-amber-700">1</span>
              </div>
              <div>
                <p className="font-medium">Review your coverage annually</p>
                <p className="text-sm text-gray-600">
                  Life changes affect insurance needs - set a yearly review reminder
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-xs font-bold text-amber-700">2</span>
              </div>
              <div>
                <p className="font-medium">Consider bundling policies</p>
                <p className="text-sm text-gray-600">Multiple policies with one provider often offer discounts</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-xs font-bold text-amber-700">3</span>
              </div>
              <div>
                <p className="font-medium">Plan for care costs early</p>
                <p className="text-sm text-gray-600">Long-term care insurance is cheaper when purchased younger</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
