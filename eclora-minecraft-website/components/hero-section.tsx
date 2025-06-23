"use client"

import { useState, useEffect } from "react"

export default function HeroSection() {
  const [currentText, setCurrentText] = useState(0)
  const [copiedText, setCopiedText] = useState("")

  const heroTexts = [
    "مرحباً بك في عالم Eclora الأسطوري",
    "حيث تبدأ أعظم المغامرات",
    "انضم إلى أكثر من 300 لاعب",
    "اكتشف عوالم لا محدودة من الإبداع",
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentText((prev) => (prev + 1) % heroTexts.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedText(text)
      setTimeout(() => setCopiedText(""), 3000)
    } catch (err) {
      console.error("فشل في نسخ النص: ", err)
    }
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 sm:px-6 pt-24 sm:pt-32">
      {/* خلفية متدرجة جميلة */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900/20 to-slate-900"></div>

      {/* تأثيرات ضوئية متحركة - مخفية على الجوال لتحسين الأداء */}
      <div className="absolute inset-0 hidden sm:block">
        <div className="absolute top-1/4 left-1/4 w-32 sm:w-64 h-32 sm:h-64 bg-blue-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-32 sm:w-64 h-32 sm:h-64 bg-purple-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 sm:w-96 h-48 sm:h-96 bg-cyan-400/5 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 text-center w-full max-w-6xl mx-auto">
        {/* مساحة إضافية في الأعلى */}
        <div className="h-16 sm:h-24"></div>

        {/* العنوان الرئيسي مع تأثيرات */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black mb-4 sm:mb-6 leading-tight relative">
            <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent animate-gradient bg-300% animate-pulse">
              ECLORA
            </span>
            {/* تأثير توهج - مخفي على الجوال */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent opacity-50 blur-sm -z-10 hidden sm:block">
              ECLORA
            </div>
          </h1>
          <div className="h-12 sm:h-16 flex items-center justify-center px-4">
            <p className="text-base sm:text-xl md:text-2xl text-slate-300 font-light animate-fade-in text-center">
              {heroTexts[currentText]}
            </p>
          </div>
        </div>

        {/* الإحصائيات مع تأثيرات جميلة - متجاوبة */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-8 sm:mb-12 px-2">
          {[
            { number: "300+", label: "لاعب نشط", icon: "👥", color: "from-blue-500 to-cyan-500" },
            { number: "24/7", label: "متاح دايماً", icon: "🌟", color: "from-yellow-500 to-orange-500" },
            { number: "99.9%", label: "استقرار", icon: "⚡", color: "from-green-500 to-emerald-500" },
            { number: "#1", label: "سيرفر عربي", icon: "🏆", color: "from-purple-500 to-pink-500" },
          ].map((stat, index) => (
            <div
              key={index}
              className="group bg-white/5 backdrop-blur-sm rounded-xl sm:rounded-2xl p-3 sm:p-4 border border-white/10 hover:border-white/20 transition-all duration-300 hover:scale-105 hover:shadow-2xl relative overflow-hidden"
            >
              {/* تأثير توهج عند الهوفر - مخفي على الجوال */}
              <div
                className={`absolute inset-0 bg-gradient-to-r ${stat.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300 hidden sm:block`}
              ></div>

              <div className="relative z-10">
                <div className="text-lg sm:text-2xl mb-1 sm:mb-2 group-hover:scale-110 transition-transform duration-300">
                  {stat.icon}
                </div>
                <div className="text-lg sm:text-2xl font-bold text-blue-400 mb-1 group-hover:text-white transition-colors duration-300">
                  {stat.number}
                </div>
                <div className="text-slate-400 text-xs sm:text-sm group-hover:text-slate-300 transition-colors duration-300">
                  {stat.label}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* معلومات الاتصال مع تحسينات للجوال */}
        <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-4 sm:p-8 border border-blue-400/20 mb-8 sm:mb-12 mx-2 sm:mx-auto max-w-4xl relative overflow-hidden">
          {/* تأثير خلفي متحرك - مخفي على الجوال */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 animate-pulse hidden sm:block"></div>

          <div className="relative z-10">
            <h3 className="text-lg sm:text-2xl font-bold text-blue-300 mb-4 sm:mb-6 flex items-center justify-center gap-2 sm:gap-3">
              <span className="text-2xl sm:text-3xl animate-bounce">🎮</span>
              انضم للمغامرة الحين!
            </h3>

            <div className="grid gap-4 sm:gap-6">
              {/* Java Edition */}
              <div className="bg-black/20 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-green-400/30 hover:border-green-400/50 transition-all duration-300 group">
                <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                  <span className="text-xl sm:text-2xl group-hover:scale-110 transition-transform duration-300">
                    ☕
                  </span>
                  <h4 className="text-base sm:text-lg font-bold text-green-400">Java Edition</h4>
                </div>
                <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-3">
                  <code className="bg-slate-800/80 text-green-400 px-3 sm:px-4 py-2 sm:py-3 rounded-lg sm:rounded-xl font-mono text-sm sm:text-lg flex-1 text-center border border-green-400/30 hover:border-green-400/50 transition-all duration-300 w-full sm:w-auto break-all">
                    play.ecloramc.xyz
                  </code>
                  <button
                    onClick={() => copyToClipboard("play.ecloramc.xyz")}
                    data-copy="true"
                    className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 px-4 sm:px-6 py-2 sm:py-3 rounded-lg sm:rounded-xl font-bold text-sm sm:text-base transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-green-500/25 w-full sm:w-auto"
                  >
                    {copiedText === "play.ecloramc.xyz" ? "✅ تم!" : "📋 انسخ"}
                  </button>
                </div>
              </div>

              {/* Bedrock Edition */}
              <div className="bg-black/20 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-blue-400/30 hover:border-blue-400/50 transition-all duration-300 group">
                <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                  <span className="text-xl sm:text-2xl group-hover:scale-110 transition-transform duration-300">
                    📱
                  </span>
                  <h4 className="text-base sm:text-lg font-bold text-blue-400">Bedrock Edition</h4>
                </div>
                <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-3">
                  <code className="bg-slate-800/80 text-blue-400 px-3 sm:px-4 py-2 sm:py-3 rounded-lg sm:rounded-xl font-mono text-sm sm:text-lg flex-1 text-center border border-blue-400/30 hover:border-blue-400/50 transition-all duration-300 w-full sm:w-auto break-all">
                    play.ecloramc.xyz:<span className="text-cyan-400">19321</span>
                  </code>
                  <button
                    onClick={() => copyToClipboard("play.ecloramc.xyz:19321")}
                    data-copy="true"
                    className="bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-400 hover:to-cyan-500 px-4 sm:px-6 py-2 sm:py-3 rounded-lg sm:rounded-xl font-bold text-sm sm:text-base transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25 w-full sm:w-auto"
                  >
                    {copiedText === "play.ecloramc.xyz:19321" ? "✅ تم!" : "📋 انسخ"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* زر Discord فقط مع الصورة الرسمية - متجاوب */}
        <div className="flex justify-center px-4">
          <a
            href="https://discord.gg/eclora"
            target="_blank"
            rel="noopener noreferrer"
            className="group bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-400 hover:to-purple-500 text-white px-6 sm:px-10 py-4 sm:py-5 rounded-xl sm:rounded-2xl font-bold text-base sm:text-xl transition-all duration-300 hover:scale-105 flex items-center gap-3 sm:gap-4 hover:shadow-2xl hover:shadow-indigo-500/25 relative overflow-hidden w-full sm:w-auto max-w-sm justify-center"
          >
            {/* تأثير لمعان - مخفي على الجوال */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 hidden sm:block"></div>
            {/* صورة Discord الرسمية */}
            <img
              src="https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/discord.svg"
              alt="Discord"
              className="w-6 sm:w-8 h-6 sm:h-8 filter invert group-hover:scale-110 transition-transform duration-300"
            />
            <span className="text-center">انضم لمجتمع Discord</span>
          </a>
        </div>

        {/* مساحة إضافية في الأسفل */}
        <div className="h-16 sm:h-24"></div>
      </div>

      {/* عناصر عائمة تزيينية - مخفية على الجوال */}
      <div className="absolute top-32 left-10 animate-float hidden lg:block">
        <div className="text-4xl opacity-20">⚔️</div>
      </div>
      <div className="absolute top-52 right-20 animate-float hidden lg:block" style={{ animationDelay: "2s" }}>
        <div className="text-3xl opacity-20">🏰</div>
      </div>
      <div className="absolute bottom-32 left-20 animate-float hidden lg:block" style={{ animationDelay: "4s" }}>
        <div className="text-3xl opacity-20">💎</div>
      </div>
    </section>
  )
}
