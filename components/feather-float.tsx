"use client"

import { useEffect, useState } from "react"

export function FeatherFloat() {
  const [feathers, setFeathers] = useState<Array<{ id: number; x: number; y: number; delay: number }>>([])

  useEffect(() => {
    // Create floating feathers at random intervals
    const createFeather = () => {
      const newFeather = {
        id: Date.now(),
        x: Math.random() * window.innerWidth,
        y: -20,
        delay: Math.random() * 2000,
      }

      setFeathers((prev) => [...prev, newFeather])

      // Remove feather after animation
      setTimeout(() => {
        setFeathers((prev) => prev.filter((f) => f.id !== newFeather.id))
      }, 8000)
    }

    // Create initial feathers
    setTimeout(createFeather, 3000)
    setTimeout(createFeather, 5000)
    setTimeout(createFeather, 7000)

    // Continue creating feathers periodically
    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        // 30% chance every 4 seconds
        createFeather()
      }
    }, 4000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {feathers.map((feather) => (
        <div
          key={feather.id}
          className="absolute animate-float opacity-30"
          style={{
            left: feather.x,
            top: feather.y,
            animationDelay: `${feather.delay}ms`,
            animationDuration: "8s",
          }}
        >
          <svg width="16" height="20" viewBox="0 0 16 20" fill="none" className="text-amber-600">
            <path
              d="M8 0C8 0 12 4 12 10C12 16 8 20 8 20C8 20 4 16 4 10C4 4 8 0 8 0Z"
              fill="currentColor"
              opacity="0.6"
            />
            <path
              d="M8 2C8 2 10 5 10 10C10 15 8 18 8 18C8 18 6 15 6 10C6 5 8 2 8 2Z"
              fill="currentColor"
              opacity="0.8"
            />
          </svg>
        </div>
      ))}
    </div>
  )
}
