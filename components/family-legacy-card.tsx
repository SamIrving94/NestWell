import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export function FamilyLegacyCard() {
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
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
          </svg>
          Family & Legacy
        </CardTitle>
        <CardDescription>Planning for your loved ones</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-start gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-red-500 mt-1"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              <div>
                <p className="text-sm font-medium">Will & Testament</p>
                <p className="text-xs text-gray-600">No will in place or needs updating</p>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-amber-500 mt-1"
              >
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
              <div>
                <p className="text-sm font-medium">Power of Attorney</p>
                <p className="text-xs text-gray-600">Partial coverage - financial only</p>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-green-500 mt-1"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <div>
                <p className="text-sm font-medium">Inheritance Planning</p>
                <p className="text-xs text-gray-600">Basic planning in place</p>
              </div>
            </div>
          </div>

          <div className="bg-amber-50 p-3 rounded-md border border-amber-100">
            <p className="text-sm">
              <span className="font-medium">Recommendation:</span> Create or update your will to ensure your wishes are
              followed and reduce stress for your family.
            </p>
          </div>

          <div className="pt-2">
            <Button variant="outline" size="sm" className="w-full">
              Review legacy planning
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
