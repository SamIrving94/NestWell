"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"

interface NavigationState {
  currentStep: string
  completedSteps: string[]
  userScore: number | null
  hasCompletedOnboarding: boolean
  hasCompletedScore: boolean
  canAccessHub: boolean
  navigationHistory: string[]
}

interface NavigationContextType {
  state: NavigationState
  updateStep: (step: string) => void
  markStepComplete: (step: string) => void
  setUserScore: (score: number) => void
  canNavigateTo: (route: string) => boolean
  getNextStep: () => string | null
  resetNavigation: () => void
  addToHistory: (route: string) => void
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined)

const REQUIRED_STEPS = ["onboarding", "score", "hub"]

const STEP_ROUTES = {
  onboarding: "/onboarding",
  score: "/score",
  hub: "/hub",
  planner: "/planner",
  coverage: "/coverage",
  "pension-savings": "/pension-savings",
  "health-care-planning": "/health-care-planning",
}

export function NavigationProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()

  const [state, setState] = useState<NavigationState>({
    currentStep: "",
    completedSteps: [],
    userScore: null,
    hasCompletedOnboarding: false,
    hasCompletedScore: false,
    canAccessHub: false,
    navigationHistory: [],
  })

  // Load state from localStorage on mount
  useEffect(() => {
    const savedState = localStorage.getItem("nestwell-navigation-state")
    if (savedState) {
      try {
        const parsed = JSON.parse(savedState)
        setState((prev) => ({ ...prev, ...parsed }))
      } catch (error) {
        console.error("Failed to parse navigation state:", error)
      }
    }

    // Check legacy localStorage keys for backward compatibility
    const hasOnboarding = localStorage.getItem("nestwell-onboarding-complete")
    const hasScore = localStorage.getItem("nestwell-score-complete")
    const userScore = localStorage.getItem("nestwell-user-score")

    if (hasOnboarding || hasScore || userScore) {
      setState((prev) => ({
        ...prev,
        hasCompletedOnboarding: !!hasOnboarding,
        hasCompletedScore: !!hasScore,
        userScore: userScore ? Number.parseInt(userScore) : null,
        canAccessHub: !!(hasScore || userScore),
        completedSteps: [...(hasOnboarding ? ["onboarding"] : []), ...(hasScore ? ["score"] : [])],
      }))
    }
  }, [])

  // Save state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("nestwell-navigation-state", JSON.stringify(state))
  }, [state])

  // Update current step based on pathname
  useEffect(() => {
    const currentRoute = pathname
    const stepName = Object.entries(STEP_ROUTES).find(([_, route]) => route === currentRoute)?.[0]
    if (stepName && stepName !== state.currentStep) {
      setState((prev) => ({
        ...prev,
        currentStep: stepName,
        navigationHistory: [...prev.navigationHistory.slice(-9), currentRoute], // Keep last 10 routes
      }))
    }
  }, [pathname, state.currentStep])

  const updateStep = (step: string) => {
    setState((prev) => ({ ...prev, currentStep: step }))
  }

  const markStepComplete = (step: string) => {
    setState((prev) => {
      const newCompletedSteps = [...prev.completedSteps]
      if (!newCompletedSteps.includes(step)) {
        newCompletedSteps.push(step)
      }

      const updates: Partial<NavigationState> = {
        completedSteps: newCompletedSteps,
      }

      // Update specific flags
      if (step === "onboarding") {
        updates.hasCompletedOnboarding = true
        localStorage.setItem("nestwell-onboarding-complete", "true")
      }

      if (step === "score") {
        updates.hasCompletedScore = true
        updates.canAccessHub = true
        localStorage.setItem("nestwell-score-complete", "true")
      }

      return { ...prev, ...updates }
    })
  }

  const setUserScore = (score: number) => {
    setState((prev) => ({ ...prev, userScore: score }))
    localStorage.setItem("nestwell-user-score", score.toString())
  }

  const canNavigateTo = (route: string): boolean => {
    // For demo purposes, allow access to all routes
    return true
  }

  const getNextStep = (): string | null => {
    if (!state.hasCompletedOnboarding) return "/onboarding"
    if (!state.hasCompletedScore) return "/score"
    if (state.canAccessHub) return "/hub"
    return "/onboarding" // Default to onboarding for the journey
  }

  const resetNavigation = () => {
    setState({
      currentStep: "",
      completedSteps: [],
      userScore: null,
      hasCompletedOnboarding: false,
      hasCompletedScore: false,
      canAccessHub: false,
      navigationHistory: [],
    })

    // Clear localStorage
    localStorage.removeItem("nestwell-navigation-state")
    localStorage.removeItem("nestwell-onboarding-complete")
    localStorage.removeItem("nestwell-score-complete")
    localStorage.removeItem("nestwell-user-score")
  }

  const addToHistory = (route: string) => {
    setState((prev) => ({
      ...prev,
      navigationHistory: [...prev.navigationHistory.slice(-9), route],
    }))
  }

  return (
    <NavigationContext.Provider
      value={{
        state,
        updateStep,
        markStepComplete,
        setUserScore,
        canNavigateTo,
        getNextStep,
        resetNavigation,
        addToHistory,
      }}
    >
      {children}
    </NavigationContext.Provider>
  )
}

export function useNavigation() {
  const context = useContext(NavigationContext)
  if (context === undefined) {
    throw new Error("useNavigation must be used within a NavigationProvider")
  }
  return context
}
