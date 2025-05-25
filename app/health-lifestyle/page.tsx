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

export default function HealthLifestylePage() {
  const [showFeathers, setShowFeathers] = useState(false)
  const [mobility, setMobility] = useState([75])
  const [mentalWellbeing, setMentalWellbeing] = useState([80])
  const [physicalActivity, setPhysicalActivity] = useState("moderate")
  const [socialConnections, setSocialConnections] = useState("sometimes")
  const [mentalNotes, setMentalNotes] = useState("")

  const handleSaveAssessment = () => {
    setShowFeathers(true)
    setTimeout(() => setShowFeathers(false), 3000)
  }

  const handleAddToTimeline = (recommendation: string) => {
    setShowFeathers(true)
    setTimeout(() => setShowFeathers(false), 3000)
    console.log(`Added to timeline: ${recommendation}`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-blue-50 p-4">
      {showFeathers && <FloatingFeatherReward />}
      <AIAssistantHealth />

      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-serif font-semibold text-gray-800">Health & Lifestyle Planning</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Plan for wellbeing beyond finances. Let's explore how to live well in your later years.
          </p>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="assessment">Assessment</TabsTrigger>
            <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Overall Status */}
            <Card className="bg-gradient-to-r from-emerald-100 to-green-100">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Your Wellbeing Overview</span>
                  <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                    Some Gaps
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center space-y-3">
                    <div className="w-16 h-16 mx-auto rounded-full bg-green-500 flex items-center justify-center">
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
                    <Badge className="bg-green-100 text-green-800">Good</Badge>
                    <p className="text-sm text-gray-600">You're staying active and mobile</p>
                  </div>

                  <div className="text-center space-y-3">
                    <div className="w-16 h-16 mx-auto rounded-full bg-blue-500 flex items-center justify-center">
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
                    <Badge className="bg-blue-100 text-blue-800">Good</Badge>
                    <p className="text-sm text-gray-600">Positive outlook and managing well</p>
                  </div>

                  <div className="text-center space-y-3">
                    <div className="w-16 h-16 mx-auto rounded-full bg-yellow-500 flex items-center justify-center">
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
                        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                        <circle cx="9" cy="7" r="4" />
                        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                      </svg>
                    </div>
                    <h3 className="font-semibold">Social Connections</h3>
                    <Badge className="bg-yellow-100 text-yellow-800">Needs Attention</Badge>
                    <p className="text-sm text-gray-600">Consider expanding your social network</p>
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
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-800 mb-2">💡 Key Opportunity</h4>
                  <p className="text-blue-700">
                    Your physical and mental health are strong foundations. Building stronger social connections could
                    significantly enhance your wellbeing in retirement.
                  </p>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-green-800 mb-2">✅ Strengths</h4>
                    <ul className="text-green-700 text-sm space-y-1">
                      <li>• Regular physical activity</li>
                      <li>• Good mobility for your age</li>
                      <li>• Positive mental outlook</li>
                    </ul>
                  </div>
                  <div className="bg-yellow-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-yellow-800 mb-2">🎯 Areas to Focus</h4>
                    <ul className="text-yellow-700 text-sm space-y-1">
                      <li>• Expand social connections</li>
                      <li>• Plan for future mobility needs</li>
                      <li>• Consider community involvement</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="assessment" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Health & Lifestyle Assessment</CardTitle>
                <p className="text-gray-600">
                  Help us understand your current situation to provide better recommendations.
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

                <Button onClick={handleSaveAssessment} className="w-full bg-emerald-500 hover:bg-emerald-600">
                  Save Assessment
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="recommendations" className="space-y-6">
            <div className="grid gap-6">
              {/* Recommendations */}
              <Card>
                <CardHeader>
                  <CardTitle>Personalized Recommendations</CardTitle>
                  <p className="text-gray-600">
                    Based on your assessment, here are some suggestions for your future planning.
                  </p>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="border rounded-lg p-4 space-y-3">
                      <div className="flex items-start justify-between">
                        <div className="space-y-2">
                          <h4 className="font-semibold text-green-800">Stay Active with Low-Impact Activities</h4>
                          <p className="text-sm text-gray-600">
                            Continue your current activity level and consider adding swimming, yoga, or tai chi to
                            maintain mobility as you age.
                          </p>
                        </div>
                        <Button
                          size="sm"
                          onClick={() => handleAddToTimeline("Low-impact activity plan")}
                          className="bg-green-500 hover:bg-green-600"
                        >
                          Add to Timeline
                        </Button>
                      </div>
                    </div>

                    <div className="border rounded-lg p-4 space-y-3">
                      <div className="flex items-start justify-between">
                        <div className="space-y-2">
                          <h4 className="font-semibold text-blue-800">Plan for Social Connections Post-Retirement</h4>
                          <p className="text-sm text-gray-600">
                            Consider joining clubs, volunteering, or community groups to build a strong social network
                            for retirement.
                          </p>
                        </div>
                        <Button
                          size="sm"
                          onClick={() => handleAddToTimeline("Social connections plan")}
                          className="bg-blue-500 hover:bg-blue-600"
                        >
                          Add to Timeline
                        </Button>
                      </div>
                    </div>

                    <div className="border rounded-lg p-4 space-y-3">
                      <div className="flex items-start justify-between">
                        <div className="space-y-2">
                          <h4 className="font-semibold text-purple-800">Schedule Mobility Review in Your 70s</h4>
                          <p className="text-sm text-gray-600">
                            Plan for a comprehensive mobility assessment around age 74 to prepare for any needed home
                            adaptations.
                          </p>
                        </div>
                        <Button
                          size="sm"
                          onClick={() => handleAddToTimeline("Mobility review at 74")}
                          className="bg-purple-500 hover:bg-purple-600"
                        >
                          Add to Timeline
                        </Button>
                      </div>
                    </div>

                    <div className="border rounded-lg p-4 space-y-3">
                      <div className="flex items-start justify-between">
                        <div className="space-y-2">
                          <h4 className="font-semibold text-orange-800">Consider Home Adaptations Assessment</h4>
                          <p className="text-sm text-gray-600">
                            Evaluate your home for future accessibility needs - grab bars, ramps, or stair lifts may be
                            helpful later.
                          </p>
                        </div>
                        <Button
                          size="sm"
                          onClick={() => handleAddToTimeline("Home adaptations assessment")}
                          className="bg-orange-500 hover:bg-orange-600"
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
  )
}
