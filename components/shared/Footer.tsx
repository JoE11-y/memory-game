"use client"
import React from "react"
import moment from "moment"
import { Switch } from "antd";
import { useThemeMode } from "antd-style";
import { useTheme } from "next-themes";

export const Footer = () => {
  const { isDarkMode, setThemeMode } = useThemeMode()
  const { setTheme } = useTheme()

  const handleSetTheme = (mode: 'light' | 'dark') => {
    setThemeMode(mode);
    setTheme(mode)
  }

  return (
    <div className="w-full py-[3em] mt-auto">
      <div className="flex items-center justify-between p-3">
        <h3 className="font-bold text-[14px]">
          {moment().year()}
        </h3>
        <div className="flex gap-4 items-center">
          <Switch checkedChildren="Dark" unCheckedChildren="Light" checked={isDarkMode} onClick={() => handleSetTheme(!isDarkMode ? 'dark' : 'light')} />
        </div>
      </div>
    </div>
  )
}