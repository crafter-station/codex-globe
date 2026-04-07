import type { Metadata } from "next";

const url = "https://codex-globe.vercel.app/events";

export const metadata: Metadata = {
  title: "Codex Events Globe | OpenAI Community Meetups & Hackathons",
  description:
    "Interactive 3D globe mapping 19 OpenAI Codex community events across 17 countries. Meetups and hackathons from April to May 2026.",
  openGraph: {
    title: "Codex Events Globe",
    description:
      "19 Codex community events mapped across 17 countries — meetups & hackathons",
    url,
    siteName: "Codex Globe",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Codex Events Globe",
    description:
      "19 Codex community events mapped across 17 countries — meetups & hackathons",
  },
  alternates: {
    canonical: url,
  },
};

export default function EventsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
