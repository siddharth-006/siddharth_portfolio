import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { CursorCyber } from "@/components/CursorCyber";
import { StartupLoader } from "@/components/StartupLoader";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Siddharth Vijayakumar | AI & Data Science Engineer",
  description: "Portfolio of Siddharth Vijayakumar, Computer Science Engineering Student & Aspiring Data Scientist.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <StartupLoader />
        <CursorCyber />
        <Navbar />
        {children}
      </body>
    </html>
  );
}
