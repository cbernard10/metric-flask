import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "***REMOVED***/globals***REMOVED***css";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Analytics } from '@vercel/analytics/react';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React***REMOVED***ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${GeistSans***REMOVED***variable} ${GeistMono***REMOVED***variable} bg-black text-white`}
    >
      <body className={`${inter***REMOVED***className}`}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
