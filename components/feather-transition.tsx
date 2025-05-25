"use client"

import { useEffect, useState } from "react"

export function FeatherTransition() {
  const [feathers, setFeathers] = useState<Array<{ id: number; x: number; delay: number }>>([])

  useEffect(() => {
    // Create multiple feathers floating upward
    const newFeathers = Array.from({ length: 8 }, (_, i) => ({
      id: i,
      x: 10 + i * 12, // Spread across screen
      delay: i * 200, // Stagger animation
    }))
    setFeathers(newFeathers)
  }, [])

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-amber-50 via-orange-50 to-sky-100 z-50 flex items-center justify-center">
      {/* Floating feathers */}
      <div className="absolute inset-0">
        {feathers.map((feather) => (
          <div
            key={feather.id}
            className="absolute animate-float-up opacity-60"
            style={{
              left: `${feather.x}%`,
              bottom: "-20px",
              animationDelay: `${feather.delay}ms`,
              animationDuration: "3s",
            }}
          >
            <svg width="24" height="30" viewBox="0 0 24 30" className="text-amber-400">
              <path
                d="M12 0C12 0 18 6 18 15C18 24 12 30 12 30C12 30 6 24 6 15C6 6 12 0 12 0Z"
                fill="currentColor"
                opacity="0.8"
              />
              <path
                d="M12 3C12 3 15 7.5 15 15C15 22.5 12 27 12 27C12 27 9 22.5 9 15C9 7.5 12 3 12 3Z"
                fill="currentColor"
                opacity="0.9"
              />
            </svg>
          </div>
        ))}
      </div>

      {/* Loading content */}
      <div className="text-center z-10">
        <div className="w-16 h-16 mx-auto mb-6">
          <svg width="64" height="64" viewBox="0 0 64 64" className="animate-pulse text-amber-500">
            <circle cx="32" cy="32" r="25" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="5,5" />
            <circle cx="32" cy="32" r="15" fill="currentColor" opacity="0.3" />
            <circle cx="32" cy="29" r="2" fill="#92400e" />
            <circle cx="28" cy="34" r="1.5" fill="#92400e" />
            <circle cx="36" cy="36" r="1.5" fill="#92400e" />
          </svg>
        </div>

        <h2 className="text-2xl font-semibold mb-2 text-gray-800">We're calculating your NestWell Score…</h2>
        <p className="text-gray-600">Analyzing your information to create your personalized plan</p>

        <div className="mt-6 flex justify-center">
          <div className="flex space-x-1">
            <div className="w-2 h-2 bg-amber-500 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
            <div className="w-2 h-2 bg-amber-500 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
            <div className="w-2 h-2 bg-amber-500 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
          </div>
        </div>
      </div>
    </div>
  )
}
