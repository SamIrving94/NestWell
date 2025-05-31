"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import Link from "next/link"
import {
  Users,
  Shield,
  Heart,
  FileText,
  Calendar,
  TrendingUp,
  AlertTriangle,
  Settings,
  Plus,
  Eye,
  Clock,
} from "lucide-react"
import { useRouter } from "next/navigation"

export default function NestCarePage() {
  const router = useRouter()
  const [activeRole, setActiveRole] = useState<"self" | "carer">("carer")
  const [careRecipients, setCareRecipients] = useState([
    {
      id: "1",
      name: "Margaret Thompson",
      relationship: "Mother",
      status: "active",
      lastUpdate: "2 days ago",
      healthStatus: "stable",
      urgentTasks: 2,
      upcomingAppointments: 1,
      avatar: "MT",
    },
  ])

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header with Role Switching */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-30">
        <div className="container mx-auto py-4 px-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <Link href="/hub" className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center">
                  <Heart className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-semibold">NestCare</span>
              </Link>

              {/* Role Switcher */}
              <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
                <Button
                  variant={activeRole === "self" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setActiveRole("self")}
                  className="text-xs"
                >
                  My Planning
                </Button>
                <Button
                  variant={activeRole === "carer" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setActiveRole("carer")}
                  className="text-xs bg-indigo-500 hover:bg-indigo-600"
                >
                  <Users className="w-3 h-3 mr-1" />
                  Caring For
                </Button>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                <Shield className="w-3 h-3 mr-1" />
                POA Active
              </Badge>
              <Button variant="outline" size="sm">
                <Settings className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto py-8 px-4">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-serif font-semibold text-gray-800 mb-2">NestCare Overview</h1>
          <p className="text-gray-600 text-lg">Manage care for all your loved ones from one place</p>
        </div>

        {/* Care Recipients Overview */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">People You're Caring For</h2>
        </div>
        <div className="grid gap-6 mb-8">
          {careRecipients.map((recipient) => (
            <Card key={recipient.id} className="border-0 shadow-lg bg-white/95 backdrop-blur-sm">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-700 font-semibold">
                      {recipient.avatar}
                    </div>
                    <div>
                      <CardTitle className="text-xl">{recipient.name}</CardTitle>
                      <p className="text-gray-600">{recipient.relationship}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge
                      variant="outline"
                      className={
                        recipient.healthStatus === "stable"
                          ? "bg-green-50 text-green-700 border-green-200"
                          : "bg-amber-50 text-amber-700 border-amber-200"
                      }
                    >
                      {recipient.healthStatus}
                    </Badge>
                    <Button
                      size="sm"
                      className="bg-indigo-500 hover:bg-indigo-600"
                      onClick={() => router.push(`/nestcare/dashboard/${recipient.id}`)}
                    >
                      <Eye className="w-4 h-4 mr-1" />
                      View Details
                    </Button>
                  </div>
                </div>
              </CardHeader>

              <CardContent>
                {/* Quick Status Grid */}
                <div className="grid md:grid-cols-4 gap-4 mb-6">
                  <div className="bg-red-50 p-4 rounded-lg border border-red-100">
                    <div className="flex items-center gap-2 mb-1">
                      <AlertTriangle className="w-4 h-4 text-red-600" />
                      <span className="text-sm font-medium text-red-800">Urgent Tasks</span>
                    </div>
                    <div className="text-2xl font-bold text-red-700">{recipient.urgentTasks}</div>
                  </div>

                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                    <div className="flex items-center gap-2 mb-1">
                      <Calendar className="w-4 h-4 text-blue-600" />
                      <span className="text-sm font-medium text-blue-800">Appointments</span>
                    </div>
                    <div className="text-2xl font-bold text-blue-700">{recipient.upcomingAppointments}</div>
                  </div>

                  <div className="bg-green-50 p-4 rounded-lg border border-green-100">
                    <div className="flex items-center gap-2 mb-1">
                      <TrendingUp className="w-4 h-4 text-green-600" />
                      <span className="text-sm font-medium text-green-800">Financial Health</span>
                    </div>
                    <div className="text-lg font-bold text-green-700">Good</div>
                  </div>

                  <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
                    <div className="flex items-center gap-2 mb-1">
                      <Clock className="w-4 h-4 text-purple-600" />
                      <span className="text-sm font-medium text-purple-800">Last Update</span>
                    </div>
                    <div className="text-sm font-medium text-purple-700">{recipient.lastUpdate}</div>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="flex flex-wrap gap-3">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => router.push(`/nestcare/documents/${recipient.id}`)}
                  >
                    <FileText className="w-4 h-4 mr-1" />
                    Documents
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => router.push(`/nestcare/timeline/${recipient.id}`)}>
                    <Calendar className="w-4 h-4 mr-1" />
                    Timeline
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => router.push(`/nestcare/health/${recipient.id}`)}>
                    <Heart className="w-4 h-4 mr-1" />
                    Health Profile
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => router.push(`/nestcare/dashboard/${recipient.id}`)}
                  >
                    <TrendingUp className="w-4 h-4 mr-1" />
                    Finances
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Feature Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="health">Health</TabsTrigger>
            <TabsTrigger value="finances">Finances</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
            <TabsTrigger value="timeline">Timeline</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Recent Activity */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="w-5 h-5" />
                    Recent Activity
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">GP appointment scheduled</p>
                        <p className="text-xs text-gray-600">Tomorrow at 2:30 PM</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">Pension payment received</p>
                        <p className="text-xs text-gray-600">£1,247.50 - 2 days ago</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-amber-50 rounded-lg">
                      <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">Insurance renewal due</p>
                        <p className="text-xs text-gray-600">Home insurance - Next week</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* AI Assistant for Carers */}
              <Card className="border-0 shadow-lg bg-gradient-to-br from-indigo-50 to-purple-50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Heart className="w-5 h-5 text-indigo-600" />
                    Care Assistant
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <Alert>
                      <AlertTriangle className="h-4 w-4" />
                      <AlertDescription>
                        Margaret's GP appointment is tomorrow. Consider preparing a list of current medications and any
                        concerns.
                      </AlertDescription>
                    </Alert>

                    <div className="space-y-2">
                      <p className="text-sm font-medium text-gray-700">Suggested actions:</p>
                      <Button variant="outline" size="sm" className="w-full justify-start">
                        Review medication list
                      </Button>
                      <Button variant="outline" size="sm" className="w-full justify-start">
                        Check insurance coverage
                      </Button>
                      <Button variant="outline" size="sm" className="w-full justify-start">
                        Update emergency contacts
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="health">
            <Card className="border-0 shadow-lg">
              <CardContent className="p-8 text-center">
                <Heart className="w-16 h-16 text-indigo-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Health Profile & Monitoring</h3>
                <p className="text-gray-600 mb-6">
                  Track conditions, medications, appointments, and care notes for your loved one.
                </p>
                <Button
                  className="bg-indigo-500 hover:bg-indigo-600"
                  onClick={() => router.push(`/nestcare/health/${careRecipients[0]?.id}`)}
                >
                  <Eye className="w-4 h-4 mr-2" />
                  View Health Profile
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="finances">
            <Card className="border-0 shadow-lg">
              <CardContent className="p-8 text-center">
                <TrendingUp className="w-16 h-16 text-green-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Financial Overview</h3>
                <p className="text-gray-600 mb-6">
                  Simplified view of pensions, savings, and care costs for decision-making.
                </p>
                <Button
                  className="bg-green-500 hover:bg-green-600"
                  onClick={() => router.push(`/nestcare/dashboard/${careRecipients[0]?.id}`)}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Financial Information
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="documents">
            <Card className="border-0 shadow-lg">
              <CardContent className="p-8 text-center">
                <FileText className="w-16 h-16 text-blue-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Document Vault</h3>
                <p className="text-gray-600 mb-6">
                  Securely store POA documents, wills, insurance policies, and care agreements.
                </p>
                <Button
                  className="bg-blue-500 hover:bg-blue-600"
                  onClick={() => router.push(`/nestcare/documents/${careRecipients[0]?.id}`)}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Upload Documents
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="timeline">
            <Card className="border-0 shadow-lg">
              <CardContent className="p-8 text-center">
                <Calendar className="w-16 h-16 text-purple-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Care Timeline</h3>
                <p className="text-gray-600 mb-6">
                  Track medical events, care transitions, and financial obligations with shared calendar access.
                </p>
                <Button
                  className="bg-purple-500 hover:bg-purple-600"
                  onClick={() => router.push(`/nestcare/timeline/${careRecipients[0]?.id}`)}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Create Timeline
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Add New Care Recipient */}
        <Card className="border-2 border-dashed border-gray-300 bg-gray-50/50 mt-8">
          <CardContent className="p-8 text-center">
            <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Add Someone to Care For</h3>
            <p className="text-gray-600 mb-4">
              Invite a family member or set up care management for someone who has granted you POA access.
            </p>
            <Button className="bg-indigo-500 hover:bg-indigo-600">
              <Plus className="w-4 h-4 mr-2" />
              Add Care Recipient
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
