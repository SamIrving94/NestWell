"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useState } from "react"

interface AssistantMessageProps {
  message: {
    id: string
    type: "user" | "assistant"
    content: string
    timestamp: Date
    suggestions?: string[]
    actions?: Array<{ label: string; action: string }>
  }
  onSuggestionClick: (suggestion: string) => void
}

export function AssistantMessage({ message, onSuggestionClick }: AssistantMessageProps) {
  const [showActions, setShowActions] = useState(false)

  const handleActionClick = (action: string) => {
    // Handle different action types
    switch (action) {
      case "add_timeline":
        // Navigate to timeline with pre-filled event
        console.log("Adding to timeline...")
        break
      case "view_analysis":
        // Navigate to detailed analysis
        console.log("Viewing analysis...")
        break
      case "get_quotes":
        // Open insurance quote flow
        console.log("Getting quotes...")
        break
      case "add_action":
        // Add to action plan
        console.log("Adding to action plan...")
        break
      default:
        console.log("Action:", action)
    }
  }

  const formatContent = (content: string) => {
    // Convert markdown-style formatting to JSX
    const parts = content.split(/(\*\*.*?\*\*|\*.*?\*|•.*?(?=\n|$))/g)

    return parts.map((part, index) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return <strong key={index}>{part.slice(2, -2)}</strong>
      } else if (part.startsWith("*") && part.endsWith("*")) {
        return <em key={index}>{part.slice(1, -1)}</em>
      } else if (part.startsWith("•")) {
        return (
          <div key={index} className="flex items-start gap-2 my-1">
            <span className="text-amber-500 mt-1">•</span>
            <span>{part.slice(1).trim()}</span>
          </div>
        )
      } else if (part.startsWith("✅")) {
        return (
          <div key={index} className="flex items-start gap-2 my-1">
            <span className="mt-1">✅</span>
            <span>{part.slice(2).trim()}</span>
          </div>
        )
      } else if (part.startsWith("💝") || part.startsWith("🏠") || part.startsWith("👶") || part.startsWith("📋")) {
        return (
          <div key={index} className="flex items-start gap-2 my-1">
            <span className="mt-1">{part.slice(0, 2)}</span>
            <span>{part.slice(2).trim()}</span>
          </div>
        )
      } else if (part.startsWith("💭")) {
        return (
          <div key={index} className="bg-blue-50 p-3 rounded-md border border-blue-200 my-2">
            <div className="flex items-start gap-2">
              <span>💭</span>
              <span className="text-blue-800">{part.slice(2).trim()}</span>
            </div>
          </div>
        )
      }
      return <span key={index}>{part}</span>
    })
  }

  return (
    <div className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[85%] rounded-lg p-3 ${
          message.type === "user" ? "bg-amber-500 text-white" : "bg-white border border-amber-200 shadow-sm"
        }`}
      >
        {message.type === "assistant" && (
          <div className="flex items-center gap-2 mb-2">
            <div className="w-6 h-6 bg-amber-100 rounded-full flex items-center justify-center">
              <svg width="12" height="15" viewBox="0 0 12 15" className="text-amber-600">
                <path d="M6 0C6 0 9 3 9 7.5C9 12 6 15 6 15C6 15 3 12 3 7.5C3 3 6 0 6 0Z" fill="currentColor" />
              </svg>
            </div>
            <span className="text-sm font-medium text-gray-700">Assistant</span>
          </div>
        )}

        <div className={`${message.type === "user" ? "text-white" : "text-gray-800"}`}>
          {formatContent(message.content)}
        </div>

        {/* Suggestions */}
        {message.suggestions && message.suggestions.length > 0 && (
          <div className="mt-3 space-y-2">
            <p className="text-xs text-gray-500 font-medium">You might also ask:</p>
            <div className="space-y-1">
              {message.suggestions.map((suggestion, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  onClick={() => onSuggestionClick(suggestion)}
                  className="w-full text-left justify-start h-auto p-2 text-xs border-amber-200 hover:bg-amber-50 animate-suggestion-ripple"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {suggestion}
                </Button>
              ))}
            </div>
          </div>
        )}

        {/* Action buttons */}
        {message.actions && message.actions.length > 0 && (
          <div className="mt-3 space-y-2">
            <div className="flex flex-wrap gap-2">
              {message.actions.map((action, index) => (
                <Badge
                  key={index}
                  variant="outline"
                  className="cursor-pointer bg-amber-50 text-amber-700 border-amber-300 hover:bg-amber-100 transition-colors"
                  onClick={() => handleActionClick(action.action)}
                >
                  {action.label}
                </Badge>
              ))}
            </div>
          </div>
        )}

        <div className="mt-2 text-xs text-gray-400">
          {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
        </div>
      </div>
    </div>
  )
}
