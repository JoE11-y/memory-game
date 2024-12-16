"use client"
import React from "react"
import moment from "moment"
import { Switch } from "antd";
import { useTheme } from "@/hooks/useTheme";
import { useTheme as useThemeNext } from "next-themes"

export const Footer = () => {
  const { mode, setMode } = useTheme();
  const { theme, setTheme } = useThemeNext();

  const handleSetTheme = (theme: 'light' | 'dark') => {
    setTheme(theme);
    setMode(theme)
  }
  return (
    <div className="w-full p-[3em] mt-auto">
      <div className="flex items-center justify-between p-3">
        <h3 className="font-bold text-[14px]">
          {moment().year()}
        </h3>
        <div className="flex gap-4 items-center">
          <Switch checkedChildren="Dark" unCheckedChildren="Light" checked={mode == 'light'} onClick={() => handleSetTheme(mode == 'light' ? 'dark' : 'light')} />
        </div>
      </div>

    </div>
  )
}