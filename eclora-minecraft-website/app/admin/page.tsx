"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

export default function AdminLogin() {
  const [credentials, setCredentials] = useState({ username: "", password: "" })
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  useEffect(() => {
    const adminToken = localStorage.getItem("eclora-admin-token")
    if (adminToken === "eclora-admin-authenticated") {
      setIsLoggedIn(true)
    }
  }, [])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (credentials.username === "admin" && credentials.password === "eclora2025") {
      localStorage.setItem("eclora-admin-token", "eclora-admin-authenticated")
      setIsLoggedIn(true)
      setError("")
    } else {
      setError("اسم المستخدم أو كلمة المرور غير صحيحة")
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("eclora-admin-token")
    setIsLoggedIn(false)
    setCredentials({ username: "", password: "" })
  }

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center p-6 relative overflow-hidden">
        {/* عناصر تزيينية */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-400/5 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-400/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="max-w-md w-full bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl relative">
          <div className="text-center mb-8">
            <div className="text-6xl mb-4 animate-bounce">🔐</div>
            <h1 className="text-3xl font-bold text-white mb-2">لوحة الإدارة المتقدمة</h1>
            <p className="text-slate-300">تسجيل دخول المدير</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-slate-300 text-sm font-medium mb-2">اسم المستخدم</label>
              <input
                type="text"
                value={credentials.username}
                onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all duration-300"
                placeholder="أدخل اسم المستخدم"
                required
              />
            </div>

            <div>
              <label className="block text-slate-300 text-sm font-medium mb-2">كلمة المرور</label>
              <input
                type="password"
                value={credentials.password}
                onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all duration-300"
                placeholder="أدخل كلمة المرور"
                required
              />
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-3">
                <p className="text-red-400 text-sm text-center">{error}</p>
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-400 hover:to-purple-500 text-white font-bold py-3 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/25"
            >
              🚀 تسجيل الدخول
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => router.push("/")}
              className="text-slate-400 hover:text-white transition-colors duration-300 flex items-center justify-center gap-2 mx-auto"
            >
              <span>🏠</span>
              العودة للموقع
            </button>
          </div>
        </div>
      </div>
    )
  }

  return <AdminDashboard onLogout={handleLogout} />
}

function AdminDashboard({ onLogout }: { onLogout: () => void }) {
  const [activeTab, setActiveTab] = useState("overview")
  const [siteSettings, setSiteSettings] = useState({
    siteName: "Eclora",
    siteDescription: "السيرفر العربي الأفضل",
    maintenanceMode: false,
    serverStatus: "online",
    playerCount: 245,
    maxPlayers: 300,
  })

  const tabs = [
    { id: "overview", name: "نظرة عامة", icon: "📊" },
    { id: "pages", name: "إدارة الصفحات", icon: "📄" },
    { id: "gallery", name: "إدارة المعرض", icon: "🖼️" },
    { id: "voting", name: "نظام التصويت", icon: "🗳️" },
    { id: "reviews", name: "إدارة الآراء", icon: "⭐" },
    { id: "store", name: "إدارة المتجر", icon: "🛒" },
    { id: "users", name: "إدارة المستخدمين", icon: "👥" },
    { id: "settings", name: "إعدادات الموقع", icon: "⚙️" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 relative overflow-hidden">
      {/* عناصر تزيينية */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-400/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-400/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10">
        {/* الهيدر */}
        <div className="bg-white/5 backdrop-blur-xl border-b border-white/10 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-4">
                <div className="text-4xl animate-pulse">⚡</div>
                <div>
                  <h1 className="text-2xl font-bold text-white">لوحة التحكم المتقدمة</h1>
                  <p className="text-slate-400 text-sm">إدارة شاملة لموقع Eclora</p>
                </div>
              </div>
              <button
                onClick={onLogout}
                className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-400 hover:to-red-500 text-white px-6 py-3 rounded-xl font-bold transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-red-500/25"
              >
                🚪 تسجيل الخروج
              </button>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
          <div className="grid lg:grid-cols-5 gap-8">
            {/* الشريط الجانبي */}
            <div className="lg:col-span-1">
              <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 sticky top-24">
                <nav className="space-y-2">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                        activeTab === tab.id
                          ? "bg-blue-500/20 text-blue-300 border border-blue-500/30"
                          : "text-slate-300 hover:bg-white/10 hover:text-white"
                      }`}
                    >
                      <span className="text-xl">{tab.icon}</span>
                      <span className="font-medium text-sm">{tab.name}</span>
                    </button>
                  ))}
                </nav>
              </div>
            </div>

            {/* المحتوى الرئيسي */}
            <div className="lg:col-span-4">
              {activeTab === "overview" && <OverviewTab siteSettings={siteSettings} />}
              {activeTab === "pages" && <PagesTab />}
              {activeTab === "gallery" && <GalleryTab />}
              {activeTab === "voting" && <VotingTab />}
              {activeTab === "reviews" && <ReviewsTab />}
              {activeTab === "store" && <StoreTab />}
              {activeTab === "users" && <UsersTab />}
              {activeTab === "settings" && (
                <SettingsTab siteSettings={siteSettings} setSiteSettings={setSiteSettings} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// مكونات التبويبات
function OverviewTab({ siteSettings }: { siteSettings: any }) {
  return (
    <div className="space-y-6">
      <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
          <span className="text-3xl">📊</span>
          نظرة عامة على الموقع
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { title: "الزوار اليوم", value: "1,234", icon: "👥", color: "from-blue-500 to-cyan-500" },
            {
              title: "اللاعبين المتصلين",
              value: siteSettings.playerCount,
              icon: "🎮",
              color: "from-green-500 to-emerald-500",
            },
            { title: "إجمالي الصور", value: "89", icon: "🖼️", color: "from-purple-500 to-pink-500" },
            { title: "التصويتات", value: "456", icon: "🗳️", color: "from-yellow-500 to-orange-500" },
          ].map((stat, index) => (
            <div
              key={index}
              className="bg-white/5 rounded-xl p-4 border border-white/10 hover:border-white/20 transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-2xl">{stat.icon}</span>
                <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${stat.color}`}></div>
              </div>
              <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-slate-400 text-sm">{stat.title}</div>
            </div>
          ))}
        </div>
      </div>

      {/* الأنشطة الأخيرة */}
      <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <span className="text-2xl">📈</span>
          الأنشطة الأخيرة
        </h3>
        <div className="space-y-3">
          {[
            { action: "تم إضافة صورة جديدة", time: "منذ 5 دقائق", icon: "🖼️" },
            { action: "تصويت جديد من أحمد", time: "منذ 15 دقيقة", icon: "🗳️" },
            { action: "انضمام لاعب جديد", time: "منذ 30 دقيقة", icon: "👤" },
            { action: "تحديث إعدادات الموقع", time: "منذ ساعة", icon: "⚙️" },
          ].map((activity, index) => (
            <div key={index} className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
              <span className="text-xl">{activity.icon}</span>
              <div className="flex-1">
                <p className="text-white text-sm">{activity.action}</p>
                <p className="text-slate-400 text-xs">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function PagesTab() {
  const [pages, setPages] = useState([
    { id: 1, name: "الصفحة الرئيسية", path: "/", status: "نشط", lastModified: "اليوم" },
    { id: 2, name: "المميزات", path: "/features", status: "نشط", lastModified: "أمس" },
    { id: 3, name: "المعرض", path: "/gallery", status: "نشط", lastModified: "منذ يومين" },
    { id: 4, name: "الخريطة", path: "/map", status: "نشط", lastModified: "منذ أسبوع" },
  ])

  return (
    <div className="space-y-6">
      <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white flex items-center gap-3">
            <span className="text-3xl">📄</span>
            إدارة الصفحات
          </h2>
          <button className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 text-white px-6 py-3 rounded-xl font-bold transition-all duration-300 hover:scale-105">
            ➕ إضافة صفحة جديدة
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-right py-3 px-4 text-slate-300 font-medium">اسم الصفحة</th>
                <th className="text-right py-3 px-4 text-slate-300 font-medium">المسار</th>
                <th className="text-right py-3 px-4 text-slate-300 font-medium">الحالة</th>
                <th className="text-right py-3 px-4 text-slate-300 font-medium">آخر تعديل</th>
                <th className="text-right py-3 px-4 text-slate-300 font-medium">الإجراءات</th>
              </tr>
            </thead>
            <tbody>
              {pages.map((page) => (
                <tr key={page.id} className="border-b border-white/5 hover:bg-white/5 transition-colors duration-200">
                  <td className="py-4 px-4 text-white font-medium">{page.name}</td>
                  <td className="py-4 px-4 text-slate-300">{page.path}</td>
                  <td className="py-4 px-4">
                    <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm border border-green-500/30">
                      {page.status}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-slate-400">{page.lastModified}</td>
                  <td className="py-4 px-4">
                    <div className="flex gap-2">
                      <button className="bg-blue-500/20 text-blue-400 px-3 py-1 rounded-lg text-sm hover:bg-blue-500/30 transition-colors duration-200">
                        ✏️ تعديل
                      </button>
                      <button className="bg-red-500/20 text-red-400 px-3 py-1 rounded-lg text-sm hover:bg-red-500/30 transition-colors duration-200">
                        🗑️ حذف
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

function GalleryTab() {
  const [images, setImages] = useState([
    { id: 1, title: "مبنى رائع", category: "builds", likes: 45, status: "نشط" },
    { id: 2, title: "فعالية مميزة", category: "events", likes: 32, status: "نشط" },
    { id: 3, title: "معركة ملحمية", category: "pvp", likes: 28, status: "نشط" },
  ])

  const [draggedItem, setDraggedItem] = useState<number | null>(null)

  const handleDragStart = (e: React.DragEvent, id: number) => {
    setDraggedItem(id)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const handleDrop = (e: React.DragEvent, targetId: number) => {
    e.preventDefault()
    if (draggedItem === null) return

    const draggedIndex = images.findIndex((img) => img.id === draggedItem)
    const targetIndex = images.findIndex((img) => img.id === targetId)

    const newImages = [...images]
    const draggedImage = newImages[draggedIndex]
    newImages.splice(draggedIndex, 1)
    newImages.splice(targetIndex, 0, draggedImage)

    setImages(newImages)
    setDraggedItem(null)
  }

  return (
    <div className="space-y-6">
      <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white flex items-center gap-3">
            <span className="text-3xl">🖼️</span>
            إدارة المعرض
          </h2>
          <div className="flex gap-3">
            <button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-400 hover:to-purple-500 text-white px-6 py-3 rounded-xl font-bold transition-all duration-300 hover:scale-105">
              📤 رفع صور جديدة
            </button>
            <button className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 text-white px-6 py-3 rounded-xl font-bold transition-all duration-300 hover:scale-105">
              📁 إدارة التصنيفات
            </button>
          </div>
        </div>

        {/* منطقة السحب والإفلات */}
        <div className="border-2 border-dashed border-white/20 rounded-xl p-8 mb-6 text-center hover:border-blue-400/50 transition-colors duration-300">
          <div className="text-6xl mb-4">📤</div>
          <h3 className="text-xl font-bold text-white mb-2">اسحب الصور هنا لرفعها</h3>
          <p className="text-slate-400">أو انقر لاختيار الملفات</p>
        </div>

        {/* شبكة الصور */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((image) => (
            <div
              key={image.id}
              draggable
              onDragStart={(e) => handleDragStart(e, image.id)}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, image.id)}
              className="bg-white/5 rounded-xl overflow-hidden border border-white/10 hover:border-white/20 transition-all duration-300 cursor-move hover:scale-105"
            >
              <div className="h-48 bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center">
                <span className="text-6xl">🖼️</span>
              </div>
              <div className="p-4">
                <h4 className="text-white font-bold mb-2">{image.title}</h4>
                <div className="flex justify-between items-center mb-3">
                  <span className="text-blue-400 text-sm bg-blue-500/10 px-2 py-1 rounded border border-blue-500/20">
                    {image.category}
                  </span>
                  <span className="text-red-400 flex items-center gap-1">❤️ {image.likes}</span>
                </div>
                <div className="flex gap-2">
                  <button className="flex-1 bg-blue-500/20 text-blue-400 py-2 rounded-lg text-sm hover:bg-blue-500/30 transition-colors duration-200">
                    ✏️ تعديل
                  </button>
                  <button className="flex-1 bg-red-500/20 text-red-400 py-2 rounded-lg text-sm hover:bg-red-500/30 transition-colors duration-200">
                    🗑️ حذف
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function VotingTab() {
  const [polls, setPolls] = useState([
    {
      id: 1,
      title: "أي تحديث تريد نشوفه قريب؟",
      options: [
        { text: "تحديث PvP", votes: 45 },
        { text: "مناطق جديدة", votes: 32 },
        { text: "فعاليات أكثر", votes: 28 },
      ],
      status: "نشط",
      endDate: "2025-07-01",
    },
  ])

  const [newPoll, setNewPoll] = useState({
    title: "",
    options: ["", ""],
    duration: 7,
  })

  const [showAddForm, setShowAddForm] = useState(false)

  const addOption = () => {
    setNewPoll({ ...newPoll, options: [...newPoll.options, ""] })
  }

  const updateOption = (index: number, value: string) => {
    const newOptions = [...newPoll.options]
    newOptions[index] = value
    setNewPoll({ ...newPoll, options: newOptions })
  }

  const handleAddPoll = (e: React.FormEvent) => {
    e.preventDefault()

    const newPollData = {
      id: Date.now().toString(),
      title: newPoll.title,
      options: newPoll.options.filter((opt) => opt.trim() !== "").map((opt) => ({ text: opt, votes: 0 })),
      status: "نشط",
      endDate: new Date(Date.now() + newPoll.duration * 24 * 60 * 60 * 1000).toLocaleDateString("ar-SA"),
      createdAt: new Date().toISOString(),
    }

    // حفظ في التصويتات العامة
    const publicPolls = JSON.parse(localStorage.getItem("eclora-public-polls") || "[]")
    publicPolls.push(newPollData)
    localStorage.setItem("eclora-public-polls", JSON.stringify(publicPolls))

    // إضافة للقائمة المحلية
    setPolls([...polls, newPollData])

    // إعادة تعيين النموذج
    setNewPoll({ title: "", options: ["", ""], duration: 7 })
    setShowAddForm(false)

    alert("تم إنشاء التصويت بنجاح! سيظهر الآن في الصفحة الرئيسية 🎉")
  }

  useEffect(() => {
    const savedPolls = localStorage.getItem("eclora-public-polls")
    if (savedPolls) {
      setPolls(JSON.parse(savedPolls))
    }
  }, [])

  const deletePoll = (pollId: string) => {
    const updatedPolls = polls.filter((poll) => poll.id !== pollId)
    setPolls(updatedPolls)
    localStorage.setItem("eclora-public-polls", JSON.stringify(updatedPolls))
    alert("تم حذف التصويت بنجاح!")
  }

  return (
    <div className="space-y-6">
      <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
          <span className="text-3xl">🗳️</span>
          نظام التصويت
        </h2>

        {/* إنشاء تصويت جديد */}
        <div className="bg-white/5 rounded-xl p-6 mb-6 border border-white/10">
          <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <span className="text-2xl">➕</span>
            إنشاء تصويت جديد
          </h3>

          <div className="space-y-4">
            <div>
              <label className="block text-slate-300 text-sm font-medium mb-2">عنوان التصويت</label>
              <input
                type="text"
                value={newPoll.title}
                onChange={(e) => setNewPoll({ ...newPoll, title: e.target.value })}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all duration-300"
                placeholder="أدخل عنوان التصويت"
              />
            </div>

            <div>
              <label className="block text-slate-300 text-sm font-medium mb-2">الخيارات</label>
              {newPoll.options.map((option, index) => (
                <div key={index} className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={option}
                    onChange={(e) => updateOption(index, e.target.value)}
                    className="flex-1 px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-blue-400 transition-all duration-300"
                    placeholder={`الخيار ${index + 1}`}
                  />
                  {newPoll.options.length > 2 && (
                    <button
                      onClick={() => {
                        const newOptions = newPoll.options.filter((_, i) => i !== index)
                        setNewPoll({ ...newPoll, options: newOptions })
                      }}
                      className="bg-red-500/20 text-red-400 px-3 py-2 rounded-lg hover:bg-red-500/30 transition-colors duration-200"
                    >
                      🗑️
                    </button>
                  )}
                </div>
              ))}
              <button
                onClick={addOption}
                className="bg-blue-500/20 text-blue-400 px-4 py-2 rounded-lg hover:bg-blue-500/30 transition-colors duration-200 flex items-center gap-2"
              >
                ➕ إضافة خيار
              </button>
            </div>

            <div>
              <label className="block text-slate-300 text-sm font-medium mb-2">مدة التصويت (بالأيام)</label>
              <input
                type="number"
                value={newPoll.duration}
                onChange={(e) => setNewPoll({ ...newPoll, duration: Number.parseInt(e.target.value) })}
                className="w-32 px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-blue-400 transition-all duration-300"
                min="1"
                max="30"
              />
            </div>

            <button
              onClick={handleAddPoll}
              className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 text-white px-8 py-3 rounded-xl font-bold transition-all duration-300 hover:scale-105"
            >
              🚀 إنشاء التصويت
            </button>
          </div>
        </div>

        {/* التصويتات الحالية */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <span className="text-2xl">📊</span>
            التصويتات الحالية
          </h3>

          {polls.map((poll) => (
            <div key={poll.id} className="bg-white/5 rounded-xl p-6 border border-white/10">
              <div className="flex justify-between items-start mb-4">
                <h4 className="text-lg font-bold text-white">{poll.title}</h4>
                <div className="flex gap-2">
                  <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm border border-green-500/30">
                    {poll.status}
                  </span>
                  <button
                    onClick={() => deletePoll(poll.id)}
                    className="bg-red-500/20 text-red-400 px-3 py-1 rounded-lg text-sm hover:bg-red-500/30 transition-colors duration-200"
                  >
                    إنهاء
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                {poll.options.map((option, index) => {
                  const totalVotes = poll.options.reduce((sum, opt) => sum + opt.votes, 0)
                  const percentage = totalVotes > 0 ? (option.votes / totalVotes) * 100 : 0

                  return (
                    <div key={index} className="bg-white/5 rounded-lg p-3">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-white font-medium">{option.text}</span>
                        <span className="text-slate-400 text-sm">{option.votes} صوت</span>
                      </div>
                      <div className="w-full bg-white/10 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                      <div className="text-right text-slate-400 text-xs mt-1">{percentage.toFixed(1)}%</div>
                    </div>
                  )
                })}
              </div>

              <div className="mt-4 text-slate-400 text-sm">
                ينتهي في: {poll.endDate} | إجمالي الأصوات: {poll.options.reduce((sum, opt) => sum + opt.votes, 0)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function StoreTab() {
  const [storeSettings, setStoreSettings] = useState({
    isEnabled: false,
    comingSoonMessage: "المتجر قريباً! 🛒",
    description: "نحن نعمل على إطلاق متجر رائع مليء بالعناصر المميزة والحصرية!",
    launchDate: "2025-08-01",
  })

  return (
    <div className="space-y-6">
      <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
          <span className="text-3xl">🛒</span>
          إدارة المتجر
        </h2>

        {/* إعدادات المتجر */}
        <div className="bg-white/5 rounded-xl p-6 mb-6 border border-white/10">
          <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <span className="text-2xl">⚙️</span>
            إعدادات المتجر
          </h3>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-white font-medium">تفعيل المتجر</h4>
                <p className="text-slate-400 text-sm">تشغيل أو إيقاف المتجر للزوار</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={storeSettings.isEnabled}
                  onChange={(e) => setStoreSettings({ ...storeSettings, isEnabled: e.target.checked })}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>

            <div>
              <label className="block text-slate-300 text-sm font-medium mb-2">رسالة "قريباً"</label>
              <input
                type="text"
                value={storeSettings.comingSoonMessage}
                onChange={(e) => setStoreSettings({ ...storeSettings, comingSoonMessage: e.target.value })}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all duration-300"
              />
            </div>

            <div>
              <label className="block text-slate-300 text-sm font-medium mb-2">وصف المتجر</label>
              <textarea
                value={storeSettings.description}
                onChange={(e) => setStoreSettings({ ...storeSettings, description: e.target.value })}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all duration-300"
                rows={3}
              />
            </div>

            <div>
              <label className="block text-slate-300 text-sm font-medium mb-2">تاريخ الإطلاق المتوقع</label>
              <input
                type="date"
                value={storeSettings.launchDate}
                onChange={(e) => setStoreSettings({ ...storeSettings, launchDate: e.target.value })}
                className="px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all duration-300"
              />
            </div>

            <button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-400 hover:to-purple-500 text-white px-8 py-3 rounded-xl font-bold transition-all duration-300 hover:scale-105">
              💾 حفظ الإعدادات
            </button>
          </div>
        </div>

        {/* معاينة المتجر */}
        <div className="bg-white/5 rounded-xl p-6 border border-white/10">
          <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <span className="text-2xl">👁️</span>
            معاينة صفحة المتجر
          </h3>

          <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-8 text-center border border-white/10">
            <div className="text-8xl mb-6">🛒</div>
            <h2 className="text-4xl font-bold text-white mb-4">{storeSettings.comingSoonMessage}</h2>
            <p className="text-xl text-slate-300 mb-6 max-w-2xl mx-auto">{storeSettings.description}</p>

            {storeSettings.launchDate && (
              <div className="bg-blue-500/10 border border-blue-400/30 rounded-xl p-4 mb-6 inline-block">
                <p className="text-blue-300 font-medium">
                  📅 الإطلاق المتوقع: {new Date(storeSettings.launchDate).toLocaleDateString("ar-SA")}
                </p>
              </div>
            )}

            <div className="flex justify-center gap-4">
              <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-3 rounded-xl font-bold opacity-50 cursor-not-allowed">
                🔔 تنبيهي عند الإطلاق
              </button>
              <button className="bg-white/10 text-white px-8 py-3 rounded-xl font-bold border border-white/20 opacity-50 cursor-not-allowed">
                📧 اشترك في النشرة
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function UsersTab() {
  const [users] = useState([
    { id: 1, name: "أحمد محمد", email: "ahmed@example.com", role: "مدير", status: "نشط", joinDate: "2025-01-15" },
    { id: 2, name: "فاطمة علي", email: "fatima@example.com", role: "محرر", status: "نشط", joinDate: "2025-01-20" },
    { id: 3, name: "محمد سالم", email: "mohammed@example.com", role: "عضو", status: "غير نشط", joinDate: "2025-01-10" },
  ])

  return (
    <div className="space-y-6">
      <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white flex items-center gap-3">
            <span className="text-3xl">👥</span>
            إدارة المستخدمين
          </h2>
          <button className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 text-white px-6 py-3 rounded-xl font-bold transition-all duration-300 hover:scale-105">
            ➕ إضافة مستخدم
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-right py-3 px-4 text-slate-300 font-medium">الاسم</th>
                <th className="text-right py-3 px-4 text-slate-300 font-medium">البريد الإلكتروني</th>
                <th className="text-right py-3 px-4 text-slate-300 font-medium">الدور</th>
                <th className="text-right py-3 px-4 text-slate-300 font-medium">الحالة</th>
                <th className="text-right py-3 px-4 text-slate-300 font-medium">تاريخ الانضمام</th>
                <th className="text-right py-3 px-4 text-slate-300 font-medium">الإجراءات</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-b border-white/5 hover:bg-white/5 transition-colors duration-200">
                  <td className="py-4 px-4 text-white font-medium">{user.name}</td>
                  <td className="py-4 px-4 text-slate-300">{user.email}</td>
                  <td className="py-4 px-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm border ${
                        user.role === "مدير"
                          ? "bg-red-500/20 text-red-400 border-red-500/30"
                          : user.role === "محرر"
                            ? "bg-blue-500/20 text-blue-400 border-blue-500/30"
                            : "bg-gray-500/20 text-gray-400 border-gray-500/30"
                      }`}
                    >
                      {user.role}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm border ${
                        user.status === "نشط"
                          ? "bg-green-500/20 text-green-400 border-green-500/30"
                          : "bg-gray-500/20 text-gray-400 border-gray-500/30"
                      }`}
                    >
                      {user.status}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-slate-400">{user.joinDate}</td>
                  <td className="py-4 px-4">
                    <div className="flex gap-2">
                      <button className="bg-blue-500/20 text-blue-400 px-3 py-1 rounded-lg text-sm hover:bg-blue-500/30 transition-colors duration-200">
                        ✏️ تعديل
                      </button>
                      <button className="bg-red-500/20 text-red-400 px-3 py-1 rounded-lg text-sm hover:bg-red-500/30 transition-colors duration-200">
                        🚫 حظر
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

function SettingsTab({
  siteSettings,
  setSiteSettings,
}: {
  siteSettings: any
  setSiteSettings: (settings: any) => void
}) {
  // إضافة حالة صيانة متقدمة
  const [maintenanceSettings, setMaintenanceSettings] = useState({
    isActive: false,
    message: "تتم صيانة الموقع من Remas",
    contactInfo: "يرجى التواصل معها لمعرفة سبب الصيانة",
    adminName: "Remas",
    startTime: "",
    estimatedEnd: "",
  })

  // تحميل إعدادات الصيانة عند بدء التشغيل
  useEffect(() => {
    const savedMaintenance = localStorage.getItem("eclora-maintenance-settings")
    if (savedMaintenance) {
      setMaintenanceSettings(JSON.parse(savedMaintenance))
    }
  }, [])

  // دالة تفعيل الصيانة
  const enableMaintenance = () => {
    const newSettings = {
      ...maintenanceSettings,
      isActive: true,
      startTime: new Date().toISOString(),
    }
    setMaintenanceSettings(newSettings)
    localStorage.setItem("eclora-maintenance-settings", JSON.stringify(newSettings))
    setSiteSettings({ ...siteSettings, maintenanceMode: true })

    // تعيين كوكي الصيانة
    document.cookie = "maintenance-mode=true; path=/; max-age=86400"

    alert("🔧 تم تفعيل وضع الصيانة! الموقع مغلق الآن للزوار")
  }

  // دالة إلغاء الصيانة
  const disableMaintenance = () => {
    const newSettings = {
      ...maintenanceSettings,
      isActive: false,
      startTime: "",
      estimatedEnd: "",
    }
    setMaintenanceSettings(newSettings)
    localStorage.setItem("eclora-maintenance-settings", JSON.stringify(newSettings))
    setSiteSettings({ ...siteSettings, maintenanceMode: false })

    // حذف كوكي الصيانة
    document.cookie = "maintenance-mode=false; path=/; max-age=0"

    alert("✅ تم إلغاء وضع الصيانة! الموقع متاح الآن للزوار")
  }

  return (
    <div className="space-y-6">
      <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
          <span className="text-3xl">⚙️</span>
          إعدادات الموقع
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-slate-300 text-sm font-medium mb-2">اسم الموقع</label>
              <input
                type="text"
                value={siteSettings.siteName}
                onChange={(e) => setSiteSettings({ ...siteSettings, siteName: e.target.value })}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all duration-300"
              />
            </div>

            <div>
              <label className="block text-slate-300 text-sm font-medium mb-2">وصف الموقع</label>
              <textarea
                value={siteSettings.siteDescription}
                onChange={(e) => setSiteSettings({ ...siteSettings, siteDescription: e.target.value })}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all duration-300"
                rows={3}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-white font-medium">وضع الصيانة</h4>
                <p className="text-slate-400 text-sm">إخفاء الموقع عن الزوار</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={siteSettings.maintenanceMode}
                  onChange={(e) => setSiteSettings({ ...siteSettings, maintenanceMode: e.target.checked })}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
              </label>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-slate-300 text-sm font-medium mb-2">عدد اللاعبين الحالي</label>
              <input
                type="number"
                value={siteSettings.playerCount}
                onChange={(e) => setSiteSettings({ ...siteSettings, playerCount: Number.parseInt(e.target.value) })}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all duration-300"
              />
            </div>

            <div>
              <label className="block text-slate-300 text-sm font-medium mb-2">الحد الأقصى للاعبين</label>
              <input
                type="number"
                value={siteSettings.maxPlayers}
                onChange={(e) => setSiteSettings({ ...siteSettings, maxPlayers: Number.parseInt(e.target.value) })}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all duration-300"
              />
            </div>

            <div>
              <label className="block text-slate-300 text-sm font-medium mb-2">حالة السيرفر</label>
              <select
                value={siteSettings.serverStatus}
                onChange={(e) => setSiteSettings({ ...siteSettings, serverStatus: e.target.value })}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all duration-300"
              >
                <option value="online" className="bg-slate-800">
                  متصل
                </option>
                <option value="offline" className="bg-slate-800">
                  غير متصل
                </option>
                <option value="maintenance" className="bg-slate-800">
                  صيانة
                </option>
              </select>
            </div>
          </div>
        </div>

        {/* إدارة الصيانة المتقدمة */}
        <div className="bg-white/5 rounded-xl p-6 border border-white/10 mt-6">
          <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <span className="text-2xl">🔧</span>
            إدارة الصيانة المتقدمة
          </h3>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-slate-300 text-sm font-medium mb-2">رسالة الصيانة</label>
                <input
                  type="text"
                  value={maintenanceSettings.message}
                  onChange={(e) => setMaintenanceSettings({ ...maintenanceSettings, message: e.target.value })}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all duration-300"
                />
              </div>

              <div>
                <label className="block text-slate-300 text-sm font-medium mb-2">معلومات التواصل</label>
                <textarea
                  value={maintenanceSettings.contactInfo}
                  onChange={(e) => setMaintenanceSettings({ ...maintenanceSettings, contactInfo: e.target.value })}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all duration-300"
                  rows={2}
                />
              </div>

              <div>
                <label className="block text-slate-300 text-sm font-medium mb-2">اسم المسؤول</label>
                <input
                  type="text"
                  value={maintenanceSettings.adminName}
                  onChange={(e) => setMaintenanceSettings({ ...maintenanceSettings, adminName: e.target.value })}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all duration-300"
                />
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-slate-300 text-sm font-medium mb-2">الوقت المتوقع للانتهاء</label>
                <input
                  type="datetime-local"
                  value={maintenanceSettings.estimatedEnd}
                  onChange={(e) => setMaintenanceSettings({ ...maintenanceSettings, estimatedEnd: e.target.value })}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all duration-300"
                />
              </div>

              {/* حالة الصيانة الحالية */}
              <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                <h4 className="text-white font-medium mb-2">حالة الموقع الحالية</h4>
                <div className="flex items-center gap-3">
                  <div
                    className={`w-3 h-3 rounded-full ${maintenanceSettings.isActive ? "bg-red-500" : "bg-green-500"}`}
                  ></div>
                  <span className={`font-semibold ${maintenanceSettings.isActive ? "text-red-400" : "text-green-400"}`}>
                    {maintenanceSettings.isActive ? "قيد الصيانة" : "متاح للزوار"}
                  </span>
                </div>
                {maintenanceSettings.isActive && maintenanceSettings.startTime && (
                  <p className="text-slate-400 text-sm mt-2">
                    بدأت الصيانة: {new Date(maintenanceSettings.startTime).toLocaleString("ar-SA")}
                  </p>
                )}
              </div>

              {/* أزرار التحكم */}
              <div className="flex gap-3">
                {!maintenanceSettings.isActive ? (
                  <button
                    onClick={enableMaintenance}
                    className="flex-1 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-400 hover:to-red-500 text-white px-6 py-3 rounded-xl font-bold transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-red-500/25"
                  >
                    🔧 تفعيل الصيانة
                  </button>
                ) : (
                  <button
                    onClick={disableMaintenance}
                    className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 text-white px-6 py-3 rounded-xl font-bold transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-green-500/25"
                  >
                    ✅ إلغاء الصيانة
                  </button>
                )}

                <button
                  onClick={() => {
                    localStorage.setItem("eclora-maintenance-settings", JSON.stringify(maintenanceSettings))
                    alert("💾 تم حفظ إعدادات الصيانة!")
                  }}
                  className="bg-blue-500/20 text-blue-400 px-6 py-3 rounded-xl font-bold hover:bg-blue-500/30 transition-all duration-300"
                >
                  💾 حفظ الإعدادات
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex gap-4">
          <button className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 text-white px-8 py-3 rounded-xl font-bold transition-all duration-300 hover:scale-105">
            💾 حفظ الإعدادات
          </button>
          <button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-400 hover:to-purple-500 text-white px-8 py-3 rounded-xl font-bold transition-all duration-300 hover:scale-105">
            🔄 إعادة تشغيل الموقع
          </button>
        </div>
      </div>
    </div>
  )
}

function ReviewsTab() {
  const [reviews, setReviews] = useState([])
  const [stats, setStats] = useState({
    total: 0,
    average: 0,
    thisWeek: 0,
    verified: 0,
  })

  useEffect(() => {
    loadReviews()
  }, [])

  const loadReviews = () => {
    const savedReviews = localStorage.getItem("eclora-reviews")
    if (savedReviews) {
      const parsedReviews = JSON.parse(savedReviews)
      setReviews(parsedReviews)

      // حساب الإحصائيات
      const total = parsedReviews.length
      const average = total > 0 ? parsedReviews.reduce((sum, review) => sum + review.rating, 0) / total : 0
      const oneWeekAgo = Date.now() - 7 * 24 * 60 * 60 * 1000
      const thisWeek = parsedReviews.filter((review) => new Date(review.date).getTime() > oneWeekAgo).length
      const verified = parsedReviews.filter((review) => review.verified).length

      setStats({ total, average, thisWeek, verified })
    }
  }

  const deleteReview = (reviewId) => {
    const updatedReviews = reviews.filter((review) => review.id !== reviewId)
    setReviews(updatedReviews)
    localStorage.setItem("eclora-reviews", JSON.stringify(updatedReviews))
    loadReviews()
    alert("تم حذف الرأي بنجاح!")
  }

  const renderStars = (rating) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <span key={star} className={`text-lg ${star <= rating ? "text-yellow-400" : "text-gray-600"}`}>
            ⭐
          </span>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
          <span className="text-3xl">⭐</span>
          إدارة الآراء
        </h2>

        {/* إحصائيات الآراء */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          {[
            { title: "إجمالي الآراء", value: stats.total, icon: "💬", color: "from-blue-500 to-cyan-500" },
            {
              title: "متوسط التقييم",
              value: stats.average.toFixed(1),
              icon: "⭐",
              color: "from-yellow-500 to-orange-500",
            },
            { title: "آراء هذا الأسبوع", value: stats.thisWeek, icon: "📅", color: "from-green-500 to-emerald-500" },
            { title: "أعضاء مؤكدين", value: stats.verified, icon: "✅", color: "from-purple-500 to-pink-500" },
          ].map((stat, index) => (
            <div
              key={index}
              className="bg-white/5 rounded-xl p-4 border border-white/10 hover:border-white/20 transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-2xl">{stat.icon}</span>
                <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${stat.color}`}></div>
              </div>
              <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-slate-400 text-sm">{stat.title}</div>
            </div>
          ))}
        </div>

        {/* قائمة الآراء */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <span className="text-2xl">📝</span>
            جميع الآراء ({reviews.length})
          </h3>

          {reviews.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4 opacity-50">⭐</div>
              <p className="text-slate-400 text-lg">لا توجد آراء بعد</p>
            </div>
          ) : (
            <div className="space-y-4">
              {reviews.map((review) => (
                <div
                  key={review.id}
                  className="bg-white/5 rounded-xl p-4 border border-white/10 hover:border-white/20 transition-all duration-300"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4 flex-1">
                      <img
                        src={review.avatar || "/placeholder.svg"}
                        alt={review.username}
                        className="w-10 h-10 rounded-full border-2 border-white/20"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="text-white font-bold">{review.username}</h4>
                          {review.verified && (
                            <span className="bg-green-500/20 text-green-400 px-2 py-1 rounded-full text-xs border border-green-500/30">
                              ✅ مؤكد
                            </span>
                          )}
                          <span className="text-slate-400 text-sm">
                            {new Date(review.date).toLocaleDateString("ar-SA")}
                          </span>
                        </div>

                        <div className="flex items-center gap-3 mb-3">
                          {renderStars(review.rating)}
                          <span className="text-yellow-400 font-semibold">({review.rating}/5)</span>
                        </div>

                        <p className="text-slate-300 leading-relaxed">{review.comment}</p>
                      </div>
                    </div>

                    <button
                      onClick={() => deleteReview(review.id)}
                      className="bg-red-500/20 text-red-400 px-3 py-2 rounded-lg text-sm hover:bg-red-500/30 transition-colors duration-200 ml-4"
                    >
                      🗑️ حذف
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
