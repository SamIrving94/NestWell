"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

interface Coverage {
  id: number
  provider: string
  type: string
  amount: string
  startDate: string
  endDate: string
  status: string
  exclusions: string[]
  monthlyPremium: string
  category: string
}

interface CoverageCardsProps {
  coverages: Coverage[]
}

export function CoverageCards({ coverages }: CoverageCardsProps) {
  const [expandedCard, setExpandedCard] = useState<number | null>(null)

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "life":
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
            className="text-red-500"
          >
            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
          </svg>
        )
      case "health":
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
            className="text-blue-500"
          >
            <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
          </svg>
        )
      case "income":
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
            className="text-green-500"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M16 8h-6.5a2.5 2.5 0 0 0 0 5h3a2.5 2.5 0 0 1 0 5H6" />
            <path d="M12 18v2" />
            <path d="M12 6V4" />
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
            className="text-purple-500"
          >
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
          </svg>
        )
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "life":
        return "bg-red-50 border-red-200"
      case "health":
        return "bg-blue-50 border-blue-200"
      case "income":
        return "bg-green-50 border-green-200"
      default:
        return "bg-purple-50 border-purple-200"
    }
  }

  if (coverages.length === 0) {
    return (
      <Card className="border-0 shadow-md">
        <CardContent className="p-12 text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
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
              className="text-gray-400"
            >
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold mb-2">No Coverage Found</h3>
          <p className="text-gray-600 mb-6">Upload your policy documents to see your coverage summary</p>
          <Button className="bg-blue-500 hover:bg-blue-600 text-white">Upload Documents</Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {coverages.map((coverage) => (
        <Card
          key={coverage.id}
          className={`border-0 shadow-md hover:shadow-lg transition-all cursor-pointer ${getCategoryColor(coverage.category)}`}
          onClick={() => setExpandedCard(expandedCard === coverage.id ? null : coverage.id)}
        >
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {getCategoryIcon(coverage.category)}
                <CardTitle className="text-lg">{coverage.type}</CardTitle>
              </div>
              <Badge
                className={coverage.status === "Active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}
              >
                {coverage.status}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Provider</span>
                <span className="font-medium">{coverage.provider}</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Coverage</span>
                <span className="font-bold text-lg">{coverage.amount}</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Premium</span>
                <span className="font-medium">{coverage.monthlyPremium}/month</span>
              </div>

              {expandedCard === coverage.id && (
                <div className="mt-4 pt-4 border-t space-y-3">
                  <div>
                    <span className="text-sm text-gray-600">Policy Period</span>
                    <p className="font-medium">
                      {new Date(coverage.startDate).toLocaleDateString()} -{" "}
                      {new Date(coverage.endDate).toLocaleDateString()}
                    </p>
                  </div>

                  <div>
                    <span className="text-sm text-gray-600">Key Exclusions</span>
                    <ul className="text-sm mt-1 space-y-1">
                      {coverage.exclusions.map((exclusion, index) => (
                        <li key={index} className="text-gray-700">
                          • {exclusion}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex gap-2 mt-4">
                    <Button size="sm" variant="outline" className="flex-1">
                      View Policy
                    </Button>
                    <Link href="/planner">
                      <Button size="sm" className="flex-1 bg-amber-500 hover:bg-amber-600 text-white">
                        Add to Timeline
                      </Button>
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
