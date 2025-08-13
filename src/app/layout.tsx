import type { Metadata } from "next";
import { Montserrat } from "next/font/google";

import CronInitializer from "@/components/CronInitializer";
import Header from "@/components/Header";

import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "SWStarter",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${montserrat.variable} antialiased`}>
        <Header title="SWStarter" />

        <CronInitializer />

        <div className="min-h-screen bg-light-gray p-[15px]">{children}</div>
      </body>
    </html>
  );
}
