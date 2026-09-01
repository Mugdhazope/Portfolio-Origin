import type { Metadata } from "next";
import "./globals.css";
import "./responsive.css";
import { origin4Positioning } from "@/data/personal";

export const metadata: Metadata = {
  title: origin4Positioning.metadataTitle,
  description: origin4Positioning.metadataDescription,
  metadataBase: new URL("https://originfour.co"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: origin4Positioning.metadataTitle,
    description: origin4Positioning.openGraphDescription,
    url: "https://originfour.co",
    siteName: "ORIGIN4",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: origin4Positioning.metadataTitle,
    description: origin4Positioning.openGraphDescription,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
