import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

import { LanguageProvider } from "@/contexts/LanguageContext";
import { AccessibilityProvider } from "@/contexts/AccessibilityContext";

import { FloatingContact } from "@/components/ui/FloatingContact";

export const metadata: Metadata = {
  title: "UKPBJ Kementerian Ketenagakerjaan Republik Indonesia",
  description: "Portal Pengadaan Barang/Jasa Kementerian Ketenagakerjaan Republik Indonesia",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className={`${inter.variable} font-sans flex flex-col min-h-screen`}>
        <AccessibilityProvider>
          <LanguageProvider>
            {children}
            <FloatingContact />
          </LanguageProvider>
        </AccessibilityProvider>
      </body>
    </html>
  );
}
