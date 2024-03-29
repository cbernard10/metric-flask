import type { Metadata } from "next";
import "./globals.css";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Analytics } from "@vercel/analytics/react";
import NextAuthSessionProvider from "../providers/SessionProvider";
import { Hanken_Grotesk } from "next/font/google";
import Header from "../components/Header";

const hkgrotestk = Hanken_Grotesk({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Metrics",
  description: "Metrics",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable} ${GeistMono.variable} bg-black text-white`}
    >
      <body className={`${hkgrotestk.className}`}>
        <NextAuthSessionProvider>
            <Header />
            {children}
            <Analytics />
          {/* <Script src="https://polyfill.io/v3/polyfill.min.js?features=es6" /> */}
          {/* <Script id="MathJax-script" async src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js" /> */}
        </NextAuthSessionProvider>
      </body>
    </html>
  );
}
