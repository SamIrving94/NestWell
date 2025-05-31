"use client"

import { useEffect, useState } from "react"

interface ReadinessScoreDialProps {
  score: number
  size?: "small" | "medium" | "large"
  showLabel?: boolean
  animated?: boolean
}

export function ReadinessScoreDial({
  score,
  size = "medium",
  showLabel = true,
  animated = true,
}: ReadinessScoreDialProps) {
  const [animatedScore, setAnimatedScore] = useState(0)

  useEffect(() => {
    if (animated) {
      const timer = setTimeout(() => {
        setAnimatedScore(score)
      }, 500)
      return () => clearTimeout(timer)
    } else {
      setAnimatedScore(score)
    }
  }, [score, animated])

  const getSize = () => {
    switch (size) {
      case "small":
        return { width: 80, height: 80, strokeWidth: 6, fontSize: "text-lg" }
      case "large":
        return { width: 120, height: 120, strokeWidth: 8, fontSize: "text-2xl" }
      default:
        return { width: 100, height: 100, strokeWidth: 7, fontSize: "text-xl" }
    }
  }

  const getColor = (score: number) => {
    if (score >= 85) return "hsl(var(--accent-teal))" // Dusty teal
    if (score >= 70) return "hsl(var(--accent-teal))"
    if (score >= 55) return "hsl(var(--accent-amber))" // Soft amber
    if (score >= 40) return "hsl(var(--accent-amber))"
    return "hsl(var(--destructive))" // Red for critical
  }

  const { width, height, strokeWidth, fontSize } = getSize()
  const radius = (width - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI
  const strokeDasharray = circumference
  const strokeDashoffset = circumference - (animatedScore / 100) * circumference

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width={width} height={height} className="transform -rotate-90">
        {/* Background circle */}
        <circle
          cx={width / 2}
          cy={height / 2}
          r={radius}
          stroke="#e5e7eb"
          strokeWidth={strokeWidth}
          fill="transparent"
        />
        {/* Progress circle */}
        <circle
          cx={width / 2}
          cy={height / 2}
          r={radius}
          stroke={getColor(score)}
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="transition-all duration-1000 ease-out"
        />
      </svg>

      {/* Score text */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <div className={`font-bold text-gray-800 ${fontSize}`}>{Math.round(animatedScore)}</div>
          {showLabel && size !== "small" && <div className="text-xs text-gray-600">Score</div>}
        </div>
      </div>
    </div>
  )
}
