import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { GlobalSponsorLogos } from "@/components/layout/global-sponsor-logos";
import SplashCursor from "@/components/ui/splash-cursor";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-heading",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "HRWest 2026 | The Premier HR Conference",
  description: "Join us for the ultimate HR conference experience.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} ${outfit.variable} antialiased min-h-screen bg-background font-sans selection:bg-primary selection:text-primary-foreground flex flex-col`}
      >
        <SplashCursor />
        <Navbar />
        <main className="flex-1">{children}</main>
        <GlobalSponsorLogos />
        <Footer />
      </body>
    </html>
  );
}
