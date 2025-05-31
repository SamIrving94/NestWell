"use client"

import { useEffect, useState } from "react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Shield, Heart, AlertTriangle } from "lucide-react"

interface RoleContextBannerProps {
  currentRole: "self" | "carer"
  careRecipient?: {
    name: string
    relationship: string
    role: "primary_poa" | "secondary_poa" | "viewer" | "temporary"
  }
  lastAction?: string
  lastActionTime?: string
}

export function RoleContextBanner({ currentRole, careRecipient, lastAction, lastActionTime }: RoleContextBannerProps) {
  const [showBanner, setShowBanner] = useState(true)
  const [showActionAlert, setShowActionAlert] = useState(false)

  // Show action alert when a significant action is performed
  useEffect(() => {
    if (lastAction && lastActionTime) {
      setShowActionAlert(true)
      const timer = setTimeout(() => {
        setShowActionAlert(false)
      }, 5000) // Hide after 5 seconds
      return () => clearTimeout(timer)
    }
  }, [lastAction, lastActionTime])

  if (currentRole !== "carer" || !careRecipient || !showBanner) return null

  const getBannerColor = (role: string) => {
    switch (role) {
      case "primary_poa":
        return "bg-indigo-500 text-white"
      case "secondary_poa":
        return "bg-green-500 text-white"
      case "viewer":
        return "bg-purple-500 text-white"
      case "temporary":
        return "bg-orange-500 text-white"
      default:
        return "bg-gray-500 text-white"
    }
  }

  const getRoleIcon = (role: string) => {
    switch (role) {
      case "primary_poa":
      case "secondary_poa":
        return <Shield className="w-4 h-4" />
      default:
        return <Heart className="w-4 h-4" />
    }
  }

  return (
    <>
      {/* Persistent Role Banner */}
      <div className={`py-2 px-4 text-center text-sm ${getBannerColor(careRecipient.role)}`}>
        <div className="container mx-auto flex items-center justify-center gap-2">
          {getRoleIcon(careRecipient.role)}
          <span>
            You're currently supporting <strong>{careRecipient.name}</strong> as{" "}
            {careRecipient.role === "primary_poa"
              ? "Primary POA"
              : careRecipient.role === "secondary_poa"
                ? "Secondary POA"
                : careRecipient.role === "temporary"
                  ? "Temporary Helper"
                  : "a Viewer"}
          </span>
        </div>
      </div>

      {/* Action Alert */}
      {showActionAlert && (
        <Alert className="rounded-none border-t-0 border-x-0">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            <strong>{lastAction}</strong> for {careRecipient.name} at {lastActionTime}
          </AlertDescription>
        </Alert>
      )}
    </>
  )
}
