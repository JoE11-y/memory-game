"use client"
import Game from "@/components/game";
import Header from "@/components/layout/Header";
import { Footer } from "@/components/shared/Footer";
import { useTheme } from "@/hooks/useTheme";


export default function GamePage() {
  const { mode } = useTheme()
  return (
    <div className="container max-w-2xl mt-16">
      <Header />

      <div className={`flex items-center justify-center mt-4 p-10 ${mode == 'dark' ? 'bg-darkgray' : 'bg-lightgray'} shadow-lg max-h-[500px]`}>
        <Game />
      </div>

      <Footer />
    </div>
  );
}
