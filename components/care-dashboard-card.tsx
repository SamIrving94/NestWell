"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, Calendar, TrendingUp, Clock, Eye, FileText, Heart } from "lucide-react"

interface CareRecipient {
  id: string
  name: string
  relationship: string
  status: string
  lastUpdate: string
  healthStatus: "stable" | "needs-attention" | "critical"
  urgentTasks: number
  upcomingAppointments: number
  avatar: string
}

interface CareDashboardCardProps {
  recipient: CareRecipient
  onViewDetails: (id: string) => void
}

export function CareDashboardCard({ recipient, onViewDetails }: CareDashboardCardProps) {
  const getHealthStatusColor = (status: string) => {
    switch (status) {
      case "stable":
        return "bg-green-50 text-green-700 border-green-200"
      case "needs-attention":
        return "bg-amber-50 text-amber-700 border-amber-200"
      case "critical":
        return "bg-red-50 text-red-700 border-red-200"
      default:
        return "bg-gray-50 text-gray-700 border-gray-200"
    }
  }

  return (
    <Card className="border-0 shadow-lg bg-white/95 backdrop-blur-sm hover:shadow-xl transition-shadow">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-700 font-semibold text-lg">
              {recipient.avatar}
            </div>
            <div>
              <CardTitle className="text-xl">{recipient.name}</CardTitle>
              <p className="text-gray-600">{recipient.relationship}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className={getHealthStatusColor(recipient.healthStatus)}>
              {recipient.healthStatus.replace("-", " ")}
            </Badge>
            <Button size="sm" className="bg-indigo-500 hover:bg-indigo-600" onClick={() => onViewDetails(recipient.id)}>
              <Eye className="w-4 h-4 mr-1" />
              View Details
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        {/* Quick Status Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-red-50 p-4 rounded-lg border border-red-100">
            <div className="flex items-center gap-2 mb-1">
              <AlertTriangle className="w-4 h-4 text-red-600" />
              <span className="text-sm font-medium text-red-800">Urgent</span>
            </div>
            <div className="text-2xl font-bold text-red-700">{recipient.urgentTasks}</div>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
            <div className="flex items-center gap-2 mb-1">
              <Calendar className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-medium text-blue-800">Upcoming</span>
            </div>
            <div className="text-2xl font-bold text-blue-700">{recipient.upcomingAppointments}</div>
          </div>

          <div className="bg-green-50 p-4 rounded-lg border border-green-100">
            <div className="flex items-center gap-2 mb-1">
              <TrendingUp className="w-4 h-4 text-green-600" />
              <span className="text-sm font-medium text-green-800">Financial</span>
            </div>
            <div className="text-lg font-bold text-green-700">Good</div>
          </div>

          <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
            <div className="flex items-center gap-2 mb-1">
              <Clock className="w-4 h-4 text-purple-600" />
              <span className="text-sm font-medium text-purple-800">Updated</span>
            </div>
            <div className="text-sm font-medium text-purple-700">{recipient.lastUpdate}</div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex flex-wrap gap-3">
          <Button variant="outline" size="sm">
            <FileText className="w-4 h-4 mr-1" />
            Documents
          </Button>
          <Button variant="outline" size="sm">
            <Calendar className="w-4 h-4 mr-1" />
            Timeline
          </Button>
          <Button variant="outline" size="sm">
            <Heart className="w-4 h-4 mr-1" />
            Health
          </Button>
          <Button variant="outline" size="sm">
            <TrendingUp className="w-4 h-4 mr-1" />
            Finances
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
