"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { useState, useEffect } from "react"

export default function Navigation() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navItems = [
    { href: "/", label: "الرئيسية", icon: "🏠" },
    { href: "/features", label: "المميزات", icon: "⚔️" },
    { href: "/gallery", label: "المعرض", icon: "📸" },
    { href: "/map", label: "الخريطة", icon: "🗺️" },
    { href: "/voting", label: "التصويت", icon: "🗳️" },
    { href: "/reviews", label: "الآراء", icon: "⭐" },
    { href: "/store", label: "المتجر", icon: "🛒" },
    { href: "/discord", label: "ديسكورد", icon: "💬" },
    { href: "/admin", label: "إدارة", icon: "⚙️" },
  ]

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-slate-900/95 backdrop-blur-xl shadow-xl border-b border-slate-700"
          : "bg-slate-900/80 backdrop-blur-sm"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 py-3 sm:py-4">
        <div className="flex justify-between items-center">
          {/* الشعار */}
          <Link href="/" className="flex items-center gap-2 sm:gap-3 group">
            <div className="relative">
              <Image
                src="/eclora-logo.png"
                alt="Eclora Logo"
                width={40}
                height={40}
                className="h-8 w-8 sm:h-11 sm:w-11 group-hover:scale-110 transition-transform duration-200"
              />
            </div>
            <div>
              <h1 className="text-xl sm:text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                Eclora
              </h1>
              <p className="text-xs text-slate-400 -mt-1 hidden sm:block">السيرفر العربي الأفضل</p>
            </div>
          </Link>

          {/* قائمة سطح المكتب */}
          <ul className="hidden lg:flex gap-6">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`relative px-4 py-2 rounded-xl transition-all duration-200 ${
                    pathname === item.href ? "text-white" : "text-slate-300"
                  }`}
                >
                  <span
                    className={`flex items-center gap-2 font-medium border-b-2 ${
                      pathname === item.href ? "border-blue-500" : "border-transparent"
                    }`}
                  >
                    <span>{item.icon}</span>
                    {item.label}
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          {/* زر القائمة للجوال */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg bg-white/10 border border-white/20 text-white hover:bg-white/20 transition-colors duration-200"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* قائمة الجوال */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-4 pb-4 border-t border-slate-700">
            <ul className="space-y-2 pt-4">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                      pathname === item.href
                        ? "bg-blue-500/20 text-blue-300 border border-blue-500/30"
                        : "text-slate-300 hover:bg-white/10"
                    }`}
                  >
                    <span className="text-lg">{item.icon}</span>
                    <span className="font-medium">{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </nav>
  )
}
