"use client"
import { usePathname } from "next/navigation"
import React from "react"

export const Container = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname()
  return (
    <div
      className={`mx-auto px-4 max-w-[900px]`}
    >
      {children}
    </div>
  )
}
