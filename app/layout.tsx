import type { Metadata } from "next";
import { Source_Sans_3  as FontSans} from "next/font/google";
import "./globals.css";
import Header from "@/components/common/header";
import { ClerkProvider } from "@clerk/nextjs";
import {Toaster} from '@/components/ui/sonner'
import ConvexClientProvider from '@/components/ConvexClientProvider'
import UserSync from '@/components/auth/UserSync'

const fontSans = FontSans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ['200', '300', '400', '500', '600', '700', '800', '900'],
});

export const metadata: Metadata = {
  title: "Cravio",
  description: "Finds your next crave-worthy meal—fast, fun, and hassle-free.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${fontSans.variable} antialiased`}>
        <ClerkProvider>
          <ConvexClientProvider>
            <UserSync />
            <div className="relative flex flex-col min-h-screen">
              <Header />
              <main className="flex-1">
                {children}
              </main>
            </div>
            <Toaster position="top-right" />
          </ConvexClientProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
