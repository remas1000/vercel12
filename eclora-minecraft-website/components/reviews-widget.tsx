"use client"

import { useState, useEffect } from "react"
import Link from "next/link"

interface Review {
  id: string
  userId: string
  username: string
  avatar: string
  rating: number
  comment: string
  date: string
  verified: boolean
}

export default function ReviewsWidget() {
  const [reviews, setReviews] = useState<Review[]>([])
  const [averageRating, setAverageRating] = useState(0)

  useEffect(() => {
    loadReviews()
  }, [])

  const loadReviews = () => {
    const savedReviews = localStorage.getItem("eclora-reviews")
    if (savedReviews) {
      const parsedReviews = JSON.parse(savedReviews)
      setReviews(parsedReviews.slice(0, 3)) // أحدث 3 آراء

      // حساب المتوسط
      if (parsedReviews.length > 0) {
        const sum = parsedReviews.reduce((acc: number, review: Review) => acc + review.rating, 0)
        setAverageRating(sum / parsedReviews.length)
      }
    }
  }

  const renderStars = (rating: number) => {
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

  if (reviews.length === 0) {
    return (
      <div className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 backdrop-blur-sm rounded-2xl p-6 border border-yellow-400/20 text-center">
        <div className="text-4xl mb-4">⭐</div>
        <h3 className="text-xl font-bold text-white mb-3">شارك رأيك في Eclora!</h3>
        <p className="text-slate-300 mb-4">كن أول من يكتب رأيه عن السيرفر</p>
        <Link
          href="/reviews"
          className="bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-400 hover:to-orange-500 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 hover:scale-105 inline-flex items-center gap-2"
        >
          <span>✍️</span>
          اكتب رأيك
        </Link>
      </div>
    )
  }

  return (
    <div className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 backdrop-blur-sm rounded-2xl p-6 border border-yellow-400/20 relative overflow-hidden">
      {/* تأثير خلفي */}
      <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/5 to-orange-500/5 animate-pulse"></div>

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <span className="text-2xl">⭐</span>
            آراء اللاعبين
          </h3>
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-yellow-400">{averageRating.toFixed(1)}</span>
            {renderStars(Math.round(averageRating))}
          </div>
        </div>

        <div className="space-y-3 mb-4">
          {reviews.map((review) => (
            <div key={review.id} className="bg-white/5 rounded-xl p-3 border border-white/10">
              <div className="flex items-center gap-3 mb-2">
                <img src={review.avatar || "/placeholder.svg"} alt={review.username} className="w-8 h-8 rounded-full" />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-white font-medium text-sm">{review.username}</span>
                    {review.verified && <span className="text-green-400 text-xs">✅</span>}
                  </div>
                  {renderStars(review.rating)}
                </div>
              </div>
              <p className="text-slate-300 text-sm line-clamp-2">{review.comment}</p>
            </div>
          ))}
        </div>

        <div className="flex justify-between items-center">
          <span className="text-slate-400 text-sm">
            {reviews.length} من أصل {JSON.parse(localStorage.getItem("eclora-reviews") || "[]").length} رأي
          </span>
          <Link
            href="/reviews"
            className="bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-400 hover:to-orange-500 text-white px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-200 hover:scale-105"
          >
            عرض الكل
          </Link>
        </div>
      </div>
    </div>
  )
}
