import Navigation from "@/components/navigation"
import HeroSection from "@/components/hero-section"
import Footer from "@/components/footer"
import VotingWidget from "@/components/voting-widget"
import ReviewsWidget from "@/components/reviews-widget"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <HeroSection />

      {/* قسم "ليش تختار Eclora" - تصميم متناسق */}
      <section className="py-20 px-6 bg-gradient-to-b from-slate-900 to-slate-800 relative">
        {/* عناصر تزيينية متناسقة */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-400/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-400/5 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-8">
            <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              💡 ليش تختار Eclora؟
            </span>
          </h2>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {[
              {
                icon: "🌟",
                title: "تجربة مميزة",
                description: "تجربة لعب فريدة ما تلقاها في أي مكان ثاني، مع محتوى حصري وتحديثات دايمة.",
              },
              {
                icon: "🤝",
                title: "مجتمع رائع",
                description: "انضم لأكثر من 300 لاعب من كل الوطن العربي في مجتمع ودود ونشيط.",
              },
              {
                icon: "🚀",
                title: "تطوير مستمر",
                description: "فريق تطوير محترف يشتغل على مدار الساعة عشان يحسن السيرفر ويضيف مميزات جديدة.",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="group bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-blue-400/30 transition-all duration-300 hover:scale-105"
              >
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">{item.icon}</div>
                <h3 className="text-xl font-bold text-blue-300 mb-3">{item.title}</h3>
                <p className="text-slate-300 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* قسم التصويت والآراء */}
      <section className="py-20 px-6 bg-gradient-to-b from-slate-800 to-slate-900 relative">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-400/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-yellow-400/5 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
          <VotingWidget />
          <ReviewsWidget />
        </div>
      </section>

      <section className="py-20 px-6 bg-gradient-to-b from-slate-900 to-slate-800 relative">
        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 backdrop-blur-sm rounded-2xl p-8 border border-blue-400/20">
            <h3 className="text-3xl font-bold text-white mb-4 flex items-center justify-center gap-3">
              <img
                src="https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/discord.svg"
                alt="Discord"
                className="w-8 h-8 filter invert"
              />
              انضم لمجتمعنا الآن!
            </h3>
            <p className="text-slate-300 leading-relaxed max-w-3xl mx-auto mb-6">
              تعال كن جزء من أكبر مجتمع ماينكرافت عربي! في Discord حقنا راح تلقى أصدقاء جدد، فعاليات يومية، ودعم فني
              24/7. ما تفوت الفرصة وانضم لأكثر من 800 عضو نشيط!
            </p>
            <a
              href="https://discord.gg/eclora"
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-400 hover:to-purple-500 text-white px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300 hover:scale-105 flex items-center justify-center gap-3 mx-auto max-w-sm hover:shadow-2xl hover:shadow-indigo-500/25 relative overflow-hidden"
            >
              {/* تأثير لمعان */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              <img
                src="https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/discord.svg"
                alt="Discord"
                className="w-6 h-6 filter invert group-hover:scale-110 transition-transform duration-300"
              />
              انضم لـ Discord الآن
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
