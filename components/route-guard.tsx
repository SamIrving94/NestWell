"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import { useNavigation } from "./navigation-context"

interface RouteGuardProps {
  children: React.ReactNode
}

export function RouteGuard({ children }: RouteGuardProps) {
  const pathname = usePathname()
  const router = useRouter()
  const { canNavigateTo, getNextStep } = useNavigation()
  const [isChecking, setIsChecking] = useState(true)

  useEffect(() => {
    // In demo mode, allow all navigation
    // TODO: Re-enable proper route guarding when user system is implemented
    setIsChecking(false)
    return

    // Original logic (commented out for demo mode):
    // const checkAccess = async () => {
    //   if (!canNavigateTo(pathname)) {
    //     const nextStep = getNextStep()
    //     if (nextStep) {
    //       router.replace(nextStep)
    //     } else {
    //       router.replace("/")
    //     }
    //   }
    //   setIsChecking(false)
    // }
    // checkAccess()
  }, [pathname, canNavigateTo, getNextStep, router])

  if (isChecking) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  return <>{children}</>
}
