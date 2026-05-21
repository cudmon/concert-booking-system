import "@/styles/index.css";

import type { Metadata } from "next";
import { PropsWithChildren } from "react";
import { Inter } from "next/font/google";

const font = Inter({
  variable: "--font-inter",
  subsets: ["latin"]
});

export const metadata: Metadata = {
  title: "Concert Ticketing App",
  description: "A simple concert ticketing app built with Next.js and Nest.js"
};

export default function Root({ children }: Readonly<PropsWithChildren>) {
  return (
    <html lang="en" className={`${font.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
