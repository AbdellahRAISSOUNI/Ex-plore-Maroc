import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/lib/auth-context";
import { ThemeProvider } from "@/lib/theme-context";
import { PageTransition } from "@/components/layout/page-transition";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ex-plore Maroc",
  description: "Discover the beauty of Morocco",
};

export const viewport: Viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
      <body className={inter.className}>
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
