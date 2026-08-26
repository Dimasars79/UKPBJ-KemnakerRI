import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "UKPBJ Kementerian Luar Negeri Republik Indonesia",
  description: "Portal Pengadaan Barang/Jasa Kementerian Luar Negeri Republik Indonesia",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className={`${inter.variable} font-sans flex flex-col min-h-screen`}>
        {children}
      </body>
    </html>
  );
}
