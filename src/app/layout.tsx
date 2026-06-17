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
  metadataBase: new URL("https://soulhausebuilders.com"),
  title: {
    default: "Soulhause Builders — Share What You Build",
    template: "%s | Soulhause Builders",
  },
  description:
    "Soulhause Builders is a free community platform for indie builders, developers, and creators to share projects, find collaborators, and grow together.",
  keywords: ["builders", "indie hackers", "projects", "community", "developers", "creators", "showcase"],
  authors: [{ name: "Soulhause Builders", url: "https://soulhausebuilders.com" }],
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "32x32" },
      { url: "/logo.png", sizes: "512x512", type: "image/png" },
    ],
    apple: "/logo.png",
    shortcut: "/favicon.ico",
  },
  openGraph: {
    type: "website",
    url: "https://soulhausebuilders.com",
    siteName: "Soulhause Builders",
    title: "Soulhause Builders — Share What You Build",
    description:
      "A free community platform for indie builders, developers, and creators to share projects and grow together.",
    images: [{ url: "/logo.png", width: 512, height: 512, alt: "Soulhause Builders" }],
  },
  twitter: {
    card: "summary",
    title: "Soulhause Builders — Share What You Build",
    description:
      "A free community platform for indie builders, developers, and creators to share projects and grow together.",
    images: ["/logo.png"],
  },
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
