"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { PiggyBank, Plus, Target, TrendingUp, Calendar } from "lucide-react"

interface SavingsAccount {
  id: string
  name: string
  type: string
  currentValue: number
  monthlyContribution: number
  target: number
  targetDate: string
}

interface SavingsAccountsListProps {
  savings: SavingsAccount[]
  onUpdate: (savings: SavingsAccount[]) => void
  onAdd: () => void
}

export function SavingsAccountsList({ savings, onUpdate, onAdd }: SavingsAccountsListProps) {
  const getSavingsTypeLabel = (type: string) => {
    switch (type) {
      case "isa":
        return "ISA"
      case "savings":
        return "Savings Account"
      case "investment":
        return "Investment Account"
      case "premium-bonds":
        return "Premium Bonds"
      default:
        return "Savings"
    }
  }

  const getSavingsTypeColor = (type: string) => {
    switch (type) {
      case "isa":
        return "bg-blue-100 text-blue-800"
      case "savings":
        return "bg-green-100 text-green-800"
      case "investment":
        return "bg-purple-100 text-purple-800"
      case "premium-bonds":
        return "bg-amber-100 text-amber-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const calculateProgress = (current: number, target: number) => {
    return Math.min(100, (current / target) * 100)
  }

  const calculateMonthsToTarget = (current: number, target: number, monthlyContribution: number) => {
    if (monthlyContribution <= 0) return null
    const remaining = target - current
    if (remaining <= 0) return 0
    return Math.ceil(remaining / monthlyContribution)
  }

  const formatTargetDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-GB", { year: "numeric", month: "long" })
  }

  const totalCurrentValue = savings.reduce((sum, account) => sum + account.currentValue, 0)
  const totalTargetValue = savings.reduce((sum, account) => sum + account.target, 0)
  const totalMonthlyContributions = savings.reduce((sum, account) => sum + account.monthlyContribution, 0)

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-0 shadow-md bg-gradient-to-br from-blue-50 to-blue-100">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <PiggyBank className="w-8 h-8 text-blue-600" />
              <div>
                <div className="text-2xl font-bold text-blue-800">£{totalCurrentValue.toLocaleString()}</div>
                <div className="text-sm text-blue-600">Total Savings</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md bg-gradient-to-br from-green-50 to-green-100">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Target className="w-8 h-8 text-green-600" />
              <div>
                <div className="text-2xl font-bold text-green-800">£{totalTargetValue.toLocaleString()}</div>
                <div className="text-sm text-green-600">Total Targets</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md bg-gradient-to-br from-purple-50 to-purple-100">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <TrendingUp className="w-8 h-8 text-purple-600" />
              <div>
                <div className="text-2xl font-bold text-purple-800">£{totalMonthlyContributions}</div>
                <div className="text-sm text-purple-600">Monthly Savings</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Savings Accounts */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-800">Your Savings Accounts</h2>
          <Button onClick={onAdd} className="bg-blue-500 hover:bg-blue-600">
            <Plus className="w-4 h-4 mr-2" />
            Add Savings
          </Button>
        </div>

        {savings.length === 0 ? (
          <Card className="border-0 shadow-md">
            <CardContent className="p-8 text-center">
              <PiggyBank className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-800 mb-2">No savings accounts yet</h3>
              <p className="text-gray-600 mb-4">
                Add your ISAs, savings accounts, and investments to track your progress.
              </p>
              <Button onClick={onAdd} className="bg-blue-500 hover:bg-blue-600">
                Add Your First Savings Account
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4">
            {savings.map((account) => {
              const progress = calculateProgress(account.currentValue, account.target)
              const monthsToTarget = calculateMonthsToTarget(
                account.currentValue,
                account.target,
                account.monthlyContribution,
              )

              return (
                <Card key={account.id} className="border-0 shadow-md hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <PiggyBank className="w-6 h-6 text-blue-600" />
                        <div>
                          <CardTitle className="text-lg">{account.name}</CardTitle>
                          <p className="text-sm text-gray-600">Target: {formatTargetDate(account.targetDate)}</p>
                        </div>
                      </div>
                      <Badge className={getSavingsTypeColor(account.type)}>{getSavingsTypeLabel(account.type)}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Progress Bar */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Progress to target</span>
                        <span className="font-medium">{progress.toFixed(1)}%</span>
                      </div>
                      <Progress value={progress} className="h-3" />
                      <div className="flex justify-between text-sm text-gray-600">
                        <span>£{account.currentValue.toLocaleString()}</span>
                        <span>£{account.target.toLocaleString()}</span>
                      </div>
                    </div>

                    {/* Details Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <div className="text-sm text-gray-600">Monthly Contribution</div>
                        <div className="text-lg font-bold text-gray-800">£{account.monthlyContribution}/month</div>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <div className="text-sm text-gray-600">Remaining</div>
                        <div className="text-lg font-bold text-gray-800">
                          £{Math.max(0, account.target - account.currentValue).toLocaleString()}
                        </div>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <div className="text-sm text-gray-600">Time to Target</div>
                        <div className="text-lg font-bold text-gray-800">
                          {monthsToTarget === null
                            ? "No contributions"
                            : monthsToTarget === 0
                              ? "Target reached!"
                              : `${monthsToTarget} months`}
                        </div>
                      </div>
                    </div>

                    {/* Status Message */}
                    {progress >= 100 ? (
                      <div className="bg-green-50 border border-green-200 p-3 rounded-lg">
                        <div className="flex items-center gap-2">
                          <Target className="w-4 h-4 text-green-600" />
                          <span className="text-sm font-medium text-green-800">Target achieved!</span>
                        </div>
                      </div>
                    ) : monthsToTarget && monthsToTarget <= 12 ? (
                      <div className="bg-amber-50 border border-amber-200 p-3 rounded-lg">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-amber-600" />
                          <span className="text-sm font-medium text-amber-800">
                            On track to reach target within a year!
                          </span>
                        </div>
                      </div>
                    ) : null}
                  </CardContent>
                </Card>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
