"use client"

import { DocumentVault } from "@/components/document-vault"
import Link from "next/link"
import { ArrowLeft, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"

interface PageProps {
  params: {
    id: string
  }
}

export default function DocumentsPage({ params }: PageProps) {
  const recipient = {
    id: params.id,
    name: "Margaret Thompson",
    relationship: "Mother",
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-30">
        <div className="container mx-auto py-4 px-4">
          <div className="flex items-center gap-4">
            <Link href={`/nestcare/dashboard/${params.id}`}>
              <Button variant="outline" size="sm">
                <ArrowLeft className="w-4 h-4 mr-1" />
                Back to Dashboard
              </Button>
            </Link>
            <div className="flex items-center gap-2">
              <FileText className="w-6 h-6 text-blue-600" />
              <span className="text-xl font-semibold">Document Vault - {recipient.name}</span>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto py-8 px-4">
        <DocumentVault recipientId={params.id} />
      </div>
    </div>
  )
}
