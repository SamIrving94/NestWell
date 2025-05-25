"use client"

import { useEffect } from "react"
import { useToast } from "@/components/ui/use-toast"
import { ToastAction } from "@/components/ui/toast"

export default function InsightsPage() {
  const { toast } = useToast()

  useEffect(() => {
    // Check if toast has already been shown
    const toastShown = localStorage.getItem("nestwell-insights-toast-shown")

    if (!toastShown) {
      // Show toast only if it hasn't been shown before
      setTimeout(() => {
        toast({
          title: "You're building something strong",
          description: "Keep adding insights to strengthen your plan.",
          action: <ToastAction altText="Dismiss">Dismiss</ToastAction>,
        })

        // Set flag in localStorage to prevent showing again
        localStorage.setItem("nestwell-insights-toast-shown", "true")
      }, 2000)
    }
  }, [toast])

  return (
    <div>
      <h1>Insights Page</h1>
      <p>This is the insights page content.</p>
    </div>
  )
}
