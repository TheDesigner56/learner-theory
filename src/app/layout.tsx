import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { ThemeProvider } from "@/components/theme-provider"
import { Navbar } from "@/components/navbar"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Learner Theory — UK Driving Theory Test",
  description: "UK Driving Theory Test study app with quizzes, flashcards, mock tests, hazard perception, and road signs.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground antialiased">
        <ThemeProvider>
          <Navbar />
          {children}
          <footer className="mt-auto border-t py-6 text-center text-sm text-muted-foreground">
            <p>© {new Date().getFullYear()} Learner Theory. All rights reserved.</p>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  );
}
