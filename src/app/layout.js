import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata = {
  title: "Bhaskoro Prayoga - Game Programmer & Developer",
  description: "Portfolio of Bhaskoro Prayoga, a programmer focused on game development, web development and interactive experiences.",
  keywords: ["developer", "portfolio", "web development", "game development", "Next.js", "React", "Unity", "JavaScript"],
  authors: [{ name: "Bhaskoro Prayoga" }],
  openGraph: { title: "Bhaskoro Prayoga - Game Programmer & Developer", description: "Game programmer and developer focused on interactive experiences.", type: "website", locale: "en_US" },
  twitter: { card: "summary_large_image", title: "Bhaskoro Prayoga - Game Programmer & Developer" },
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
