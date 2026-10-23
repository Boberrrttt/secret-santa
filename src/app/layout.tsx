import type { Metadata } from "next";
import { Geist, Inter } from "next/font/google";
import "./globals.css";

const display = Geist({
  subsets: ["latin"],
  weight: "500",
  variable: "--font-geist",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Secret Santa",
  description: "Draw names, share wishlists, and send private links. No account.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${display.variable} ${inter.variable} h-full antialiased`}>
      <body className="min-h-full font-sans">{children}</body>
    </html>
  );
}
