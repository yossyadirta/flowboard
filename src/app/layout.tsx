import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/providers";
import { Toaster } from "@/components/ui/sonner";
import { Geist } from "next/font/google";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://flowboard.yossyadirta.com"),
  title: {
    default: "Flowboard | One workspace. Infinite flow.",
    template: "%s | Flowboard",
  },
  description:
    "Flowboard keeps your team on the same page. Share a board, assign the work, and watch progress update live as everyone moves things forward.",
  openGraph: {
    title: "Flowboard | One workspace. Infinite flow.",
    description:
      "Flowboard keeps your team on the same page. Share a board, assign the work, and watch progress update live as everyone moves things forward.",
    url: "https://flowboard.yossyadirta.com",
    siteName: "Flowboard",
    images: [
      {
        url: "/landing-preview.png",
        width: 2880,
        height: 1600,
        alt: "Flowboard Workspace Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Flowboard | One workspace. Infinite flow.",
    description:
      "Flowboard keeps your team on the same page. Share a board, assign the work, and watch progress update live as everyone moves things forward.",
    images: ["/landing-preview.png"],
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={geist.variable} suppressHydrationWarning>
      <head />
      <body className={geist.className}>
        <Providers>{children}</Providers>
        <Toaster />
      </body>
    </html>
  );
}
