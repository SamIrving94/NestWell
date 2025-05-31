"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"
import { DocumentUpload } from "@/components/document-upload"
import { CoverageCards } from "@/components/coverage-cards"
import { GapAnalysis } from "@/components/gap-analysis"
import { ScenarioSimulator } from "@/components/scenario-simulator"
import { AIAssistant } from "@/components/ai-assistant"

export default function CoveragePage() {
  const [uploadedDocs, setUploadedDocs] = useState([])
  const [parsedCoverages, setParsedCoverages] = useState([])
  const [coverageGaps, setCoverageGaps] = useState([])
  const [readinessScore, setReadinessScore] = useState(72)

  // Demo data for coverage policies
  const demoCoverages = [
    {
      id: 1,
      provider: "Aviva",
      type: "Life Insurance",
      amount: "£250,000",
      startDate: "2020-01-15",
      endDate: "2050-01-15",
      status: "Active",
      exclusions: ["Suicide within 2 years", "War-related death"],
      monthlyPremium: "£45",
      category: "life",
    },
    {
      id: 2,
      provider: "Bupa",
      type: "Private Health Insurance",
      amount: "Unlimited",
      startDate: "2022-03-01",
      endDate: "2025-03-01",
      status: "Active",
      exclusions: ["Pre-existing conditions", "Cosmetic surgery"],
      monthlyPremium: "£180",
      category: "health",
    },
    {
      id: 3,
      provider: "Legal & General",
      type: "Income Protection",
      amount: "£3,000/month",
      startDate: "2021-06-01",
      endDate: "2035-06-01",
      status: "Active",
      exclusions: ["Mental health (first 2 years)", "Back problems"],
      monthlyPremium: "£85",
      category: "income",
    },
  ]

  // Demo gaps analysis
  const demoGaps = [
    {
      id: 1,
      type: "Long-term Care",
      severity: "high",
      description: "No coverage for care costs in later life",
      estimatedCost: "£50,000-£100,000 annually",
      recommendation: "Consider long-term care insurance or self-insurance plan",
    },
    {
      id: 2,
      type: "Critical Illness",
      severity: "medium",
      description: "Limited coverage for serious illness",
      estimatedCost: "£20,000-£50,000",
      recommendation: "Review critical illness coverage options",
    },
  ]

  useEffect(() => {
    // Load demo data
    setParsedCoverages(demoCoverages)
    setCoverageGaps(demoGaps)

    // Load any saved data
    const savedScore = localStorage.getItem("nestwell-user-score")
    if (savedScore) {
      setReadinessScore(Number.parseInt(savedScore))
    }
  }, [])

  const handleDocumentUpload = (file) => {
    // Simulate document processing
    const newDoc = {
      id: Date.now(),
      name: file.name,
      status: "processing",
      uploadedAt: new Date().toISOString(),
    }

    setUploadedDocs((prev) => [...prev, newDoc])

    // Simulate processing completion
    setTimeout(() => {
      setUploadedDocs((prev) => prev.map((doc) => (doc.id === newDoc.id ? { ...doc, status: "completed" } : doc)))
    }, 3000)
  }

  const totalCoverage = parsedCoverages.reduce((sum, policy) => {
    const amount = policy.amount.replace(/[£,]/g, "").replace("Unlimited", "500000")
    return sum + (Number.parseInt(amount) || 0)
  }, 0)

  const monthlyPremiums = parsedCoverages.reduce((sum, policy) => {
    const premium = policy.monthlyPremium.replace(/[£,]/g, "")
    return sum + (Number.parseInt(premium) || 0)
  }, 0)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-30">
        <div className="container mx-auto py-4 px-4 flex justify-between items-center">
          <Link href="/hub" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-amber-500 flex items-center justify-center">
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
                className="text-white"
              >
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
              </svg>
            </div>
            <span className="text-xl font-semibold">NestWell</span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <Link href="/hub" className="text-gray-600 hover:text-gray-800 transition-colors">
              Dashboard
            </Link>
            <Link href="/readiness" className="text-gray-600 hover:text-gray-800 transition-colors">
              Readiness
            </Link>
            <Link href="/planner" className="text-gray-600 hover:text-gray-800 transition-colors">
              Timeline
            </Link>
            <Link href="/coverage" className="text-amber-600 font-medium">
              Coverage
            </Link>
          </nav>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-serif font-semibold text-gray-800 mb-2">Coverage Summary</h1>
            <p className="text-gray-600">Understand your insurance coverage, identify gaps, and plan for the future</p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="border-0 shadow-md">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Total Coverage</p>
                    <p className="text-2xl font-bold">£{(totalCoverage / 1000).toFixed(0)}k</p>
                  </div>
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
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
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
                    </svg>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Active Policies</p>
                    <p className="text-2xl font-bold">{parsedCoverages.length}</p>
                  </div>
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
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
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                      <polyline points="14 2 14 8 20 8" />
                      <line x1="16" y1="13" x2="8" y2="13" />
                      <line x1="16" y1="17" x2="8" y2="17" />
                      <polyline points="10 9 9 9 8 9" />
                    </svg>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Monthly Premiums</p>
                    <p className="text-2xl font-bold">£{monthlyPremiums}</p>
                  </div>
                  <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
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
                      className="text-purple-600"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <path d="M16 8h-6.5a2.5 2.5 0 0 0 0 5h3a2.5 2.5 0 0 1 0 5H6" />
                      <path d="M12 18v2" />
                      <path d="M12 6V4" />
                    </svg>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Coverage Gaps</p>
                    <p className="text-2xl font-bold text-red-600">{coverageGaps.length}</p>
                  </div>
                  <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
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
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content Tabs */}
          <Tabs defaultValue="overview" className="mb-12">
            <TabsList className="grid w-full grid-cols-4 mb-8">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="upload">Upload Docs</TabsTrigger>
              <TabsTrigger value="gaps">Gap Analysis</TabsTrigger>
              <TabsTrigger value="scenarios">Scenarios</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="mt-0">
              <CoverageCards coverages={parsedCoverages} />
            </TabsContent>

            <TabsContent value="upload" className="mt-0">
              <DocumentUpload onUpload={handleDocumentUpload} uploadedDocs={uploadedDocs} />
            </TabsContent>

            <TabsContent value="gaps" className="mt-0">
              <GapAnalysis gaps={coverageGaps} currentCoverages={parsedCoverages} />
            </TabsContent>

            <TabsContent value="scenarios" className="mt-0">
              <ScenarioSimulator currentCoverages={parsedCoverages} />
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* AI Assistant */}
      <AIAssistant
        userName="Sam"
        userScore={readinessScore}
        currentPage="coverage"
        recentInsights={["Identified 2 coverage gaps", "Uploaded 3 policy documents", "Ran care scenario simulation"]}
      />
    </div>
  )
}
