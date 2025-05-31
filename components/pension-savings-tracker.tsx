"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PensionAccountsList } from "@/components/pension-accounts-list"
import { SavingsAccountsList } from "@/components/savings-accounts-list"
import { IncomeProjector } from "@/components/income-projector"
import { SavingsGoalsTracker } from "@/components/savings-goals-tracker"
import { AddPensionModal } from "@/components/add-pension-modal"
import { AddSavingsModal } from "@/components/add-savings-modal"
import { CreateGoalModal } from "@/components/create-goal-modal"
import { PiggyBank, TrendingUp, Target, Plus, Calculator } from "lucide-react"

interface PensionSavingsTrackerProps {
  data: {
    pensions: Array<{
      id: string
      name: string
      type: string
      provider: string
      currentValue: number
      monthlyContribution: number
      employerContribution: number
      startAge: number
      currentAge: number
    }>
    savings: Array<{
      id: string
      name: string
      type: string
      currentValue: number
      monthlyContribution: number
      target: number
      targetDate: string
    }>
    goals: Array<{
      id: string
      title: string
      targetAmount: number
      currentValue: number
      targetAge: number
      priority: string
      linkedToTimeline: boolean
    }>
    projections: {
      age60: { totalPot: number; monthlyIncome: number }
      age65: { totalPot: number; monthlyIncome: number }
      age70: { totalPot: number; monthlyIncome: number }
      age75: { totalPot: number; monthlyIncome: number }
    }
    benchmarks: {
      basic: { monthly: number; annual: number }
      moderate: { monthly: number; annual: number }
      comfortable: { monthly: number; annual: number }
    }
  }
  onUpdate: (data: any) => void
}

export function PensionSavingsTracker({ data, onUpdate }: PensionSavingsTrackerProps) {
  const [showAddPension, setShowAddPension] = useState(false)
  const [showAddSavings, setShowAddSavings] = useState(false)
  const [showCreateGoal, setShowCreateGoal] = useState(false)

  const totalPensionValue = data.pensions.reduce((sum, pension) => sum + pension.currentValue, 0)
  const totalSavingsValue = data.savings.reduce((sum, savings) => sum + savings.currentValue, 0)
  const totalMonthlyContributions = [
    ...data.pensions.map((p) => p.monthlyContribution + p.employerContribution),
    ...data.savings.map((s) => s.monthlyContribution),
  ].reduce((sum, contrib) => sum + contrib, 0)

  const totalAssets = totalPensionValue + totalSavingsValue

  const addPension = (pension: any) => {
    const newPension = {
      ...pension,
      id: Date.now().toString(),
    }
    onUpdate({
      ...data,
      pensions: [...data.pensions, newPension],
    })
    setShowAddPension(false)
  }

  const addSavings = (savings: any) => {
    const newSavings = {
      ...savings,
      id: Date.now().toString(),
    }
    onUpdate({
      ...data,
      savings: [...data.savings, newSavings],
    })
    setShowAddSavings(false)
  }

  const createGoal = (goal: any) => {
    const newGoal = {
      ...goal,
      id: Date.now().toString(),
    }
    onUpdate({
      ...data,
      goals: [...data.goals, newGoal],
    })
    setShowCreateGoal(false)
  }

  return (
    <div className="container mx-auto section-padding-responsive">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-responsive-h1 text-gray-800 mb-1 sm:mb-2 font-serif font-semibold">
            Pension & Savings Tracker
          </h1>
          <p className="text-responsive-body text-gray-600 mb-4 sm:mb-6">
            Track your retirement assets and plan for your financial future with confidence.
          </p>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
            <Card className="border-0 shadow-md bg-gradient-to-br from-teal-50 to-teal-100">
              <CardContent className="p-3 sm:p-4">
                <div className="flex items-center gap-3">
                  <PiggyBank className="w-6 h-6 sm:w-8 sm:h-8 text-teal-600" />
                  <div>
                    <div className="text-xl sm:text-2xl font-bold text-teal-800">£{totalAssets.toLocaleString()}</div>
                    <div className="text-xs sm:text-sm text-teal-600">Total Assets</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md bg-gradient-to-br from-blue-50 to-blue-100">
              <CardContent className="p-3 sm:p-4">
                <div className="flex items-center gap-3">
                  <TrendingUp className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600" />
                  <div>
                    <div className="text-xl sm:text-2xl font-bold text-blue-800">£{totalMonthlyContributions}</div>
                    <div className="text-xs sm:text-sm text-blue-600">Monthly Contributions</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md bg-gradient-to-br from-purple-50 to-purple-100">
              <CardContent className="p-3 sm:p-4">
                <div className="flex items-center gap-3">
                  <Calculator className="w-6 h-6 sm:w-8 sm:h-8 text-purple-600" />
                  <div>
                    <div className="text-xl sm:text-2xl font-bold text-purple-800">
                      £{data.projections.age65.monthlyIncome.toLocaleString()}
                    </div>
                    <div className="text-xs sm:text-sm text-purple-600">Projected at 65</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md bg-gradient-to-br from-amber-50 to-amber-100">
              <CardContent className="p-3 sm:p-4">
                <div className="flex items-center gap-3">
                  <Target className="w-6 h-6 sm:w-8 sm:h-8 text-amber-600" />
                  <div>
                    <div className="text-xl sm:text-2xl font-bold text-amber-800">{data.goals.length}</div>
                    <div className="text-xs sm:text-sm text-amber-600">Active Goals</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="overview" className="mb-8">
          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 gap-1 sm:gap-2 mb-4 sm:mb-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="pensions">Pensions</TabsTrigger>
            <TabsTrigger value="savings">Savings</TabsTrigger>
            <TabsTrigger value="goals">Goals</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-0">
            <div className="space-y-6">
              {/* Income Projector */}
              <IncomeProjector projections={data.projections} benchmarks={data.benchmarks} />

              {/* Quick Actions */}
              <Card className="border-0 shadow-md">
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="p-3 sm:p-4 md:p-6">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                    <Button
                      onClick={() => setShowAddPension(true)}
                      className="h-16 sm:h-20 flex flex-col gap-1 sm:gap-2 bg-teal-500 hover:bg-teal-600"
                    >
                      <Plus className="w-5 h-5 sm:w-6 sm:h-6" />
                      Add Pension
                    </Button>
                    <Button
                      onClick={() => setShowAddSavings(true)}
                      className="h-16 sm:h-20 flex flex-col gap-1 sm:gap-2 bg-blue-500 hover:bg-blue-600"
                    >
                      <Plus className="w-5 h-5 sm:w-6 sm:h-6" />
                      Add Savings
                    </Button>
                    <Button
                      onClick={() => setShowCreateGoal(true)}
                      className="h-16 sm:h-20 flex flex-col gap-1 sm:gap-2 bg-purple-500 hover:bg-purple-600"
                    >
                      <Plus className="w-5 h-5 sm:w-6 sm:h-6" />
                      Create Goal
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Recent Activity */}
              <Card className="border-0 shadow-md">
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent className="p-3 sm:p-4 md:p-6">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-2 sm:p-3 bg-teal-50 rounded-lg">
                      <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                      <span className="text-xs sm:text-sm text-gray-700">Added workplace pension contribution</span>
                      <Badge variant="secondary" className="ml-auto text-xs">
                        Today
                      </Badge>
                    </div>
                    <div className="flex items-center gap-3 p-2 sm:p-3 bg-blue-50 rounded-lg">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-xs sm:text-sm text-gray-700">Updated ISA target amount</span>
                      <Badge variant="secondary" className="ml-auto text-xs">
                        Yesterday
                      </Badge>
                    </div>
                    <div className="flex items-center gap-3 p-2 sm:p-3 bg-purple-50 rounded-lg">
                      <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                      <span className="text-xs sm:text-sm text-gray-700">Created long-term care savings goal</span>
                      <Badge variant="secondary" className="ml-auto text-xs">
                        3 days ago
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="pensions" className="mt-0">
            <PensionAccountsList
              pensions={data.pensions}
              onUpdate={(pensions) => onUpdate({ ...data, pensions })}
              onAdd={() => setShowAddPension(true)}
            />
          </TabsContent>

          <TabsContent value="savings" className="mt-0">
            <SavingsAccountsList
              savings={data.savings}
              onUpdate={(savings) => onUpdate({ ...data, savings })}
              onAdd={() => setShowAddSavings(true)}
            />
          </TabsContent>

          <TabsContent value="goals" className="mt-0">
            <SavingsGoalsTracker
              goals={data.goals}
              onUpdate={(goals) => onUpdate({ ...data, goals })}
              onCreate={() => setShowCreateGoal(true)}
            />
          </TabsContent>
        </Tabs>

        {/* Modals */}
        <AddPensionModal isOpen={showAddPension} onClose={() => setShowAddPension(false)} onAdd={addPension} />

        <AddSavingsModal isOpen={showAddSavings} onClose={() => setShowAddSavings(false)} onAdd={addSavings} />

        <CreateGoalModal isOpen={showCreateGoal} onClose={() => setShowCreateGoal(false)} onCreate={createGoal} />
      </div>
    </div>
  )
}
