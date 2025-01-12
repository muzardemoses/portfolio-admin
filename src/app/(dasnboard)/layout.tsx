import type { Metadata } from "next";
import { Inter, Roboto, Noto_Color_Emoji, Geist, Geist_Mono } from 'next/font/google'
import "../globals.css";
import ProviderWrapper from "@/config/ProviderWrapper";
import ProtectedRoute from "@/components/security/ProtectedRoute";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

const roboto = Roboto({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto',
  weight: ["100", "300", "400", "500", "700", "900"],
})

const notoColorEmoji = Noto_Color_Emoji({
  display: 'swap',
  variable: '--font-noto-color-emoji',
  weight: ["400"],
  subsets: ['emoji'],
})

export const metadata: Metadata = {
  title: "Portfolio Admin Dashboard",
  description: "Admin dashboard for portfolio built by Moses Adebayo using Next.js",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} ${roboto.variable} ${notoColorEmoji.variable} antialiased`}
      >
        <ProviderWrapper>
          <ProtectedRoute>
            {children}
          </ProtectedRoute>
        </ProviderWrapper>
      </body>
    </html>
  );
}
