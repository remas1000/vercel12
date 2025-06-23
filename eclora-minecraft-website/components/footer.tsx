export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-slate-900 to-slate-800 border-t border-slate-700 relative overflow-hidden">
      {/* عناصر تزيينية - مخفية على الجوال */}
      <div className="absolute inset-0 hidden sm:block">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-blue-400/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-purple-400/5 rounded-full blur-3xl"></div>

        {/* نقاط تزيينية */}
        <div className="absolute top-10 left-10 w-2 h-2 bg-blue-400/30 rounded-full animate-pulse"></div>
        <div className="absolute top-20 right-20 w-1 h-1 bg-purple-400/40 rounded-full animate-pulse delay-500"></div>
        <div className="absolute bottom-10 left-1/2 w-2 h-2 bg-cyan-400/30 rounded-full animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8 sm:mb-12">
          {/* قسم الشعار */}
          <div className="md:col-span-2 text-center md:text-right">
            <div className="flex items-center justify-center md:justify-start gap-3 mb-6">
              <div className="text-3xl sm:text-4xl animate-pulse">🏰</div>
              <div>
                <h3 className="text-2xl sm:text-3xl font-black bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                  Eclora
                </h3>
                <p className="text-slate-400 text-sm">السيرفر العربي الأفضل</p>
              </div>
            </div>
            <p className="text-slate-300 leading-relaxed mb-6 text-sm sm:text-base">
              انضم لأكثر من 300 لاعب في أعظم مغامرة ماينكرافت عربية على الإطلاق. اكتشف عوالم لا محدودة من الإبداع
              والمرح!
            </p>
            <div className="flex gap-4 justify-center md:justify-start">
              {[
                {
                  icon: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/discord.svg",
                  label: "Discord",
                  href: "https://discord.gg/eclora",
                  color: "hover:bg-indigo-500/20 hover:shadow-lg hover:shadow-indigo-500/25",
                },
                {
                  icon: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/tiktok.svg",
                  label: "TikTok",
                  href: "https://www.tiktok.com/@.eclora",
                  color: "hover:bg-pink-500/20 hover:shadow-lg hover:shadow-pink-500/25",
                },
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className={`w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center ${social.color} hover:scale-110 transition-all duration-300 group border border-white/10 hover:border-white/20`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src={social.icon || "/placeholder.svg"}
                    alt={social.label}
                    className="w-6 h-6 filter invert group-hover:scale-110 transition-transform duration-300"
                  />
                </a>
              ))}
            </div>
          </div>

          {/* الروابط السريعة */}
          <div className="text-center lg:text-right">
            <h4 className="text-lg sm:text-xl font-bold text-white mb-4 sm:mb-6 flex items-center justify-center lg:justify-start gap-2">
              <span className="text-blue-400">🔗</span>
              روابط سريعة
            </h4>
            <ul className="space-y-3">
              {[
                { name: "الرئيسية", href: "/", icon: "🏠" },
                { name: "المميزات", href: "/features", icon: "⚔️" },
                { name: "المعرض", href: "/gallery", icon: "📸" },
                { name: "الخريطة", href: "/map", icon: "🗺️" },
              ].map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-slate-400 hover:text-blue-400 transition-all duration-300 hover:translate-x-2 inline-flex items-center gap-2 group text-sm sm:text-base"
                  >
                    <span className="group-hover:scale-110 transition-transform duration-300">{link.icon}</span>
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* معلومات السيرفر */}
          <div className="text-center lg:text-right">
            <h4 className="text-lg sm:text-xl font-bold text-white mb-4 sm:mb-6 flex items-center justify-center lg:justify-start gap-2">
              <span className="text-green-400">🎮</span>
              معلومات السيرفر
            </h4>
            <div className="space-y-4">
              <div className="bg-white/5 rounded-xl p-3 sm:p-4 border border-white/10 hover:border-green-400/30 transition-all duration-300 group">
                <p className="text-green-400 font-bold mb-1 flex items-center justify-center lg:justify-start gap-2 text-sm sm:text-base">
                  <span className="group-hover:scale-110 transition-transform duration-300">☕</span>
                  Java Edition
                </p>
                <code className="text-xs sm:text-sm text-slate-300 break-all">play.ecloramc.xyz</code>
              </div>
              <div className="bg-white/5 rounded-xl p-3 sm:p-4 border border-white/10 hover:border-blue-400/30 transition-all duration-300 group">
                <p className="text-blue-400 font-bold mb-1 flex items-center justify-center lg:justify-start gap-2 text-sm sm:text-base">
                  <span className="group-hover:scale-110 transition-transform duration-300">📱</span>
                  Bedrock Edition
                </p>
                <code className="text-xs sm:text-sm text-slate-300 break-all">play.ecloramc.xyz:19321</code>
              </div>
            </div>
          </div>
        </div>

        {/* القسم السفلي */}
        <div className="border-t border-slate-700 pt-6 sm:pt-8 flex flex-col md:flex-row justify-between items-center text-center md:text-right">
          <p className="text-slate-400 mb-4 md:mb-0 flex items-center justify-center gap-2 text-sm sm:text-base">
            © 2025 Eclora Server. جميع الحقوق محفوظة. صُنع بحب للمجتمع العربي
            <span className="text-red-400 animate-pulse">❤️</span>
          </p>
          <div className="flex items-center gap-6 text-sm text-slate-400">
            <div className="flex items-center gap-2 text-sm text-green-400 bg-green-500/10 px-3 py-1 rounded-full border border-green-500/20">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              السيرفر شغال الحين
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
