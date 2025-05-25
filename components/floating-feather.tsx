"use client"

export function FloatingFeather() {
  return (
    <div className="fixed inset-0 pointer-events-none z-10">
      <div
        className="absolute animate-float-down opacity-60"
        style={{
          left: "50%",
          top: "10%",
          animationDuration: "3s",
        }}
      >
        <svg width="20" height="24" viewBox="0 0 20 24" className="text-amber-400">
          <path
            d="M10 0C10 0 15 5 15 12C15 19 10 24 10 24C10 24 5 19 5 12C5 5 10 0 10 0Z"
            fill="currentColor"
            opacity="0.8"
          />
          <path
            d="M10 2C10 2 12.5 6 12.5 12C12.5 18 10 22 10 22C10 22 7.5 18 7.5 12C7.5 6 10 2 10 2Z"
            fill="currentColor"
            opacity="0.9"
          />
        </svg>
      </div>
    </div>
  )
}
