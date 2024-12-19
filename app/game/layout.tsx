"use client"
import { Container } from "@/components/utilities/Container"
import PrivateRoutes from "@/components/utilities/PrivateRoutes"
import React from "react"

const GamesLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <PrivateRoutes>
        <div
          className={`min-h-screen py-[30px] text-white relative`}
        >
          <div className="relative z-[10]">
            <Container>{children}</Container>
          </div>
        </div>
      </PrivateRoutes>
    </>
  )
}

export default GamesLayout
