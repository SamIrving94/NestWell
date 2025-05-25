"use client"

export function FloatingFeatherScroll() {
  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none animate-feather-scroll">
      <svg width="24" height="30" viewBox="0 0 24 30" className="text-amber-400">
        <path
          d="M12 0C12 0 18 6 18 15C18 24 12 30 12 30C12 30 6 24 6 15C6 6 12 0 12 0Z"
          fill="currentColor"
          opacity="0.8"
        />
        <path
          d="M12 3C12 3 15 7.5 15 15C15 22.5 12 27 12 27C12 27 9 22.5 9 15C9 7.5 12 3 12 3Z"
          fill="currentColor"
          opacity="0.9"
        />
      </svg>
    </div>
  )
}
