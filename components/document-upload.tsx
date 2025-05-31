"use client"

import type React from "react"

import { useState, useCallback } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

interface DocumentUploadProps {
  onUpload: (file: File) => void
  uploadedDocs: Array<{
    id: number
    name: string
    status: string
    uploadedAt: string
  }>
}

export function DocumentUpload({ onUpload, uploadedDocs }: DocumentUploadProps) {
  const [dragActive, setDragActive] = useState(false)

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }, [])

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      e.stopPropagation()
      setDragActive(false)

      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        onUpload(e.dataTransfer.files[0])
      }
    },
    [onUpload],
  )

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onUpload(e.target.files[0])
    }
  }

  return (
    <div className="space-y-6">
      {/* Upload Methods */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Drag & Drop Upload */}
        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-blue-500"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              Upload Documents
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div
              className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                dragActive ? "border-blue-500 bg-blue-50" : "border-gray-300 hover:border-gray-400"
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <div className="w-12 h-12 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-gray-600"
                >
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                </svg>
              </div>
              <p className="text-lg font-medium mb-2">Drop your policy documents here</p>
              <p className="text-gray-600 mb-4">or click to browse files</p>
              <input
                type="file"
                id="file-upload"
                className="hidden"
                accept=".pdf,.doc,.docx,.jpg,.png"
                onChange={handleFileInput}
              />
              <label htmlFor="file-upload">
                <Button className="bg-blue-500 hover:bg-blue-600 text-white">Choose Files</Button>
              </label>
              <p className="text-xs text-gray-500 mt-2">Supports PDF, DOC, DOCX, JPG, PNG</p>
            </div>
          </CardContent>
        </Card>

        {/* Email Forward */}
        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-green-500"
              >
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22 6 12 13 2 6" />
              </svg>
              Email Documents
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
              <div className="w-12 h-12 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-green-600"
                >
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22 6 12 13 2 6" />
                </svg>
              </div>
              <p className="text-lg font-medium mb-2">Forward your policies</p>
              <p className="text-gray-600 mb-4">Send policy documents directly from your email</p>
              <div className="bg-white border rounded-lg p-3 mb-4">
                <code className="text-sm font-mono text-green-700">cover@nestwell.io</code>
              </div>
              <Button
                variant="outline"
                className="border-green-500 text-green-700 hover:bg-green-50"
                onClick={() => {
                  navigator.clipboard.writeText("cover@nestwell.io")
                }}
              >
                Copy Email Address
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Uploaded Documents Status */}
      {uploadedDocs.length > 0 && (
        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle>Document Processing Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {uploadedDocs.map((doc) => (
                <div key={doc.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-blue-600"
                      >
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                        <polyline points="14 2 14 8 20 8" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium">{doc.name}</p>
                      <p className="text-sm text-gray-600">Uploaded {new Date(doc.uploadedAt).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    {doc.status === "processing" && (
                      <>
                        <Progress value={65} className="w-24" />
                        <Badge variant="secondary">Processing</Badge>
                      </>
                    )}
                    {doc.status === "completed" && <Badge className="bg-green-100 text-green-800">Completed</Badge>}
                    {doc.status === "error" && <Badge variant="destructive">Error</Badge>}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Processing Info */}
      <Card className="border-0 shadow-md bg-blue-50">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-blue-600"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M12 6v6l4 2" />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold text-blue-900 mb-2">How Document Processing Works</h3>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• AI extracts key information: provider, coverage amounts, dates</li>
                <li>• Identifies policy types: Life, Health, Income Protection, etc.</li>
                <li>• Highlights exclusions and important terms</li>
                <li>• Processing typically takes 1-3 minutes per document</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
