"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  FileText,
  Upload,
  Download,
  Eye,
  Search,
  Shield,
  AlertTriangle,
  Calendar,
  Archive,
  Lock,
  Clock,
  Tag,
  Filter,
} from "lucide-react"

interface Document {
  id: string
  name: string
  type: string
  category: "legal" | "medical" | "financial" | "insurance" | "care"
  size: string
  uploadDate: string
  lastAccessed: string
  expiryDate?: string
  tags: string[]
  uploadedBy: string
  accessLevel: "all" | "primary" | "restricted"
  isCritical: boolean
  previewUrl?: string
}

interface AccessLog {
  id: string
  documentId: string
  userId: string
  userName: string
  action: "viewed" | "downloaded" | "uploaded" | "shared"
  timestamp: string
  ipAddress?: string
}

interface DocumentVaultProps {
  careRecipientId: string
  careRecipientName: string
  currentUserRole: "primary" | "secondary" | "view-only"
  currentUserId: string
}

export function DocumentVault({
  careRecipientId,
  careRecipientName,
  currentUserRole,
  currentUserId,
}: DocumentVaultProps) {
  const [documents, setDocuments] = useState<Document[]>([])
  const [accessLogs, setAccessLogs] = useState<AccessLog[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [showUploadModal, setShowUploadModal] = useState(false)
  const [showPreviewModal, setShowPreviewModal] = useState<Document | null>(null)
  const [selectedTags, setSelectedTags] = useState<string[]>([])

  // Sample documents data
  useEffect(() => {
    setDocuments([
      {
        id: "1",
        name: "Power of Attorney - Margaret Thompson.pdf",
        type: "PDF",
        category: "legal",
        size: "2.4 MB",
        uploadDate: "2023-05-15",
        lastAccessed: "2024-01-20",
        expiryDate: "2027-05-15",
        tags: ["critical", "legal", "poa"],
        uploadedBy: "Primary Carer",
        accessLevel: "primary",
        isCritical: true,
      },
      {
        id: "2",
        name: "Lasting Power of Attorney - Health & Welfare.pdf",
        type: "PDF",
        category: "legal",
        size: "1.8 MB",
        uploadDate: "2023-05-15",
        lastAccessed: "2024-01-15",
        expiryDate: "2027-05-15",
        tags: ["critical", "legal", "lpa", "health"],
        uploadedBy: "Primary Carer",
        accessLevel: "primary",
        isCritical: true,
      },
      {
        id: "3",
        name: "NHS Number & Medical Summary.pdf",
        type: "PDF",
        category: "medical",
        size: "0.8 MB",
        uploadDate: "2023-08-20",
        lastAccessed: "2024-01-25",
        tags: ["critical", "nhs", "medical"],
        uploadedBy: "Family Member",
        accessLevel: "all",
        isCritical: true,
      },
      {
        id: "4",
        name: "Home Insurance Policy - Aviva.pdf",
        type: "PDF",
        category: "insurance",
        size: "3.2 MB",
        uploadDate: "2024-01-10",
        lastAccessed: "2024-01-28",
        expiryDate: "2024-03-15",
        tags: ["insurance", "home", "renewal"],
        uploadedBy: "Primary Carer",
        accessLevel: "all",
        isCritical: false,
      },
      {
        id: "5",
        name: "Care Plan - CompassionCare.pdf",
        type: "PDF",
        category: "care",
        size: "1.5 MB",
        uploadDate: "2024-01-05",
        lastAccessed: "2024-01-26",
        tags: ["care", "plan", "current"],
        uploadedBy: "Care Provider",
        accessLevel: "all",
        isCritical: false,
      },
      {
        id: "6",
        name: "Pension Statement - State Pension.pdf",
        type: "PDF",
        category: "financial",
        size: "0.9 MB",
        uploadDate: "2023-12-01",
        lastAccessed: "2024-01-10",
        tags: ["pension", "financial", "annual"],
        uploadedBy: "Primary Carer",
        accessLevel: "primary",
        isCritical: false,
      },
      {
        id: "7",
        name: "DNR Order - Do Not Resuscitate.pdf",
        type: "PDF",
        category: "medical",
        size: "0.5 MB",
        uploadDate: "2023-08-30",
        lastAccessed: "2024-01-22",
        tags: ["critical", "dnr", "medical", "emergency"],
        uploadedBy: "Primary Carer",
        accessLevel: "primary",
        isCritical: true,
      },
    ])

    // Sample access logs
    setAccessLogs([
      {
        id: "1",
        documentId: "3",
        userId: "user1",
        userName: "Primary Carer",
        action: "viewed",
        timestamp: "2024-01-28 14:30",
      },
      {
        id: "2",
        documentId: "4",
        userId: "user2",
        userName: "Secondary Carer",
        action: "downloaded",
        timestamp: "2024-01-28 10:15",
      },
      {
        id: "3",
        documentId: "1",
        userId: "user1",
        userName: "Primary Carer",
        action: "viewed",
        timestamp: "2024-01-27 16:45",
      },
    ])
  }, [])

  // Filter documents based on search, category, and tags
  const filteredDocuments = documents.filter((doc) => {
    const matchesSearch =
      doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesCategory = selectedCategory === "all" || doc.category === selectedCategory
    const matchesTags = selectedTags.length === 0 || selectedTags.some((tag) => doc.tags.includes(tag))
    const hasAccess =
      doc.accessLevel === "all" ||
      (doc.accessLevel === "primary" && currentUserRole === "primary") ||
      (doc.accessLevel === "restricted" && currentUserRole !== "view-only")

    return matchesSearch && matchesCategory && matchesTags && hasAccess
  })

  // Get unique tags for filtering
  const allTags = Array.from(new Set(documents.flatMap((doc) => doc.tags)))

  // Get documents expiring soon
  const expiringDocuments = documents.filter((doc) => {
    if (!doc.expiryDate) return false
    const expiryDate = new Date(doc.expiryDate)
    const today = new Date()
    const daysUntilExpiry = Math.ceil((expiryDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
    return daysUntilExpiry <= 90 && daysUntilExpiry > 0
  })

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "legal":
        return <Shield className="w-5 h-5 text-blue-600" />
      case "medical":
        return <FileText className="w-5 h-5 text-red-600" />
      case "financial":
        return <FileText className="w-5 h-5 text-green-600" />
      case "insurance":
        return <FileText className="w-5 h-5 text-purple-600" />
      case "care":
        return <FileText className="w-5 h-5 text-orange-600" />
      default:
        return <FileText className="w-5 h-5 text-gray-600" />
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "legal":
        return "bg-blue-50 border-blue-200"
      case "medical":
        return "bg-red-50 border-red-200"
      case "financial":
        return "bg-green-50 border-green-200"
      case "insurance":
        return "bg-purple-50 border-purple-200"
      case "care":
        return "bg-orange-50 border-orange-200"
      default:
        return "bg-gray-50 border-gray-200"
    }
  }

  const handleDocumentAccess = (document: Document, action: "viewed" | "downloaded") => {
    // Log the access
    const newLog: AccessLog = {
      id: Date.now().toString(),
      documentId: document.id,
      userId: currentUserId,
      userName: currentUserRole === "primary" ? "Primary Carer" : "Secondary Carer",
      action,
      timestamp: new Date().toLocaleString(),
    }
    setAccessLogs((prev) => [newLog, ...prev])

    // Update last accessed time
    setDocuments((prev) =>
      prev.map((doc) => (doc.id === document.id ? { ...doc, lastAccessed: new Date().toLocaleDateString() } : doc)),
    )

    if (action === "viewed") {
      setShowPreviewModal(document)
    } else {
      // Simulate download
      console.log(`Downloading ${document.name}`)
    }
  }

  const exportAllDocuments = () => {
    // Simulate ZIP download
    const accessibleDocs = documents.filter(
      (doc) => doc.accessLevel === "all" || (doc.accessLevel === "primary" && currentUserRole === "primary"),
    )

    console.log(`Exporting ${accessibleDocs.length} documents as ZIP`)
    alert(`Would download ${accessibleDocs.length} documents as ZIP file`)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-semibold text-gray-800">Document Vault</h2>
          <p className="text-gray-600">Secure document storage for {careRecipientName}</p>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="outline" onClick={exportAllDocuments}>
            <Archive className="w-4 h-4 mr-1" />
            Export All
          </Button>
          {currentUserRole !== "view-only" && (
            <Button onClick={() => setShowUploadModal(true)} className="bg-indigo-500 hover:bg-indigo-600">
              <Upload className="w-4 h-4 mr-1" />
              Upload Document
            </Button>
          )}
        </div>
      </div>

      {/* Expiring Documents Alert */}
      {expiringDocuments.length > 0 && (
        <Alert className="border-amber-200 bg-amber-50">
          <AlertTriangle className="h-4 w-4 text-amber-600" />
          <AlertDescription className="text-amber-800">
            <strong>{expiringDocuments.length} document(s) expiring soon:</strong>{" "}
            {expiringDocuments.map((doc) => doc.name.split(".")[0]).join(", ")}
          </AlertDescription>
        </Alert>
      )}

      {/* Search and Filters */}
      <Card className="border-0 shadow-lg">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search documents and tags..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <div className="flex gap-2">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 py-2 border rounded-md text-sm"
              >
                <option value="all">All Categories</option>
                <option value="legal">Legal</option>
                <option value="medical">Medical</option>
                <option value="financial">Financial</option>
                <option value="insurance">Insurance</option>
                <option value="care">Care</option>
              </select>

              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-1" />
                Filters
              </Button>
            </div>
          </div>

          {/* Tag filters */}
          <div className="flex flex-wrap gap-2 mt-4">
            {allTags.slice(0, 8).map((tag) => (
              <Button
                key={tag}
                variant={selectedTags.includes(tag) ? "default" : "outline"}
                size="sm"
                onClick={() => {
                  setSelectedTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]))
                }}
                className="text-xs"
              >
                <Tag className="w-3 h-3 mr-1" />
                {tag}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Document Categories Overview */}
      <div className="grid md:grid-cols-5 gap-4">
        {["legal", "medical", "financial", "insurance", "care"].map((category) => {
          const categoryDocs = documents.filter((doc) => doc.category === category)
          const criticalDocs = categoryDocs.filter((doc) => doc.isCritical)

          return (
            <Card
              key={category}
              className={`border-0 shadow-lg cursor-pointer hover:shadow-xl transition-shadow ${getCategoryColor(category)}`}
            >
              <CardContent className="p-4 text-center">
                <div className="flex justify-center mb-2">{getCategoryIcon(category)}</div>
                <h3 className="font-semibold capitalize mb-1">{category}</h3>
                <div className="text-2xl font-bold text-gray-800">{categoryDocs.length}</div>
                <div className="text-xs text-gray-600">{criticalDocs.length} critical</div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Documents List */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Documents ({filteredDocuments.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredDocuments.map((document) => (
              <div
                key={document.id}
                className={`p-4 border rounded-lg hover:shadow-md transition-shadow ${getCategoryColor(document.category)}`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 flex-1">
                    <div className="flex-shrink-0">{getCategoryIcon(document.category)}</div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-medium truncate">{document.name}</h3>
                        {document.isCritical && (
                          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                            Critical
                          </Badge>
                        )}
                        <Badge variant="outline" className="capitalize">
                          {document.category}
                        </Badge>
                      </div>

                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span>{document.size}</span>
                        <span>Uploaded: {document.uploadDate}</span>
                        <span>By: {document.uploadedBy}</span>
                        {document.expiryDate && (
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            Expires: {document.expiryDate}
                          </span>
                        )}
                      </div>

                      <div className="flex flex-wrap gap-1 mt-2">
                        {document.tags.map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 flex-shrink-0">
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <Lock className="w-3 h-3" />
                      {document.accessLevel}
                    </div>

                    <Button variant="outline" size="sm" onClick={() => handleDocumentAccess(document, "viewed")}>
                      <Eye className="w-4 h-4 mr-1" />
                      View
                    </Button>

                    <Button variant="outline" size="sm" onClick={() => handleDocumentAccess(document, "downloaded")}>
                      <Download className="w-4 h-4 mr-1" />
                      Download
                    </Button>
                  </div>
                </div>
              </div>
            ))}

            {filteredDocuments.length === 0 && (
              <div className="text-center py-8">
                <FileText className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-600 mb-2">No documents found</h3>
                <p className="text-gray-500">Try adjusting your search or filters</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Recent Access Log */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="w-5 h-5" />
            Recent Access Log
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {accessLogs.slice(0, 5).map((log) => {
              const document = documents.find((doc) => doc.id === log.documentId)
              return (
                <div key={log.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-2 h-2 rounded-full ${
                        log.action === "viewed"
                          ? "bg-blue-500"
                          : log.action === "downloaded"
                            ? "bg-green-500"
                            : "bg-purple-500"
                      }`}
                    ></div>
                    <div>
                      <p className="text-sm font-medium">
                        {log.userName} {log.action} "{document?.name}"
                      </p>
                      <p className="text-xs text-gray-500">{log.timestamp}</p>
                    </div>
                  </div>
                  <Badge variant="outline" className="capitalize">
                    {log.action}
                  </Badge>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Upload Modal */}
      <Dialog open={showUploadModal} onOpenChange={setShowUploadModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Upload Document</DialogTitle>
            <DialogDescription>Add a new document to {careRecipientName}'s vault.</DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-lg font-medium mb-2">Drop files here or click to browse</p>
              <p className="text-gray-600 mb-4">Supports PDF, DOC, DOCX, JPG, PNG</p>
              <Button variant="outline">Choose Files</Button>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowUploadModal(false)}>
              Cancel
            </Button>
            <Button className="bg-indigo-500 hover:bg-indigo-600">Upload</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Preview Modal */}
      <Dialog open={showPreviewModal !== null} onOpenChange={() => setShowPreviewModal(null)}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>{showPreviewModal?.name}</DialogTitle>
            <DialogDescription>Document preview for {careRecipientName}</DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <div className="bg-gray-100 rounded-lg p-8 text-center">
              <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">Document preview would be displayed here</p>
              <p className="text-sm text-gray-500 mt-2">
                {showPreviewModal?.type} • {showPreviewModal?.size}
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowPreviewModal(null)}>
              Close
            </Button>
            <Button
              onClick={() => showPreviewModal && handleDocumentAccess(showPreviewModal, "downloaded")}
              className="bg-indigo-500 hover:bg-indigo-600"
            >
              <Download className="w-4 h-4 mr-1" />
              Download
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
