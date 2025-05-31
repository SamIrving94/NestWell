"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Target, Plus, Calendar, TrendingUp, AlertTriangle } from "lucide-react"

interface SavingsGoal {
  id: string
  title: string
  targetAmount: number
  currentValue: number
  targetAge: number
  priority: string
  linkedToTimeline: boolean
}

interface SavingsGoalsTrackerProps {
  goals: SavingsGoal[]
  onUpdate: (goals: SavingsGoal[]) => void
  onCreate: () => void
}

export function SavingsGoalsTracker({ goals, onUpdate, onCreate }: SavingsGoalsTrackerProps) {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800"
      case "medium":
        return "bg-amber-100 text-amber-800"
      case "low":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case "high":
        return <AlertTriangle className="w-4 h-4 text-red-600" />
      case "medium":
        return <TrendingUp className="w-4 h-4 text-amber-600" />
      case "low":
        return <Target className="w-4 h-4 text-green-600" />
      default:
        return <Target className="w-4 h-4 text-gray-600" />
    }
  }

  const calculateProgress = (current: number, target: number) => {
    return Math.min(100, (current / target) * 100)
  }

  const totalTargetAmount = goals.reduce((sum, goal) => sum + goal.targetAmount, 0)
  const totalCurrentValue = goals.reduce((sum, goal) => sum + goal.currentValue, 0)
  const overallProgress = totalTargetAmount > 0 ? (totalCurrentValue / totalTargetAmount) * 100 : 0

  return (
    <div className="space-y-6">
      {/* Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-0 shadow-md bg-gradient-to-br from-purple-50 to-purple-100">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Target className="w-8 h-8 text-purple-600" />
              <div>
                <div className="text-2xl font-bold text-purple-800">{goals.length}</div>
                <div className="text-sm text-purple-600">Active Goals</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md bg-gradient-to-br from-blue-50 to-blue-100">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <TrendingUp className="w-8 h-8 text-blue-600" />
              <div>
                <div className="text-2xl font-bold text-blue-800">£{totalCurrentValue.toLocaleString()}</div>
                <div className="text-sm text-blue-600">Total Saved</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md bg-gradient-to-br from-green-50 to-green-100">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Calendar className="w-8 h-8 text-green-600" />
              <div>
                <div className="text-2xl font-bold text-green-800">{overallProgress.toFixed(1)}%</div>
                <div className="text-sm text-green-600">Overall Progress</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Goals List */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-800">Your Savings Goals</h2>
          <Button onClick={onCreate} className="bg-purple-500 hover:bg-purple-600">
            <Plus className="w-4 h-4 mr-2" />
            Create Goal
          </Button>
        </div>

        {goals.length === 0 ? (
          <Card className="border-0 shadow-md">
            <CardContent className="p-8 text-center">
              <Target className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-800 mb-2">No savings goals yet</h3>
              <p className="text-gray-600 mb-4">
                Create specific savings goals to track your progress and stay motivated.
              </p>
              <Button onClick={onCreate} className="bg-purple-500 hover:bg-purple-600">
                Create Your First Goal
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4">
            {goals.map((goal) => {
              const progress = calculateProgress(goal.currentValue, goal.targetAmount)
              const remaining = goal.targetAmount - goal.currentValue

              return (
                <Card key={goal.id} className="border-0 shadow-md hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Target className="w-6 h-6 text-purple-600" />
                        <div>
                          <CardTitle className="text-lg">{goal.title}</CardTitle>
                          <p className="text-sm text-gray-600">Target by age {goal.targetAge}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={getPriorityColor(goal.priority)}>
                          {getPriorityIcon(goal.priority)}
                          {goal.priority}
                        </Badge>
                        {goal.linkedToTimeline && (
                          <Badge variant="outline" className="text-xs">
                            <Calendar className="w-3 h-3 mr-1" />
                            Timeline
                          </Badge>
                        )}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Progress */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Progress</span>
                        <span className="font-medium">{progress.toFixed(1)}%</span>
                      </div>
                      <Progress value={progress} className="h-3" />
                      <div className="flex justify-between text-sm text-gray-600">
                        <span>£{goal.currentValue.toLocaleString()}</span>
                        <span>£{goal.targetAmount.toLocaleString()}</span>
                      </div>
                    </div>

                    {/* Details */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <div className="text-sm text-gray-600">Remaining</div>
                        <div className="text-lg font-bold text-gray-800">
                          £{Math.max(0, remaining).toLocaleString()}
                        </div>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <div className="text-sm text-gray-600">Target Age</div>
                        <div className="text-lg font-bold text-gray-800">{goal.targetAge}</div>
                      </div>
                    </div>

                    {/* Status */}
                    {progress >= 100 ? (
                      <div className="bg-green-50 border border-green-200 p-3 rounded-lg">
                        <div className="flex items-center gap-2">
                          <Target className="w-4 h-4 text-green-600" />
                          <span className="text-sm font-medium text-green-800">Goal achieved!</span>
                        </div>
                      </div>
                    ) : progress >= 75 ? (
                      <div className="bg-blue-50 border border-blue-200 p-3 rounded-lg">
                        <div className="flex items-center gap-2">
                          <TrendingUp className="w-4 h-4 text-blue-600" />
                          <span className="text-sm font-medium text-blue-800">
                            Great progress! You're almost there.
                          </span>
                        </div>
                      </div>
                    ) : progress >= 25 ? (
                      <div className="bg-amber-50 border border-amber-200 p-3 rounded-lg">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-amber-600" />
                          <span className="text-sm font-medium text-amber-800">
                            Keep going! You're making steady progress.
                          </span>
                        </div>
                      </div>
                    ) : (
                      <div className="bg-red-50 border border-red-200 p-3 rounded-lg">
                        <div className="flex items-center gap-2">
                          <AlertTriangle className="w-4 h-4 text-red-600" />
                          <span className="text-sm font-medium text-red-800">
                            Consider increasing your savings rate to reach this goal.
                          </span>
                        </div>
                      </div>
                    )}
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
