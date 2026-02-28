import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { GlobalSponsor } from "@/components/layout/global-sponsor";
import SplashCursor from "@/components/ui/splash-cursor";
import DarkVeil from "@/components/ui/DarkVeil";
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
    <html lang="en">
      <body
        className={`${inter.variable} ${outfit.variable} antialiased min-h-screen bg-background font-sans selection:bg-primary selection:text-primary-foreground flex flex-col`}
      >
        {/* Fixed DarkVeil WebGL background — visible across all pages */}
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: -10,
            width: "100%",
            height: "100%",
            pointerEvents: "none",
          }}
        >
          <DarkVeil
            hueShift={0}
            noiseIntensity={0}
            scanlineIntensity={0}
            speed={0.5}
            scanlineFrequency={0}
            warpAmount={0}
          />
        </div>

        <SplashCursor />
        <Navbar />
        <main className="flex-1 relative z-0">{children}</main>
        <GlobalSponsor />
        <Footer />
      </body>
    </html>
  );
}
