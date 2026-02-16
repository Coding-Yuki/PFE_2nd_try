import "./globals.css";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Sidebar from "@/components/Sidebar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Réseau Social Universitaire",
  description: "Connectez-vous avec vos camarades et partagez votre expérience universitaire",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-gray-100`}
      >
        <div className="max-w-7xl mx-auto flex gap-6 p-4">
          <div className="w-64 flex-shrink-0">
            <Sidebar />
          </div>
          <main className="flex-grow max-w-2xl">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
