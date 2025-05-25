import { FeatherTransition } from "@/components/feather-transition"

export default function ScoreLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-sky-100 relative overflow-hidden">
      <FeatherTransition />
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-gray-700">Calculating your score...</h2>
          <p className="text-gray-500 mt-2">This will just take a moment</p>
        </div>
      </div>
    </div>
  )
}
