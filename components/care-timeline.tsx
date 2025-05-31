"use client"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Calendar,
  Plus,
  Edit,
  Trash2,
  Download,
  Stethoscope,
  PoundSterling,
  Gift,
  FileText,
  AlertTriangle,
  Bell,
} from "lucide-react"

interface CareEvent {
  id: string
  title: string
  description: string
  date: string
  category: "healthcare" | "financial" | "personal" | "administrative"
  priority: "high" | "medium" | "low"
  status: "upcoming" | "overdue" | "completed"
  assignedTo: string
  createdBy: string
  createdAt: string
  reminderSet: boolean
  location?: string
  provider?: string
  cost?: number
  notes?: string
}

interface CareTimelineProps {
  careRecipientId: string
  careRecipientName: string
  currentUserRole: "primary" | "secondary" | "view-only"
  events?: CareEvent[]
  onEventUpdate?: (events: CareEvent[]) => void
}

export function CareTimeline({
  careRecipientId,
  careRecipientName,
  currentUserRole,
  events: initialEvents = [],
  onEventUpdate,
}: CareTimelineProps) {
  const [events, setEvents] = useState<CareEvent[]>(initialEvents)
  const [viewMode, setViewMode] = useState<"timeline" | "list">("timeline")
  const [filterCategory, setFilterCategory] = useState<string>("all")
  const [showAddModal, setShowAddModal] = useState(false)
  const [editingEvent, setEditingEvent] = useState<CareEvent | null>(null)
  const [newEvent, setNewEvent] = useState<Partial<CareEvent>>({
    category: "healthcare",
    priority: "medium",
    assignedTo: "primary",
    reminderSet: true,
  })

  const timelineRef = useRef<HTMLDivElement>(null)

  // Sample events for demonstration
  useEffect(() => {
    if (events.length === 0) {
      const sampleEvents: CareEvent[] = [
        {
          id: "1",
          title: "GP Annual Check-up",
          description: "Routine health assessment and medication review",
          date: "2024-02-15",
          category: "healthcare",
          priority: "medium",
          status: "upcoming",
          assignedTo: "primary",
          createdBy: "John Smith",
          createdAt: "2024-01-10",
          reminderSet: true,
          provider: "Dr. Sarah Wilson",
          location: "Meadowbrook Surgery",
        },
        {
          id: "2",
          title: "Pension Annual Statement",
          description: "Review annual pension statement and tax implications",
          date: "2024-03-01",
          category: "financial",
          priority: "high",
          status: "upcoming",
          assignedTo: "primary",
          createdBy: "John Smith",
          createdAt: "2024-01-10",
          reminderSet: true,
        },
        {
          id: "3",
          title: "85th Birthday Celebration",
          description: "Family gathering and birthday celebration",
          date: "2024-04-12",
          category: "personal",
          priority: "medium",
          status: "upcoming",
          assignedTo: "secondary",
          createdBy: "Mary Smith",
          createdAt: "2024-01-15",
          reminderSet: true,
        },
        {
          id: "4",
          title: "Blue Badge Renewal",
          description: "Renew disabled parking permit",
          date: "2024-01-20",
          category: "administrative",
          priority: "high",
          status: "overdue",
          assignedTo: "primary",
          createdBy: "John Smith",
          createdAt: "2024-01-05",
          reminderSet: true,
        },
      ]
      setEvents(sampleEvents)
    }
  }, [events.length])

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "healthcare":
        return <Stethoscope className="w-4 h-4" />
      case "financial":
        return <PoundSterling className="w-4 h-4" />
      case "personal":
        return <Gift className="w-4 h-4" />
      case "administrative":
        return <FileText className="w-4 h-4" />
      default:
        return <Calendar className="w-4 h-4" />
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "healthcare":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "financial":
        return "bg-green-100 text-green-800 border-green-200"
      case "personal":
        return "bg-purple-100 text-purple-800 border-purple-200"
      case "administrative":
        return "bg-orange-100 text-orange-800 border-orange-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "overdue":
        return "bg-red-100 text-red-800 border-red-200"
      case "upcoming":
        return "bg-amber-100 text-amber-800 border-amber-200"
      case "completed":
        return "bg-green-100 text-green-800 border-green-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-50 border-red-200"
      case "medium":
        return "bg-amber-50 border-amber-200"
      case "low":
        return "bg-green-50 border-green-200"
      default:
        return "bg-gray-50 border-gray-200"
    }
  }

  const filteredEvents = events.filter((event) => {
    if (filterCategory === "all") return true
    return event.category === filterCategory
  })

  const sortedEvents = filteredEvents.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

  const upcomingEvents = events.filter((event) => {
    const eventDate = new Date(event.date)
    const today = new Date()
    const thirtyDaysFromNow = new Date(today.getTime() + 30 * 24 * 60 * 60 * 1000)
    return eventDate >= today && eventDate <= thirtyDaysFromNow && event.status === "upcoming"
  })

  const overdueEvents = events.filter((event) => event.status === "overdue")

  const handleAddEvent = () => {
    if (newEvent.title && newEvent.date) {
      const event: CareEvent = {
        id: Date.now().toString(),
        title: newEvent.title,
        description: newEvent.description || "",
        date: newEvent.date,
        category: newEvent.category as CareEvent["category"],
        priority: newEvent.priority as CareEvent["priority"],
        status: "upcoming",
        assignedTo: newEvent.assignedTo || "primary",
        createdBy: "Current User",
        createdAt: new Date().toISOString(),
        reminderSet: newEvent.reminderSet || false,
        location: newEvent.location,
        provider: newEvent.provider,
        cost: newEvent.cost,
        notes: newEvent.notes,
      }

      const updatedEvents = [...events, event]
      setEvents(updatedEvents)
      onEventUpdate?.(updatedEvents)

      setNewEvent({
        category: "healthcare",
        priority: "medium",
        assignedTo: "primary",
        reminderSet: true,
      })
      setShowAddModal(false)
    }
  }

  const handleDeleteEvent = (eventId: string) => {
    const updatedEvents = events.filter((event) => event.id !== eventId)
    setEvents(updatedEvents)
    onEventUpdate?.(updatedEvents)
  }

  const exportToCalendar = () => {
    // Generate iCal format
    let icalContent = "BEGIN:VCALENDAR\nVERSION:2.0\nPRODID:-//NestCare//Care Timeline//EN\n"

    filteredEvents.forEach((event) => {
      const eventDate = new Date(event.date)
      const dateString = eventDate.toISOString().replace(/[-:]/g, "").split("T")[0] + "T120000Z"

      icalContent += `BEGIN:VEVENT\n`
      icalContent += `UID:${event.id}@nestcare.com\n`
      icalContent += `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, "").split(".")[0]}Z\n`
      icalContent += `DTSTART:${dateString}\n`
      icalContent += `SUMMARY:${event.title}\n`
      icalContent += `DESCRIPTION:${event.description}\n`
      if (event.location) icalContent += `LOCATION:${event.location}\n`
      icalContent += `END:VEVENT\n`
    })

    icalContent += "END:VCALENDAR"

    const blob = new Blob([icalContent], { type: "text/calendar" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = `${careRecipientName}-care-timeline.ics`
    link.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-6">
      {/* Header with Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-semibold text-gray-800">Care Timeline</h2>
          <p className="text-gray-600">Managing care events for {careRecipientName}</p>
        </div>

        <div className="flex items-center gap-3">
          <Select value={filterCategory} onValueChange={setFilterCategory}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Filter by category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="healthcare">Healthcare</SelectItem>
              <SelectItem value="financial">Financial</SelectItem>
              <SelectItem value="personal">Personal</SelectItem>
              <SelectItem value="administrative">Administrative</SelectItem>
            </SelectContent>
          </Select>

          <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
            <Button
              variant={viewMode === "timeline" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("timeline")}
            >
              Timeline
            </Button>
            <Button variant={viewMode === "list" ? "default" : "ghost"} size="sm" onClick={() => setViewMode("list")}>
              List
            </Button>
          </div>

          <Button variant="outline" size="sm" onClick={exportToCalendar}>
            <Download className="w-4 h-4 mr-1" />
            Export
          </Button>

          {currentUserRole !== "view-only" && (
            <Button onClick={() => setShowAddModal(true)} className="bg-indigo-500 hover:bg-indigo-600">
              <Plus className="w-4 h-4 mr-1" />
              Add Event
            </Button>
          )}
        </div>
      </div>

      {/* Alerts for Overdue and Upcoming */}
      {(overdueEvents.length > 0 || upcomingEvents.length > 0) && (
        <div className="space-y-3">
          {overdueEvents.length > 0 && (
            <Alert className="border-red-200 bg-red-50">
              <AlertTriangle className="h-4 w-4 text-red-600" />
              <AlertDescription className="text-red-800">
                <strong>{overdueEvents.length} overdue event(s)</strong> need immediate attention.
              </AlertDescription>
            </Alert>
          )}

          {upcomingEvents.length > 0 && (
            <Alert className="border-amber-200 bg-amber-50">
              <Bell className="h-4 w-4 text-amber-600" />
              <AlertDescription className="text-amber-800">
                <strong>{upcomingEvents.length} event(s)</strong> coming up in the next 30 days.
              </AlertDescription>
            </Alert>
          )}
        </div>
      )}

      {/* Timeline View */}
      {viewMode === "timeline" && (
        <Card className="border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="relative" ref={timelineRef}>
              {/* Timeline line */}
              <div className="absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-indigo-200 via-indigo-300 to-indigo-400 rounded-full transform -translate-y-1/2" />

              {/* Timeline events */}
              <div className="flex overflow-x-auto pb-4 space-x-8 min-h-[400px]">
                {sortedEvents.map((event, index) => (
                  <div key={event.id} className="relative flex-shrink-0 w-80">
                    {/* Timeline dot */}
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
                      <div
                        className={`w-6 h-6 rounded-full border-4 border-white shadow-lg ${
                          event.status === "overdue"
                            ? "bg-red-500"
                            : event.status === "completed"
                              ? "bg-green-500"
                              : "bg-indigo-500"
                        }`}
                      />
                    </div>

                    {/* Event card */}
                    <Card
                      className={`border-0 shadow-lg transition-all duration-300 hover:shadow-xl ${
                        index % 2 === 0 ? "mt-16" : "mb-16"
                      } ${getPriorityColor(event.priority)}`}
                    >
                      <CardContent className="pt-6">
                        <div className="text-center space-y-3">
                          {/* Category icon */}
                          <div className="w-12 h-12 mx-auto bg-white rounded-full flex items-center justify-center shadow-sm">
                            {getCategoryIcon(event.category)}
                          </div>

                          {/* Date */}
                          <div className="text-sm font-medium text-gray-600">
                            {new Date(event.date).toLocaleDateString("en-GB", {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            })}
                          </div>

                          {/* Title and description */}
                          <div>
                            <h3 className="font-semibold text-gray-800 mb-1">{event.title}</h3>
                            <p className="text-sm text-gray-600 mb-3">{event.description}</p>
                          </div>

                          {/* Badges */}
                          <div className="space-y-2">
                            <Badge variant="outline" className={getCategoryColor(event.category)}>
                              {event.category}
                            </Badge>
                            <Badge variant="outline" className={getStatusColor(event.status)}>
                              {event.status}
                            </Badge>
                            {event.priority === "high" && (
                              <Badge variant="outline" className="bg-red-100 text-red-800 border-red-200">
                                High Priority
                              </Badge>
                            )}
                          </div>

                          {/* Additional info */}
                          {(event.provider || event.location) && (
                            <div className="text-xs text-gray-500 space-y-1">
                              {event.provider && <div>Provider: {event.provider}</div>}
                              {event.location && <div>Location: {event.location}</div>}
                            </div>
                          )}

                          {/* Actions */}
                          {currentUserRole !== "view-only" && (
                            <div className="flex gap-2 justify-center">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => setEditingEvent(event)}
                                className="text-xs"
                              >
                                <Edit className="w-3 h-3" />
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleDeleteEvent(event.id)}
                                className="text-xs text-red-600 hover:text-red-700"
                              >
                                <Trash2 className="w-3 h-3" />
                              </Button>
                            </div>
                          )}

                          {/* Reminder indicator */}
                          {event.reminderSet && (
                            <div className="flex items-center justify-center gap-1 text-xs text-indigo-600">
                              <Bell className="w-3 h-3" />
                              Reminder set
                            </div>
                          )}

                          {/* Assigned to */}
                          <div className="text-xs text-gray-500">
                            Assigned to: {event.assignedTo === "primary" ? "Primary Carer" : "Secondary Carer"}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* List View */}
      {viewMode === "list" && (
        <div className="space-y-4">
          {sortedEvents.map((event) => (
            <Card key={event.id} className={`border-0 shadow-lg ${getPriorityColor(event.priority)}`}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm">
                      {getCategoryIcon(event.category)}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">{event.title}</h3>
                      <p className="text-sm text-gray-600">{event.description}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-sm text-gray-500">
                          {new Date(event.date).toLocaleDateString("en-GB")}
                        </span>
                        {event.provider && <span className="text-sm text-gray-500">• {event.provider}</span>}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="space-y-1">
                      <Badge variant="outline" className={getCategoryColor(event.category)}>
                        {event.category}
                      </Badge>
                      <Badge variant="outline" className={getStatusColor(event.status)}>
                        {event.status}
                      </Badge>
                    </div>

                    {currentUserRole !== "view-only" && (
                      <div className="flex gap-1">
                        <Button size="sm" variant="outline" onClick={() => setEditingEvent(event)}>
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDeleteEvent(event.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Add Event Modal */}
      <Dialog open={showAddModal} onOpenChange={setShowAddModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add Care Event</DialogTitle>
            <DialogDescription>Create a new event in {careRecipientName}'s care timeline.</DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <Label htmlFor="title">Event Title</Label>
              <Input
                id="title"
                placeholder="e.g., GP Appointment, Pension Review"
                value={newEvent.title || ""}
                onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
              />
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Additional details about this event"
                value={newEvent.description || ""}
                onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="date">Date</Label>
                <Input
                  id="date"
                  type="date"
                  value={newEvent.date || ""}
                  onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                />
              </div>

              <div>
                <Label htmlFor="category">Category</Label>
                <Select
                  value={newEvent.category}
                  onValueChange={(value) => setNewEvent({ ...newEvent, category: value as CareEvent["category"] })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="healthcare">Healthcare</SelectItem>
                    <SelectItem value="financial">Financial</SelectItem>
                    <SelectItem value="personal">Personal</SelectItem>
                    <SelectItem value="administrative">Administrative</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="priority">Priority</Label>
                <Select
                  value={newEvent.priority}
                  onValueChange={(value) => setNewEvent({ ...newEvent, priority: value as CareEvent["priority"] })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="assignedTo">Assigned To</Label>
                <Select
                  value={newEvent.assignedTo}
                  onValueChange={(value) => setNewEvent({ ...newEvent, assignedTo: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="primary">Primary Carer</SelectItem>
                    <SelectItem value="secondary">Secondary Carer</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="provider">Provider/Contact (Optional)</Label>
              <Input
                id="provider"
                placeholder="e.g., Dr. Smith, Pension Office"
                value={newEvent.provider || ""}
                onChange={(e) => setNewEvent({ ...newEvent, provider: e.target.value })}
              />
            </div>

            <div>
              <Label htmlFor="location">Location (Optional)</Label>
              <Input
                id="location"
                placeholder="e.g., Surgery, Home, Phone call"
                value={newEvent.location || ""}
                onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
              />
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setShowAddModal(false)}>
              Cancel
            </Button>
            <Button type="button" onClick={handleAddEvent} className="bg-indigo-500 hover:bg-indigo-600">
              Add Event
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Empty State */}
      {sortedEvents.length === 0 && (
        <Card className="border-2 border-dashed border-gray-300 bg-gray-50/50">
          <CardContent className="p-12 text-center">
            <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No Events Yet</h3>
            <p className="text-gray-500 mb-6">Start building {careRecipientName}'s care timeline by adding events.</p>
            {currentUserRole !== "view-only" && (
              <Button onClick={() => setShowAddModal(true)} className="bg-indigo-500 hover:bg-indigo-600">
                <Plus className="w-4 h-4 mr-2" />
                Add First Event
              </Button>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
