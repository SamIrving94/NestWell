"use client"

import { useEffect, useState } from "react"

export function NestAnimation() {
  const [animationStage, setAnimationStage] = useState(0)

  useEffect(() => {
    const stages = [
      { delay: 0, stage: 1 },
      { delay: 300, stage: 2 },
      { delay: 600, stage: 3 },
      { delay: 900, stage: 4 },
      { delay: 1200, stage: 5 },
    ]

    stages.forEach(({ delay, stage }) => {
      setTimeout(() => setAnimationStage(stage), delay)
    })
  }, [])

  return (
    <div className="relative w-32 h-32 mx-auto">
      <svg width="128" height="128" viewBox="0 0 128 128" className="absolute inset-0">
        {/* Base nest circle */}
        <circle
          cx="64"
          cy="64"
          r="45"
          fill="none"
          stroke="#d97706"
          strokeWidth="2"
          strokeDasharray="283"
          strokeDashoffset={animationStage >= 1 ? "0" : "283"}
          className="transition-all duration-700 ease-out"
          transform="rotate(-90 64 64)"
        />

        {/* Twig 1 - Top left */}
        <path
          d="M30 45 Q40 35 50 45"
          fill="none"
          stroke="#92400e"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray="25"
          strokeDashoffset={animationStage >= 2 ? "0" : "25"}
          className="transition-all duration-500 ease-out delay-300"
        />

        {/* Twig 2 - Top right */}
        <path
          d="M98 45 Q88 35 78 45"
          fill="none"
          stroke="#92400e"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray="25"
          strokeDashoffset={animationStage >= 3 ? "0" : "25"}
          className="transition-all duration-500 ease-out delay-600"
        />

        {/* Twig 3 - Bottom left */}
        <path
          d="M35 85 Q45 95 55 85"
          fill="none"
          stroke="#92400e"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray="25"
          strokeDashoffset={animationStage >= 4 ? "0" : "25"}
          className="transition-all duration-500 ease-out delay-900"
        />

        {/* Twig 4 - Bottom right */}
        <path
          d="M93 85 Q83 95 73 85"
          fill="none"
          stroke="#92400e"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray="25"
          strokeDashoffset={animationStage >= 5 ? "0" : "25"}
          className="transition-all duration-500 ease-out delay-1200"
        />

        {/* Center nest detail */}
        <circle
          cx="64"
          cy="64"
          r="15"
          fill="#fbbf24"
          opacity={animationStage >= 5 ? "0.3" : "0"}
          className="transition-opacity duration-500 delay-1500"
        />

        {/* Small decorative elements */}
        <circle
          cx="64"
          cy="58"
          r="2"
          fill="#92400e"
          opacity={animationStage >= 5 ? "1" : "0"}
          className="transition-opacity duration-300 delay-1700"
        />
        <circle
          cx="60"
          cy="66"
          r="1.5"
          fill="#92400e"
          opacity={animationStage >= 5 ? "1" : "0"}
          className="transition-opacity duration-300 delay-1800"
        />
        <circle
          cx="68"
          cy="68"
          r="1.5"
          fill="#92400e"
          opacity={animationStage >= 5 ? "1" : "0"}
          className="transition-opacity duration-300 delay-1900"
        />
      </svg>

      {/* Gentle glow effect */}
      <div
        className={`absolute inset-0 rounded-full transition-all duration-1000 ${
          animationStage >= 5 ? "shadow-lg shadow-amber-200/50" : ""
        }`}
      />
    </div>
  )
}
