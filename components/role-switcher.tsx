"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Input } from "@/components/ui/input"
import { User, Users, ChevronDown, Shield, Clock, Search, AlertTriangle, UserPlus } from "lucide-react"

interface CareProfile {
  id: string
  name: string
  relationship: string
  role: "primary_poa" | "secondary_poa" | "viewer" | "temporary"
  avatar?: string
  lastAccessed?: string
  isPinned?: boolean
}

interface RoleSwitcherProps {
  currentUser: {
    id: string
    name: string
    email: string
    avatar?: string
  }
  onRoleChange: (role: "self" | "carer", profileId?: string) => void
  currentRole: "self" | "carer"
  currentProfileId?: string
}

export function RoleSwitcher({ currentUser, onRoleChange, currentRole, currentProfileId }: RoleSwitcherProps) {
  const [careProfiles, setCareProfiles] = useState<CareProfile[]>([])
  const [showProfileSelector, setShowProfileSelector] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [showInactivityAlert, setShowInactivityAlert] = useState(false)
  const [lastActivity, setLastActivity] = useState(Date.now())
  const [currentProfile, setCurrentProfile] = useState<CareProfile | null>(null)

  // Sample data initialization
  useEffect(() => {
    const profiles = [
      {
        id: "1",
        name: "Margaret Thompson",
        relationship: "Mother",
        role: "primary_poa" as const,
        avatar: "MT",
        lastAccessed: "2 days ago",
        isPinned: true,
      },
      {
        id: "2",
        name: "Robert Thompson",
        relationship: "Father",
        role: "primary_poa" as const,
        avatar: "RT",
        lastAccessed: "1 week ago",
        isPinned: true,
      },
      {
        id: "3",
        name: "Jean Wilson",
        relationship: "Aunt",
        role: "secondary_poa" as const,
        avatar: "JW",
        lastAccessed: "3 weeks ago",
      },
      {
        id: "4",
        name: "Thomas Green",
        relationship: "Neighbor",
        role: "viewer" as const,
        avatar: "TG",
        lastAccessed: "1 month ago",
      },
    ]
    setCareProfiles(profiles)

    // Set current profile if in carer mode
    if (currentRole === "carer" && currentProfileId) {
      const profile = profiles.find((p) => p.id === currentProfileId)
      if (profile) {
        setCurrentProfile(profile)
      }
    }
  }, [currentRole, currentProfileId])

  // Inactivity check
  useEffect(() => {
    const checkInactivity = () => {
      const now = Date.now()
      const inactiveTime = now - lastActivity
      // Show alert after 30 minutes of inactivity
      if (currentRole === "carer" && inactiveTime > 30 * 60 * 1000) {
        setShowInactivityAlert(true)
      }
    }

    const interval = setInterval(checkInactivity, 60 * 1000) // Check every minute
    const activityListener = () => setLastActivity(Date.now())

    // Reset inactivity timer on user interaction
    window.addEventListener("click", activityListener)
    window.addEventListener("keypress", activityListener)
    window.addEventListener("scroll", activityListener)
    window.addEventListener("mousemove", activityListener)

    return () => {
      clearInterval(interval)
      window.removeEventListener("click", activityListener)
      window.removeEventListener("keypress", activityListener)
      window.removeEventListener("scroll", activityListener)
      window.removeEventListener("mousemove", activityListener)
    }
  }, [currentRole, lastActivity])

  const handleProfileSelect = (profile: CareProfile) => {
    setCurrentProfile(profile)
    onRoleChange("carer", profile.id)
    setShowProfileSelector(false)
    setLastActivity(Date.now())
  }

  const handleSwitchToSelf = () => {
    setCurrentProfile(null)
    onRoleChange("self")
    setLastActivity(Date.now())
  }

  const getRoleBadge = (role: string) => {
    switch (role) {
      case "primary_poa":
        return (
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            <Shield className="w-3 h-3 mr-1" />
            Primary POA
          </Badge>
        )
      case "secondary_poa":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            <Shield className="w-3 h-3 mr-1" />
            Secondary POA
          </Badge>
        )
      case "viewer":
        return (
          <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
            <User className="w-3 h-3 mr-1" />
            Viewer
          </Badge>
        )
      case "temporary":
        return (
          <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200">
            <Clock className="w-3 h-3 mr-1" />
            Temporary
          </Badge>
        )
      default:
        return null
    }
  }

  const filteredProfiles = careProfiles.filter((profile) =>
    profile.name.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const pinnedProfiles = filteredProfiles.filter((profile) => profile.isPinned)
  const otherProfiles = filteredProfiles.filter((profile) => !profile.isPinned)

  return (
    <>
      {/* Role Switcher Dropdown */}
      <div className="flex items-center gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2">
              {currentRole === "self" ? (
                <>
                  <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 text-xs font-medium">
                    {currentUser.avatar || currentUser.name.substring(0, 2)}
                  </div>
                  <span className="hidden sm:inline">Your Profile</span>
                </>
              ) : (
                <>
                  <div className="w-6 h-6 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 text-xs font-medium">
                    {currentProfile?.avatar || "??"}
                  </div>
                  <span className="hidden sm:inline">{currentProfile?.name || "Care Profile"}</span>
                </>
              )}
              <ChevronDown className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>Switch Profile</DropdownMenuLabel>
            <DropdownMenuSeparator />

            {/* Personal Profile Option */}
            <DropdownMenuItem
              className={`flex items-center gap-2 ${currentRole === "self" ? "bg-blue-50" : ""}`}
              onClick={handleSwitchToSelf}
            >
              <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 text-xs font-medium">
                {currentUser.avatar || currentUser.name.substring(0, 2)}
              </div>
              <div className="flex-1">
                <div className="font-medium">{currentUser.name}</div>
                <div className="text-xs text-gray-500">Your Profile</div>
              </div>
              {currentRole === "self" && <Badge className="bg-blue-500">Active</Badge>}
            </DropdownMenuItem>

            <DropdownMenuSeparator />
            <DropdownMenuLabel>Care Profiles</DropdownMenuLabel>

            {/* Quick Access to Recent Care Profiles */}
            {careProfiles.slice(0, 2).map((profile) => (
              <DropdownMenuItem
                key={profile.id}
                className={`flex items-center gap-2 ${
                  currentRole === "carer" && currentProfileId === profile.id ? "bg-indigo-50" : ""
                }`}
                onClick={() => handleProfileSelect(profile)}
              >
                <div className="w-6 h-6 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 text-xs font-medium">
                  {profile.avatar}
                </div>
                <div className="flex-1">
                  <div className="font-medium">{profile.name}</div>
                  <div className="text-xs text-gray-500">{profile.relationship}</div>
                </div>
                {currentRole === "carer" && currentProfileId === profile.id && (
                  <Badge className="bg-indigo-500">Active</Badge>
                )}
              </DropdownMenuItem>
            ))}

            {/* View All Profiles Button */}
            <DropdownMenuItem onClick={() => setShowProfileSelector(true)}>
              <Users className="w-4 h-4 mr-2" />
              <span>View All Care Profiles</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Quick Role Toggle Button */}
        {currentRole === "self" ? (
          <Button
            variant="ghost"
            size="sm"
            className="text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50"
            onClick={() => setShowProfileSelector(true)}
          >
            <Users className="w-4 h-4 mr-1" />
            <span className="hidden sm:inline">Switch to Caregiver</span>
          </Button>
        ) : (
          <Button
            variant="ghost"
            size="sm"
            className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
            onClick={handleSwitchToSelf}
          >
            <User className="w-4 h-4 mr-1" />
            <span className="hidden sm:inline">Back to Your Profile</span>
          </Button>
        )}
      </div>

      {/* Profile Selector Modal */}
      <Dialog open={showProfileSelector} onOpenChange={setShowProfileSelector}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Select Care Profile</DialogTitle>
            <DialogDescription>Choose who you want to support or manage.</DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search profiles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Pinned Profiles */}
            {pinnedProfiles.length > 0 && (
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-2">Pinned</h4>
                <div className="space-y-2">
                  {pinnedProfiles.map((profile) => (
                    <div
                      key={profile.id}
                      className={`p-3 border rounded-lg flex items-center gap-3 cursor-pointer hover:bg-gray-50 ${
                        currentRole === "carer" && currentProfileId === profile.id
                          ? "bg-indigo-50 border-indigo-200"
                          : ""
                      }`}
                      onClick={() => handleProfileSelect(profile)}
                    >
                      <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-medium">
                        {profile.avatar}
                      </div>
                      <div className="flex-1">
                        <div className="font-medium">{profile.name}</div>
                        <div className="text-sm text-gray-500">{profile.relationship}</div>
                      </div>
                      <div className="flex flex-col items-end gap-1">
                        {getRoleBadge(profile.role)}
                        <div className="flex items-center gap-1 text-xs text-gray-500">
                          <Clock className="w-3 h-3" />
                          {profile.lastAccessed}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Other Profiles */}
            {otherProfiles.length > 0 && (
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-2">All Profiles</h4>
                <div className="space-y-2">
                  {otherProfiles.map((profile) => (
                    <div
                      key={profile.id}
                      className={`p-3 border rounded-lg flex items-center gap-3 cursor-pointer hover:bg-gray-50 ${
                        currentRole === "carer" && currentProfileId === profile.id
                          ? "bg-indigo-50 border-indigo-200"
                          : ""
                      }`}
                      onClick={() => handleProfileSelect(profile)}
                    >
                      <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-medium">
                        {profile.avatar}
                      </div>
                      <div className="flex-1">
                        <div className="font-medium">{profile.name}</div>
                        <div className="text-sm text-gray-500">{profile.relationship}</div>
                      </div>
                      <div className="flex flex-col items-end gap-1">
                        {getRoleBadge(profile.role)}
                        <div className="flex items-center gap-1 text-xs text-gray-500">
                          <Clock className="w-3 h-3" />
                          {profile.lastAccessed}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {filteredProfiles.length === 0 && (
              <div className="text-center py-6">
                <Users className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <h3 className="text-lg font-medium text-gray-600 mb-1">No profiles found</h3>
                <p className="text-gray-500 mb-4">Try a different search term or add a new care profile</p>
                <Button>
                  <UserPlus className="w-4 h-4 mr-1" />
                  Add Care Profile
                </Button>
              </div>
            )}
          </div>

          <DialogFooter className="flex justify-between items-center">
            <Button variant="outline" size="sm" onClick={handleSwitchToSelf}>
              <User className="w-4 h-4 mr-1" />
              Your Profile
            </Button>
            <Button variant="outline" onClick={() => setShowProfileSelector(false)}>
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Inactivity Alert */}
      <Dialog open={showInactivityAlert} onOpenChange={setShowInactivityAlert}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Still supporting {currentProfile?.name}?</DialogTitle>
            <DialogDescription>
              You've been inactive for a while. Are you still working on {currentProfile?.name}'s profile?
            </DialogDescription>
          </DialogHeader>

          <Alert>
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              For security and privacy reasons, we'll return you to your personal profile after extended inactivity.
            </AlertDescription>
          </Alert>

          <DialogFooter>
            <Button variant="outline" onClick={handleSwitchToSelf}>
              <User className="w-4 h-4 mr-1" />
              Switch to My Profile
            </Button>
            <Button
              onClick={() => {
                setShowInactivityAlert(false)
                setLastActivity(Date.now())
              }}
              className="bg-indigo-500 hover:bg-indigo-600"
            >
              Continue as Caregiver
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
