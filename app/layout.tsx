import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "***REMOVED***/globals***REMOVED***css";

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
    <html lang="en" className="bg-black text-white">
      <body className={`${inter***REMOVED***className}`}>{children}</body>
    </html>
  );
}
