"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
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
  CheckSquare,
  Plus,
  Clock,
  AlertTriangle,
  Calendar,
  Repeat,
  Bell,
  Filter,
  Download,
  Heart,
  Stethoscope,
  FileText,
  Home,
  Car,
  Phone,
  CheckCircle,
  Circle,
  RotateCcw,
  Trophy,
} from "lucide-react"

interface SharedTask {
  id: string
  title: string
  description: string
  category: "medical" | "legal" | "wellbeing" | "household" | "transport" | "communication"
  priority: "high" | "medium" | "low"
  status: "todo" | "in_progress" | "completed" | "overdue"
  assignedTo: string[]
  assignedBy: string
  dueDate: string
  dueTime?: string
  isRecurring: boolean
  recurrencePattern?: "daily" | "weekly" | "monthly"
  reminderEnabled: boolean
  reminderTime?: number // minutes before due time
  completedBy?: string
  completedAt?: string
  notes?: string
  createdAt: string
  lastUpdated: string
}

interface Caregiver {
  id: string
  name: string
  role: "primary_poa" | "secondary_poa" | "viewer" | "temporary"
  avatar: string
  isOnline: boolean
}

interface SharedTasksRemindersProps {
  careRecipientId: string
  careRecipientName: string
  currentUserId: string
  currentUserRole: string
}

export function SharedTasksReminders({
  careRecipientId,
  careRecipientName,
  currentUserId,
  currentUserRole,
}: SharedTasksRemindersProps) {
  const [tasks, setTasks] = useState<SharedTask[]>([])
  const [caregivers, setCaregivers] = useState<Caregiver[]>([])
  const [showAddModal, setShowAddModal] = useState(false)
  const [editingTask, setEditingTask] = useState<SharedTask | null>(null)
  const [filterCategory, setFilterCategory] = useState<string>("all")
  const [filterStatus, setFilterStatus] = useState<string>("all")
  const [filterAssignee, setFilterAssignee] = useState<string>("all")
  const [newTask, setNewTask] = useState<Partial<SharedTask>>({
    category: "medical",
    priority: "medium",
    status: "todo",
    assignedTo: [],
    isRecurring: false,
    reminderEnabled: true,
    reminderTime: 30,
  })

  // Sample data initialization
  useEffect(() => {
    setCaregivers([
      {
        id: "1",
        name: "John Smith",
        role: "primary_poa",
        avatar: "JS",
        isOnline: true,
      },
      {
        id: "2",
        name: "Mary Smith",
        role: "secondary_poa",
        avatar: "MS",
        isOnline: false,
      },
      {
        id: "3",
        name: "Sarah Jones",
        role: "viewer",
        avatar: "SJ",
        isOnline: true,
      },
      {
        id: "4",
        name: "Home Carer",
        role: "temporary",
        avatar: "HC",
        isOnline: false,
      },
    ])

    setTasks([
      {
        id: "1",
        title: "Pick up Metformin prescription",
        description: "Collect monthly prescription from Boots pharmacy",
        category: "medical",
        priority: "high",
        status: "todo",
        assignedTo: ["1"],
        assignedBy: "1",
        dueDate: "2024-02-02",
        dueTime: "16:00",
        isRecurring: true,
        recurrencePattern: "monthly",
        reminderEnabled: true,
        reminderTime: 60,
        createdAt: "2024-01-25",
        lastUpdated: "2024-01-25",
      },
      {
        id: "2",
        title: "Accompany to GP appointment",
        description: "Drive Margaret to Dr. Wilson's appointment",
        category: "transport",
        priority: "high",
        status: "todo",
        assignedTo: ["2"],
        assignedBy: "1",
        dueDate: "2024-02-02",
        dueTime: "14:00",
        isRecurring: false,
        reminderEnabled: true,
        reminderTime: 120,
        createdAt: "2024-01-28",
        lastUpdated: "2024-01-28",
      },
      {
        id: "3",
        title: "Weekly grocery shopping",
        description: "Buy groceries including fresh fruits and vegetables",
        category: "household",
        priority: "medium",
        status: "completed",
        assignedTo: ["3"],
        assignedBy: "1",
        dueDate: "2024-01-28",
        dueTime: "10:00",
        isRecurring: true,
        recurrencePattern: "weekly",
        reminderEnabled: true,
        reminderTime: 30,
        completedBy: "3",
        completedAt: "2024-01-28 09:45",
        createdAt: "2024-01-20",
        lastUpdated: "2024-01-28",
      },
      {
        id: "4",
        title: "Call about home insurance renewal",
        description: "Contact Aviva to discuss renewal options",
        category: "legal",
        priority: "medium",
        status: "overdue",
        assignedTo: ["1"],
        assignedBy: "1",
        dueDate: "2024-01-25",
        dueTime: "15:00",
        isRecurring: false,
        reminderEnabled: true,
        reminderTime: 60,
        createdAt: "2024-01-20",
        lastUpdated: "2024-01-25",
      },
      {
        id: "5",
        title: "Daily medication check",
        description: "Ensure Margaret has taken morning medications",
        category: "medical",
        priority: "high",
        status: "completed",
        assignedTo: ["4"],
        assignedBy: "1",
        dueDate: "2024-01-29",
        dueTime: "09:00",
        isRecurring: true,
        recurrencePattern: "daily",
        reminderEnabled: true,
        reminderTime: 15,
        completedBy: "4",
        completedAt: "2024-01-29 08:55",
        createdAt: "2024-01-15",
        lastUpdated: "2024-01-29",
      },
    ])
  }, [])

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "medical":
        return <Stethoscope className="w-4 h-4" />
      case "legal":
        return <FileText className="w-4 h-4" />
      case "wellbeing":
        return <Heart className="w-4 h-4" />
      case "household":
        return <Home className="w-4 h-4" />
      case "transport":
        return <Car className="w-4 h-4" />
      case "communication":
        return <Phone className="w-4 h-4" />
      default:
        return <CheckSquare className="w-4 h-4" />
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "medical":
        return "bg-red-100 text-red-800 border-red-200"
      case "legal":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "wellbeing":
        return "bg-green-100 text-green-800 border-green-200"
      case "household":
        return "bg-purple-100 text-purple-800 border-purple-200"
      case "transport":
        return "bg-orange-100 text-orange-800 border-orange-200"
      case "communication":
        return "bg-teal-100 text-teal-800 border-teal-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800 border-green-200"
      case "in_progress":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "overdue":
        return "bg-red-100 text-red-800 border-red-200"
      case "todo":
        return "bg-gray-100 text-gray-800 border-gray-200"
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

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-5 h-5 text-green-600" />
      case "in_progress":
        return <RotateCcw className="w-5 h-5 text-blue-600" />
      case "overdue":
        return <AlertTriangle className="w-5 h-5 text-red-600" />
      case "todo":
        return <Circle className="w-5 h-5 text-gray-400" />
      default:
        return <Circle className="w-5 h-5 text-gray-400" />
    }
  }

  const filteredTasks = tasks.filter((task) => {
    if (filterCategory !== "all" && task.category !== filterCategory) return false
    if (filterStatus !== "all" && task.status !== filterStatus) return false
    if (filterAssignee !== "all" && !task.assignedTo.includes(filterAssignee)) return false
    return true
  })

  const taskStats = {
    total: tasks.length,
    completed: tasks.filter((t) => t.status === "completed").length,
    overdue: tasks.filter((t) => t.status === "overdue").length,
    dueToday: tasks.filter((t) => {
      const today = new Date().toISOString().split("T")[0]
      return t.dueDate === today && t.status !== "completed"
    }).length,
  }

  const handleAddTask = () => {
    if (!newTask.title || !newTask.dueDate) return

    const task: SharedTask = {
      id: Date.now().toString(),
      title: newTask.title,
      description: newTask.description || "",
      category: newTask.category as SharedTask["category"],
      priority: newTask.priority as SharedTask["priority"],
      status: "todo",
      assignedTo: newTask.assignedTo || [],
      assignedBy: currentUserId,
      dueDate: newTask.dueDate,
      dueTime: newTask.dueTime,
      isRecurring: newTask.isRecurring || false,
      recurrencePattern: newTask.recurrencePattern,
      reminderEnabled: newTask.reminderEnabled || false,
      reminderTime: newTask.reminderTime,
      createdAt: new Date().toISOString(),
      lastUpdated: new Date().toISOString(),
    }

    setTasks((prev) => [...prev, task])
    setNewTask({
      category: "medical",
      priority: "medium",
      status: "todo",
      assignedTo: [],
      isRecurring: false,
      reminderEnabled: true,
      reminderTime: 30,
    })
    setShowAddModal(false)
  }

  const handleCompleteTask = (taskId: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId
          ? {
              ...task,
              status: "completed" as const,
              completedBy: currentUserId,
              completedAt: new Date().toISOString(),
              lastUpdated: new Date().toISOString(),
            }
          : task,
      ),
    )
  }

  const handleUpdateTaskStatus = (taskId: string, status: SharedTask["status"]) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId
          ? {
              ...task,
              status,
              lastUpdated: new Date().toISOString(),
              ...(status === "completed" && {
                completedBy: currentUserId,
                completedAt: new Date().toISOString(),
              }),
            }
          : task,
      ),
    )
  }

  const getCaregiverName = (id: string) => {
    const caregiver = caregivers.find((c) => c.id === id)
    return caregiver?.name || "Unknown"
  }

  const getCaregiverAvatar = (id: string) => {
    const caregiver = caregivers.find((c) => c.id === id)
    return caregiver?.avatar || "?"
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-semibold text-gray-800">Shared Tasks & Reminders</h2>
          <p className="text-gray-600">Coordinating care tasks for {careRecipientName}</p>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-1" />
            Export
          </Button>
          {currentUserRole !== "viewer" && (
            <Button onClick={() => setShowAddModal(true)} className="bg-indigo-500 hover:bg-indigo-600">
              <Plus className="w-4 h-4 mr-1" />
              Add Task
            </Button>
          )}
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card className="border-0 shadow-lg">
          <CardContent className="p-4 text-center">
            <CheckSquare className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-blue-700">{taskStats.total}</div>
            <div className="text-sm text-gray-600">Total Tasks</div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardContent className="p-4 text-center">
            <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-green-700">{taskStats.completed}</div>
            <div className="text-sm text-gray-600">Completed</div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardContent className="p-4 text-center">
            <AlertTriangle className="w-8 h-8 text-red-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-red-700">{taskStats.overdue}</div>
            <div className="text-sm text-gray-600">Overdue</div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardContent className="p-4 text-center">
            <Clock className="w-8 h-8 text-amber-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-amber-700">{taskStats.dueToday}</div>
            <div className="text-sm text-gray-600">Due Today</div>
          </CardContent>
        </Card>
      </div>

      {/* Overdue Tasks Alert */}
      {taskStats.overdue > 0 && (
        <Alert className="border-red-200 bg-red-50">
          <AlertTriangle className="h-4 w-4 text-red-600" />
          <AlertDescription className="text-red-800">
            <strong>{taskStats.overdue} overdue task(s)</strong> need immediate attention.
          </AlertDescription>
        </Alert>
      )}

      {/* Filters */}
      <Card className="border-0 shadow-lg">
        <CardContent className="p-4">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-gray-500" />
              <span className="text-sm font-medium">Filters:</span>
            </div>

            <Select value={filterCategory} onValueChange={setFilterCategory}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="medical">Medical</SelectItem>
                <SelectItem value="legal">Legal</SelectItem>
                <SelectItem value="wellbeing">Wellbeing</SelectItem>
                <SelectItem value="household">Household</SelectItem>
                <SelectItem value="transport">Transport</SelectItem>
                <SelectItem value="communication">Communication</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="todo">To Do</SelectItem>
                <SelectItem value="in_progress">In Progress</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="overdue">Overdue</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filterAssignee} onValueChange={setFilterAssignee}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Assignee" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Assignees</SelectItem>
                {caregivers.map((caregiver) => (
                  <SelectItem key={caregiver.id} value={caregiver.id}>
                    {caregiver.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Tasks List */}
      <div className="space-y-4">
        {filteredTasks.map((task) => (
          <Card key={task.id} className={`border-0 shadow-lg ${getPriorityColor(task.priority)}`}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4 flex-1">
                  {/* Status Icon */}
                  <button
                    onClick={() =>
                      task.status === "completed"
                        ? handleUpdateTaskStatus(task.id, "todo")
                        : handleCompleteTask(task.id)
                    }
                    disabled={currentUserRole === "viewer"}
                    className="mt-1"
                  >
                    {getStatusIcon(task.status)}
                  </button>

                  {/* Task Details */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3
                        className={`font-semibold ${task.status === "completed" ? "line-through text-gray-500" : ""}`}
                      >
                        {task.title}
                      </h3>
                      <Badge variant="outline" className={getCategoryColor(task.category)}>
                        {getCategoryIcon(task.category)}
                        <span className="ml-1 capitalize">{task.category}</span>
                      </Badge>
                      <Badge variant="outline" className={getStatusColor(task.status)}>
                        {task.status.replace("_", " ")}
                      </Badge>
                      {task.priority === "high" && (
                        <Badge variant="outline" className="bg-red-100 text-red-800 border-red-200">
                          High Priority
                        </Badge>
                      )}
                    </div>

                    <p className="text-gray-600 mb-3">{task.description}</p>

                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>
                          {new Date(task.dueDate).toLocaleDateString("en-GB")}
                          {task.dueTime && ` at ${task.dueTime}`}
                        </span>
                      </div>

                      {task.isRecurring && (
                        <div className="flex items-center gap-1">
                          <Repeat className="w-4 h-4" />
                          <span>{task.recurrencePattern}</span>
                        </div>
                      )}

                      {task.reminderEnabled && (
                        <div className="flex items-center gap-1">
                          <Bell className="w-4 h-4" />
                          <span>{task.reminderTime}min reminder</span>
                        </div>
                      )}
                    </div>

                    {/* Assigned To */}
                    <div className="flex items-center gap-2 mt-3">
                      <span className="text-sm text-gray-500">Assigned to:</span>
                      <div className="flex items-center gap-2">
                        {task.assignedTo.map((assigneeId) => (
                          <div key={assigneeId} className="flex items-center gap-1">
                            <div className="w-6 h-6 bg-indigo-100 rounded-full flex items-center justify-center text-xs font-medium text-indigo-700">
                              {getCaregiverAvatar(assigneeId)}
                            </div>
                            <span className="text-sm">{getCaregiverName(assigneeId)}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Completion Info */}
                    {task.status === "completed" && task.completedBy && (
                      <div className="flex items-center gap-2 mt-2 p-2 bg-green-50 rounded-lg">
                        <Trophy className="w-4 h-4 text-green-600" />
                        <span className="text-sm text-green-700">
                          Completed by {getCaregiverName(task.completedBy)} on{" "}
                          {task.completedAt && new Date(task.completedAt).toLocaleString("en-GB")}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Actions */}
                {currentUserRole !== "viewer" && (
                  <div className="flex gap-2">
                    {task.status !== "completed" && (
                      <Select
                        value={task.status}
                        onValueChange={(value) => handleUpdateTaskStatus(task.id, value as SharedTask["status"])}
                      >
                        <SelectTrigger className="w-32">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="todo">To Do</SelectItem>
                          <SelectItem value="in_progress">In Progress</SelectItem>
                          <SelectItem value="completed">Completed</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Add Task Modal */}
      <Dialog open={showAddModal} onOpenChange={setShowAddModal}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Add New Task</DialogTitle>
            <DialogDescription>Create a new shared task for {careRecipientName}'s care team.</DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <Label htmlFor="title">Task Title</Label>
              <Input
                id="title"
                placeholder="e.g., Pick up prescription, Call GP"
                value={newTask.title || ""}
                onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
              />
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Additional details about this task"
                value={newTask.description || ""}
                onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="category">Category</Label>
                <Select
                  value={newTask.category}
                  onValueChange={(value) => setNewTask({ ...newTask, category: value as SharedTask["category"] })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="medical">Medical</SelectItem>
                    <SelectItem value="legal">Legal</SelectItem>
                    <SelectItem value="wellbeing">Wellbeing</SelectItem>
                    <SelectItem value="household">Household</SelectItem>
                    <SelectItem value="transport">Transport</SelectItem>
                    <SelectItem value="communication">Communication</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="priority">Priority</Label>
                <Select
                  value={newTask.priority}
                  onValueChange={(value) => setNewTask({ ...newTask, priority: value as SharedTask["priority"] })}
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
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="dueDate">Due Date</Label>
                <Input
                  id="dueDate"
                  type="date"
                  value={newTask.dueDate || ""}
                  onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                />
              </div>

              <div>
                <Label htmlFor="dueTime">Due Time (Optional)</Label>
                <Input
                  id="dueTime"
                  type="time"
                  value={newTask.dueTime || ""}
                  onChange={(e) => setNewTask({ ...newTask, dueTime: e.target.value })}
                />
              </div>
            </div>

            <div>
              <Label>Assign To</Label>
              <div className="grid grid-cols-2 gap-2 mt-2">
                {caregivers.map((caregiver) => (
                  <div key={caregiver.id} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id={`assign-${caregiver.id}`}
                      checked={newTask.assignedTo?.includes(caregiver.id) || false}
                      onChange={(e) => {
                        const assignedTo = newTask.assignedTo || []
                        if (e.target.checked) {
                          setNewTask({ ...newTask, assignedTo: [...assignedTo, caregiver.id] })
                        } else {
                          setNewTask({ ...newTask, assignedTo: assignedTo.filter((id) => id !== caregiver.id) })
                        }
                      }}
                    />
                    <Label htmlFor={`assign-${caregiver.id}`} className="text-sm">
                      {caregiver.name}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label htmlFor="recurring">Recurring Task</Label>
                <Switch
                  id="recurring"
                  checked={newTask.isRecurring || false}
                  onCheckedChange={(checked) => setNewTask({ ...newTask, isRecurring: checked })}
                />
              </div>

              {newTask.isRecurring && (
                <div>
                  <Label htmlFor="recurrence">Recurrence Pattern</Label>
                  <Select
                    value={newTask.recurrencePattern}
                    onValueChange={(value) =>
                      setNewTask({ ...newTask, recurrencePattern: value as SharedTask["recurrencePattern"] })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select pattern" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}

              <div className="flex items-center justify-between">
                <Label htmlFor="reminder">Enable Reminders</Label>
                <Switch
                  id="reminder"
                  checked={newTask.reminderEnabled || false}
                  onCheckedChange={(checked) => setNewTask({ ...newTask, reminderEnabled: checked })}
                />
              </div>

              {newTask.reminderEnabled && (
                <div>
                  <Label htmlFor="reminderTime">Reminder Time (minutes before)</Label>
                  <Select
                    value={newTask.reminderTime?.toString()}
                    onValueChange={(value) => setNewTask({ ...newTask, reminderTime: Number.parseInt(value) })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="15">15 minutes</SelectItem>
                      <SelectItem value="30">30 minutes</SelectItem>
                      <SelectItem value="60">1 hour</SelectItem>
                      <SelectItem value="120">2 hours</SelectItem>
                      <SelectItem value="1440">1 day</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddModal(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddTask} className="bg-indigo-500 hover:bg-indigo-600">
              <Plus className="w-4 h-4 mr-1" />
              Add Task
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Empty State */}
      {filteredTasks.length === 0 && (
        <Card className="border-2 border-dashed border-gray-300 bg-gray-50/50">
          <CardContent className="p-12 text-center">
            <CheckSquare className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No Tasks Found</h3>
            <p className="text-gray-500 mb-6">
              {filterCategory !== "all" || filterStatus !== "all" || filterAssignee !== "all"
                ? "Try adjusting your filters to see more tasks."
                : "Start organizing care by adding your first shared task."}
            </p>
            {currentUserRole !== "viewer" && (
              <Button onClick={() => setShowAddModal(true)} className="bg-indigo-500 hover:bg-indigo-600">
                <Plus className="w-4 h-4 mr-2" />
                Add First Task
              </Button>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
