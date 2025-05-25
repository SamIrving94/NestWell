import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"

export function FinancialHealthCard() {
  return (
    <Card className="border-0 shadow-md">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-amber-500"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M16 8h-6.5a2.5 2.5 0 0 0 0 5h3a2.5 2.5 0 0 1 0 5H6" />
            <path d="M12 18v2" />
            <path d="M12 6v2" />
          </svg>
          Financial Health
        </CardTitle>
        <CardDescription>Your pension and savings readiness</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-1 text-sm">
              <span>Pension Coverage</span>
              <span className="font-medium">70%</span>
            </div>
            <Progress value={70} className="h-2" />
            <p className="mt-2 text-sm text-gray-600">
              Your pension is on track to cover most of your essential expenses.
            </p>
          </div>

          <div>
            <div className="flex justify-between mb-1 text-sm">
              <span>Emergency Fund</span>
              <span className="font-medium">50%</span>
            </div>
            <Progress value={50} className="h-2" />
            <p className="mt-2 text-sm text-gray-600">
              Consider building a larger emergency fund for unexpected costs.
            </p>
          </div>

          <div>
            <div className="flex justify-between mb-1 text-sm">
              <span>Long-term Savings</span>
              <span className="font-medium">65%</span>
            </div>
            <Progress value={65} className="h-2" />
            <p className="mt-2 text-sm text-gray-600">
              Your savings are growing, but may need a boost for later years.
            </p>
          </div>

          <div className="pt-2">
            <Button variant="outline" size="sm" className="w-full">
              View detailed analysis
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
