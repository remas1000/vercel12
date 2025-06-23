"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

export default function MaintenancePage() {
  const [maintenanceSettings, setMaintenanceSettings] = useState({
    message: "تتم صيانة الموقع من Remas",
    contactInfo: "يرجى التواصل معها لمعرفة سبب الصيانة",
    adminName: "Remas",
    estimatedEnd: "",
    startTime: "",
  })
  const router = useRouter()

  useEffect(() => {
    // تحميل إعدادات الصيانة
    const savedSettings = localStorage.getItem("eclora-maintenance-settings")
    if (savedSettings) {
      setMaintenanceSettings(JSON.parse(savedSettings))
    }

    // التحقق من حالة الصيانة
    const checkMaintenanceStatus = () => {
      const settings = JSON.parse(localStorage.getItem("eclora-maintenance-settings") || "{}")
      if (!settings.isActive) {
        router.push("/")
      }
    }

    // فحص دوري كل 30 ثانية
    const interval = setInterval(checkMaintenanceStatus, 30000)
    return () => clearInterval(interval)
  }, [router])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center p-6 relative overflow-hidden">
      {/* عناصر تزيينية */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-orange-400/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-red-400/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-yellow-400/3 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="max-w-2xl w-full bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl relative text-center">
        {/* أيقونة الصيانة المتحركة */}
        <div className="text-8xl mb-6 animate-bounce">🔧</div>

        {/* العنوان الرئيسي */}
        <h1 className="text-4xl font-bold text-white mb-4 animate-pulse">{maintenanceSettings.message}</h1>

        {/* معلومات التواصل */}
        <div className="bg-orange-500/10 border border-orange-400/30 rounded-xl p-6 mb-6">
          <p className="text-xl text-orange-300 mb-3">{maintenanceSettings.contactInfo}</p>
          <div className="flex items-center justify-center gap-2">
            <span className="text-2xl">👩‍💻</span>
            <span className="text-lg font-semibold text-white">المسؤولة: {maintenanceSettings.adminName}</span>
          </div>
        </div>

        {/* معلومات إضافية */}
        <div className="space-y-4 mb-8">
          {maintenanceSettings.startTime && (
            <div className="bg-white/5 rounded-lg p-4">
              <p className="text-slate-300">
                <span className="text-blue-400 font-semibold">⏰ بدأت الصيانة:</span>
                <br />
                {new Date(maintenanceSettings.startTime).toLocaleString("ar-SA")}
              </p>
            </div>
          )}

          {maintenanceSettings.estimatedEnd && (
            <div className="bg-white/5 rounded-lg p-4">
              <p className="text-slate-300">
                <span className="text-green-400 font-semibold">🕐 الانتهاء المتوقع:</span>
                <br />
                {new Date(maintenanceSettings.estimatedEnd).toLocaleString("ar-SA")}
              </p>
            </div>
          )}
        </div>

        {/* رسالة تشجيعية */}
        <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl p-6 border border-blue-400/20">
          <h3 className="text-xl font-bold text-white mb-3">🚀 نعمل على تحسين تجربتك!</h3>
          <p className="text-slate-300 leading-relaxed">
            نحن نعمل بجد لتقديم أفضل تجربة لعب ممكنة في سيرفر Eclora. شكراً لصبركم وتفهمكم! 💙
          </p>
        </div>

        {/* أزرار التواصل */}
        <div className="flex flex-col sm:flex-row gap-4 mt-8">
          <button
            onClick={() => window.open("https://discord.gg/eclora", "_blank")}
            className="flex-1 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-400 hover:to-purple-500 text-white px-6 py-3 rounded-xl font-bold transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25 flex items-center justify-center gap-2"
          >
            <span className="text-xl">💬</span>
            انضم لديسكورد
          </button>

          <button
            onClick={() => window.location.reload()}
            className="flex-1 bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-xl font-bold transition-all duration-300 hover:scale-105 border border-white/20 flex items-center justify-center gap-2"
          >
            <span className="text-xl">🔄</span>
            تحديث الصفحة
          </button>
        </div>

        {/* مؤشر التحديث التلقائي */}
        <div className="mt-6 text-slate-400 text-sm">
          <div className="flex items-center justify-center gap-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span>يتم فحص حالة الموقع تلقائياً كل 30 ثانية</span>
          </div>
        </div>
      </div>
    </div>
  )
}
