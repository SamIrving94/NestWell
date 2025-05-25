"use client"

interface CircularProgressBarProps {
  percentage: number
  size?: number
  strokeWidth?: number
  circleColor?: string
  progressColor?: string
  textColor?: string
}

export function CircularProgressBar({
  percentage,
  size = 100,
  strokeWidth = 8,
  circleColor = "#f3f4f6",
  progressColor = "#f59e0b",
  textColor = "#1f2937",
}: CircularProgressBarProps) {
  const radius = (size - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI
  const offset = circumference - (percentage / 100) * circumference

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="transform -rotate-90">
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke={circleColor} strokeWidth={strokeWidth} />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={progressColor}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center text-lg font-bold" style={{ color: textColor }}>
        {percentage}
      </div>
    </div>
  )
}
