import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const plusJakarta = Plus_Jakarta_Sans({ 
  subsets: ["latin"], 
  variable: "--font-plus-jakarta",
  weight: ["400", "500", "600", "700", "800"] 
});

import { LanguageProvider } from "@/contexts/LanguageContext";
import { AccessibilityProvider } from "@/contexts/AccessibilityContext";
import { DataProvider } from "@/contexts/DataContext";

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
      <body className={`${inter.variable} ${plusJakarta.variable} font-sans flex flex-col min-h-screen`}>
        <AccessibilityProvider>
          <LanguageProvider>
            <DataProvider>
              {children}
              <FloatingContact />
            </DataProvider>
          </LanguageProvider>
        </AccessibilityProvider>
      </body>
    </html>
  );
}
