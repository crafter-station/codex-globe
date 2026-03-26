import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const title = "Codex Ambassadors Globe | OpenAI Community Map";
const description =
  "Interactive 3D globe mapping 104+ OpenAI Codex Ambassadors across 22+ countries. Explore the global developer community by continent, country, or timezone.";
const url = "https://codex-globe.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(url),
  title,
  description,
  keywords: [
    "codex",
    "openai",
    "ambassadors",
    "developer community",
    "globe",
    "interactive map",
  ],
  openGraph: {
    title: "Codex Ambassadors Globe",
    description: "104+ Codex Ambassadors mapped across 22+ countries",
    url,
    siteName: "Codex Globe",
    type: "website",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Codex Ambassadors Globe - interactive 3D map" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Codex Ambassadors Globe",
    description: "104+ Codex Ambassadors mapped across 22+ countries",
    images: [{ url: "/og-twitter.png", alt: "Codex Ambassadors Globe" }],
  },
  alternates: {
    canonical: url,
  },
  icons: {
    icon: [
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
  other: {
    "theme-color": "#000000",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <body className={`min-h-full flex flex-col bg-black text-white ${geistSans.className}`}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
