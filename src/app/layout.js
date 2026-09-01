import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata = {
  title: "Your Name — Developer Portfolio",
  description: "Informatics student at UNJANI building for the web, games, and interactive applications. Next.js, React, Unity.",
  keywords: ["developer", "portfolio", "web development", "game development", "Next.js", "React", "Unity", "UNJANI"],
  authors: [{ name: "Your Name" }],
  openGraph: { title: "Your Name — Developer Portfolio", description: "Informatics student at UNJANI. Next.js, React, Unity.", type: "website", locale: "en_US" },
  twitter: { card: "summary_large_image", title: "Your Name — Developer Portfolio" },
  robots: { index: true, follow: true },
};

export const viewport = { width: "device-width", initialScale: 1, maximumScale: 5, viewportFit: "cover" };

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      <body className="min-h-screen bg-background text-foreground">{children}</body>
    </html>
  );
}
