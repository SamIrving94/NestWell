"use client"

import { useEffect, useState } from "react"

interface ScoreRevealAnimationProps {
  score: number
  showScore: boolean
}

export function ScoreRevealAnimation({ score, showScore }: ScoreRevealAnimationProps) {
  const [animatedScore, setAnimatedScore] = useState(0)
  const [showConfetti, setShowConfetti] = useState(false)

  useEffect(() => {
    if (showScore) {
      // Animate score counting up
      const duration = 1500
      const steps = 60
      const increment = score / steps
      let current = 0

      const timer = setInterval(() => {
        current += increment
        if (current >= score) {
          setAnimatedScore(score)
          clearInterval(timer)

          // Show confetti for good scores
          if (score >= 70) {
            setShowConfetti(true)
            setTimeout(() => setShowConfetti(false), 3000)
          }
        } else {
          setAnimatedScore(Math.floor(current))
        }
      }, duration / steps)

      return () => clearInterval(timer)
    }
  }, [showScore, score])

  const getScoreColor = (score: number) => {
    if (score >= 80) return "hsl(var(--accent-teal))"
    if (score >= 60) return "hsl(var(--accent-amber))"
    if (score >= 40) return "hsl(var(--accent-amber))"
    return "hsl(var(--destructive))"
  }

  const radius = 120
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - (animatedScore / 100) * circumference

  return (
    <div className="relative w-80 h-80 mx-auto">
      {/* Confetti effect */}
      {showConfetti && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-accent-amber rounded-full animate-confetti"
              style={{
                left: `${50 + (Math.random() - 0.5) * 60}%`,
                top: `${50 + (Math.random() - 0.5) * 60}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${2 + Math.random() * 2}s`,
              }}
            />
          ))}
        </div>
      )}

      {/* Nest-themed gauge */}
      <svg width="320" height="320" viewBox="0 0 320 320" className="transform -rotate-90">
        {/* Background circle */}
        <circle cx="160" cy="160" r={radius} fill="none" stroke="#e5e7eb" strokeWidth="20" strokeLinecap="round" />

        {/* Progress circle */}
        <circle
          cx="160"
          cy="160"
          r={radius}
          fill="none"
          stroke={getScoreColor(score)}
          strokeWidth="20"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="transition-all duration-1000 ease-out"
          style={{ filter: "drop-shadow(0 0 8px rgba(245, 158, 11, 0.3))" }}
        />

        {/* Decorative nest elements */}
        <g transform="translate(160, 160) rotate(90)">
          {/* Nest twigs */}
          <path
            d="M-40 -30 Q-30 -40 -20 -30"
            fill="none"
            stroke="#92400e"
            strokeWidth="3"
            strokeLinecap="round"
            opacity={showScore ? "1" : "0"}
            className="transition-opacity duration-1000 delay-500"
          />
          <path
            d="M40 -30 Q30 -40 20 -30"
            fill="none"
            stroke="#92400e"
            strokeWidth="3"
            strokeLinecap="round"
            opacity={showScore ? "1" : "0"}
            className="transition-opacity duration-1000 delay-700"
          />
          <path
            d="M-35 35 Q-25 45 -15 35"
            fill="none"
            stroke="#92400e"
            strokeWidth="3"
            strokeLinecap="round"
            opacity={showScore ? "1" : "0"}
            className="transition-opacity duration-1000 delay-900"
          />
          <path
            d="M35 35 Q25 45 15 35"
            fill="none"
            stroke="#92400e"
            strokeWidth="3"
            strokeLinecap="round"
            opacity={showScore ? "1" : "0"}
            className="transition-opacity duration-1000 delay-1100"
          />
        </g>
      </svg>

      {/* Score display */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div
          className={`text-6xl font-bold transition-all duration-1000 ${
            showScore ? "opacity-100 scale-100" : "opacity-0 scale-50"
          }`}
          style={{ color: getScoreColor(score) }}
        >
          {animatedScore}
        </div>
        <div
          className={`text-lg text-gray-600 transition-all duration-1000 delay-500 ${
            showScore ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          out of 100
        </div>

        {/* Pulse effect for score increases */}
        {showScore && <div className="absolute inset-0 rounded-full animate-score-pulse" />}

        {/* Pulse effect for high scores */}
        {score >= 70 && showScore && (
          <div className="absolute inset-0 rounded-full border-4 border-amber-300 animate-ping opacity-20" />
        )}
      </div>

      {/* Hover effect */}
      <div className="absolute inset-0 rounded-full hover:scale-105 transition-transform duration-300 cursor-pointer" />
    </div>
  )
}
