"use client"

import type React from "react"

import { useState } from "react"
import { RoleSwitcher } from "@/components/role-switcher"
import { RoleContextBanner } from "@/components/role-context-banner"
import { Heart } from "lucide-react"

interface NestCareLayoutProps {
  children: React.ReactNode
}

export default function NestCareLayout({ children }: NestCareLayoutProps) {
  const [currentRole, setCurrentRole] = useState<"self" | "carer">("carer")
  const [currentProfileId, setCurrentProfileId] = useState<string>("1") // Default to first profile
  const [lastAction, setLastAction] = useState<string | undefined>()
  const [lastActionTime, setLastActionTime] = useState<string | undefined>()

  // Mock current user
  const currentUser = {
    id: "user1",
    name: "John Smith",
    email: "john.smith@example.com",
  }

  // Mock care recipient data based on currentProfileId
  const careRecipients = {
    "1": {
      name: "Margaret Thompson",
      relationship: "Mother",
      role: "primary_poa" as const,
    },
    "2": {
      name: "Robert Thompson",
      relationship: "Father",
      role: "primary_poa" as const,
    },
  }

  const handleRoleChange = (role: "self" | "carer", profileId?: string) => {
    setCurrentRole(role)
    if (role === "carer" && profileId) {
      setCurrentProfileId(profileId)
      // Log the action
      setLastAction("Switched to care profile")
      setLastActionTime(new Date().toLocaleTimeString())
    }
  }

  // Get current care recipient based on profileId
  const currentCareRecipient = currentProfileId
    ? careRecipients[currentProfileId as keyof typeof careRecipients]
    : undefined

  return (
    <div className={currentRole === "carer" ? "nestcare-theme" : ""}>
      {/* Role Context Banner */}
      <RoleContextBanner
        currentRole={currentRole}
        careRecipient={currentCareRecipient}
        lastAction={lastAction}
        lastActionTime={lastActionTime}
      />

      {/* Header with Role Switcher */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-30">
        <div className="container mx-auto py-4 px-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center">
                  <Heart className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-semibold">NestCare</span>
              </div>
            </div>

            <RoleSwitcher
              currentUser={currentUser}
              onRoleChange={handleRoleChange}
              currentRole={currentRole}
              currentProfileId={currentProfileId}
            />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main>{children}</main>
    </div>
  )
}
