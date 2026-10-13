import type { Metadata } from "next";
import "./globals.css";
import { Header, Footer } from "@/components/ui";

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
    <html lang="nl-NL">
      <body>
        <Header />
        <main className="">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
