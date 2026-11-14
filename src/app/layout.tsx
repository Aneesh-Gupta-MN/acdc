// Root server layout loads the approved type pairing, metadata, and global stylesheet for the full public site.
import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope, Roboto_Condensed } from "next/font/google";
import { buildSiteMetadata } from "@/lib/metadata";
import "./globals.css";

const display = Cormorant_Garamond({ subsets: ["latin"], variable: "--font-display", display: "swap" });
const ui = Manrope({ subsets: ["latin"], variable: "--font-ui", display: "swap" });
const label = Roboto_Condensed({ subsets: ["latin"], variable: "--font-label", display: "swap" });

export const metadata: Metadata = buildSiteMetadata();

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${display.variable} ${ui.variable} ${label.variable}`}>{children}</body>
    </html>
  );
}
