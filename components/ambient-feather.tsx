"use client"

import { useEffect, useState } from "react"

export function AmbientFeather() {
  const [feathers, setFeathers] = useState<Array<{ id: number; x: number; y: number; delay: number }>>([])

  useEffect(() => {
    // Create subtle ambient feathers
    const positions = [
      { x: 85, y: 10 },
      { x: 15, y: 80 },
      { x: 90, y: 60 },
    ]

    const newFeathers = positions.map((pos, i) => ({
      id: i,
      x: pos.x,
      y: pos.y,
      delay: i * 2000,
    }))

    setFeathers(newFeathers)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {feathers.map((feather) => (
        <div
          key={feather.id}
          className="absolute animate-feather-ambient"
          style={{
            left: `${feather.x}%`,
            top: `${feather.y}%`,
            animationDelay: `${feather.delay}ms`,
          }}
        >
          <svg width="20" height="25" viewBox="0 0 20 25" fill="none" className="text-accent-amber opacity-20">
            <path d="M10 0C10 0 15 5 15 12.5C15 20 10 25 10 25C10 25 5 20 5 12.5C5 5 10 0 10 0Z" fill="currentColor" />
            <path
              d="M10 2.5C10 2.5 12.5 6.25 12.5 12.5C12.5 18.75 10 22.5 10 22.5C10 22.5 7.5 18.75 7.5 12.5C7.5 6.25 10 2.5 10 2.5Z"
              fill="currentColor"
              opacity="0.8"
            />
          </svg>
        </div>
      ))}
    </div>
  )
}
