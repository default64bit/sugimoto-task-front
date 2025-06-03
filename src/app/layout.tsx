import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import SwitchThemeButton from "@/components/SwitchThemeButton";
import Provider from "./provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Apple Store",
  description: "Apple Store",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" dir="ltr">
      <body className={`flex flex-col items-center w-full ${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Provider>
          <main className="flex flex-col items-center justify-center gap-6 px-4 md:px-10 pb-10 w-full max-w-[1680px]">
            <Header />
            {children}
          </main>
        </Provider>
      </body>
    </html>
  );
}
