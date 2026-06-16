import type { Metadata } from "next";
import { Fredoka } from "next/font/google";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { SunCursor } from "@/components/ui/sun-cursor";
import "./globals.css";

const fredoka = Fredoka({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-retro",
});

export const metadata: Metadata = {
  title: "Soulbuilders — Community Platform",
  description:
    "A free, lightweight community platform for builders to share profiles and projects.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={fredoka.variable}>
      <body className="flex min-h-screen flex-col">
        <SunCursor />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
