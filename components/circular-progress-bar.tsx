"use client"

import { useEffect, useState } from "react"

interface CircularProgressBarProps {
  value: number
}

export function CircularProgressBar({ value }: CircularProgressBarProps) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => {
      setProgress(value)
    }, 100)

    return () => clearTimeout(timer)
  }, [value])

  // Calculate the circumference of the circle
  const radius = 70
  const circumference = 2 * Math.PI * radius

  // Calculate the stroke-dashoffset based on the progress
  const strokeDashoffset = circumference - (progress / 100) * circumference

  // Determine color based on score
  const getColor = () => {
    if (progress < 40) return "#ef4444" // red-500
    if (progress < 70) return "#f59e0b" // amber-500
    return "#22c55e" // green-500
  }

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <svg width="100%" height="100%" viewBox="0 0 160 160">
        {/* Background circle */}
        <circle
          cx="80"
          cy="80"
          r={radius}
          fill="none"
          stroke="#e5e7eb" // gray-200
          strokeWidth="12"
        />

        {/* Progress circle */}
        <circle
          cx="80"
          cy="80"
          r={radius}
          fill="none"
          stroke={getColor()}
          strokeWidth="12"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          transform="rotate(-90 80 80)"
          style={{ transition: "stroke-dashoffset 1s ease-in-out" }}
        />

        {/* Text in the middle */}
        <text
          x="80"
          y="80"
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize="36"
          fontWeight="bold"
          fill="#1f2937" // gray-800
        >
          {Math.round(progress)}
        </text>

        <text
          x="80"
          y="100"
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize="14"
          fill="#6b7280" // gray-500
        >
          out of 100
        </text>
      </svg>
    </div>
  )
}
