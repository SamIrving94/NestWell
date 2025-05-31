"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface AddPensionModalProps {
  isOpen: boolean
  onClose: () => void
  onAdd: (pension: any) => void
}

export function AddPensionModal({ isOpen, onClose, onAdd }: AddPensionModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    provider: "",
    currentValue: "",
    monthlyContribution: "",
    employerContribution: "",
    startAge: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const pension = {
      name: formData.name,
      type: formData.type,
      provider: formData.provider,
      currentValue: Number.parseFloat(formData.currentValue) || 0,
      monthlyContribution: Number.parseFloat(formData.monthlyContribution) || 0,
      employerContribution: Number.parseFloat(formData.employerContribution) || 0,
      startAge: Number.parseInt(formData.startAge) || 25,
      currentAge: 52, // This would come from user profile
    }

    onAdd(pension)
    setFormData({
      name: "",
      type: "",
      provider: "",
      currentValue: "",
      monthlyContribution: "",
      employerContribution: "",
      startAge: "",
    })
  }

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add Pension Account</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Pension Name</Label>
            <Input
              id="name"
              placeholder="e.g. Current Workplace Pension"
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="type">Pension Type</Label>
            <Select value={formData.type} onValueChange={(value) => handleChange("type", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select pension type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="workplace">Workplace Pension</SelectItem>
                <SelectItem value="private">Private Pension</SelectItem>
                <SelectItem value="sipp">SIPP</SelectItem>
                <SelectItem value="state">State Pension</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="provider">Provider</Label>
            <Input
              id="provider"
              placeholder="e.g. Aviva, Scottish Widows"
              value={formData.provider}
              onChange={(e) => handleChange("provider", e.target.value)}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="currentValue">Current Value (£)</Label>
              <Input
                id="currentValue"
                type="number"
                placeholder="45000"
                value={formData.currentValue}
                onChange={(e) => handleChange("currentValue", e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="startAge">Started at Age</Label>
              <Input
                id="startAge"
                type="number"
                placeholder="25"
                value={formData.startAge}
                onChange={(e) => handleChange("startAge", e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="monthlyContribution">Your Monthly Contribution (£)</Label>
              <Input
                id="monthlyContribution"
                type="number"
                placeholder="350"
                value={formData.monthlyContribution}
                onChange={(e) => handleChange("monthlyContribution", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="employerContribution">Employer Contribution (£)</Label>
              <Input
                id="employerContribution"
                type="number"
                placeholder="175"
                value={formData.employerContribution}
                onChange={(e) => handleChange("employerContribution", e.target.value)}
              />
            </div>
          </div>

          <div className="flex gap-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" className="flex-1 bg-teal-500 hover:bg-teal-600">
              Add Pension
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
