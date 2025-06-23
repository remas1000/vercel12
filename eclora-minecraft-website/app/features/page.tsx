import Navigation from "@/components/navigation"
import Footer from "@/components/footer"

export default function FeaturesPage() {
  const features = [
    {
      icon: "💰",
      title: "اقتصاد متطور",
      description: "نظام اقتصادي معقد ومدروس بعناية يحاكي الاقتصاد الحقيقي، مع أسواق ديناميكية وفرص استثمار.",
      features: ["عملات متعددة", "أسواق ديناميكية", "متاجر اللاعبين", "استثمارات ذكية"],
    },
    {
      icon: "👑",
      title: "نظام رتب حصري",
      description: "اكسب رتب مميزة من خلال إنجازاتك، واحصل على مكافآت حصرية وقدرات خاصة تميزك عن باقي اللاعبين.",
      features: ["رتب حصرية", "مكافآت يومية", "قدرات خاصة", "إنجازات نادرة"],
    },
    {
      icon: "🔥",
      title: "فعاليات وبطولات",
      description: "شارك في فعاليات أسبوعية مثيرة، بطولات PvP ملحمية، ومسابقات بناء إبداعية مع جوائز قيمة.",
      features: ["بطولات PvP", "مسابقات البناء", "فعاليات موسمية", "جوائز نقدية"],
    },
    {
      icon: "🛡️",
      title: "حماية متقدمة",
      description: "نظام حماية ثوري يضمن أمان ممتلكاتك بتقنيات متطورة، مع إمكانيات تخصيص شاملة.",
      features: ["حماية شاملة", "تخصيص متقدم", "إدارة الأعضاء", "إحصائيات مفصلة"],
    },
    {
      icon: "🤝",
      title: "مجتمع نشط",
      description: "انضم لمجتمع من أكثر من 300 لاعب نشط، مع فرق دعم متاحة 24/7 وأنشطة اجتماعية يومية.",
      features: ["+300 لاعب", "أنشطة يومية", "دعم 24/7", "مجتمع ودود"],
    },
    {
      icon: "🚀",
      title: "تحديثات مستمرة",
      description: "فريق تطوير محترف يشتغل بلا كلل عشان يضيف محتوى جديد أسبوعياً، مع تحسينات تقنية مستمرة.",
      features: ["تحديثات أسبوعية", "ميزات حصرية", "أداء محسن", "إصلاحات سريعة"],
    },
  ]

  return (
    <div className="min-h-screen">
      <Navigation />

      <section className="pt-32 pb-20 px-6 bg-gradient-to-b from-slate-900 via-blue-900/10 to-slate-900 relative">
        {/* عناصر تزيينية متناسقة */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-400/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-400/5 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                ⚔️ مميزات السيرفر
              </span>
            </h1>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              اكتشف عالم من الإمكانيات والمميزات الحصرية اللي تخلي Eclora تجربة ما تنتسى
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300 hover:scale-105"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="text-4xl group-hover:scale-110 transition-transform duration-300">{feature.icon}</div>
                  <h3 className="text-2xl font-bold text-white">{feature.title}</h3>
                </div>

                <p className="text-slate-300 leading-relaxed mb-4">{feature.description}</p>

                <div className="grid grid-cols-2 gap-2">
                  {feature.features.map((item, idx) => (
                    <div key={idx} className="bg-black/20 rounded-lg p-2 border border-white/10 text-center">
                      <span className="text-sm text-slate-300">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* قسم الدعوة للعمل - Discord فقط */}
          <div className="text-center mt-16">
            <div className="bg-gradient-to-r from-indigo-500/10 to-purple-500/10 backdrop-blur-sm rounded-2xl p-8 border border-indigo-400/20">
              <h3 className="text-3xl font-bold text-white mb-4 flex items-center justify-center gap-3">
                <img
                  src="https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/discord.svg"
                  alt="Discord"
                  className="w-8 h-8 filter invert"
                />
                جاهز تنضم لمجتمعنا؟
              </h3>
              <p className="text-slate-300 mb-6 max-w-xl mx-auto">
                انضم لأكثر من 800 عضو في Discord وكن جزء من أقوى مجتمع ماينكرافت عربي!
              </p>
              <a
                href="https://discord.gg/eclora"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-400 hover:to-purple-500 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-200 hover:scale-105 inline-flex items-center gap-3"
              >
                <img
                  src="https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/discord.svg"
                  alt="Discord"
                  className="w-5 h-5 filter invert"
                />
                انضم لـ Discord
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
