import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AntProvider } from "@/components/shared/AntProvider";
import { SocketProvider } from "@/context/socketContext";
import { ReduxProvider } from "@/context/reduxProvider";
import { ToastContainer } from "react-toastify";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Memory Game",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className={`${inter.className}`}>
        <ReduxProvider>
          <SocketProvider>
            <AntProvider>
              {children}
              <ToastContainer />
            </AntProvider>
          </SocketProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
