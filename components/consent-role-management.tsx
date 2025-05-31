"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Users,
  Shield,
  Eye,
  Edit,
  Lock,
  Plus,
  Mail,
  Clock,
  AlertTriangle,
  X,
  Settings,
  History,
  UserCheck,
  UserX,
  Download,
} from "lucide-react"

interface CaregiverRole {
  id: string
  email: string
  name: string
  role: "primary_poa" | "secondary_poa" | "viewer" | "temporary"
  status: "pending" | "active" | "expired" | "revoked"
  invitedDate: string
  acceptedDate?: string
  expiryDate?: string
  lastActive?: string
  permissions: {
    health: { view: boolean; edit: boolean }
    finances: { view: boolean; edit: boolean }
    documents: { view: boolean; edit: boolean; upload: boolean }
    timeline: { view: boolean; edit: boolean }
    careNotes: { view: boolean; edit: boolean }
    appointments: { view: boolean; edit: boolean }
  }
}

interface AuditLogEntry {
  id: string
  userId: string
  userName: string
  action: string
  module: string
  details: string
  timestamp: string
  ipAddress?: string
  deviceInfo?: string
}

interface ConsentRoleManagementProps {
  careRecipientId: string
  careRecipientName: string
  isOwner: boolean
  currentUserRole?: string
}

export function ConsentRoleManagement({
  careRecipientId,
  careRecipientName,
  isOwner,
  currentUserRole,
}: ConsentRoleManagementProps) {
  const [caregivers, setCaregivers] = useState<CaregiverRole[]>([])
  const [auditLog, setAuditLog] = useState<AuditLogEntry[]>([])
  const [showInviteModal, setShowInviteModal] = useState(false)
  const [showPermissionsModal, setShowPermissionsModal] = useState<CaregiverRole | null>(null)
  const [showAuditModal, setShowAuditModal] = useState(false)
  const [inviteEmail, setInviteEmail] = useState("")
  const [inviteRole, setInviteRole] = useState<CaregiverRole["role"]>("viewer")
  const [inviteExpiry, setInviteExpiry] = useState("")

  // Sample data initialization
  useEffect(() => {
    setCaregivers([
      {
        id: "1",
        email: "john.smith@email.com",
        name: "John Smith",
        role: "primary_poa",
        status: "active",
        invitedDate: "2023-05-15",
        acceptedDate: "2023-05-16",
        lastActive: "2024-01-28",
        permissions: {
          health: { view: true, edit: true },
          finances: { view: true, edit: true },
          documents: { view: true, edit: true, upload: true },
          timeline: { view: true, edit: true },
          careNotes: { view: true, edit: true },
          appointments: { view: true, edit: true },
        },
      },
      {
        id: "2",
        email: "mary.smith@email.com",
        name: "Mary Smith",
        role: "secondary_poa",
        status: "active",
        invitedDate: "2023-06-01",
        acceptedDate: "2023-06-02",
        lastActive: "2024-01-27",
        permissions: {
          health: { view: true, edit: true },
          finances: { view: true, edit: false },
          documents: { view: true, edit: false, upload: false },
          timeline: { view: true, edit: true },
          careNotes: { view: true, edit: true },
          appointments: { view: true, edit: true },
        },
      },
      {
        id: "3",
        email: "sarah.jones@email.com",
        name: "Sarah Jones",
        role: "viewer",
        status: "active",
        invitedDate: "2023-08-10",
        acceptedDate: "2023-08-12",
        lastActive: "2024-01-25",
        permissions: {
          health: { view: true, edit: false },
          finances: { view: false, edit: false },
          documents: { view: false, edit: false, upload: false },
          timeline: { view: true, edit: false },
          careNotes: { view: true, edit: false },
          appointments: { view: true, edit: false },
        },
      },
      {
        id: "4",
        email: "temp.helper@email.com",
        name: "Temporary Helper",
        role: "temporary",
        status: "pending",
        invitedDate: "2024-01-20",
        expiryDate: "2024-02-20",
        permissions: {
          health: { view: true, edit: false },
          finances: { view: false, edit: false },
          documents: { view: false, edit: false, upload: false },
          timeline: { view: true, edit: false },
          careNotes: { view: true, edit: true },
          appointments: { view: true, edit: false },
        },
      },
    ])

    setAuditLog([
      {
        id: "1",
        userId: "1",
        userName: "John Smith",
        action: "Updated care notes",
        module: "Health",
        details: "Added weekly care note for Margaret",
        timestamp: "2024-01-28 14:30",
        ipAddress: "192.168.1.100",
      },
      {
        id: "2",
        userId: "2",
        userName: "Mary Smith",
        action: "Viewed documents",
        module: "Documents",
        details: "Accessed NHS number document",
        timestamp: "2024-01-28 10:15",
        ipAddress: "192.168.1.101",
      },
      {
        id: "3",
        userId: "1",
        userName: "John Smith",
        action: "Added appointment",
        module: "Timeline",
        details: "Scheduled GP appointment for February 2nd",
        timestamp: "2024-01-27 16:45",
        ipAddress: "192.168.1.100",
      },
      {
        id: "4",
        userId: "3",
        userName: "Sarah Jones",
        action: "Logged in",
        module: "System",
        details: "Accessed NestCare dashboard",
        timestamp: "2024-01-25 09:20",
        ipAddress: "192.168.1.102",
      },
    ])
  }, [])

  const getRoleColor = (role: string) => {
    switch (role) {
      case "primary_poa":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "secondary_poa":
        return "bg-green-100 text-green-800 border-green-200"
      case "viewer":
        return "bg-purple-100 text-purple-800 border-purple-200"
      case "temporary":
        return "bg-orange-100 text-orange-800 border-orange-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 border-green-200"
      case "pending":
        return "bg-amber-100 text-amber-800 border-amber-200"
      case "expired":
        return "bg-red-100 text-red-800 border-red-200"
      case "revoked":
        return "bg-gray-100 text-gray-800 border-gray-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getRoleDisplayName = (role: string) => {
    switch (role) {
      case "primary_poa":
        return "Primary POA"
      case "secondary_poa":
        return "Secondary POA"
      case "viewer":
        return "Viewer"
      case "temporary":
        return "Temporary Helper"
      default:
        return role
    }
  }

  const getPermissionIcon = (hasView: boolean, hasEdit: boolean) => {
    if (hasEdit) return <Edit className="w-4 h-4 text-green-600" />
    if (hasView) return <Eye className="w-4 h-4 text-blue-600" />
    return <Lock className="w-4 h-4 text-gray-400" />
  }

  const handleInviteCaregiver = () => {
    if (!inviteEmail) return

    const newCaregiver: CaregiverRole = {
      id: Date.now().toString(),
      email: inviteEmail,
      name: inviteEmail.split("@")[0],
      role: inviteRole,
      status: "pending",
      invitedDate: new Date().toLocaleDateString(),
      expiryDate: inviteExpiry || undefined,
      permissions: getDefaultPermissions(inviteRole),
    }

    setCaregivers((prev) => [...prev, newCaregiver])
    setInviteEmail("")
    setInviteExpiry("")
    setShowInviteModal(false)

    // Log the action
    const logEntry: AuditLogEntry = {
      id: Date.now().toString(),
      userId: "owner",
      userName: "Profile Owner",
      action: "Invited caregiver",
      module: "Access Control",
      details: `Invited ${inviteEmail} as ${getRoleDisplayName(inviteRole)}`,
      timestamp: new Date().toLocaleString(),
    }
    setAuditLog((prev) => [logEntry, ...prev])
  }

  const getDefaultPermissions = (role: CaregiverRole["role"]) => {
    switch (role) {
      case "primary_poa":
        return {
          health: { view: true, edit: true },
          finances: { view: true, edit: true },
          documents: { view: true, edit: true, upload: true },
          timeline: { view: true, edit: true },
          careNotes: { view: true, edit: true },
          appointments: { view: true, edit: true },
        }
      case "secondary_poa":
        return {
          health: { view: true, edit: true },
          finances: { view: true, edit: false },
          documents: { view: true, edit: false, upload: false },
          timeline: { view: true, edit: true },
          careNotes: { view: true, edit: true },
          appointments: { view: true, edit: true },
        }
      case "viewer":
        return {
          health: { view: true, edit: false },
          finances: { view: false, edit: false },
          documents: { view: false, edit: false, upload: false },
          timeline: { view: true, edit: false },
          careNotes: { view: true, edit: false },
          appointments: { view: true, edit: false },
        }
      case "temporary":
        return {
          health: { view: true, edit: false },
          finances: { view: false, edit: false },
          documents: { view: false, edit: false, upload: false },
          timeline: { view: true, edit: false },
          careNotes: { view: true, edit: true },
          appointments: { view: true, edit: false },
        }
      default:
        return {
          health: { view: false, edit: false },
          finances: { view: false, edit: false },
          documents: { view: false, edit: false, upload: false },
          timeline: { view: false, edit: false },
          careNotes: { view: false, edit: false },
          appointments: { view: false, edit: false },
        }
    }
  }

  const handleRevokeAccess = (caregiverId: string) => {
    setCaregivers((prev) =>
      prev.map((caregiver) => (caregiver.id === caregiverId ? { ...caregiver, status: "revoked" } : caregiver)),
    )

    const caregiver = caregivers.find((c) => c.id === caregiverId)
    if (caregiver) {
      const logEntry: AuditLogEntry = {
        id: Date.now().toString(),
        userId: "owner",
        userName: "Profile Owner",
        action: "Revoked access",
        module: "Access Control",
        details: `Revoked access for ${caregiver.name}`,
        timestamp: new Date().toLocaleString(),
      }
      setAuditLog((prev) => [logEntry, ...prev])
    }
  }

  const updatePermissions = (caregiverId: string, newPermissions: CaregiverRole["permissions"]) => {
    setCaregivers((prev) =>
      prev.map((caregiver) =>
        caregiver.id === caregiverId ? { ...caregiver, permissions: newPermissions } : caregiver,
      ),
    )

    const caregiver = caregivers.find((c) => c.id === caregiverId)
    if (caregiver) {
      const logEntry: AuditLogEntry = {
        id: Date.now().toString(),
        userId: "owner",
        userName: "Profile Owner",
        action: "Updated permissions",
        module: "Access Control",
        details: `Updated permissions for ${caregiver.name}`,
        timestamp: new Date().toLocaleString(),
      }
      setAuditLog((prev) => [logEntry, ...prev])
    }
  }

  const pendingInvites = caregivers.filter((c) => c.status === "pending")
  const activeCaregiver = caregivers.filter((c) => c.status === "active")
  const expiredCaregiver = caregivers.filter((c) => c.status === "expired" || c.status === "revoked")

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-semibold text-gray-800">Consent & Role Management</h2>
          <p className="text-gray-600">Managing access permissions for {careRecipientName}</p>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="outline" onClick={() => setShowAuditModal(true)}>
            <History className="w-4 h-4 mr-1" />
            Audit Log
          </Button>
          {isOwner && (
            <Button onClick={() => setShowInviteModal(true)} className="bg-indigo-500 hover:bg-indigo-600">
              <Plus className="w-4 h-4 mr-1" />
              Invite Caregiver
            </Button>
          )}
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card className="border-0 shadow-lg">
          <CardContent className="p-4 text-center">
            <UserCheck className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-green-700">{activeCaregiver.length}</div>
            <div className="text-sm text-gray-600">Active Caregivers</div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardContent className="p-4 text-center">
            <Clock className="w-8 h-8 text-amber-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-amber-700">{pendingInvites.length}</div>
            <div className="text-sm text-gray-600">Pending Invites</div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardContent className="p-4 text-center">
            <UserX className="w-8 h-8 text-red-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-red-700">{expiredCaregiver.length}</div>
            <div className="text-sm text-gray-600">Expired/Revoked</div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardContent className="p-4 text-center">
            <Shield className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-blue-700">{auditLog.length}</div>
            <div className="text-sm text-gray-600">Audit Entries</div>
          </CardContent>
        </Card>
      </div>

      {/* Pending Invites Alert */}
      {pendingInvites.length > 0 && (
        <Alert className="border-amber-200 bg-amber-50">
          <AlertTriangle className="h-4 w-4 text-amber-600" />
          <AlertDescription className="text-amber-800">
            <strong>{pendingInvites.length} pending invite(s)</strong> waiting for acceptance.{" "}
            {pendingInvites.map((invite) => invite.email).join(", ")}
          </AlertDescription>
        </Alert>
      )}

      {/* Caregivers Management */}
      <Tabs defaultValue="active" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="active">Active Caregivers</TabsTrigger>
          <TabsTrigger value="pending">Pending Invites</TabsTrigger>
          <TabsTrigger value="permissions">Permissions Overview</TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="space-y-4">
          {activeCaregiver.map((caregiver) => (
            <Card key={caregiver.id} className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center">
                      <Users className="w-6 h-6 text-indigo-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{caregiver.name}</h3>
                      <p className="text-gray-600">{caregiver.email}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="outline" className={getRoleColor(caregiver.role)}>
                          {getRoleDisplayName(caregiver.role)}
                        </Badge>
                        <Badge variant="outline" className={getStatusColor(caregiver.status)}>
                          {caregiver.status}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="text-right text-sm text-gray-500">
                      <div>Last active: {caregiver.lastActive}</div>
                      <div>Joined: {caregiver.acceptedDate}</div>
                    </div>

                    <div className="flex gap-2">
                      {isOwner && (
                        <>
                          <Button variant="outline" size="sm" onClick={() => setShowPermissionsModal(caregiver)}>
                            <Settings className="w-4 h-4 mr-1" />
                            Permissions
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleRevokeAccess(caregiver.id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <UserX className="w-4 h-4 mr-1" />
                            Revoke
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {/* Quick Permissions Overview */}
                <div className="mt-4 pt-4 border-t">
                  <div className="grid grid-cols-3 md:grid-cols-6 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      {getPermissionIcon(caregiver.permissions.health.view, caregiver.permissions.health.edit)}
                      <span>Health</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {getPermissionIcon(caregiver.permissions.finances.view, caregiver.permissions.finances.edit)}
                      <span>Finances</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {getPermissionIcon(caregiver.permissions.documents.view, caregiver.permissions.documents.edit)}
                      <span>Documents</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {getPermissionIcon(caregiver.permissions.timeline.view, caregiver.permissions.timeline.edit)}
                      <span>Timeline</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {getPermissionIcon(caregiver.permissions.careNotes.view, caregiver.permissions.careNotes.edit)}
                      <span>Care Notes</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {getPermissionIcon(
                        caregiver.permissions.appointments.view,
                        caregiver.permissions.appointments.edit,
                      )}
                      <span>Appointments</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="pending" className="space-y-4">
          {pendingInvites.map((invite) => (
            <Card key={invite.id} className="border-0 shadow-lg border-l-4 border-l-amber-400">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
                      <Mail className="w-6 h-6 text-amber-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{invite.email}</h3>
                      <p className="text-gray-600">Invited as {getRoleDisplayName(invite.role)}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-sm text-gray-500">Invited: {invite.invitedDate}</span>
                        {invite.expiryDate && (
                          <span className="text-sm text-amber-600">Expires: {invite.expiryDate}</span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Mail className="w-4 h-4 mr-1" />
                      Resend
                    </Button>
                    <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                      <X className="w-4 h-4 mr-1" />
                      Cancel
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          {pendingInvites.length === 0 && (
            <Card className="border-2 border-dashed border-gray-300 bg-gray-50/50">
              <CardContent className="p-8 text-center">
                <Mail className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-600 mb-2">No Pending Invites</h3>
                <p className="text-gray-500">All invitations have been accepted or expired</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="permissions" className="space-y-6">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Permissions Matrix</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-3">Caregiver</th>
                      <th className="text-center p-3">Health</th>
                      <th className="text-center p-3">Finances</th>
                      <th className="text-center p-3">Documents</th>
                      <th className="text-center p-3">Timeline</th>
                      <th className="text-center p-3">Care Notes</th>
                      <th className="text-center p-3">Appointments</th>
                    </tr>
                  </thead>
                  <tbody>
                    {activeCaregiver.map((caregiver) => (
                      <tr key={caregiver.id} className="border-b">
                        <td className="p-3">
                          <div>
                            <div className="font-medium">{caregiver.name}</div>
                            <Badge variant="outline" className={getRoleColor(caregiver.role)}>
                              {getRoleDisplayName(caregiver.role)}
                            </Badge>
                          </div>
                        </td>
                        <td className="text-center p-3">
                          {getPermissionIcon(caregiver.permissions.health.view, caregiver.permissions.health.edit)}
                        </td>
                        <td className="text-center p-3">
                          {getPermissionIcon(caregiver.permissions.finances.view, caregiver.permissions.finances.edit)}
                        </td>
                        <td className="text-center p-3">
                          {getPermissionIcon(
                            caregiver.permissions.documents.view,
                            caregiver.permissions.documents.edit,
                          )}
                        </td>
                        <td className="text-center p-3">
                          {getPermissionIcon(caregiver.permissions.timeline.view, caregiver.permissions.timeline.edit)}
                        </td>
                        <td className="text-center p-3">
                          {getPermissionIcon(
                            caregiver.permissions.careNotes.view,
                            caregiver.permissions.careNotes.edit,
                          )}
                        </td>
                        <td className="text-center p-3">
                          {getPermissionIcon(
                            caregiver.permissions.appointments.view,
                            caregiver.permissions.appointments.edit,
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Invite Modal */}
      <Dialog open={showInviteModal} onOpenChange={setShowInviteModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Invite Caregiver</DialogTitle>
            <DialogDescription>
              Invite someone to help care for {careRecipientName}. You can set their role and permissions.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="caregiver@example.com"
                value={inviteEmail}
                onChange={(e) => setInviteEmail(e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="role">Role</Label>
              <select
                id="role"
                value={inviteRole}
                onChange={(e) => setInviteRole(e.target.value as CaregiverRole["role"])}
                className="w-full p-2 border rounded-md"
              >
                <option value="primary_poa">Primary POA (Full Access)</option>
                <option value="secondary_poa">Secondary POA (Limited Financial Access)</option>
                <option value="viewer">Viewer (Read-Only)</option>
                <option value="temporary">Temporary Helper (Limited Time)</option>
              </select>
            </div>

            {inviteRole === "temporary" && (
              <div>
                <Label htmlFor="expiry">Expiry Date (Optional)</Label>
                <Input id="expiry" type="date" value={inviteExpiry} onChange={(e) => setInviteExpiry(e.target.value)} />
              </div>
            )}

            <Alert>
              <Shield className="h-4 w-4" />
              <AlertDescription>
                The invited person will receive an email with a secure link to accept this invitation. You can revoke
                access at any time.
              </AlertDescription>
            </Alert>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowInviteModal(false)}>
              Cancel
            </Button>
            <Button onClick={handleInviteCaregiver} className="bg-indigo-500 hover:bg-indigo-600">
              <Mail className="w-4 h-4 mr-1" />
              Send Invitation
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Permissions Modal */}
      <Dialog open={showPermissionsModal !== null} onOpenChange={() => setShowPermissionsModal(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Permissions - {showPermissionsModal?.name}</DialogTitle>
            <DialogDescription>
              Customize what {showPermissionsModal?.name} can view and edit for {careRecipientName}.
            </DialogDescription>
          </DialogHeader>

          {showPermissionsModal && (
            <div className="space-y-6">
              {Object.entries(showPermissionsModal.permissions).map(([module, perms]) => (
                <div key={module} className="space-y-3">
                  <h4 className="font-medium capitalize">{module.replace(/([A-Z])/g, " $1")}</h4>
                  <div className="flex items-center gap-6 pl-4">
                    <div className="flex items-center space-x-2">
                      <Switch
                        id={`${module}-view`}
                        checked={perms.view}
                        onCheckedChange={(checked) => {
                          const newPermissions = {
                            ...showPermissionsModal.permissions,
                            [module]: { ...perms, view: checked, edit: checked ? perms.edit : false },
                          }
                          setShowPermissionsModal({ ...showPermissionsModal, permissions: newPermissions })
                        }}
                      />
                      <Label htmlFor={`${module}-view`}>View</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch
                        id={`${module}-edit`}
                        checked={perms.edit}
                        disabled={!perms.view}
                        onCheckedChange={(checked) => {
                          const newPermissions = {
                            ...showPermissionsModal.permissions,
                            [module]: { ...perms, edit: checked },
                          }
                          setShowPermissionsModal({ ...showPermissionsModal, permissions: newPermissions })
                        }}
                      />
                      <Label htmlFor={`${module}-edit`}>Edit</Label>
                    </div>
                    {module === "documents" && "upload" in perms && (
                      <div className="flex items-center space-x-2">
                        <Switch
                          id={`${module}-upload`}
                          checked={(perms as any).upload}
                          disabled={!perms.edit}
                          onCheckedChange={(checked) => {
                            const newPermissions = {
                              ...showPermissionsModal.permissions,
                              [module]: { ...perms, upload: checked },
                            }
                            setShowPermissionsModal({ ...showPermissionsModal, permissions: newPermissions })
                          }}
                        />
                        <Label htmlFor={`${module}-upload`}>Upload</Label>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowPermissionsModal(null)}>
              Cancel
            </Button>
            <Button
              onClick={() => {
                if (showPermissionsModal) {
                  updatePermissions(showPermissionsModal.id, showPermissionsModal.permissions)
                  setShowPermissionsModal(null)
                }
              }}
              className="bg-indigo-500 hover:bg-indigo-600"
            >
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Audit Log Modal */}
      <Dialog open={showAuditModal} onOpenChange={setShowAuditModal}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Audit Log</DialogTitle>
            <DialogDescription>Complete history of actions taken in {careRecipientName}'s profile.</DialogDescription>
          </DialogHeader>

          <div className="max-h-96 overflow-y-auto">
            <div className="space-y-3">
              {auditLog.map((entry) => (
                <div key={entry.id} className="p-3 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">{entry.module}</Badge>
                      <span className="font-medium">{entry.userName}</span>
                    </div>
                    <span className="text-sm text-gray-500">{entry.timestamp}</span>
                  </div>
                  <div className="text-sm">
                    <span className="font-medium">{entry.action}:</span> {entry.details}
                  </div>
                  {entry.ipAddress && <div className="text-xs text-gray-500 mt-1">IP: {entry.ipAddress}</div>}
                </div>
              ))}
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAuditModal(false)}>
              Close
            </Button>
            <Button variant="outline">
              <Download className="w-4 h-4 mr-1" />
              Export Log
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
