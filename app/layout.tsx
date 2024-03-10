import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import Navigation from "./components/Navigation";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Wordle NextJS App",
  description: "Worlde Imitation Written in NextJS",
  manifest: "/manifest.json",
  icons: [{
    rel: "apple-touch-icon",
    sizes: "180x180",
    url: "https://wordle.durandrop.com/apple-touch-icon.png",
  },
  {
    rel: "icon",
    type: "image/png",
    sizes: "32x32",
    url: "https://wordle.durandrop.com/favicon-32x32.png",
  },
  {
    rel: "icon",
    type: "image/png",
    sizes: "16x16",
    url: "https://wordle.durandrop.com/favicon-16x16.png",
  },
  {
    rel: "manifest",
    url: "https://wordle.durandrop.com/site.webmanifest",
  },
  {
    rel: "mask-icon",
    url: "https://wordle.durandrop.com/safari-pinned-tab.svg",
    color: "#030712",
  },
  {
    rel: "shortcut icon",
    url: "https://wordle.durandrop.com/favicon.ico",
  }],
};

export const viewport: Viewport = {
  themeColor: { media: "(prefers-color-scheme: dark)", color: "#030712" }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navigation />
        {children}
      </body>
    </html>
  );
}
