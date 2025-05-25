"use client"

export function FloatingFeatherReward() {
  return (
    <div className="fixed inset-0 pointer-events-none z-20">
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="absolute animate-celebration-float opacity-80"
          style={{
            left: `${20 + i * 12}%`,
            top: "10%",
            animationDelay: `${i * 300}ms`,
            animationDuration: "4s",
          }}
        >
          <svg width="20" height="24" viewBox="0 0 20 24" className="text-amber-400">
            <path
              d="M10 0C10 0 15 5 15 12C15 19 10 24 10 24C10 24 5 19 5 12C5 5 10 0 10 0Z"
              fill="currentColor"
              opacity="0.9"
            />
            <path
              d="M10 2C10 2 12.5 6 12.5 12C12.5 18 10 22 10 22C10 22 7.5 18 7.5 12C7.5 6 10 2 10 2Z"
              fill="currentColor"
              opacity="1"
            />
          </svg>
        </div>
      ))}
    </div>
  )
}
