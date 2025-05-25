"use client"

import { useState } from "react"
import { X } from "lucide-react"
import Link from "next/link"

export function DemoBanner() {
  const [dismissed, setDismissed] = useState(false)

  if (dismissed) {
    return null
  }

  return (
    <div className="bg-blue-50 border-b border-blue-200 py-2 px-4 text-sm text-blue-800 relative">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="font-medium">Demo Mode</span>
          <span className="hidden sm:inline">—</span>
          <span className="hidden sm:inline">
            Explore the full journey or{" "}
            <Link href="/hub" className="underline font-medium">
              skip to the hub
            </Link>
          </span>
        </div>
        <button
          onClick={() => setDismissed(true)}
          className="p-1 hover:bg-blue-100 rounded-full transition-colors"
          aria-label="Dismiss"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  )
}
