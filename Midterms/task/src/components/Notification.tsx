"use client"

import type { ReactNode } from "react"

// Observer Pattern: Component for displaying notifications
interface NotificationProps {
  children: ReactNode
}

export function Notification({ children }: NotificationProps) {
  return (
    <div className="absolute top-4 right-4 bg-red-100 text-red-800 px-3 py-1 rounded-md text-sm font-medium flex items-center">
      {children}
    </div>
  )
}
