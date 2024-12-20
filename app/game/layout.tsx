"use client"
import PrivateRoutes from "@/components/utilities/PrivateRoutes"
import React from "react"

const GamesLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <PrivateRoutes>
      {children}
    </PrivateRoutes>
  )
}

export default GamesLayout
