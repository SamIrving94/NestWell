"use client"

interface AffirmationPopupProps {
  message: string
}

export function AffirmationPopup({ message }: AffirmationPopupProps) {
  return (
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30 animate-affirmation-popup">
      <div className="bg-white rounded-lg shadow-2xl border-2 border-amber-200 p-6 max-w-sm text-center">
        <div className="text-2xl mb-2">🎉</div>
        <p className="text-lg font-semibold text-gray-800">{message}</p>
      </div>
    </div>
  )
}
