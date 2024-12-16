"use client"
import { ThemeProvider } from 'next-themes'
import { ConfigProvider, theme as antdTheme } from "antd"
import React from "react";
import { useTheme } from "@/hooks/useTheme";
import { useTheme as useThemeNext } from 'next-themes'
import { AntdRegistry } from '@ant-design/nextjs-registry';

export const AntProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <AntdRegistry>
      <ThemeProvider>
        <AntDesignProvider>
          {children}
        </AntDesignProvider>
      </ThemeProvider>
    </AntdRegistry>
  )
}

function AntDesignProvider({ children }: { children: React.ReactNode }) {
  const { mode } = useTheme();
  const { theme: currentTheme = mode } = useThemeNext()
  return (
    <ConfigProvider
      theme={{
        algorithm: currentTheme === 'light' ? antdTheme.defaultAlgorithm : antdTheme.darkAlgorithm,
        token: { colorPrimary: "#f0591d" }
      }}
    >
      {children}
    </ConfigProvider>
  )
}
