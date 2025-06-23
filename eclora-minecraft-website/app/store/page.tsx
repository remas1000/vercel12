import Navigation from "@/components/navigation"
import Footer from "@/components/footer"

export default function StorePage() {
  return (
    <div className="min-h-screen">
      <Navigation />

      <section className="pt-32 pb-20 px-6 bg-gradient-to-b from-slate-900 via-purple-900/10 to-slate-900 relative overflow-hidden min-h-screen flex items-center justify-center">
        {/* عناصر تزيينية */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-400/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-blue-400/5 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          {/* الأيقونة الرئيسية */}
          <div className="text-8xl sm:text-9xl mb-8 animate-bounce">🛒</div>

          {/* العنوان */}
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
              المتجر قريباً!
            </span>
          </h1>

          {/* الوصف */}
          <p className="text-xl md:text-2xl text-slate-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            نحن نعمل على إطلاق متجر رائع مليء بالعناصر المميزة والحصرية! ستجد فيه كل ما تحتاجه لتحسين تجربتك في Eclora.
          </p>

          {/* المميزات القادمة */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {[
              {
                icon: "💎",
                title: "عناصر حصرية",
                description: "أدوات ومعدات لا تجدها في أي مكان آخر",
              },
              {
                icon: "🎁",
                title: "حزم مميزة",
                description: "عروض وحزم بأسعار مناسبة للجميع",
              },
              {
                icon: "⚡",
                title: "تفعيل فوري",
                description: "احصل على مشترياتك فور إتمام الدفع",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-purple-400/30 transition-all duration-300 hover:scale-105"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-slate-300">{feature.description}</p>
              </div>
            ))}
          </div>

          {/* تاريخ الإطلاق */}
          <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 backdrop-blur-sm rounded-2xl p-8 border border-purple-400/20 mb-8">
            <h3 className="text-2xl font-bold text-white mb-4 flex items-center justify-center gap-3">
              <span className="text-3xl">📅</span>
              الإطلاق المتوقع
            </h3>
            <p className="text-purple-300 text-xl font-semibold">أغسطس 2025</p>
            <p className="text-slate-400 mt-2">ترقبوا المزيد من التفاصيل قريباً!</p>
          </div>

          {/* أزرار الإجراء */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-400 hover:to-pink-500 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 hover:scale-105 flex items-center justify-center gap-3 opacity-50 cursor-not-allowed">
              <span className="text-2xl">🔔</span>
              تنبيهي عند الإطلاق
            </button>
            <a
              href="https://discord.gg/eclora"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-400 hover:to-purple-500 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 hover:scale-105 flex items-center justify-center gap-3"
            >
              <img
                src="https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/discord.svg"
                alt="Discord"
                className="w-6 h-6 filter invert"
              />
              تابعنا في Discord
            </a>
          </div>

          {/* رسالة إضافية */}
          <div className="mt-12 text-slate-400">
            <p className="text-lg">
              💡 <strong>نصيحة:</strong> انضم لديسكورد حقنا عشان تكون أول من يعرف عن الإطلاق والعروض الحصرية!
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
