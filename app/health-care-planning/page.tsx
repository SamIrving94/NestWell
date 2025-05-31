"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { FloatingFeatherReward } from "@/components/floating-feather-reward"
import { AIAssistantHealth } from "@/components/ai-assistant-health"
import { CareRiskScenarioTool } from "@/components/care-risk-scenario-tool"
import Link from "next/link"
import { HealthcareCostTool } from "@/components/healthcare-cost-tool"

export default function HealthCarePlanningPage() {
  const [showFeathers, setShowFeathers] = useState(false)
  const [mobility, setMobility] = useState([75])
  const [mentalWellbeing, setMentalWellbeing] = useState([80])
  const [physicalActivity, setPhysicalActivity] = useState("moderate")
  const [socialConnections, setSocialConnections] = useState("sometimes")
  const [mentalNotes, setMentalNotes] = useState("")
  const [userName] = useState("Sam")
  const [userAge] = useState(65)
  const [userSavings] = useState(50000)
  const [userIncome] = useState(1500)

  const handleSaveAssessment = () => {
    setShowFeathers(true)
    setTimeout(() => setShowFeathers(false), 3000)
  }

  const handleAddToTimeline = (item: string, age?: number) => {
    setShowFeathers(true)
    setTimeout(() => setShowFeathers(false), 3000)

    // Save to timeline
    const savedMilestones = localStorage.getItem("nestwell-custom-milestones")
    const milestones = savedMilestones ? JSON.parse(savedMilestones) : []

    const newMilestone = {
      id: Date.now(),
      title: item,
      description: `Health and care planning: ${item}`,
      age: age || userAge + 5,
      year: new Date().getFullYear() + ((age || userAge + 5) - userAge),
      category: "health",
      icon: "🏥",
      isCustom: true,
    }

    milestones.push(newMilestone)
    localStorage.setItem("nestwell-custom-milestones", JSON.stringify(milestones))

    console.log(`Added to timeline: ${item}`)
  }

  const handleExploreOptions = (scenarioType: string) => {
    alert(`Exploring coverage options for ${scenarioType} care. Feature coming soon!`)
  }

  const handleTalkToAssistant = (question: string) => {
    alert(`Opening assistant with question: ${question}`)
  }

  return (
    <div className="min-h-screen bg-canvas">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto py-4 px-4 flex justify-between items-center">
          <Link href="/hub" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-accent-amber flex items-center justify-center">
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

          <nav className="flex items-center gap-4">
            <Link href="/hub" className="text-gray-600 hover:text-gray-800">
              My Plan
            </Link>
            <Link href="/planner" className="text-gray-600 hover:text-gray-800">
              Timeline
            </Link>
            <Link href="/coverage" className="text-gray-600 hover:text-gray-800">
              Coverage
            </Link>
            <Link href="/pension-savings" className="text-gray-600 hover:text-gray-800">
              Finance
            </Link>
            <Link href="/health-care-planning" className="text-accent-teal font-medium">
              Health & Care
            </Link>
          </nav>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {showFeathers && <FloatingFeatherReward />}
        <AIAssistantHealth />

        <div className="max-w-4xl mx-auto space-y-6">
          {/* Header */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-medium text-primary">Health & Care Planning</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Plan for wellbeing and care needs in your later years. Let's explore your health outlook and prepare for
              different care scenarios.
            </p>
          </div>

          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="comparison">Cost Comparison</TabsTrigger>
              <TabsTrigger value="assessment">Health Profile</TabsTrigger>
              <TabsTrigger value="care-scenarios">Care Planning</TabsTrigger>
              <TabsTrigger value="recommendations">Action Plan</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              {/* Overall Status */}
              <Card className="bg-gradient-to-r from-accent-teal/10 to-accent-blue-grey/5">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Your Health & Care Overview</span>
                    <Badge variant="secondary" className="bg-accent-amber/20 text-accent-amber">
                      Some Planning Needed
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="text-center space-y-3">
                      <div className="w-16 h-16 mx-auto rounded-full bg-accent-teal flex items-center justify-center">
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
                          className="text-white"
                        >
                          <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                        </svg>
                      </div>
                      <h3 className="font-semibold">Physical Health</h3>
                      <Badge className="bg-accent-teal/20 text-accent-teal">Good</Badge>
                      <p className="text-sm text-gray-600">You're staying active and mobile</p>
                    </div>

                    <div className="text-center space-y-3">
                      <div className="w-16 h-16 mx-auto rounded-full bg-accent-blue-grey flex items-center justify-center">
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
                          className="text-white"
                        >
                          <circle cx="12" cy="12" r="10" />
                          <path d="M8 14s1.5 2 4 2 4-2 4-2" />
                          <line x1="9" y1="9" x2="9.01" y2="9" />
                          <line x1="15" y1="9" x2="15.01" y2="9" />
                        </svg>
                      </div>
                      <h3 className="font-semibold">Mental Wellbeing</h3>
                      <Badge className="bg-accent-blue-grey/20 text-accent-blue-grey">Good</Badge>
                      <p className="text-sm text-gray-600">Positive outlook and managing well</p>
                    </div>

                    <div className="text-center space-y-3">
                      <div className="w-16 h-16 mx-auto rounded-full bg-accent-amber flex items-center justify-center">
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
                          className="text-white"
                        >
                          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                          <polyline points="9 22 9 12 15 12 15 22" />
                        </svg>
                      </div>
                      <h3 className="font-semibold">Care Planning</h3>
                      <Badge className="bg-accent-amber/20 text-accent-amber">Needs Attention</Badge>
                      <p className="text-sm text-gray-600">Plan for potential care needs</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Key Insights */}
              <Card>
                <CardHeader>
                  <CardTitle>Personalized Insights</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-accent-teal/10 p-4 rounded-lg">
                    <h4 className="font-semibold text-accent-teal mb-2">💡 Key Opportunity</h4>
                    <p className="text-gray-700">
                      Your physical and mental health are strong foundations. Planning for potential care scenarios now
                      will give you confidence and control over your future.
                    </p>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-accent-teal/5 p-4 rounded-lg">
                      <h4 className="font-semibold text-accent-teal mb-2">✅ Strengths</h4>
                      <ul className="text-gray-700 text-sm space-y-1">
                        <li>• Regular physical activity</li>
                        <li>• Good mobility for your age</li>
                        <li>• Positive mental outlook</li>
                      </ul>
                    </div>
                    <div className="bg-accent-amber/10 p-4 rounded-lg">
                      <h4 className="font-semibold text-accent-amber mb-2">🎯 Areas to Focus</h4>
                      <ul className="text-gray-700 text-sm space-y-1">
                        <li>• Plan for care scenarios</li>
                        <li>• Consider self-insurance options</li>
                        <li>• Prepare for future mobility needs</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="comparison" className="space-y-6">
              {/* Healthcare Cost Comparison Tool */}
              <Card>
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
                      className="text-accent-teal"
                    >
                      <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                    Healthcare Cost Comparison
                  </CardTitle>
                  <p className="text-gray-600">
                    Compare your options for healthcare and care costs: NHS, self-insured, and private insurance
                    coverage.
                  </p>
                </CardHeader>
                <CardContent>
                  <HealthcareCostTool
                    userAge={userAge}
                    onAddToTimeline={handleAddToTimeline}
                    onExploreInsurance={() => alert("Exploring insurance options... Feature coming soon!")}
                  />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="assessment" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Health Profile Assessment</CardTitle>
                  <p className="text-gray-600">
                    Help us understand your current health to provide better care planning recommendations.
                  </p>
                </CardHeader>
                <CardContent className="space-y-8">
                  {/* Mobility Assessment */}
                  <div className="space-y-4">
                    <Label className="text-base font-semibold">Current Mobility Level</Label>
                    <div className="space-y-2">
                      <Slider value={mobility} onValueChange={setMobility} max={100} step={5} className="w-full" />
                      <div className="flex justify-between text-sm text-gray-500">
                        <span>Limited</span>
                        <span className="font-medium">Current: {mobility[0]}%</span>
                        <span>Excellent</span>
                      </div>
                    </div>
                  </div>

                  {/* Mental Wellbeing */}
                  <div className="space-y-4">
                    <Label className="text-base font-semibold">Mental Wellbeing</Label>
                    <div className="space-y-2">
                      <Slider
                        value={mentalWellbeing}
                        onValueChange={setMentalWellbeing}
                        max={100}
                        step={5}
                        className="w-full"
                      />
                      <div className="flex justify-between text-sm text-gray-500">
                        <span>Struggling</span>
                        <span className="font-medium">Current: {mentalWellbeing[0]}%</span>
                        <span>Thriving</span>
                      </div>
                    </div>
                    <Textarea
                      placeholder="Optional: Share any thoughts about your mental wellbeing..."
                      value={mentalNotes}
                      onChange={(e) => setMentalNotes(e.target.value)}
                      className="mt-2"
                    />
                  </div>

                  {/* Physical Activity */}
                  <div className="space-y-4">
                    <Label className="text-base font-semibold">Physical Activity Level</Label>
                    <RadioGroup value={physicalActivity} onValueChange={setPhysicalActivity}>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="low" id="low" />
                        <Label htmlFor="low">Low - Mostly sedentary, occasional light activity</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="moderate" id="moderate" />
                        <Label htmlFor="moderate">Moderate - Regular walking, some exercise</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="high" id="high" />
                        <Label htmlFor="high">High - Regular exercise, very active lifestyle</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  {/* Social Connections */}
                  <div className="space-y-4">
                    <Label className="text-base font-semibold">Social Connections</Label>
                    <p className="text-sm text-gray-600">Do you feel connected day to day?</p>
                    <RadioGroup value={socialConnections} onValueChange={setSocialConnections}>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="very-connected" id="very-connected" />
                        <Label htmlFor="very-connected">Very connected - Regular contact with family and friends</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="sometimes" id="sometimes" />
                        <Label htmlFor="sometimes">Sometimes - Some social contact but could be more</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="isolated" id="isolated" />
                        <Label htmlFor="isolated">Often isolated - Limited social contact</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <Button onClick={handleSaveAssessment} className="w-full bg-accent-teal hover:bg-accent-teal/90">
                    Save Health Profile
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="care-scenarios" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Care Risk Forecasting & Planning</CardTitle>
                  <p className="text-gray-600">
                    Explore potential care scenarios and understand the costs and planning options available to you.
                  </p>
                </CardHeader>
                <CardContent>
                  <CareRiskScenarioTool
                    userAge={userAge}
                    userSavings={userSavings}
                    userIncome={userIncome}
                    onAddToTimeline={handleAddToTimeline}
                    onExploreOptions={handleExploreOptions}
                    onTalkToAssistant={handleTalkToAssistant}
                  />
                </CardContent>
              </Card>

              {/* Self-Insurance Planning */}
              <Card>
                <CardHeader>
                  <CardTitle>Self-Insurance Planning</CardTitle>
                  <p className="text-gray-600">
                    Consider building your own care fund as an alternative to traditional insurance.
                  </p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-accent-teal/10 p-4 rounded-lg">
                      <h4 className="font-semibold text-accent-teal mb-2">💰 Care Fund Goal</h4>
                      <p className="text-sm text-gray-600 mb-3">
                        Based on average care costs, consider saving £150,000-£300,000 for comprehensive care coverage.
                      </p>
                      <Button
                        size="sm"
                        onClick={() => handleAddToTimeline("Start care fund savings", userAge + 1)}
                        className="bg-accent-teal hover:bg-accent-teal/90"
                      >
                        Set Savings Goal
                      </Button>
                    </div>
                    <div className="bg-accent-amber/10 p-4 rounded-lg">
                      <h4 className="font-semibold text-accent-amber mb-2">🏠 Home Adaptations</h4>
                      <p className="text-sm text-gray-600 mb-3">
                        Plan for home modifications that could help you age in place comfortably and safely.
                      </p>
                      <Button
                        size="sm"
                        onClick={() => handleAddToTimeline("Home accessibility assessment", userAge + 10)}
                        className="bg-accent-amber hover:bg-accent-amber/90"
                      >
                        Plan Assessment
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="recommendations" className="space-y-6">
              <div className="grid gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Personalized Action Plan</CardTitle>
                    <p className="text-gray-600">
                      Based on your health profile and care planning, here are your recommended next steps.
                    </p>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="border rounded-lg p-4 space-y-3">
                        <div className="flex items-start justify-between">
                          <div className="space-y-2">
                            <h4 className="font-semibold text-accent-teal">Continue Active Lifestyle</h4>
                            <p className="text-sm text-gray-600">
                              Maintain your current activity level and consider adding low-impact exercises like
                              swimming or tai chi to preserve mobility.
                            </p>
                          </div>
                          <Button
                            size="sm"
                            onClick={() => handleAddToTimeline("Low-impact exercise plan")}
                            className="bg-accent-teal hover:bg-accent-teal/90"
                          >
                            Add to Timeline
                          </Button>
                        </div>
                      </div>

                      <div className="border rounded-lg p-4 space-y-3">
                        <div className="flex items-start justify-between">
                          <div className="space-y-2">
                            <h4 className="font-semibold text-accent-amber">Plan Care Scenarios</h4>
                            <p className="text-sm text-gray-600">
                              Explore different care scenarios and start building a financial plan for potential care
                              needs in your 70s and 80s.
                            </p>
                          </div>
                          <Button
                            size="sm"
                            onClick={() => handleAddToTimeline("Care scenario planning", userAge + 8)}
                            className="bg-accent-amber hover:bg-accent-amber/90"
                          >
                            Add to Timeline
                          </Button>
                        </div>
                      </div>

                      <div className="border rounded-lg p-4 space-y-3">
                        <div className="flex items-start justify-between">
                          <div className="space-y-2">
                            <h4 className="font-semibold text-primary">Build Social Network</h4>
                            <p className="text-sm text-gray-600">
                              Consider joining community groups or volunteering to build strong social connections for
                              your later years.
                            </p>
                          </div>
                          <Button
                            size="sm"
                            onClick={() => handleAddToTimeline("Social connections plan")}
                            variant="outline"
                          >
                            Add to Timeline
                          </Button>
                        </div>
                      </div>

                      <div className="border rounded-lg p-4 space-y-3">
                        <div className="flex items-start justify-between">
                          <div className="space-y-2">
                            <h4 className="font-semibold text-primary">Schedule Health Reviews</h4>
                            <p className="text-sm text-gray-600">
                              Plan regular health assessments and mobility reviews to stay ahead of any changes in your
                              health status.
                            </p>
                          </div>
                          <Button
                            size="sm"
                            onClick={() => handleAddToTimeline("Comprehensive health review", userAge + 5)}
                            variant="outline"
                          >
                            Add to Timeline
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
