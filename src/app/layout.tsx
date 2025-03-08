import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/lib/auth-context";
import { ThemeProvider } from "@/lib/theme-context";
import { PageTransition } from "@/components/layout/page-transition";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Explore Maroc",
  description: "Morocco travel app with camera recognition to enhance tourism",
  manifest: "/manifest.json",
  themeColor: "#00796b",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Explore Maroc",
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="application-name" content="Explore Maroc" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Explore Maroc" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
        
        {/* Preload common images */}
        <link rel="preload" as="image" href="/images/logo.svg" />
        <link rel="preload" as="image" href="/images/locations/jemaa-el-fna.jpg" />
        <link rel="preload" as="image" href="/images/locations/hassan-tower.jpg" />
        <link rel="preload" as="image" href="/images/locations/bahia-palace.jpg" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider>
          <AuthProvider>
            <PageTransition>
              {children}
            </PageTransition>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
