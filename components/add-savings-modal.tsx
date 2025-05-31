"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface AddSavingsModalProps {
  isOpen: boolean
  onClose: () => void
  onAdd: (savings: any) => void
}

export function AddSavingsModal({ isOpen, onClose, onAdd }: AddSavingsModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    currentValue: "",
    monthlyContribution: "",
    target: "",
    targetDate: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const savings = {
      name: formData.name,
      type: formData.type,
      currentValue: Number.parseFloat(formData.currentValue) || 0,
      monthlyContribution: Number.parseFloat(formData.monthlyContribution) || 0,
      target: Number.parseFloat(formData.target) || 0,
      targetDate: formData.targetDate,
    }

    onAdd(savings)
    setFormData({
      name: "",
      type: "",
      currentValue: "",
      monthlyContribution: "",
      target: "",
      targetDate: "",
    })
  }

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add Savings Account</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Account Name</Label>
            <Input
              id="name"
              placeholder="e.g. Stocks & Shares ISA"
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="type">Account Type</Label>
            <Select value={formData.type} onValueChange={(value) => handleChange("type", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select account type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="isa">ISA</SelectItem>
                <SelectItem value="savings">Savings Account</SelectItem>
                <SelectItem value="investment">Investment Account</SelectItem>
                <SelectItem value="premium-bonds">Premium Bonds</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="currentValue">Current Value (£)</Label>
              <Input
                id="currentValue"
                type="number"
                placeholder="15000"
                value={formData.currentValue}
                onChange={(e) => handleChange("currentValue", e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="monthlyContribution">Monthly Contribution (£)</Label>
              <Input
                id="monthlyContribution"
                type="number"
                placeholder="200"
                value={formData.monthlyContribution}
                onChange={(e) => handleChange("monthlyContribution", e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="target">Target Amount (£)</Label>
              <Input
                id="target"
                type="number"
                placeholder="20000"
                value={formData.target}
                onChange={(e) => handleChange("target", e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="targetDate">Target Date</Label>
              <Input
                id="targetDate"
                type="date"
                value={formData.targetDate}
                onChange={(e) => handleChange("targetDate", e.target.value)}
                required
              />
            </div>
          </div>

          <div className="flex gap-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" className="flex-1 bg-blue-500 hover:bg-blue-600">
              Add Savings
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
