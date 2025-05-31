"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { ArrowLeft, TrendingUp, PoundSterling, CreditCard, PiggyBank, AlertTriangle } from "lucide-react"

interface PageProps {
  params: {
    id: string
  }
}

export default function FinancesPage({ params }: PageProps) {
  const recipient = {
    id: params.id,
    name: "Margaret Thompson",
    relationship: "Mother",
  }

  const financialData = {
    totalBalance: 45750,
    monthlyIncome: 1847,
    monthlyExpenses: 1360,
    careCosts: [
      { type: "Home Care", provider: "CompassionCare", monthlyCost: 1200, nextPayment: "2024-02-01" },
      { type: "Cleaning Service", provider: "Molly Maid", monthlyCost: 160, nextPayment: "2024-02-05" },
    ],
    accounts: [
      { type: "Current Account", bank: "Barclays", balance: 3250, accountNumber: "****1234" },
      { type: "Savings Account", bank: "Nationwide", balance: 42500, accountNumber: "****5678" },
    ],
    insurance: [
      { type: "Home Insurance", provider: "Aviva", renewalDate: "2024-03-15", premium: 45 },
      { type: "Life Insurance", provider: "Legal & General", renewalDate: "2024-06-20", premium: 28 },
    ],
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-30">
        <div className="container mx-auto py-4 px-4">
          <div className="flex items-center gap-4">
            <Link href={`/nestcare/dashboard/${params.id}`}>
              <Button variant="outline" size="sm">
                <ArrowLeft className="w-4 h-4 mr-1" />
                Back to Dashboard
              </Button>
            </Link>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-6 h-6 text-green-600" />
              <span className="text-xl font-semibold">Financial Overview - {recipient.name}</span>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto py-8 px-4 space-y-6">
        {/* Financial Summary */}
        <div className="grid md:grid-cols-4 gap-6">
          <Card className="border-0 shadow-lg bg-gradient-to-br from-green-50 to-green-100">
            <CardContent className="p-6 text-center">
              <PoundSterling className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <div className="text-3xl font-bold text-green-700">£{financialData.totalBalance.toLocaleString()}</div>
              <div className="text-sm text-green-600">Total Available</div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-blue-100">
            <CardContent className="p-6 text-center">
              <TrendingUp className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <div className="text-3xl font-bold text-blue-700">£{financialData.monthlyIncome.toLocaleString()}</div>
              <div className="text-sm text-blue-600">Monthly Income</div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-br from-amber-50 to-amber-100">
            <CardContent className="p-6 text-center">
              <CreditCard className="w-8 h-8 text-amber-600 mx-auto mb-2" />
              <div className="text-3xl font-bold text-amber-700">£{financialData.monthlyExpenses.toLocaleString()}</div>
              <div className="text-sm text-amber-600">Monthly Expenses</div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-50 to-purple-100">
            <CardContent className="p-6 text-center">
              <PiggyBank className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <div className="text-3xl font-bold text-purple-700">
                £{financialData.monthlyIncome - financialData.monthlyExpenses}
              </div>
              <div className="text-sm text-purple-600">Monthly Surplus</div>
            </CardContent>
          </Card>
        </div>

        {/* Accounts */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="w-5 h-5" />
              Bank Accounts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {financialData.accounts.map((account, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <div className="font-medium">{account.type}</div>
                    <div className="text-sm text-gray-600">
                      {account.bank} • {account.accountNumber}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-green-700">£{account.balance.toLocaleString()}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Care Costs */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-amber-500" />
              Monthly Care Costs
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {financialData.careCosts.map((cost, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <div className="font-medium">{cost.type}</div>
                    <div className="text-sm text-gray-600">{cost.provider}</div>
                    <div className="text-xs text-gray-500">Next payment: {cost.nextPayment}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-xl font-bold">£{cost.monthlyCost}</div>
                    <div className="text-sm text-gray-600">per month</div>
                  </div>
                </div>
              ))}
              <div className="border-t pt-4">
                <div className="flex items-center justify-between font-bold text-lg">
                  <span>Total Monthly Care Costs</span>
                  <span className="text-amber-700">
                    £{financialData.careCosts.reduce((sum, cost) => sum + cost.monthlyCost, 0)}
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Insurance */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle>Insurance Policies</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {financialData.insurance.map((policy, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <div className="font-medium">{policy.type}</div>
                    <div className="text-sm text-gray-600">{policy.provider}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">£{policy.premium}/month</div>
                    <div className="text-sm text-gray-600">Renews: {policy.renewalDate}</div>
                    <Badge variant="outline" className="mt-1">
                      Active
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
