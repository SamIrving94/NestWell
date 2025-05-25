"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"

export function TimelinePlanner() {
  const [viewMode, setViewMode] = useState<"age" | "lifestage">("age")

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex gap-2">
          <Button
            variant={viewMode === "age" ? "default" : "outline"}
            size="sm"
            onClick={() => setViewMode("age")}
            className={viewMode === "age" ? "bg-amber-500 hover:bg-amber-600" : ""}
          >
            By Age
          </Button>
          <Button
            variant={viewMode === "lifestage" ? "default" : "outline"}
            size="sm"
            onClick={() => setViewMode("lifestage")}
            className={viewMode === "lifestage" ? "bg-amber-500 hover:bg-amber-600" : ""}
          >
            By Life Stage
          </Button>
        </div>
      </div>

      <div className="bg-amber-50 p-6 rounded-lg border border-amber-200 text-center">
        <p className="text-amber-800">
          Your timeline is ready to be built! Add key milestones and planning events to create your personalized
          roadmap.
        </p>
        <Button className="mt-4 bg-amber-500 hover:bg-amber-600">Add Your First Milestone</Button>
      </div>
    </div>
  )
}
