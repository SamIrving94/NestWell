"use client"

import type React from "react"

import { useState, useCallback } from "react"

interface UseCompletionOptions {
  api?: string
  id?: string
  initialCompletion?: string
  onResponse?: (response: Response) => void
  onFinish?: (completion: string) => void
  onError?: (error: Error) => void
}

interface UseCompletionHelpers {
  completion: string
  complete: (prompt: string) => Promise<string>
  error: Error | null
  isLoading: boolean
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  input: string
  setInput: React.Dispatch<React.SetStateAction<string>>
  stop: () => void
  markStepComplete: (step: string) => void
}

export function useCompletion({
  initialCompletion = "",
  onResponse,
  onFinish,
  onError,
}: UseCompletionOptions = {}): UseCompletionHelpers {
  const [completion, setCompletion] = useState(initialCompletion)
  const [error, setError] = useState<Error | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [input, setInput] = useState("")
  const [controller, setController] = useState<AbortController | null>(null)

  const markStepComplete = (step: string) => {
    // For demo purposes, just store in localStorage
    localStorage.setItem(`nestwell-${step}-complete`, "true")
  }

  const complete = useCallback(
    async (prompt: string) => {
      // Reset completion and error states
      setCompletion("")
      setError(null)
      setIsLoading(true)

      // Create a new abort controller for this request
      const abortController = new AbortController()
      setController(abortController)

      try {
        // For demo purposes, simulate a response based on the prompt
        await new Promise((resolve) => setTimeout(resolve, 1500))

        // Generate a mock response based on the prompt content
        let mockResponse = ""
        if (prompt.toLowerCase().includes("pension")) {
          mockResponse =
            "Based on your pension details, I recommend considering a small monthly top-up to prevent potential shortfalls later in life. Would you like me to show you some pension consolidation options?"
        } else if (prompt.toLowerCase().includes("health") || prompt.toLowerCase().includes("insurance")) {
          mockResponse =
            "Your current health coverage appears to have some gaps. Private health insurance could help reduce waiting times for procedures like knee replacements or cataract surgery. Would you like to explore some options?"
        } else if (prompt.toLowerCase().includes("care") || prompt.toLowerCase().includes("nursing")) {
          mockResponse =
            "Long-term care costs can be significant, averaging £800-1,500 per week. Based on your profile, I recommend setting aside additional funds or exploring care insurance options. Would you like to see a detailed care cost breakdown?"
        } else if (prompt.toLowerCase().includes("timeline") || prompt.toLowerCase().includes("plan")) {
          mockResponse =
            "I've analyzed your timeline and noticed you might benefit from adding some key health checkpoints. Regular screenings become increasingly important after age 65. Would you like me to suggest some milestones to add to your timeline?"
        } else {
          mockResponse =
            "I'm here to help with your retirement planning. You can ask me about pensions, healthcare costs, insurance options, care planning, or timeline organization. What would you like to explore today?"
        }

        setCompletion(mockResponse)
        onFinish?.(mockResponse)
        setIsLoading(false)
        return mockResponse
      } catch (err) {
        const error = err as Error
        setError(error)
        onError?.(error)
        setIsLoading(false)
        return ""
      } finally {
        setController(null)
      }
    },
    [onFinish, onError],
  )

  const stop = useCallback(() => {
    if (controller) {
      controller.abort()
      setController(null)
      setIsLoading(false)
    }
  }, [controller])

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      if (!input) return
      complete(input)
      setInput("")
    },
    [input, complete],
  )

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setInput(e.target.value)
  }, [])

  return {
    completion,
    complete,
    error,
    isLoading,
    handleSubmit,
    handleInputChange,
    input,
    setInput,
    stop,
    markStepComplete,
  }
}
