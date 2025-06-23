import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import { DecorativeElements, FloatingShapes } from "@/components/decorative-elements"

export default function MapPage() {
  return (
    <div className="min-h-screen relative">
      <DecorativeElements />
      <FloatingShapes />
      <Navigation />

      <section className="px-6 py-20 pt-32 bg-gradient-to-b from-slate-900 to-blue-900/20 min-h-screen text-center relative">
        <div className="relative z-10 max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">خريطة عالم Eclora</h2>
          <p className="text-xl text-slate-300 mb-8">استكشف كل زاوية من عالمنا الواسع عبر خريطة Dynmap التفاعلية</p>

          <div className="bg-yellow-500/10 border border-yellow-400/30 p-6 rounded-2xl mb-8">
            <p className="text-yellow-200 text-lg">
              <span className="font-bold">تنبيه:</span> الخريطة قيد التحديث حالياً. لو ما تشتغل، جرب مرة ثانية أو تواصل
              معنا في ديسكورد.
            </p>
          </div>

          <div className="border-4 border-blue-400/30 rounded-2xl shadow-2xl overflow-hidden bg-slate-800/50">
            <iframe
              src="http://play.ecloramc.xyz:8123/"
              className="w-full h-[70vh] min-h-[500px]"
              title="Eclora Dynmap"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
