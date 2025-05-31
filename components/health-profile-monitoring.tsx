"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Heart,
  Pill,
  Calendar,
  FileText,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  Plus,
  Download,
  Activity,
  Scale,
  Thermometer,
  Stethoscope,
} from "lucide-react"

interface HealthCondition {
  id: string
  name: string
  severity: "mild" | "moderate" | "severe"
  diagnosed: string
  status: "stable" | "improving" | "worsening"
  notes: string
  lastReview: string
}

interface Medication {
  id: string
  name: string
  dosage: string
  frequency: string
  prescribedBy: string
  startDate: string
  endDate?: string
  purpose: string
  sideEffects?: string
  lastTaken?: string
}

interface Appointment {
  id: string
  date: string
  provider: string
  type: string
  outcome: string
  followUpRequired: boolean
  followUpNotes?: string
  nextAppointment?: string
}

interface CareNote {
  id: string
  date: string
  author: string
  mood: "excellent" | "good" | "fair" | "poor" | "concerning"
  painLevel: number
  sleepQuality: "excellent" | "good" | "fair" | "poor"
  appetite: "excellent" | "good" | "fair" | "poor"
  mobility: "excellent" | "good" | "fair" | "poor"
  notes: string
  incidents?: string
  concerns?: string
}

interface VitalReading {
  id: string
  date: string
  type: "blood_pressure" | "weight" | "temperature" | "heart_rate"
  value: string
  unit: string
  notes?: string
  recordedBy: string
}

interface HealthProfileProps {
  careRecipientId: string
  careRecipientName: string
  currentUserRole: "primary" | "secondary" | "view-only"
}

export function HealthProfileMonitoring({ careRecipientId, careRecipientName, currentUserRole }: HealthProfileProps) {
  const [activeTab, setActiveTab] = useState("overview")
  const [showAddModal, setShowAddModal] = useState<string | null>(null)
  const [conditions, setConditions] = useState<HealthCondition[]>([])
  const [medications, setMedications] = useState<Medication[]>([])
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [careNotes, setCareNotes] = useState<CareNote[]>([])
  const [vitals, setVitals] = useState<VitalReading[]>([])

  // Sample data initialization
  useEffect(() => {
    // Sample conditions
    setConditions([
      {
        id: "1",
        name: "Mild Dementia",
        severity: "moderate",
        diagnosed: "2022-03-15",
        status: "stable",
        notes: "Early-stage Alzheimer's, responding well to medication",
        lastReview: "2024-01-15",
      },
      {
        id: "2",
        name: "Arthritis",
        severity: "mild",
        diagnosed: "2019-08-20",
        status: "stable",
        notes: "Mainly affects knees and hands, managed with medication",
        lastReview: "2023-12-10",
      },
      {
        id: "3",
        name: "High Blood Pressure",
        severity: "mild",
        diagnosed: "2020-01-10",
        status: "improving",
        notes: "Well controlled with medication and diet changes",
        lastReview: "2024-01-20",
      },
    ])

    // Sample medications
    setMedications([
      {
        id: "1",
        name: "Donepezil",
        dosage: "10mg",
        frequency: "Once daily",
        prescribedBy: "Dr. Sarah Wilson",
        startDate: "2022-03-20",
        purpose: "Alzheimer's treatment",
        lastTaken: "2024-01-28 08:00",
      },
      {
        id: "2",
        name: "Ibuprofen",
        dosage: "400mg",
        frequency: "As needed",
        prescribedBy: "Dr. Sarah Wilson",
        startDate: "2023-06-15",
        purpose: "Arthritis pain relief",
        sideEffects: "Take with food",
        lastTaken: "2024-01-27 14:30",
      },
      {
        id: "3",
        name: "Lisinopril",
        dosage: "5mg",
        frequency: "Once daily",
        prescribedBy: "Dr. Sarah Wilson",
        startDate: "2020-02-01",
        purpose: "Blood pressure control",
        lastTaken: "2024-01-28 08:00",
      },
    ])

    // Sample appointments
    setAppointments([
      {
        id: "1",
        date: "2024-01-25",
        provider: "Dr. Sarah Wilson",
        type: "GP Check-up",
        outcome: "Routine check-up completed. All vitals stable. Continue current medications.",
        followUpRequired: true,
        followUpNotes: "Schedule blood tests in 3 months",
        nextAppointment: "2024-04-25",
      },
      {
        id: "2",
        date: "2024-01-20",
        provider: "City Physiotherapy",
        type: "Physiotherapy",
        outcome: "Good progress with mobility exercises. Knee flexibility improving.",
        followUpRequired: true,
        nextAppointment: "2024-02-03",
      },
    ])

    // Sample care notes
    setCareNotes([
      {
        id: "1",
        date: "2024-01-28",
        author: "Home Carer",
        mood: "good",
        painLevel: 3,
        sleepQuality: "good",
        appetite: "good",
        mobility: "fair",
        notes: "Had a good day today. Enjoyed lunch and afternoon walk in the garden. Remembered family names clearly.",
        incidents: "None",
      },
      {
        id: "2",
        date: "2024-01-27",
        author: "Family Visit",
        mood: "fair",
        painLevel: 4,
        sleepQuality: "fair",
        appetite: "fair",
        mobility: "fair",
        notes: "Seemed a bit confused about the time, but was cheerful during visit. Complained of knee pain.",
        concerns: "Slight increase in confusion episodes",
      },
    ])

    // Sample vitals
    setVitals([
      {
        id: "1",
        date: "2024-01-28",
        type: "blood_pressure",
        value: "135/82",
        unit: "mmHg",
        recordedBy: "Home Carer",
      },
      {
        id: "2",
        date: "2024-01-28",
        type: "weight",
        value: "68.5",
        unit: "kg",
        recordedBy: "Home Carer",
      },
    ])
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case "improving":
        return "bg-green-100 text-green-800 border-green-200"
      case "stable":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "worsening":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getMoodColor = (mood: string) => {
    switch (mood) {
      case "excellent":
        return "bg-green-100 text-green-800"
      case "good":
        return "bg-blue-100 text-blue-800"
      case "fair":
        return "bg-amber-100 text-amber-800"
      case "poor":
        return "bg-orange-100 text-orange-800"
      case "concerning":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const generateHealthSummary = () => {
    // Generate PDF summary (mock implementation)
    const summaryData = {
      name: careRecipientName,
      date: new Date().toLocaleDateString(),
      conditions,
      medications,
      recentAppointments: appointments.slice(0, 3),
      recentNotes: careNotes.slice(0, 3),
      vitals: vitals.slice(0, 5),
    }

    // In real implementation, this would generate a PDF
    console.log("Generating health summary:", summaryData)
    alert("Health summary would be downloaded as PDF")
  }

  const getVitalIcon = (type: string) => {
    switch (type) {
      case "blood_pressure":
        return <Heart className="w-4 h-4" />
      case "weight":
        return <Scale className="w-4 h-4" />
      case "temperature":
        return <Thermometer className="w-4 h-4" />
      case "heart_rate":
        return <Activity className="w-4 h-4" />
      default:
        return <Stethoscope className="w-4 h-4" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-semibold text-gray-800">Health Profile & Monitoring</h2>
          <p className="text-gray-600">Managing health information for {careRecipientName}</p>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="outline" onClick={generateHealthSummary}>
            <Download className="w-4 h-4 mr-1" />
            Export Summary
          </Button>
          {currentUserRole !== "view-only" && (
            <Button onClick={() => setShowAddModal("note")} className="bg-indigo-500 hover:bg-indigo-600">
              <Plus className="w-4 h-4 mr-1" />
              Add Care Note
            </Button>
          )}
        </div>
      </div>

      {/* Health Overview Cards */}
      <div className="grid md:grid-cols-3 gap-6">
        {/* Conditions Summary */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-red-500" />
              Health Conditions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {conditions.slice(0, 3).map((condition) => (
                <div key={condition.id} className="flex items-center justify-between">
                  <span className="text-sm font-medium">{condition.name}</span>
                  <div className="flex gap-1">
                    <Badge variant="outline" className={getSeverityColor(condition.severity)}>
                      {condition.severity}
                    </Badge>
                    <Badge variant="outline" className={getStatusColor(condition.status)}>
                      {condition.status === "improving" && <TrendingUp className="w-3 h-3 mr-1" />}
                      {condition.status === "worsening" && <TrendingDown className="w-3 h-3 mr-1" />}
                      {condition.status}
                    </Badge>
                  </div>
                </div>
              ))}
              <Button variant="outline" size="sm" className="w-full mt-3" onClick={() => setActiveTab("conditions")}>
                View All Conditions
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Medications Summary */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Pill className="w-5 h-5 text-blue-500" />
              Current Medications
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {medications.slice(0, 3).map((med) => (
                <div key={med.id} className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{med.name}</span>
                    <span className="text-xs text-gray-500">{med.dosage}</span>
                  </div>
                  <div className="text-xs text-gray-600">{med.frequency}</div>
                </div>
              ))}
              <Button variant="outline" size="sm" className="w-full mt-3" onClick={() => setActiveTab("medications")}>
                View All Medications
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Recent Care Notes */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-green-500" />
              Recent Care Notes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {careNotes.slice(0, 2).map((note) => (
                <div key={note.id} className="p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-gray-500">{note.date}</span>
                    <Badge variant="outline" className={getMoodColor(note.mood)}>
                      {note.mood}
                    </Badge>
                  </div>
                  <p className="text-sm">{note.notes.substring(0, 80)}...</p>
                </div>
              ))}
              <Button variant="outline" size="sm" className="w-full mt-3" onClick={() => setActiveTab("notes")}>
                View All Notes
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* AI Assistant Alerts */}
      <div className="space-y-3">
        <Alert className="border-amber-200 bg-amber-50">
          <AlertTriangle className="h-4 w-4 text-amber-600" />
          <AlertDescription className="text-amber-800">
            <strong>Health Review Due:</strong> No GP visit logged in the last 4 months. Consider scheduling a check-up.
          </AlertDescription>
        </Alert>

        <Alert className="border-blue-200 bg-blue-50">
          <AlertTriangle className="h-4 w-4 text-blue-600" />
          <AlertDescription className="text-blue-800">
            <strong>Medication Reminder:</strong> Donepezil prescription may need renewal soon. Check with pharmacy.
          </AlertDescription>
        </Alert>
      </div>

      {/* Detailed Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="conditions">Conditions</TabsTrigger>
          <TabsTrigger value="medications">Medications</TabsTrigger>
          <TabsTrigger value="appointments">Appointments</TabsTrigger>
          <TabsTrigger value="notes">Care Notes</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Vitals Tracking */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="w-5 h-5 text-purple-500" />
                Recent Vitals & Measurements
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                {vitals.map((vital) => (
                  <div key={vital.id} className="p-4 border rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      {getVitalIcon(vital.type)}
                      <span className="font-medium capitalize">{vital.type.replace("_", " ")}</span>
                    </div>
                    <div className="text-2xl font-bold text-gray-800">
                      {vital.value} {vital.unit}
                    </div>
                    <div className="text-sm text-gray-500">
                      {vital.date} • Recorded by {vital.recordedBy}
                    </div>
                  </div>
                ))}
              </div>
              {currentUserRole !== "view-only" && (
                <Button variant="outline" className="w-full mt-4" onClick={() => setShowAddModal("vital")}>
                  <Plus className="w-4 h-4 mr-1" />
                  Record New Vital
                </Button>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="conditions" className="space-y-6">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Health Conditions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {conditions.map((condition) => (
                  <div key={condition.id} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold text-lg">{condition.name}</h3>
                      <div className="flex gap-2">
                        <Badge variant="outline" className={getSeverityColor(condition.severity)}>
                          {condition.severity}
                        </Badge>
                        <Badge variant="outline" className={getStatusColor(condition.status)}>
                          {condition.status}
                        </Badge>
                      </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="font-medium">Diagnosed:</span> {condition.diagnosed}
                      </div>
                      <div>
                        <span className="font-medium">Last Review:</span> {condition.lastReview}
                      </div>
                    </div>
                    <div className="mt-3">
                      <span className="font-medium">Notes:</span>
                      <p className="text-gray-600 mt-1">{condition.notes}</p>
                    </div>
                  </div>
                ))}
              </div>
              {currentUserRole !== "view-only" && (
                <Button className="w-full mt-4" onClick={() => setShowAddModal("condition")}>
                  <Plus className="w-4 h-4 mr-1" />
                  Add Health Condition
                </Button>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="medications" className="space-y-6">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Current Medications</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {medications.map((med) => (
                  <div key={med.id} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold text-lg">{med.name}</h3>
                      <Badge variant="outline">{med.dosage}</Badge>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="font-medium">Frequency:</span> {med.frequency}
                      </div>
                      <div>
                        <span className="font-medium">Prescribed by:</span> {med.prescribedBy}
                      </div>
                      <div>
                        <span className="font-medium">Purpose:</span> {med.purpose}
                      </div>
                      <div>
                        <span className="font-medium">Started:</span> {med.startDate}
                      </div>
                    </div>
                    {med.lastTaken && (
                      <div className="mt-2 text-sm">
                        <span className="font-medium">Last taken:</span> {med.lastTaken}
                      </div>
                    )}
                    {med.sideEffects && (
                      <div className="mt-2 text-sm">
                        <span className="font-medium">Notes:</span> {med.sideEffects}
                      </div>
                    )}
                  </div>
                ))}
              </div>
              {currentUserRole !== "view-only" && (
                <Button className="w-full mt-4" onClick={() => setShowAddModal("medication")}>
                  <Plus className="w-4 h-4 mr-1" />
                  Add Medication
                </Button>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="appointments" className="space-y-6">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Appointment History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {appointments.map((appointment) => (
                  <div key={appointment.id} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold text-lg">{appointment.type}</h3>
                      <Badge variant="outline">{appointment.date}</Badge>
                    </div>
                    <div className="text-sm mb-3">
                      <span className="font-medium">Provider:</span> {appointment.provider}
                    </div>
                    <div className="mb-3">
                      <span className="font-medium">Outcome:</span>
                      <p className="text-gray-600 mt-1">{appointment.outcome}</p>
                    </div>
                    {appointment.followUpRequired && (
                      <div className="bg-blue-50 p-3 rounded-lg">
                        <div className="flex items-center gap-2 mb-1">
                          <Calendar className="w-4 h-4 text-blue-600" />
                          <span className="font-medium text-blue-800">Follow-up Required</span>
                        </div>
                        {appointment.followUpNotes && (
                          <p className="text-blue-700 text-sm">{appointment.followUpNotes}</p>
                        )}
                        {appointment.nextAppointment && (
                          <p className="text-blue-700 text-sm">Next appointment: {appointment.nextAppointment}</p>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
              {currentUserRole !== "view-only" && (
                <Button className="w-full mt-4" onClick={() => setShowAddModal("appointment")}>
                  <Plus className="w-4 h-4 mr-1" />
                  Log Appointment
                </Button>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notes" className="space-y-6">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Care Notes Log</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {careNotes.map((note) => (
                  <div key={note.id} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{note.date}</span>
                        <Badge variant="outline" className={getMoodColor(note.mood)}>
                          {note.mood}
                        </Badge>
                      </div>
                      <span className="text-sm text-gray-500">by {note.author}</span>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3 text-sm">
                      <div>
                        <span className="font-medium">Pain Level:</span> {note.painLevel}/10
                      </div>
                      <div>
                        <span className="font-medium">Sleep:</span> {note.sleepQuality}
                      </div>
                      <div>
                        <span className="font-medium">Appetite:</span> {note.appetite}
                      </div>
                      <div>
                        <span className="font-medium">Mobility:</span> {note.mobility}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div>
                        <span className="font-medium">Notes:</span>
                        <p className="text-gray-600 mt-1">{note.notes}</p>
                      </div>
                      {note.incidents && (
                        <div>
                          <span className="font-medium">Incidents:</span>
                          <p className="text-gray-600 mt-1">{note.incidents}</p>
                        </div>
                      )}
                      {note.concerns && (
                        <div className="bg-amber-50 p-3 rounded-lg">
                          <span className="font-medium text-amber-800">Concerns:</span>
                          <p className="text-amber-700 mt-1">{note.concerns}</p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              {currentUserRole !== "view-only" && (
                <Button className="w-full mt-4" onClick={() => setShowAddModal("note")}>
                  <Plus className="w-4 h-4 mr-1" />
                  Add Care Note
                </Button>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Add Modal Placeholder */}
      <Dialog open={showAddModal !== null} onOpenChange={() => setShowAddModal(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add {showAddModal}</DialogTitle>
            <DialogDescription>
              Add new {showAddModal} information for {careRecipientName}.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <p className="text-gray-600">Form for adding {showAddModal} would be implemented here.</p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddModal(null)}>
              Cancel
            </Button>
            <Button className="bg-indigo-500 hover:bg-indigo-600">Add {showAddModal}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
