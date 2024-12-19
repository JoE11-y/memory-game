"use client"
import Header from "@/components/layout/Header";
import { Footer } from "@/components/shared/Footer";
import { useAccessToken } from "@/hooks/useAccessToken";
import { useTheme } from "@/hooks/useTheme";
import { Button } from "antd";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const { accessToken } = useAccessToken();
  const { mode } = useTheme();

  const handleContinue = () => {
    if (!accessToken) {
      router.replace('/login')
    } else {
      router.replace('/games')
    }
  }
  return (
    <div className="container max-w-2xl mt-16">
      <Header />
      <div className={`flex items-center justify-center mt-4 p-20 shadow-lg ${mode == 'dark' ? 'bg-darkgray' : 'bg-lightgray'}`}>

        <div className="h-[300px] w-[400px] bg-[url('/imgs/background.jpg')] backdrop-blur-sm rounded-lg">

          <div className="flex flex-col items-center justify-center h-full ">


            <div className={`${mode == 'dark' ? "bg-darkgray" : "bg-lightgray"} bg-opacity-60 p-4 rounded-lg`}>
              <h2 className="text-2xl font-semibold">Hello ! 👋</h2>
              <p className="text-lg">
                Welcome to Memory Game
              </p>
              <Button className="mt-4" onClick={handleContinue}>
                Continue
              </Button>
            </div>

          </div>
        </div>

      </div>
      <Footer />
    </div>
  );
}
