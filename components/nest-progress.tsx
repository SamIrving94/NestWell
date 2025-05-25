"use client"

interface NestProgressProps {
  step: number
  totalSteps: number
}

export function NestProgress({ step, totalSteps }: NestProgressProps) {
  return (
    <div className="flex items-center gap-2">
      <svg width="32" height="32" viewBox="0 0 32 32" className="text-amber-500">
        {/* Base nest circle */}
        <circle
          cx="16"
          cy="16"
          r="12"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeDasharray="75"
          strokeDashoffset={step === 0 ? "75" : "0"}
          className="transition-all duration-700 ease-out"
          transform="rotate(-90 16 16)"
        />

        {/* Twigs that appear with progress */}
        {step >= 1 && (
          <path
            d="M8 12 Q10 10 12 12"
            fill="none"
            stroke="#92400e"
            strokeWidth="1.5"
            strokeLinecap="round"
            className="animate-fade-in"
          />
        )}

        {step >= 2 && (
          <path
            d="M24 12 Q22 10 20 12"
            fill="none"
            stroke="#92400e"
            strokeWidth="1.5"
            strokeLinecap="round"
            className="animate-fade-in"
          />
        )}

        {step >= 3 && (
          <path
            d="M10 22 Q12 24 14 22"
            fill="none"
            stroke="#92400e"
            strokeWidth="1.5"
            strokeLinecap="round"
            className="animate-fade-in"
          />
        )}

        {step >= 4 && (
          <path
            d="M22 22 Q20 24 18 22"
            fill="none"
            stroke="#92400e"
            strokeWidth="1.5"
            strokeLinecap="round"
            className="animate-fade-in"
          />
        )}

        {/* Center fills when complete */}
        {step >= 5 && <circle cx="16" cy="16" r="4" fill="#fbbf24" opacity="0.6" className="animate-fade-in" />}
      </svg>
    </div>
  )
}
