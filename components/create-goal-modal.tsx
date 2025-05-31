"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"

interface CreateGoalModalProps {
  isOpen: boolean
  onClose: () => void
  onCreate: (goal: any) => void
}

export function CreateGoalModal({ isOpen, onClose, onCreate }: CreateGoalModalProps) {
  const [formData, setFormData] = useState({
    title: "",
    targetAmount: "",
    currentValue: "",
    targetAge: "",
    priority: "",
    linkedToTimeline: false,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const goal = {
      title: formData.title,
      targetAmount: Number.parseFloat(formData.targetAmount) || 0,
      currentValue: Number.parseFloat(formData.currentValue) || 0,
      targetAge: Number.parseInt(formData.targetAge) || 65,
      priority: formData.priority,
      linkedToTimeline: formData.linkedToTimeline,
    }

    onCreate(goal)
    setFormData({
      title: "",
      targetAmount: "",
      currentValue: "",
      targetAge: "",
      priority: "",
      linkedToTimeline: false,
    })
  }

  const handleChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create Savings Goal</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Goal Title</Label>
            <Input
              id="title"
              placeholder="e.g. Build Long-term Care Buffer"
              value={formData.title}
              onChange={(e) => handleChange("title", e.target.value)}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="targetAmount">Target Amount (£)</Label>
              <Input
                id="targetAmount"
                type="number"
                placeholder="50000"
                value={formData.targetAmount}
                onChange={(e) => handleChange("targetAmount", e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="currentValue">Current Value (£)</Label>
              <Input
                id="currentValue"
                type="number"
                placeholder="8000"
                value={formData.currentValue}
                onChange={(e) => handleChange("currentValue", e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="targetAge">Target Age</Label>
              <Input
                id="targetAge"
                type="number"
                placeholder="75"
                value={formData.targetAge}
                onChange={(e) => handleChange("targetAge", e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="priority">Priority</Label>
              <Select value={formData.priority} onValueChange={(value) => handleChange("priority", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="linkedToTimeline"
              checked={formData.linkedToTimeline}
              onCheckedChange={(checked) => handleChange("linkedToTimeline", checked as boolean)}
            />
            <Label htmlFor="linkedToTimeline" className="text-sm">
              Add this goal to my timeline planner
            </Label>
          </div>

          <div className="flex gap-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" className="flex-1 bg-purple-500 hover:bg-purple-600">
              Create Goal
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
