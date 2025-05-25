import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { NavigationProvider } from "@/components/navigation-context"
import { DemoBanner } from "@/components/demo-banner"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "NestWell - Plan a life well-lived",
  description: "With NestWell, you're never planning alone.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NavigationProvider>
          <DemoBanner />
          {children}
        </NavigationProvider>
      </body>
    </html>
  )
}
