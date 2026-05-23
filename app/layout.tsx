import type { Metadata } from "next";
import { Syne, DM_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import GrainOverlay from "@/components/GrainOverlay";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Agence Mue — La suite vous appartient",
  description:
    "Agence Mue, agence de mutation digitale. On identifie, on crée, on transmet. La suite vous appartient.",
  keywords: ["agence", "digital", "mutation", "startup", "lean"],
  openGraph: {
    title: "Agence Mue — La suite vous appartient",
    description: "Agence de mutation digitale. Identifier, créer, transmettre.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr" className={`${syne.variable} ${dmSans.variable}`}>
      <body className="min-h-screen">
        <CustomCursor />
        <GrainOverlay />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
