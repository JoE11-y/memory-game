"use client"
import { ConfigProvider, theme as antdTheme } from "antd"
import React, { useEffect } from "react";
import { ThemeProvider, useThemeMode } from 'antd-style'
import { AntdRegistry } from '@ant-design/nextjs-registry';
import { ThemeProvider as ThemeProviderNext, useTheme } from "next-themes";

export const AntProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <AntdRegistry>
      <ThemeProviderNext>
        <ThemeProvider>
          <AntDesignProvider>
            {children}
          </AntDesignProvider>
        </ThemeProvider>
      </ThemeProviderNext>
    </AntdRegistry>
  )
}

function AntDesignProvider({ children }: { children: React.ReactNode }) {
  const { setThemeMode } = useThemeMode()
  const { theme } = useTheme()

  useEffect(() => {
    const currMode = theme;
    setThemeMode(currMode as 'light' || 'dark' || 'dark')
  }, [])

  return (
    <ConfigProvider
      theme={{
        algorithm: theme == 'dark' ? antdTheme.darkAlgorithm : antdTheme.defaultAlgorithm,
        token: { colorPrimary: "#F2994A" }
      }}
    >
      {children}
    </ConfigProvider>
  )
}
