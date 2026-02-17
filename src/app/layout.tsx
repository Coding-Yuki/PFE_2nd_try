import "./globals.css";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Sidebar from "@/components/Sidebar";
import RightPanel from "@/components/RightPanel";

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
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-indigo-50`}
      >
        <div className="max-w-7xl mx-auto grid grid-cols-12 gap-6 p-6 min-h-screen">
          {/* Left: Sidebar Navigation */}
          <div className="col-span-3 bg-indigo-100 p-4 rounded-lg relative">
            <Sidebar />
          </div>
          
          {/* Center: Main Feed */}
          <div className="col-span-6 bg-purple-50 p-4 rounded-lg">
            {children}
          </div>
          
          {/* Right: Suggestions/Announcements Panel */}
          <div className="col-span-3 bg-indigo-100 p-4 rounded-lg">
            <RightPanel />
          </div>
        </div>
      </body>
    </html>
  );
}
