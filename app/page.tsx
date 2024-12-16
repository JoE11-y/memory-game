"use client"
import Cards from "@/components/cards/Cards";
import { Footer } from "@/components/shared/Footer";

export default function Home() {
  return (
    <div className="flex flex-col m-0 min-h-screen sm:p-20">

      <div className="w-full">
        <h1>MEMORY GAME</h1>
      </div>

      <main className="p-10">
        <Cards />
      </main>

      <Footer />
    </div>
  );
}
