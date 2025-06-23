"use client"

import type React from "react"

import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/router"

interface LayoutProps {
  children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
  const router = useRouter()

  const isActive = (path: string) => router.pathname === path

  return (
    <div className="bg-black text-white min-h-screen">
      <nav className="flex justify-between items-center px-6 py-4 bg-black/80 backdrop-blur-sm shadow-lg fixed w-full z-10 top-0">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/eclora-logo.png" alt="Eclora Logo" width={40} height={40} className="h-10 w-10" />
          <h1 className="text-3xl font-bold text-blue-400">Eclora</h1>
        </Link>
        <ul className="flex gap-6">
          <li>
            <Link
              href="/"
              className={`transition-colors duration-300 ${
                isActive("/") ? "text-blue-300 font-semibold" : "hover:text-blue-300"
              }`}
            >
              الرئيسية
            </Link>
          </li>
          <li>
            <Link
              href="/features"
              className={`transition-colors duration-300 ${
                isActive("/features") ? "text-blue-300 font-semibold" : "hover:text-blue-300"
              }`}
            >
              المميزات
            </Link>
          </li>
          <li>
            <Link
              href="/gallery"
              className={`transition-colors duration-300 ${
                isActive("/gallery") ? "text-blue-300 font-semibold" : "hover:text-blue-300"
              }`}
            >
              المعرض
            </Link>
          </li>
          <li>
            <Link
              href="/map"
              className={`transition-colors duration-300 ${
                isActive("/map") ? "text-blue-300 font-semibold" : "hover:text-blue-300"
              }`}
            >
              الخريطة
            </Link>
          </li>
          <li>
            <Link
              href="/discord"
              className={`transition-colors duration-300 ${
                isActive("/discord") ? "text-blue-300 font-semibold" : "hover:text-blue-300"
              }`}
            >
              ديسكورد
            </Link>
          </li>
        </ul>
      </nav>

      <main className="pt-20">{children}</main>

      <footer className="text-center py-6 bg-black border-t border-gray-700">
        <p className="text-gray-400">© 2025 Eclora Server. جميع الحقوق محفوظة.</p>
      </footer>
    </div>
  )
}
