"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Heart,
  TrendingUp,
  Calendar,
  CheckSquare,
  FileText,
  AlertTriangle,
  Clock,
  Pill,
  Stethoscope,
  PoundSterling,
  Phone,
  Download,
  Eye,
  Plus,
  MapPin,
  Bell,
} from "lucide-react"
import { useRouter } from "next/navigation"

interface CareRecipient {
  id: string
  name: string
  relationship: string
  avatar: string
  lastUpdate: string
  emergencyContact: string
  address: string
}

interface HealthSnapshot {
  conditions: Array<{
    name: string
    severity: "mild" | "moderate" | "severe"
    diagnosed: string
  }>
  medications: Array<{
    name: string
    dosage: string
    frequency: string
    lastTaken: string
  }>
  recentVisits: Array<{
    type: string
    provider: string
    date: string
    notes: string
  }>
  careNotes: Array<{
    date: string
    author: string
    note: string
    mood: "good" | "fair" | "poor"
  }>
}

interface FinancialSnapshot {
  totalBalance: number
  monthlyIncome: number
  careCosts: Array<{
    type: string
    provider: string
    monthlyCost: number
    nextPayment: string
  }>
  insurance: Array<{
    type: string
    provider: string
    renewalDate: string
    premium: number
  }>
}

interface CareDashboardProps {
  recipient: CareRecipient
}

export function CareDashboard({ recipient }: CareDashboardProps) {
  const [activeTab, setActiveTab] = useState("overview")
  const [timeToInsight, setTimeToInsight] = useState(0)
  const router = useRouter()

  // Sample data - in real app this would come from API
  const healthData: HealthSnapshot = {
    conditions: [
      { name: "Mild Dementia", severity: "moderate", diagnosed: "2022-03-15" },
      { name: "Arthritis", severity: "mild", diagnosed: "2019-08-20" },
      { name: "High Blood Pressure", severity: "mild", diagnosed: "2020-01-10" },
    ],
    medications: [
      { name: "Donepezil", dosage: "10mg", frequency: "Daily", lastTaken: "2024-01-28 08:00" },
      { name: "Ibuprofen", dosage: "400mg", frequency: "As needed", lastTaken: "2024-01-27 14:30" },
      { name: "Lisinopril", dosage: "5mg", frequency: "Daily", lastTaken: "2024-01-28 08:00" },
    ],
    recentVisits: [
      {
        type: "GP Appointment",
        provider: "Dr. Sarah Wilson",
        date: "2024-01-25",
        notes: "Routine check-up, all stable",
      },
      {
        type: "Physiotherapy",
        provider: "City Physio",
        date: "2024-01-20",
        notes: "Mobility exercises progressing well",
      },
    ],
    careNotes: [
      { date: "2024-01-28", author: "Home Carer", note: "Good day, enjoyed lunch and afternoon walk", mood: "good" },
      {
        date: "2024-01-27",
        author: "Family Visit",
        note: "Seemed a bit confused about time, but cheerful",
        mood: "fair",
      },
    ],
  }

  const financialData: FinancialSnapshot = {
    totalBalance: 45750,
    monthlyIncome: 1847,
    careCosts: [
      { type: "Home Care", provider: "CompassionCare", monthlyCost: 1200, nextPayment: "2024-02-01" },
      { type: "Cleaning Service", provider: "Molly Maid", monthlyCost: 160, nextPayment: "2024-02-05" },
    ],
    insurance: [
      { type: "Home Insurance", provider: "Aviva", renewalDate: "2024-03-15", premium: 45 },
      { type: "Life Insurance", provider: "Legal & General", renewalDate: "2024-06-20", premium: 28 },
    ],
  }

  const upcomingMilestones = [
    {
      type: "appointment",
      title: "GP Check-up",
      date: "2024-02-02",
      time: "14:30",
      provider: "Dr. Sarah Wilson",
      urgent: false,
    },
    {
      type: "appointment",
      title: "Physiotherapy",
      date: "2024-02-05",
      time: "10:00",
      provider: "City Physio",
      urgent: false,
    },
    {
      type: "deadline",
      title: "Home Insurance Renewal",
      date: "2024-03-15",
      time: "",
      provider: "Aviva",
      urgent: true,
    },
    { type: "event", title: "Birthday", date: "2024-02-14", time: "", provider: "", urgent: false },
  ]

  const careTasks = [
    {
      id: 1,
      title: "Book flu vaccination",
      assignee: "Primary Carer",
      dueDate: "2024-02-10",
      status: "pending",
      priority: "high",
    },
    {
      id: 2,
      title: "Renew blue badge",
      assignee: "Secondary Carer",
      dueDate: "2024-02-15",
      status: "in-progress",
      priority: "medium",
    },
    {
      id: 3,
      title: "Update emergency contacts",
      assignee: "Primary Carer",
      dueDate: "2024-02-20",
      status: "pending",
      priority: "low",
    },
    {
      id: 4,
      title: "Review care plan",
      assignee: "Primary Carer",
      dueDate: "2024-03-01",
      status: "pending",
      priority: "high",
    },
  ]

  const assistantTips = [
    {
      type: "reminder",
      message: "Margaret hasn't seen a physiotherapist in 8 days. Consider booking a follow-up session.",
      action: "Book Appointment",
    },
    {
      type: "benefit",
      message: "You might be eligible for Carer's Allowance. Would you like to check eligibility?",
      action: "Check Eligibility",
    },
    {
      type: "support",
      message: "There's a local dementia support group meeting this Thursday. Would you like details?",
      action: "View Details",
    },
  ]

  // Track time to insight
  useEffect(() => {
    const startTime = Date.now()
    const timer = setInterval(() => {
      setTimeToInsight(Math.floor((Date.now() - startTime) / 1000))
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "mild":
        return "bg-green-100 text-green-800 border-green-200"
      case "moderate":
        return "bg-amber-100 text-amber-800 border-amber-200"
      case "severe":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getMoodColor = (mood: string) => {
    switch (mood) {
      case "good":
        return "bg-green-100 text-green-800"
      case "fair":
        return "bg-amber-100 text-amber-800"
      case "poor":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800 border-red-200"
      case "medium":
        return "bg-amber-100 text-amber-800 border-amber-200"
      case "low":
        return "bg-green-100 text-green-800 border-green-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  return (
    <div className="space-y-6 px-2 sm:px-0">
      {/* Header with Quick Info */}
      <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-4 sm:p-6 rounded-lg border border-indigo-100">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-indigo-100 rounded-full flex items-center justify-center text-lg sm:text-xl font-semibold text-indigo-700">
              {recipient.avatar}
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-serif font-semibold text-gray-800">{recipient.name}</h1>
              <p className="text-sm sm:text-base text-gray-600">{recipient.relationship}</p>
              <div className="flex items-center gap-4 mt-1 text-sm text-gray-500">
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  Updated {recipient.lastUpdate}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  {recipient.address}
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm">
              <Phone className="w-4 h-4 mr-1" />
              Call {recipient.emergencyContact}
            </Button>
            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
              <Eye className="w-3 h-3 mr-1" />
              Viewing for {timeToInsight}s
            </Badge>
          </div>
        </div>

        {/* Quick Status Overview */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-lg border border-indigo-100">
            <div className="flex items-center gap-2 mb-1">
              <Heart className="w-4 h-4 text-red-500" />
              <span className="text-sm font-medium">Health Status</span>
            </div>
            <div className="text-base sm:text-lg font-semibold text-green-700">Stable</div>
            <div className="text-2xs sm:text-xs text-gray-500">{healthData.conditions.length} conditions monitored</div>
          </div>

          <div className="bg-white p-4 rounded-lg border border-indigo-100">
            <div className="flex items-center gap-2 mb-1">
              <PoundSterling className="w-4 h-4 text-green-500" />
              <span className="text-sm font-medium">Financial Health</span>
            </div>
            <div className="text-base sm:text-lg font-semibold text-green-700">Good</div>
            <div className="text-2xs sm:text-xs text-gray-500">
              £{financialData.totalBalance.toLocaleString()} available
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg border border-indigo-100">
            <div className="flex items-center gap-2 mb-1">
              <AlertTriangle className="w-4 h-4 text-amber-500" />
              <span className="text-sm font-medium">Urgent Tasks</span>
            </div>
            <div className="text-base sm:text-lg font-semibold text-amber-700">
              {careTasks.filter((task) => task.priority === "high").length}
            </div>
            <div className="text-2xs sm:text-xs text-gray-500">Require attention</div>
          </div>

          <div className="bg-white p-4 rounded-lg border border-indigo-100">
            <div className="flex items-center gap-2 mb-1">
              <Calendar className="w-4 h-4 text-blue-500" />
              <span className="text-sm font-medium">Next Appointment</span>
            </div>
            <div className="text-base sm:text-lg font-semibold text-blue-700">Feb 2</div>
            <div className="text-2xs sm:text-xs text-gray-500">GP Check-up</div>
          </div>
        </div>
      </div>

      {/* Main Dashboard Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-1 sm:gap-2">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="health">Health</TabsTrigger>
          <TabsTrigger value="finances">Finances</TabsTrigger>
          <TabsTrigger value="timeline">Timeline</TabsTrigger>
          <TabsTrigger value="tasks">Tasks</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Health Snapshot */}
            <Card className="border-0 shadow-lg">
              <CardHeader className="card-padding-responsive">
                <CardTitle className="flex items-center gap-2 text-responsive-h3">
                  <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-red-500" />
                  Health Snapshot
                </CardTitle>
              </CardHeader>
              <CardContent className="card-padding-responsive space-y-4">
                <div>
                  <h4 className="font-medium mb-2 text-sm sm:text-base">Key Conditions</h4>
                  <div className="space-y-2">
                    {healthData.conditions.slice(0, 3).map((condition, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <span className="text-sm">{condition.name}</span>
                        <Badge variant="outline" className={getSeverityColor(condition.severity)}>
                          {condition.severity}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2 text-sm sm:text-base">Recent Care Notes</h4>
                  <div className="space-y-2">
                    {healthData.careNotes.slice(0, 2).map((note, index) => (
                      <div key={index} className="p-2 sm:p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs text-gray-500">
                            {note.date} - {note.author}
                          </span>
                          <Badge variant="outline" className={getMoodColor(note.mood)}>
                            {note.mood}
                          </Badge>
                        </div>
                        <p className="text-sm">{note.note}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  className="w-full text-sm sm:text-base"
                  onClick={() => router.push(`/nestcare/health/${recipient.id}`)}
                >
                  <Stethoscope className="w-4 h-4 mr-1" />
                  View Full Health Profile
                </Button>
              </CardContent>
            </Card>

            {/* Financial Snapshot */}
            <Card className="border-0 shadow-lg">
              <CardHeader className="card-padding-responsive">
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-green-500" />
                  Financial Snapshot
                </CardTitle>
              </CardHeader>
              <CardContent className="card-padding-responsive space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-700">
                      £{financialData.totalBalance.toLocaleString()}
                    </div>
                    <div className="text-xs text-green-600">Total Available</div>
                  </div>
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-700">
                      £{financialData.monthlyIncome.toLocaleString()}
                    </div>
                    <div className="text-xs text-blue-600">Monthly Income</div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Monthly Care Costs</h4>
                  <div className="space-y-2">
                    {financialData.careCosts.map((cost, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <span className="text-sm">{cost.type}</span>
                        <span className="font-medium">£{cost.monthlyCost}</span>
                      </div>
                    ))}
                  </div>
                  <div className="border-t pt-2 mt-2">
                    <div className="flex items-center justify-between font-medium">
                      <span>Total Monthly</span>
                      <span>£{financialData.careCosts.reduce((sum, cost) => sum + cost.monthlyCost, 0)}</span>
                    </div>
                  </div>
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  className="w-full"
                  onClick={() => router.push(`/nestcare/finances/${recipient.id}`)}
                >
                  <PoundSterling className="w-4 h-4 mr-1" />
                  View Full Financial Overview
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Assistant Tips */}
          <Card className="border-0 shadow-lg bg-gradient-to-br from-indigo-50 to-purple-50">
            <CardHeader className="card-padding-responsive">
              <CardTitle className="flex items-center gap-2">
                <Bell className="w-5 h-5 text-indigo-600" />
                Care Assistant Tips
              </CardTitle>
            </CardHeader>
            <CardContent className="card-padding-responsive">
              <div className="space-y-3">
                {assistantTips.map((tip, index) => (
                  <Alert key={index} className="border-indigo-200">
                    <AlertTriangle className="h-4 w-4" />
                    <AlertDescription className="flex items-center justify-between">
                      <span>{tip.message}</span>
                      <Button variant="outline" size="sm">
                        {tip.action}
                      </Button>
                    </AlertDescription>
                  </Alert>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="health" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Conditions */}
            <Card className="border-0 shadow-lg">
              <CardHeader className="card-padding-responsive">
                <CardTitle>Medical Conditions</CardTitle>
              </CardHeader>
              <CardContent className="card-padding-responsive">
                <div className="space-y-3">
                  {healthData.conditions.map((condition, index) => (
                    <div key={index} className="p-3 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">{condition.name}</h4>
                        <Badge variant="outline" className={getSeverityColor(condition.severity)}>
                          {condition.severity}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600">Diagnosed: {condition.diagnosed}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Medications */}
            <Card className="border-0 shadow-lg">
              <CardHeader className="card-padding-responsive">
                <CardTitle className="flex items-center gap-2">
                  <Pill className="w-5 h-5" />
                  Current Medications
                </CardTitle>
              </CardHeader>
              <CardContent className="card-padding-responsive">
                <div className="space-y-3">
                  {healthData.medications.map((med, index) => (
                    <div key={index} className="p-3 border rounded-lg">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-medium">{med.name}</h4>
                        <span className="text-sm text-gray-500">{med.dosage}</span>
                      </div>
                      <div className="text-sm text-gray-600">
                        <p>Frequency: {med.frequency}</p>
                        <p>Last taken: {med.lastTaken}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="timeline" className="space-y-6">
          <Card className="border-0 shadow-lg">
            <CardHeader className="card-padding-responsive">
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Upcoming Milestones
              </CardTitle>
            </CardHeader>
            <CardContent className="card-padding-responsive">
              <div className="space-y-4">
                {upcomingMilestones.map((milestone, index) => (
                  <div key={index} className="flex items-center gap-4 p-4 border rounded-lg">
                    <div className={`w-3 h-3 rounded-full ${milestone.urgent ? "bg-red-500" : "bg-blue-500"}`}></div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-medium">{milestone.title}</h4>
                        {milestone.urgent && (
                          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                            Urgent
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-gray-600">
                        {milestone.date} {milestone.time && `at ${milestone.time}`}
                        {milestone.provider && ` - ${milestone.provider}`}
                      </p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => router.push(`/nestcare/timeline/${recipient.id}`)}
                    >
                      <Calendar className="w-4 h-4 mr-1" />
                      Add to Calendar
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tasks" className="space-y-6">
          <Card className="border-0 shadow-lg">
            <CardHeader className="card-padding-responsive">
              <CardTitle className="flex items-center gap-2">
                <CheckSquare className="w-5 h-5" />
                Care Tasks
              </CardTitle>
            </CardHeader>
            <CardContent className="card-padding-responsive">
              <div className="space-y-3">
                {careTasks.map((task) => (
                  <div key={task.id} className="flex items-center gap-4 p-4 border rounded-lg">
                    <input type="checkbox" className="w-4 h-4" />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-medium">{task.title}</h4>
                        <Badge variant="outline" className={getPriorityColor(task.priority)}>
                          {task.priority}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600">
                        Assigned to: {task.assignee} • Due: {task.dueDate}
                      </p>
                    </div>
                    <Badge variant="outline">{task.status}</Badge>
                  </div>
                ))}
              </div>
              <Button className="w-full mt-4">
                <Plus className="w-4 h-4 mr-1" />
                Add New Task
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="documents" className="space-y-6">
          <Card className="border-0 shadow-lg">
            <CardHeader className="card-padding-responsive">
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Document Quick Links
              </CardTitle>
            </CardHeader>
            <CardContent className="card-padding-responsive">
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  { name: "Power of Attorney", type: "Legal", lastUpdated: "2023-05-15" },
                  { name: "Lasting Power of Attorney", type: "Legal", lastUpdated: "2023-05-15" },
                  { name: "Will & Testament", type: "Legal", lastUpdated: "2022-11-20" },
                  { name: "Home Insurance Policy", type: "Insurance", lastUpdated: "2024-01-10" },
                  { name: "Medical Directives", type: "Healthcare", lastUpdated: "2023-08-30" },
                  { name: "Care Agreement", type: "Care", lastUpdated: "2024-01-05" },
                ].map((doc, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">{doc.name}</h4>
                      <Badge variant="outline">{doc.type}</Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">Updated: {doc.lastUpdated}</p>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Eye className="w-3 h-3 mr-1" />
                        View
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="w-3 h-3 mr-1" />
                        Download
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
