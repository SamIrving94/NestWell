"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Heart, Shield, Clock, CheckCircle, AlertTriangle, Users, Sparkles } from "lucide-react"

export function NestCareDesignSystem() {
  return (
    <div className="nestcare-theme min-h-screen nestcare-bg-gradient">
      <div className="container mx-auto p-6 space-y-8">
        {/* Header with warm welcome */}
        <div className="text-center space-y-4 animate-warm-fade-in">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center animate-gentle-pulse">
              <Heart className="w-8 h-8 text-white" />
            </div>
            <h1 className="nestcare-heading text-4xl">NestCare</h1>
          </div>
          <p className="nestcare-body text-xl max-w-2xl mx-auto">
            A warm, supportive space designed for caregivers and families. Every element crafted with comfort and
            clarity in mind.
          </p>
        </div>

        {/* Color Palette Showcase */}
        <Card className="nestcare-card animate-warm-fade-in">
          <CardHeader>
            <CardTitle className="nestcare-heading flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-purple-500" />
              Warm & Calming Color Palette
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center space-y-2">
                <div className="w-16 h-16 bg-purple-500 rounded-lg mx-auto animate-soft-glow"></div>
                <p className="nestcare-caption">Primary Purple</p>
                <p className="nestcare-caption text-xs">#8b5cf6</p>
              </div>
              <div className="text-center space-y-2">
                <div className="w-16 h-16 bg-pink-500 rounded-lg mx-auto"></div>
                <p className="nestcare-caption">Warm Pink</p>
                <p className="nestcare-caption text-xs">#ec4899</p>
              </div>
              <div className="text-center space-y-2">
                <div className="w-16 h-16 bg-emerald-500 rounded-lg mx-auto"></div>
                <p className="nestcare-caption">Gentle Green</p>
                <p className="nestcare-caption text-xs">#10b981</p>
              </div>
              <div className="text-center space-y-2">
                <div className="w-16 h-16 bg-amber-500 rounded-lg mx-auto"></div>
                <p className="nestcare-caption">Warm Amber</p>
                <p className="nestcare-caption text-xs">#f59e0b</p>
              </div>
            </div>

            <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-100">
              <p className="nestcare-body text-sm">
                <strong>Design Philosophy:</strong> Our color palette draws from nature's most comforting hues - soft
                purples that evoke tranquility, warm pinks that suggest care and compassion, and gentle greens that
                represent growth and healing.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Typography Showcase */}
        <Card className="nestcare-card animate-warm-fade-in">
          <CardHeader>
            <CardTitle className="nestcare-heading">Typography & Readability</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div>
                <h2 className="nestcare-heading text-2xl mb-2">Headings - Inter Font Family</h2>
                <p className="nestcare-caption">Clean, modern, and highly readable with optimal letter spacing</p>
              </div>

              <div>
                <h3 className="nestcare-subheading text-lg mb-2">Subheadings - Medium Weight</h3>
                <p className="nestcare-caption">Provides clear hierarchy while maintaining warmth</p>
              </div>

              <div>
                <p className="nestcare-body">
                  Body text uses a comfortable line height of 1.7 for easy reading. This enhanced spacing reduces eye
                  strain and creates a more relaxed reading experience, especially important for caregivers who may be
                  reading during stressful times.
                </p>
              </div>

              <div>
                <p className="nestcare-caption">
                  Caption text is sized appropriately for secondary information, maintaining readability while
                  establishing clear information hierarchy.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Component Showcase */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Status Cards */}
          <Card className="nestcare-card animate-warm-fade-in">
            <CardHeader>
              <CardTitle className="nestcare-heading">Emotional Status Indicators</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="nestcare-status-positive p-4 rounded-lg flex items-center gap-3">
                <CheckCircle className="w-5 h-5" />
                <div>
                  <p className="font-medium">All is well</p>
                  <p className="text-sm opacity-80">Margaret had a great day today</p>
                </div>
              </div>

              <div className="nestcare-status-attention p-4 rounded-lg flex items-center gap-3">
                <Clock className="w-5 h-5" />
                <div>
                  <p className="font-medium">Gentle reminder</p>
                  <p className="text-sm opacity-80">Medication due in 30 minutes</p>
                </div>
              </div>

              <div className="nestcare-status-urgent p-4 rounded-lg flex items-center gap-3">
                <AlertTriangle className="w-5 h-5" />
                <div>
                  <p className="font-medium">Needs attention</p>
                  <p className="text-sm opacity-80">Appointment confirmation required</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Interactive Elements */}
          <Card className="nestcare-card animate-warm-fade-in">
            <CardHeader>
              <CardTitle className="nestcare-heading">Comforting Interactions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button className="nestcare-button-primary w-full">Primary Action - Warm & Inviting</Button>

              <Button variant="outline" className="w-full border-purple-200 text-purple-700 hover:bg-purple-50">
                Secondary Action - Gentle
              </Button>

              <div className="flex gap-2 flex-wrap">
                <Badge className="nestcare-status-positive">Completed</Badge>
                <Badge className="nestcare-status-attention">In Progress</Badge>
                <Badge className="nestcare-status-urgent">Urgent</Badge>
              </div>

              <div className="p-4 nestcare-warm-border rounded-lg">
                <p className="nestcare-body text-sm">
                  Interactive elements use subtle animations and warm feedback to create a sense of responsiveness and
                  care.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Spatial Design */}
        <Card className="nestcare-card animate-warm-fade-in">
          <CardHeader>
            <CardTitle className="nestcare-heading">Spatial Harmony & Breathing Room</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="nestcare-spacing-comfortable nestcare-card">
                <h4 className="nestcare-subheading mb-2">Comfortable Spacing</h4>
                <p className="nestcare-body text-sm">
                  Generous padding creates a sense of calm and prevents visual overwhelm.
                </p>
              </div>

              <div className="nestcare-spacing-cozy nestcare-card">
                <h4 className="nestcare-subheading mb-2">Cozy Grouping</h4>
                <p className="nestcare-body text-sm">
                  Related elements are grouped with intimate spacing for logical flow.
                </p>
              </div>

              <div className="nestcare-spacing-intimate nestcare-card">
                <h4 className="nestcare-subheading mb-2">Intimate Details</h4>
                <p className="nestcare-body text-sm">Fine details use minimal spacing for focused attention.</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Accessibility Features */}
        <Card className="nestcare-card animate-warm-fade-in">
          <CardHeader>
            <CardTitle className="nestcare-heading flex items-center gap-2">
              <Shield className="w-5 h-5 text-purple-500" />
              Accessibility & Comfort Features
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h4 className="nestcare-subheading">Visual Comfort</h4>
                <ul className="nestcare-body text-sm space-y-2">
                  <li>• High contrast ratios for easy reading</li>
                  <li>• Reduced motion options for sensitive users</li>
                  <li>• Consistent focus indicators</li>
                  <li>• Scalable text and interface elements</li>
                </ul>
              </div>

              <div className="space-y-3">
                <h4 className="nestcare-subheading">Emotional Support</h4>
                <ul className="nestcare-body text-sm space-y-2">
                  <li>• Gentle animations that don't startle</li>
                  <li>• Warm color temperatures</li>
                  <li>• Positive language and messaging</li>
                  <li>• Clear, non-technical communication</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Design Principles Summary */}
        <Card className="nestcare-card animate-warm-fade-in nestcare-comfort-glow">
          <CardHeader>
            <CardTitle className="nestcare-heading text-center">Design Principles for Caregiving</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
              <div className="space-y-3">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto">
                  <Heart className="w-6 h-6 text-purple-600" />
                </div>
                <h4 className="nestcare-subheading">Warmth</h4>
                <p className="nestcare-caption">Every interaction feels caring and supportive</p>
              </div>

              <div className="space-y-3">
                <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle className="w-6 h-6 text-emerald-600" />
                </div>
                <h4 className="nestcare-subheading">Clarity</h4>
                <p className="nestcare-caption">Information is clear and easy to understand</p>
              </div>

              <div className="space-y-3">
                <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mx-auto">
                  <Shield className="w-6 h-6 text-amber-600" />
                </div>
                <h4 className="nestcare-subheading">Trust</h4>
                <p className="nestcare-caption">Design builds confidence and reliability</p>
              </div>

              <div className="space-y-3">
                <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center mx-auto">
                  <Users className="w-6 h-6 text-pink-600" />
                </div>
                <h4 className="nestcare-subheading">Connection</h4>
                <p className="nestcare-caption">Facilitates meaningful family collaboration</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
