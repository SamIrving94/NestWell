"use client"

export function TypingIndicator() {
  return (
    <div className="flex justify-start">
      <div className="bg-white border border-amber-200 shadow-sm rounded-lg p-3 max-w-[85%]">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-6 h-6 bg-amber-100 rounded-full flex items-center justify-center">
            <svg width="12" height="15" viewBox="0 0 12 15" className="text-amber-600">
              <path d="M6 0C6 0 9 3 9 7.5C9 12 6 15 6 15C6 15 3 12 3 7.5C3 3 6 0 6 0Z" fill="currentColor" />
            </svg>
          </div>
          <span className="text-sm font-medium text-gray-700">Assistant</span>
        </div>

        <div className="flex items-center gap-1">
          <span className="text-gray-600">Thinking</span>
          <div className="flex gap-1">
            <div className="w-1 h-1 bg-amber-500 rounded-full animate-typing-dot" style={{ animationDelay: "0ms" }} />
            <div className="w-1 h-1 bg-amber-500 rounded-full animate-typing-dot" style={{ animationDelay: "200ms" }} />
            <div className="w-1 h-1 bg-amber-500 rounded-full animate-typing-dot" style={{ animationDelay: "400ms" }} />
          </div>
        </div>
      </div>
    </div>
  )
}
