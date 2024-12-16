"use client";
import { useLocalStorage } from "usehooks-ts";

const useTheme = () => {
  const [mode, setMode] = useLocalStorage<string>("theme-mode", "dark");
  return { mode, setMode };
};

export { useTheme };
