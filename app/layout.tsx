import type { Metadata } from "next";
import { Outfit, Newsreader, Cascadia_Mono } from "next/font/google";
import "./globals.css";
import { Header, Footer } from "@/components/ui";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

const newsreader = Newsreader({
  subsets: ["latin"],
  variable: "--font-newsreader",
  display: "swap",
  fallback: ["serif"],
});

const cascadiaMono = Cascadia_Mono({
  subsets: ["latin"],
  variable: "--font-cascadia",
  display: "swap",
  adjustFontFallback: false,
});

export const metadata: Metadata = {
  title: "Edwin Schipper",
  description: "Portfolio Website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode; // Type definition for children prop
}>) {
  return (
    <html
      lang="nl-NL"
      className={`${outfit.variable} ${newsreader.variable} ${cascadiaMono.variable}`}
    >
      <body className="bg-background-100 dark:bg-background-800">
        <Header />
        <main className="">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
