"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
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

interface AddMilestoneModalProps {
  isOpen: boolean
  onClose: () => void
  onAdd: (milestone: any) => void
  currentAge: number
}

export function AddMilestoneModal({ isOpen, onClose, onAdd, currentAge }: AddMilestoneModalProps) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    age: currentAge + 1,
    category: "lifestyle",
    icon: "🎯",
  })

  const categoryOptions = [
    { value: "financial", label: "Financial", icon: "💰" },
    { value: "health", label: "Health", icon: "🏥" },
    { value: "lifestyle", label: "Lifestyle", icon: "🎨" },
    { value: "family", label: "Family", icon: "👨‍👩‍👧‍👦" },
    { value: "care", label: "Care", icon: "🤝" },
    { value: "legacy", label: "Legacy", icon: "🌟" },
    { value: "personal", label: "Personal", icon: "🎯" },
  ]

  const iconOptions = ["🎯", "🎉", "🏖️", "🏠", "✈️", "📚", "🎨", "🌱", "💝", "🌟", "🎭", "🏆"]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.title && formData.description) {
      onAdd({
        ...formData,
        year: new Date().getFullYear() + (formData.age - currentAge),
      })
      setFormData({
        title: "",
        description: "",
        age: currentAge + 1,
        category: "lifestyle",
        icon: "🎯",
      })
      onClose()
    }
  }

  const handleCategoryChange = (category: string) => {
    const categoryOption = categoryOptions.find((opt) => opt.value === category)
    setFormData({
      ...formData,
      category,
      icon: categoryOption?.icon || "🎯",
    })
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add a Personal Milestone</DialogTitle>
          <DialogDescription>Create a custom event that's meaningful to your journey.</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="title">Milestone Title</Label>
            <Input
              id="title"
              placeholder="e.g., First grandchild born, Move to seaside"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
            />
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="What makes this milestone special to you?"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="age">Age</Label>
              <Input
                id="age"
                type="number"
                min={currentAge}
                max={currentAge + 30}
                value={formData.age}
                onChange={(e) => setFormData({ ...formData, age: Number.parseInt(e.target.value) })}
                required
              />
            </div>

            <div>
              <Label htmlFor="category">Category</Label>
              <Select value={formData.category} onValueChange={handleCategoryChange}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {categoryOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.icon} {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label>Choose an Icon</Label>
            <div className="grid grid-cols-6 gap-2 mt-2">
              {iconOptions.map((icon) => (
                <button
                  key={icon}
                  type="button"
                  onClick={() => setFormData({ ...formData, icon })}
                  className={`p-2 text-xl rounded-md border-2 transition-colors ${
                    formData.icon === icon ? "border-amber-500 bg-amber-50" : "border-gray-200 hover:border-amber-300"
                  }`}
                >
                  {icon}
                </button>
              ))}
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" className="bg-amber-500 hover:bg-amber-600 text-white">
              Add Milestone
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
