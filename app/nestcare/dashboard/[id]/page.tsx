"use client"

import { CareDashboard } from "@/components/care-dashboard"
import Link from "next/link"
import { ArrowLeft, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"

interface PageProps {
  params: {
    id: string
  }
}

export default function CareDashboardPage({ params }: PageProps) {
  // In real app, fetch recipient data based on ID
  const recipient = {
    id: params.id,
    name: "Margaret Thompson",
    relationship: "Mother",
    avatar: "MT",
    lastUpdate: "2 hours ago",
    emergencyContact: "John (Son)",
    address: "15 Oak Street, Manchester",
  }

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
            <div className="flex items-center gap-2">
              <Heart className="w-6 h-6 text-indigo-600" />
              <span className="text-xl font-semibold">{recipient.name}'s Care Dashboard</span>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto py-8 px-4">
        <CareDashboard recipient={recipient} />
      </div>
    </div>
  )
}
