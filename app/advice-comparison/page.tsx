"use client"

import { AdviceComparisonTool } from "@/components/advice-comparison-tool"
import { AIAssistant } from "@/components/ai-assistant"

export default function AdviceComparisonPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-sky-100">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-serif font-semibold mb-4 text-gray-800">Financial Advice Cost Comparison</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Understand the real cost of different financial advice models and discover how much you could save with
              transparent, fair pricing.
            </p>
          </div>

          {/* Tool */}
          <AdviceComparisonTool />

          {/* Additional Information */}
          <div className="mt-12 grid md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                What is AUM?
              </h3>
              <p className="text-sm text-gray-600">
                Assets Under Management (AUM) fees are charged as a percentage of your total portfolio value. As your
                investments grow, so do your fees - even if the service level remains the same.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                  />
                </svg>
                Flat-Fee Benefits
              </h3>
              <p className="text-sm text-gray-600">
                Flat-fee advisors charge the same amount regardless of your portfolio size, eliminating conflicts of
                interest and providing predictable costs that don't eat into your returns.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <svg className="w-5 h-5 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                  />
                </svg>
                DIY Approach
              </h3>
              <p className="text-sm text-gray-600">
                With the right tools and guidance, many people can successfully manage their own investments, keeping
                costs low while maintaining control over their financial future.
              </p>
            </div>
          </div>
        </div>
      </div>

      <AIAssistant />
    </div>
  )
}
