"use client"
import Chat from "@/components/game/Chat";
import Playground from "@/components/game/Playground";
import Header from "@/components/layout/Header";
import { Footer } from "@/components/shared/Footer";
import { useThemeMode } from "antd-style";

interface PageProps {
  params: {
    id: string;
  };
}

export default function InGamePage({ params }: PageProps) {
  const { id } = params
  const { isDarkMode } = useThemeMode()
  return (
    <div className="container max-w-2xl mt-16">
      <Header />
      <div className="flex gap-2 w-full relative">
        <div className={`w-full flex items-center justify-center mt-4 p-10 ${isDarkMode ? 'bg-darkgray' : 'bg-lightgray'} shadow-lg max-h-[500px]`}>
          <Playground gameId={id} />
        </div>
        <div className="absolute bottom-0 right-0 p-4">
          {/* <Chat /> */}
        </div>
      </div>
      <Footer />
    </div >
  );
}
