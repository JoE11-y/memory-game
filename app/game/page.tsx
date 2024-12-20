"use client"
import Game from "@/components/game";
import Header from "@/components/layout/Header";
import { Footer } from "@/components/shared/Footer";
import { useTheme } from "next-themes";


export default function GamePage() {
  const { theme } = useTheme()
  return (
    <div className="container max-w-2xl mt-16">
      <Header />
      <div className={`flex items-center justify-center mt-4 p-10 ${theme == 'dark' ? 'bg-darkgray' : 'bg-lightgray'} shadow-lg max-h-[500px]`}>
        <Game />
      </div>
      <Footer />
    </div>
  );
}
