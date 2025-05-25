import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export function InsuranceCard() {
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
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          </svg>
          Insurance Checkup
        </CardTitle>
        <CardDescription>Your coverage and protection</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm">Private Health Insurance</span>
              <Badge variant="outline" className="bg-red-50 text-red-600 hover:bg-red-50">
                Missing
              </Badge>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-sm">Life Insurance</span>
              <Badge variant="outline" className="bg-green-50 text-green-600 hover:bg-green-50">
                Covered
              </Badge>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-sm">Critical Illness Cover</span>
              <Badge variant="outline" className="bg-amber-50 text-amber-600 hover:bg-amber-50">
                Partial
              </Badge>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-sm">Long-term Care Insurance</span>
              <Badge variant="outline" className="bg-red-50 text-red-600 hover:bg-red-50">
                Missing
              </Badge>
            </div>
          </div>

          <div className="bg-amber-50 p-3 rounded-md border border-amber-100">
            <p className="text-sm">
              <span className="font-medium">Recommendation:</span> Consider private health insurance to reduce NHS
              waiting times for elective procedures.
            </p>
          </div>

          <div className="pt-2">
            <Button variant="outline" size="sm" className="w-full">
              Explore coverage options
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
