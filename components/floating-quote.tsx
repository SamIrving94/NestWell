"use client"

interface FloatingQuoteProps {
  quote: string
}

export function FloatingQuote({ quote }: FloatingQuoteProps) {
  return (
    <div className="fixed top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30 animate-quote-float">
      <div className="bg-white/95 backdrop-blur-sm rounded-lg shadow-2xl border border-amber-200 p-6 max-w-md text-center">
        <div className="text-3xl mb-3">💭</div>
        <p className="text-gray-700 italic font-medium">"{quote}"</p>
      </div>
    </div>
  )
}
