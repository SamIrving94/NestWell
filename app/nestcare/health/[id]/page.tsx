"use client"

import { HealthProfileMonitoring } from "@/components/health-profile-monitoring"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

interface HealthPageProps {
  params: {
    id: string
  }
}

export default function HealthPage({ params }: HealthPageProps) {
  // Mock data - in real app, fetch based on params.id
  const careRecipient = {
    id: params.id,
    name: "Margaret Thompson",
    relationship: "Mother",
  }

  const currentUserRole = "primary" as const

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-30">
        <div className="container mx-auto py-4 px-4">
          <div className="flex items-center gap-4">
            <Link href="/nestcare">
              <Button variant="outline" size="sm">
                <ArrowLeft className="w-4 h-4 mr-1" />
                Back to NestCare
              </Button>
            </Link>
            <div>
              <h1 className="text-xl font-semibold">Health Profile</h1>
              <p className="text-sm text-gray-600">Managing health information for {careRecipient.name}</p>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto py-8 px-4">
        <HealthProfileMonitoring
          careRecipientId={careRecipient.id}
          careRecipientName={careRecipient.name}
          currentUserRole={currentUserRole}
        />
      </div>
    </div>
  )
}
