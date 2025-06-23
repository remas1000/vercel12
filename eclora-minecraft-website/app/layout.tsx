import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import { SoundProvider } from "@/components/sound-effects"
import { DecorativeElements } from "@/components/decorative-elements"

export const metadata: Metadata = {
  title: "Eclora - السيرفر العربي الأفضل | تجربة لا تُنسى",
  description:
    "انضم إلى Eclora، السيرفر العربي الأفضل في ماينكرافت! اقتصاد متطور، فعاليات يومية، مجتمع نشط، وتجربة لعب استثنائية تنتظرك!",
  keywords: "ماينكرافت, سيرفر عربي, Minecraft Arabic Server, Eclora, العاب, مغامرات",
  openGraph: {
    title: "Eclora - السيرفر العربي الأفضل",
    description: "تجربة ماينكرافت لا تُنسى تنتظرك!",
    type: "website",
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    other: [
      { url: "/android-chrome-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/android-chrome-512x512.png", sizes: "512x512", type: "image/png" },
    ],
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon-16x16.png" sizes="16x16" type="image/png" />
        <link rel="icon" href="/favicon-32x32.png" sizes="32x32" type="image/png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#3b82f6" />
      </head>
      <body className="bg-slate-900 text-white font-sans overflow-x-hidden">
        <SoundProvider>
          <DecorativeElements />
          {children}
        </SoundProvider>
      </body>
    </html>
  )
}
