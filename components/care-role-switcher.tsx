"use client"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Users, User, Shield } from "lucide-react"

interface CareRoleSwitcherProps {
  activeRole: "self" | "carer"
  onRoleChange: (role: "self" | "carer") => void
  careRecipients?: Array<{
    id: string
    name: string
    relationship: string
  }>
}

export function CareRoleSwitcher({ activeRole, onRoleChange, careRecipients = [] }: CareRoleSwitcherProps) {
  return (
    <div className="flex items-center gap-4">
      {/* Role Toggle */}
      <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
        <Button
          variant={activeRole === "self" ? "default" : "ghost"}
          size="sm"
          onClick={() => onRoleChange("self")}
          className="text-xs"
        >
          <User className="w-3 h-3 mr-1" />
          My Planning
        </Button>
        <Button
          variant={activeRole === "carer" ? "default" : "ghost"}
          size="sm"
          onClick={() => onRoleChange("carer")}
          className={`text-xs ${activeRole === "carer" ? "bg-indigo-500 hover:bg-indigo-600 text-white" : ""}`}
        >
          <Users className="w-3 h-3 mr-1" />
          Caring For
        </Button>
      </div>

      {/* POA Status */}
      {activeRole === "carer" && (
        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
          <Shield className="w-3 h-3 mr-1" />
          POA Active
        </Badge>
      )}

      {/* Care Recipients Count */}
      {activeRole === "carer" && careRecipients.length > 0 && (
        <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
          {careRecipients.length} {careRecipients.length === 1 ? "person" : "people"}
        </Badge>
      )}
    </div>
  )
}
