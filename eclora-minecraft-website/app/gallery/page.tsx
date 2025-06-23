"use client"

import { useState, useEffect } from "react"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"

export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [likedImages, setLikedImages] = useState<Set<string>>(new Set())
  const [customImages, setCustomImages] = useState<any[]>([])

  // Load liked images and custom images from localStorage
  useEffect(() => {
    const savedLikes = localStorage.getItem("eclora-liked-images")
    if (savedLikes) {
      setLikedImages(new Set(JSON.parse(savedLikes)))
    }

    const savedImages = localStorage.getItem("eclora-gallery-images")
    if (savedImages) {
      setCustomImages(JSON.parse(savedImages))
    }
  }, [])

  // Save liked images to localStorage
  useEffect(() => {
    localStorage.setItem("eclora-liked-images", JSON.stringify(Array.from(likedImages)))
  }, [likedImages])

  const categories = [
    { id: "all", name: "الكل", icon: "🌟" },
    { id: "builds", name: "المباني", icon: "🏰" },
    { id: "events", name: "الفعاليات", icon: "🎪" },
    { id: "pvp", name: "المعارك", icon: "⚔️" },
    { id: "nature", name: "الطبيعة", icon: "🌿" },
    { id: "community", name: "المجتمع", icon: "👥" },
  ]

  const defaultImages = [
    {
      id: "default-1",
      src: "/placeholder.svg?height=400&width=600&text=قريباً",
      alt: "قريباً",
      title: "صور حلوة جاية قريب",
      category: "builds",
      description: "صور مذهلة جاية قريب",
      builder: "Remas",
    },
    {
      id: "default-2",
      src: "/placeholder.svg?height=400&width=600&text=قريباً",
      alt: "قريباً",
      title: "فعاليات مثيرة جاية",
      category: "events",
      description: "فعاليات حلوة جاية قريب",
      builder: "Remas",
    },
    {
      id: "default-3",
      src: "/placeholder.svg?height=400&width=600&text=قريباً",
      alt: "قريباً",
      title: "معارك قوية جاية",
      category: "pvp",
      description: "معارك حماسية جاية قريب",
      builder: "Remas",
    },
    {
      id: "default-4",
      src: "/placeholder.svg?height=400&width=600&text=قريباً",
      alt: "قريباً",
      title: "مباني روعة جاية",
      category: "builds",
      description: "مباني خرافية جاية قريب",
      builder: "Remas",
    },
    {
      id: "default-5",
      src: "/placeholder.svg?height=400&width=600&text=قريباً",
      alt: "قريباً",
      title: "طبيعة خلابة جاية",
      category: "nature",
      description: "مناظر حلوة جاية قريب",
      builder: "Remas",
    },
    {
      id: "default-6",
      src: "/placeholder.svg?height=400&width=600&text=قريباً",
      alt: "قريباً",
      title: "تجمعات حلوة جاية",
      category: "community",
      description: "لقاءات رائعة جاية قريب",
      builder: "Remas",
    },
    {
      id: "default-7",
      src: "/placeholder.svg?height=400&width=600&text=قريباً",
      alt: "قريباً",
      title: "مغامرات جديدة جاية",
      category: "events",
      description: "مغامرات شيقة جاية قريب",
      builder: "Remas",
    },
    {
      id: "default-8",
      src: "/placeholder.svg?height=400&width=600&text=قريباً",
      alt: "قريباً",
      title: "تحديات صعبة جاية",
      category: "pvp",
      description: "تحديات قوية جاية قريب",
      builder: "Remas",
    },
    {
      id: "default-9",
      src: "/placeholder.svg?height=400&width=600&text=قريباً",
      alt: "قريباً",
      title: "مفاجآت كثيرة جاية",
      category: "builds",
      description: "مفاجآت حلوة جاية قريب",
      builder: "Remas",
    },
  ]

  const allImages = [...defaultImages, ...customImages]

  const handleLike = (imageId: string) => {
    const newLikedImages = new Set(likedImages)

    if (likedImages.has(imageId)) {
      newLikedImages.delete(imageId)
    } else {
      newLikedImages.add(imageId)
    }

    setLikedImages(newLikedImages)
  }

  const getLikeCount = (imageId: string) => {
    return likedImages.has(imageId) ? 1 : 0
  }

  const filteredImages =
    selectedCategory === "all" ? allImages : allImages.filter((img) => img.category === selectedCategory)

  return (
    <div className="min-h-screen">
      <Navigation />

      <section className="pt-32 pb-20 px-6 bg-gradient-to-b from-slate-900 via-blue-900/20 to-slate-900 relative overflow-hidden">
        {/* Simple Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-400/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-400/5 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                📸 معرض الصور
              </span>
            </h1>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">استكشف أجمل اللحظات في عالم Eclora</p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-5 py-2 rounded-full font-medium transition-all duration-200 ${
                  selectedCategory === category.id
                    ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg"
                    : "bg-white/10 text-slate-300 hover:bg-white/20 hover:text-white"
                }`}
              >
                <span className="flex items-center gap-2">
                  <span>{category.icon}</span>
                  {category.name}
                </span>
              </button>
            ))}
          </div>

          {/* Gallery Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredImages.map((image) => {
              const isLiked = likedImages.has(image.id)
              const currentLikes = getLikeCount(image.id)

              return (
                <div
                  key={image.id}
                  className="group bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10 hover:border-blue-400/30 transition-all duration-300 hover:scale-105"
                >
                  {/* Image */}
                  <div className="relative overflow-hidden">
                    <img
                      src={image.src || "/placeholder.svg"}
                      alt={image.alt}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

                    {/* Like Button */}
                    <button
                      onClick={() => handleLike(image.id)}
                      className={`absolute top-3 right-3 w-10 h-10 rounded-full backdrop-blur-sm border transition-all duration-200 hover:scale-110 ${
                        isLiked
                          ? "bg-red-500/80 border-red-400 text-white"
                          : "bg-black/40 border-white/20 text-gray-300 hover:text-red-400"
                      }`}
                    >
                      <span className="text-lg">{isLiked ? "❤️" : "🤍"}</span>
                    </button>

                    {/* Overlay Info */}
                    <div className="absolute bottom-3 left-3 right-3">
                      <h3 className="text-lg font-semibold text-white mb-1">{image.title}</h3>
                      <p className="text-slate-300 text-sm">{image.description}</p>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-slate-400">
                        <span className="text-sm">👤</span>
                        <span className="text-sm font-medium text-blue-400">{image.builder}</span>
                      </div>
                      <div className="flex items-center gap-2 text-red-400">
                        <span className="text-sm">❤️</span>
                        <span className="text-sm font-semibold">{currentLikes}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Upload Section */}
          <div className="text-center mt-16">
            <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 backdrop-blur-sm rounded-2xl p-8 border border-blue-400/20">
              <h3 className="text-2xl font-bold text-white mb-4">📤 شارك إبداعك!</h3>
              <p className="text-slate-300 mb-6 max-w-xl mx-auto">هل لديك لقطة رائعة؟ شاركها مع المجتمع في ديسكورد</p>
              <a
                href="https://discord.gg/eclora"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-200 hover:scale-105 inline-flex items-center gap-2"
              >
                <span>💬</span>
                شارك في ديسكورد
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
