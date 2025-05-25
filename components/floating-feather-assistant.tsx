"use client"

export function FloatingFeatherAssistant() {
  return (
    <div className="fixed inset-0 pointer-events-none z-40">
      {[...Array(4)].map((_, i) => (
        <div
          key={i}
          className="absolute animate-assistant-feather opacity-60"
          style={{
            left: `${60 + i * 8}%`,
            top: `${20 + i * 15}%`,
            animationDelay: `${i * 500}ms`,
            animationDuration: "3s",
          }}
        >
          <svg width="16" height="20" viewBox="0 0 16 20" className="text-amber-400">
            <path
              d="M8 0C8 0 12 4 12 10C12 16 8 20 8 20C8 20 4 16 4 10C4 4 8 0 8 0Z"
              fill="currentColor"
              opacity="0.8"
            />
            <path
              d="M8 2C8 2 10 5 10 10C10 15 8 18 8 18C8 18 6 15 6 10C6 5 8 2 8 2Z"
              fill="currentColor"
              opacity="0.9"
            />
          </svg>
        </div>
      ))}
    </div>
  )
}
