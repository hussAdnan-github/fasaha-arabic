import type { Metadata } from "next";
import "./globals.css";
import { LearningProvider } from "@/context/LearningContext";
import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import MobileNav from "@/components/layout/MobileNav";

export const metadata: Metadata = {
  title: "لغتي • المستوى الأول لتعليم العربية",
  description: "منصة تفاعلية لتعليم اللغة العربية لغير الناطقين بها - المستوى الأول: الانطلاق والأساسيات",
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400&family=Cairo:wght@400;600;700;800&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-surface font-sans text-on-surface antialiased min-h-screen overflow-x-hidden selection:bg-primary-fixed selection:text-on-primary-fixed">
        <LearningProvider>
          <Header />
          <div className="flex w-full">
            <Sidebar />
            <div className="w-full pr-0 md:pr-72 transition-all">
              <main className="w-full pt-16 sm:pt-20 px-3 sm:px-space-md md:px-space-xl min-h-[calc(100vh-4rem)] pb-28 md:pb-12 max-w-7xl mx-auto">
                {children}
              </main>
            </div>
          </div>
          <MobileNav />
        </LearningProvider>
      </body>
    </html>
  );
}
