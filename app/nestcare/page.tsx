import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Heart } from "lucide-react"

const CareRecipientCard = () => {
  return (
    <Card>
      <CardHeader className="pb-2 sm:pb-4">
        <CardTitle>John Doe</CardTitle>
        <CardDescription>Care Recipient</CardDescription>
      </CardHeader>
      <CardContent className="p-3 sm:p-4 md:p-6 space-y-2 sm:space-y-3">
        <div className="space-y-2 sm:space-y-3">
          <div>
            <h3 className="text-base sm:text-lg font-medium mb-1">Personal Details</h3>
            <p className="text-xs sm:text-sm text-gray-600 leading-snug">Date of Birth: January 1, 1940</p>
            <p className="text-xs sm:text-sm text-gray-600 leading-snug">Address: 123 Main St, Anytown, USA</p>
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-medium mb-1">Emergency Contact</h3>
            <p className="text-xs sm:text-sm text-gray-600 leading-snug">Name: Jane Doe</p>
            <p className="text-xs sm:text-sm text-gray-600 leading-snug">Relationship: Daughter</p>
            <p className="text-xs sm:text-sm text-gray-600 leading-snug">Phone: (555) 123-4567</p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-3 sm:p-4 md:p-6 flex flex-col sm:flex-row gap-2">
        <Button variant="outline" className="w-full sm:w-auto">
          View Profile
        </Button>
        <Button variant="secondary" className="w-full sm:w-auto">
          Edit Details
        </Button>
      </CardFooter>
    </Card>
  )
}

export default function NestCarePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 nestcare-theme container mx-auto section-padding-responsive">
      <header className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-serif font-semibold text-gray-800 mb-1 sm:mb-2">
          NestCare: Your Central Hub for Care Management
        </h1>
        <p className="text-sm sm:text-lg text-gray-600">
          Manage every aspect of care, from health and finances to important documents and daily tasks, all in one
          secure place.
        </p>
        <CareRecipientCard />
      </header>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-3 sm:grid-cols-5 gap-1">
          <TabsTrigger value="overview" className="text-xs sm:text-sm px-2 py-1.5 sm:px-3 sm:py-2">
            Overview
          </TabsTrigger>
          <TabsTrigger value="health" className="text-xs sm:text-sm px-2 py-1.5 sm:px-3 sm:py-2">
            Health
          </TabsTrigger>
          <TabsTrigger value="finances" className="text-xs sm:text-sm px-2 py-1.5 sm:px-3 sm:py-2">
            Finances
          </TabsTrigger>
          <TabsTrigger value="documents" className="text-xs sm:text-sm px-2 py-1.5 sm:px-3 sm:py-2">
            Documents
          </TabsTrigger>
          <TabsTrigger value="timeline" className="text-xs sm:text-sm px-2 py-1.5 sm:px-3 sm:py-2">
            Timeline
          </TabsTrigger>
          <TabsTrigger value="tasks" className="text-xs sm:text-sm px-2 py-1.5 sm:px-3 sm:py-2">
            Tasks
          </TabsTrigger>
        </TabsList>
        <TabsContent value="overview">
          <Card className="w-full">
            <CardContent className="p-4 sm:p-6 md:p-8 text-center">
              <Heart className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 text-indigo-300 mx-auto mb-3 sm:mb-4" />
              <h3 className="text-lg sm:text-xl font-semibold mb-1 sm:mb-2">Comprehensive Overview</h3>
              <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">
                Get a snapshot of your care recipient's well-being, including recent health updates, financial
                summaries, and upcoming tasks.
              </p>
              <Button size="sm" sm:size="md">
                View Full Report
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="health">
          <Card className="w-full">
            <CardContent className="p-4 sm:p-6 md:p-8 text-center">
              <Heart className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 text-indigo-300 mx-auto mb-3 sm:mb-4" />
              <h3 className="text-lg sm:text-xl font-semibold mb-1 sm:mb-2">Health Management</h3>
              <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">
                Track medications, appointments, and health records in one organized space.
              </p>
              <Button size="sm" sm:size="md">
                Manage Health
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="finances">
          <Card className="w-full">
            <CardContent className="p-4 sm:p-6 md:p-8 text-center">
              <Heart className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 text-indigo-300 mx-auto mb-3 sm:mb-4" />
              <h3 className="text-lg sm:text-xl font-semibold mb-1 sm:mb-2">Financial Oversight</h3>
              <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">
                Monitor expenses, manage budgets, and keep track of financial transactions related to care.
              </p>
              <Button size="sm" sm:size="md">
                Manage Finances
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="documents">
          <Card className="w-full">
            <CardContent className="p-4 sm:p-6 md:p-8 text-center">
              <Heart className="w-10 h-10 sm:w-12 sm:w-16 md:h-16 text-indigo-300 mx-auto mb-3 sm:mb-4" />
              <h3 className="text-lg sm:text-xl font-semibold mb-1 sm:mb-2">Document Storage</h3>
              <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">
                Securely store and access important documents such as medical records, insurance policies, and legal
                papers.
              </p>
              <Button size="sm" sm:size="md">
                View Documents
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="timeline">
          <Card className="w-full">
            <CardContent className="p-4 sm:p-6 md:p-8 text-center">
              <Heart className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 text-indigo-300 mx-auto mb-3 sm:mb-4" />
              <h3 className="text-lg sm:text-xl font-semibold mb-1 sm:mb-2">Care Timeline</h3>
              <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">
                View a chronological history of care events, appointments, and important milestones.
              </p>
              <Button size="sm" sm:size="md">
                View Timeline
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="tasks">
          <Card className="w-full">
            <CardContent className="p-4 sm:p-6 md:p-8 text-center">
              <Heart className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 text-indigo-300 mx-auto mb-3 sm:mb-4" />
              <h3 className="text-lg sm:text-xl font-semibold mb-1 sm:mb-2">Task Management</h3>
              <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">
                Create, assign, and track daily tasks to ensure comprehensive and timely care.
              </p>
              <Button size="sm" sm:size="md">
                Manage Tasks
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
