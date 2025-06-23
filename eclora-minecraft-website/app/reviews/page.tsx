"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"

interface Review {
  id: string
  userId: string
  username: string
  avatar: string
  rating: number
  comment: string
  date: string
  verified: boolean
  discriminator?: string
}

interface DiscordUser {
  id: string
  username: string
  discriminator: string
  avatar: string
  verified: boolean
  email?: string
  inServer: boolean
}

export default function ReviewsPage() {
  const [discordConfig, setDiscordConfig] = useState({
    clientId: "",
    serverId: "",
    redirectUri: "",
  })
  const [reviews, setReviews] = useState<Review[]>([])
  const [user, setUser] = useState<DiscordUser | null>(null)
  const [showReviewForm, setShowReviewForm] = useState(false)
  const [newReview, setNewReview] = useState({
    rating: 5,
    comment: "",
  })
  const [loading, setLoading] = useState(true)
  const [authLoading, setAuthLoading] = useState(false)
  const [canReview, setCanReview] = useState(true)
  const [lastReviewDate, setLastReviewDate] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  // في أول الملف، غير هذه الأسطر:
  // معرف السيرفر (يجب تغييره لمعرف سيرفر Eclora الحقيقي)
  const DISCORD_SERVER_ID = "1369796581733175336"
  const DISCORD_CLIENT_ID = "1386438919846891603"
  const DISCORD_REDIRECT_URI = `${typeof window !== "undefined" ? window.location.origin : ""}/auth/discord/callback`

  useEffect(() => {
    // تحميل إعدادات Discord
    fetch("/api/discord/config")
      .then((res) => res.json())
      .then((config) => setDiscordConfig(config))
      .catch(() => {
        // fallback للقيم المباشرة
        setDiscordConfig({
          clientId: "1386438919846891603",
          serverId: "1369796581733175336",
          redirectUri: `${window.location.origin}/auth/discord/callback`,
        })
      })

    loadReviews()
    checkAuthStatus()
    handleDiscordCallback()
  }, [])

  const loadReviews = () => {
    const savedReviews = localStorage.getItem("eclora-reviews")
    if (savedReviews) {
      const parsedReviews = JSON.parse(savedReviews)
      parsedReviews.sort((a: Review, b: Review) => new Date(b.date).getTime() - new Date(a.date).getTime())
      setReviews(parsedReviews)
    }
    setLoading(false)
  }

  const checkAuthStatus = () => {
    const savedUser = localStorage.getItem("eclora-discord-user")
    const accessToken = localStorage.getItem("discord-access-token")

    if (savedUser && accessToken) {
      const userData = JSON.parse(savedUser)
      setUser(userData)
      checkReviewEligibility(userData.id)

      // التحقق من صحة التوكن وعضوية السيرفر
      verifyServerMembership(accessToken, userData.id)
    }
  }

  const handleDiscordCallback = () => {
    const urlParams = new URLSearchParams(window.location.search)
    const code = urlParams.get("code")
    const error = urlParams.get("error")

    if (error) {
      setError("تم إلغاء تسجيل الدخول أو حدث خطأ")
      return
    }

    if (code && !user) {
      exchangeCodeForToken(code)
    }
  }

  const handleDiscordLogin = () => {
    setAuthLoading(true)
    setError(null)

    const discordAuthUrl = `https://discord.com/api/oauth2/authorize?client_id=${discordConfig.clientId}&redirect_uri=${encodeURIComponent(discordConfig.redirectUri)}&response_type=code&scope=identify%20guilds`

    window.location.href = discordAuthUrl
  }

  const exchangeCodeForToken = async (code: string) => {
    try {
      setAuthLoading(true)

      // في التطبيق الحقيقي، هذا يجب أن يتم عبر API route آمن
      const response = await fetch("/api/discord/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code }),
      })

      if (!response.ok) {
        throw new Error("فشل في تسجيل الدخول")
      }

      const data = await response.json()

      localStorage.setItem("discord-access-token", data.access_token)

      await fetchUserData(data.access_token)
    } catch (error) {
      console.error("Discord auth error:", error)
      setError("حدث خطأ في تسجيل الدخول. حاول مرة أخرى.")
    } finally {
      setAuthLoading(false)
    }
  }

  const fetchUserData = async (accessToken: string) => {
    try {
      // جلب بيانات المستخدم
      const userResponse = await fetch("https://discord.com/api/users/@me", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })

      if (!userResponse.ok) {
        throw new Error("فشل في جلب بيانات المستخدم")
      }

      const userData = await userResponse.json()

      // التحقق من عضوية السيرفر
      const inServer = await verifyServerMembership(accessToken, userData.id)

      const discordUser: DiscordUser = {
        id: userData.id,
        username: userData.username,
        discriminator: userData.discriminator || "0",
        avatar: userData.avatar
          ? `https://cdn.discordapp.com/avatars/${userData.id}/${userData.avatar}.png`
          : `https://cdn.discordapp.com/embed/avatars/${Number.parseInt(userData.discriminator || "0") % 5}.png`,
        verified: userData.verified || false,
        email: userData.email,
        inServer,
      }

      localStorage.setItem("eclora-discord-user", JSON.stringify(discordUser))
      setUser(discordUser)
      checkReviewEligibility(discordUser.id)

      // تنظيف URL
      window.history.replaceState({}, document.title, window.location.pathname)
    } catch (error) {
      console.error("Error fetching user data:", error)
      setError("حدث خطأ في جلب بيانات المستخدم")
    }
  }

  const verifyServerMembership = async (accessToken: string, userId: string): Promise<boolean> => {
    try {
      // في التطبيق الحقيقي، هذا يجب أن يتم عبر API route آمن
      const response = await fetch(`/api/discord/check-membership`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ accessToken, userId, serverId: discordConfig.serverId }),
      })

      if (!response.ok) {
        return false
      }

      const data = await response.json()
      return data.isMember || false
    } catch (error) {
      console.error("Error checking server membership:", error)
      return false
    }
  }

  const checkReviewEligibility = (userId: string) => {
    const lastReview = localStorage.getItem(`eclora-last-review-${userId}`)

    if (lastReview) {
      const lastReviewTime = new Date(lastReview).getTime()
      const oneWeekAgo = Date.now() - 7 * 24 * 60 * 60 * 1000

      if (lastReviewTime > oneWeekAgo) {
        setCanReview(false)
        setLastReviewDate(lastReview)
      }
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("eclora-discord-user")
    localStorage.removeItem("discord-access-token")
    setUser(null)
    setCanReview(false)
    setShowReviewForm(false)
    setError(null)
  }

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault()

    if (!user || !user.inServer) {
      setError("يجب أن تكون عضواً في سيرفر Discord لكتابة رأيك!")
      return
    }

    if (!canReview) {
      setError("يمكنك كتابة رأي واحد فقط كل أسبوع!")
      return
    }

    if (newReview.comment.trim().length < 10) {
      setError("يجب أن يكون الرأي 10 أحرف على الأقل!")
      return
    }

    const review: Review = {
      id: `review_${Date.now()}`,
      userId: user.id,
      username: user.username,
      discriminator: user.discriminator,
      avatar: user.avatar,
      rating: newReview.rating,
      comment: newReview.comment.trim(),
      date: new Date().toISOString(),
      verified: user.inServer,
    }

    const updatedReviews = [review, ...reviews]
    setReviews(updatedReviews)
    localStorage.setItem("eclora-reviews", JSON.stringify(updatedReviews))

    localStorage.setItem(`eclora-last-review-${user.id}`, new Date().toISOString())

    setNewReview({ rating: 5, comment: "" })
    setShowReviewForm(false)
    setCanReview(false)
    setLastReviewDate(new Date().toISOString())
    setError(null)

    alert("🎉 تم إرسال رأيك بنجاح! شكراً لك")
  }

  const getAverageRating = () => {
    if (reviews.length === 0) return 0
    const sum = reviews.reduce((acc, review) => acc + review.rating, 0)
    return (sum / reviews.length).toFixed(1)
  }

  const getRatingDistribution = () => {
    const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 }
    reviews.forEach((review) => {
      distribution[review.rating as keyof typeof distribution]++
    })
    return distribution
  }

  const renderStars = (rating: number, interactive = false, onRate?: (rating: number) => void) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onClick={() => interactive && onRate && onRate(star)}
            className={`text-2xl transition-all duration-200 ${
              interactive ? "hover:scale-110 cursor-pointer" : "cursor-default"
            } ${star <= rating ? "text-yellow-400" : "text-gray-600"}`}
            disabled={!interactive}
          >
            ⭐
          </button>
        ))}
      </div>
    )
  }

  const getNextReviewDate = () => {
    if (!lastReviewDate) return null
    const nextDate = new Date(lastReviewDate)
    nextDate.setDate(nextDate.getDate() + 7)
    return nextDate
  }

  if (loading) {
    return (
      <div className="min-h-screen">
        <Navigation />
        <div className="pt-32 flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="text-6xl mb-4 animate-spin">⭐</div>
            <p className="text-xl text-slate-300">جاري تحميل الآراء...</p>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <Navigation />

      <section className="pt-32 pb-20 px-6 bg-gradient-to-b from-slate-900 via-yellow-900/10 to-slate-900 relative overflow-hidden">
        {/* عناصر تزيينية */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-yellow-400/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-orange-400/5 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto">
          {/* الهيدر */}
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                ⭐ آراء اللاعبين
              </span>
            </h1>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              شارك تجربتك مع Eclora واقرأ آراء اللاعبين الآخرين
            </p>
          </div>

          {/* رسالة الخطأ */}
          {error && (
            <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 mb-8 text-center">
              <p className="text-red-400">{error}</p>
            </div>
          )}

          {/* إحصائيات التقييم */}
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 mb-12">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="text-center">
                <div className="text-6xl font-bold text-yellow-400 mb-2">{getAverageRating()}</div>
                <div className="flex justify-center mb-2">{renderStars(Number.parseFloat(getAverageRating()))}</div>
                <p className="text-slate-300">من أصل {reviews.length} تقييم</p>
              </div>

              <div className="space-y-2">
                {Object.entries(getRatingDistribution())
                  .reverse()
                  .map(([rating, count]) => {
                    const percentage = reviews.length > 0 ? (count / reviews.length) * 100 : 0
                    return (
                      <div key={rating} className="flex items-center gap-3">
                        <span className="text-yellow-400 text-sm w-8">{rating}⭐</span>
                        <div className="flex-1 bg-white/10 rounded-full h-2">
                          <div
                            className="bg-gradient-to-r from-yellow-400 to-orange-500 h-2 rounded-full transition-all duration-500"
                            style={{ width: `${percentage}%` }}
                          ></div>
                        </div>
                        <span className="text-slate-400 text-sm w-8">{count}</span>
                      </div>
                    )
                  })}
              </div>
            </div>
          </div>

          {/* قسم كتابة الرأي */}
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 mb-12">
            {!user ? (
              <div className="text-center">
                <div className="text-6xl mb-6">🔗</div>
                <h3 className="text-2xl font-bold text-white mb-4">سجل دخول بـ Discord لكتابة رأيك</h3>
                <p className="text-slate-300 mb-6">
                  سيتم توجيهك لصفحة Discord الرسمية لتسجيل الدخول والتحقق من عضويتك في السيرفر
                </p>
                <button
                  onClick={handleDiscordLogin}
                  disabled={authLoading}
                  className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-400 hover:to-purple-500 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 hover:scale-105 flex items-center gap-3 mx-auto disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {authLoading ? (
                    <>
                      <div className="animate-spin w-6 h-6 border-2 border-white border-t-transparent rounded-full"></div>
                      جاري التحقق...
                    </>
                  ) : (
                    <>
                      <img
                        src="https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/discord.svg"
                        alt="Discord"
                        className="w-6 h-6 filter invert"
                      />
                      تسجيل الدخول بـ Discord
                    </>
                  )}
                </button>
                <p className="text-slate-400 text-sm mt-4">🔒 آمن ومحمي - لن نحصل على أي معلومات حساسة</p>
              </div>
            ) : !user.inServer ? (
              <div className="text-center">
                <div className="text-6xl mb-6">❌</div>
                <h3 className="text-2xl font-bold text-red-400 mb-4">يجب الانضمام لسيرفر Discord</h3>
                <p className="text-slate-300 mb-6">
                  مرحباً{" "}
                  <strong>
                    {user.username}#{user.discriminator}
                  </strong>
                  ! لكتابة رأيك، يجب أن تكون عضواً في سيرفر Discord الخاص بنا
                </p>
                <div className="flex gap-4 justify-center">
                  <a
                    href="https://discord.gg/eclora"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-400 hover:to-purple-500 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 hover:scale-105 flex items-center gap-2"
                  >
                    <img
                      src="https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/discord.svg"
                      alt="Discord"
                      className="w-5 h-5 filter invert"
                    />
                    انضم للسيرفر
                  </a>
                  <button
                    onClick={handleLogout}
                    className="bg-white/10 text-white px-6 py-3 rounded-xl font-semibold border border-white/20 hover:bg-white/20 transition-all duration-200"
                  >
                    تسجيل خروج
                  </button>
                </div>
                <p className="text-slate-400 text-sm mt-4">بعد الانضمام، حدث الصفحة أو سجل دخول مرة أخرى</p>
              </div>
            ) : !canReview ? (
              <div className="text-center">
                <div className="text-6xl mb-6">⏰</div>
                <h3 className="text-2xl font-bold text-yellow-400 mb-4">يمكنك كتابة رأي واحد كل أسبوع</h3>
                <p className="text-slate-300 mb-4">
                  يمكنك كتابة رأيك التالي في:{" "}
                  {getNextReviewDate()?.toLocaleDateString("ar-SA", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
                <div className="flex items-center justify-center gap-3 text-slate-400 mb-4">
                  <img src={user.avatar || "/placeholder.svg"} alt={user.username} className="w-8 h-8 rounded-full" />
                  <span>
                    مرحباً {user.username}#{user.discriminator}
                  </span>
                  <span className="bg-green-500/20 text-green-400 px-2 py-1 rounded-full text-xs border border-green-500/30">
                    ✅ عضو مؤكد
                  </span>
                </div>
                <button
                  onClick={handleLogout}
                  className="text-red-400 hover:text-red-300 transition-colors duration-200"
                >
                  تسجيل خروج
                </button>
              </div>
            ) : (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold text-white flex items-center gap-3">
                    <span className="text-3xl">✍️</span>
                    اكتب رأيك
                  </h3>
                  <div className="flex items-center gap-3 text-slate-400">
                    <img src={user.avatar || "/placeholder.svg"} alt={user.username} className="w-8 h-8 rounded-full" />
                    <span>
                      مرحباً {user.username}#{user.discriminator}
                    </span>
                    <span className="bg-green-500/20 text-green-400 px-2 py-1 rounded-full text-xs border border-green-500/30">
                      ✅ عضو مؤكد
                    </span>
                    <button
                      onClick={handleLogout}
                      className="text-red-400 hover:text-red-300 transition-colors duration-200"
                    >
                      تسجيل خروج
                    </button>
                  </div>
                </div>

                {!showReviewForm ? (
                  <div className="text-center">
                    <button
                      onClick={() => setShowReviewForm(true)}
                      className="bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-400 hover:to-orange-500 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 hover:scale-105"
                    >
                      ⭐ اكتب رأيك الآن
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmitReview} className="space-y-6">
                    <div>
                      <label className="block text-slate-300 text-sm font-medium mb-3">التقييم</label>
                      <div className="flex items-center gap-4">
                        {renderStars(newReview.rating, true, (rating) => setNewReview({ ...newReview, rating }))}
                        <span className="text-slate-400">({newReview.rating}/5)</span>
                      </div>
                    </div>

                    <div>
                      <label className="block text-slate-300 text-sm font-medium mb-3">رأيك في السيرفر</label>
                      <textarea
                        value={newReview.comment}
                        onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 transition-all duration-300 resize-none"
                        rows={4}
                        placeholder="شاركنا تجربتك مع Eclora... ما الذي أعجبك؟ ما الذي يمكن تحسينه؟"
                        required
                        minLength={10}
                        maxLength={500}
                      />
                      <div className="text-right text-slate-400 text-sm mt-1">
                        {newReview.comment.length}/500 حرف (10 أحرف كحد أدنى)
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <button
                        type="submit"
                        className="bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-400 hover:to-orange-500 text-white px-8 py-3 rounded-xl font-bold transition-all duration-300 hover:scale-105"
                      >
                        🚀 إرسال الرأي
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowReviewForm(false)}
                        className="bg-white/10 text-white px-8 py-3 rounded-xl font-semibold border border-white/20 hover:bg-white/20 transition-all duration-200"
                      >
                        إلغاء
                      </button>
                    </div>
                  </form>
                )}
              </div>
            )}
          </div>

          {/* قائمة الآراء */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-white flex items-center gap-3">
              <span className="text-3xl">💬</span>
              آراء اللاعبين ({reviews.length})
            </h3>

            {reviews.length === 0 ? (
              <div className="text-center py-20">
                <div className="text-8xl mb-6 opacity-50">⭐</div>
                <h4 className="text-2xl font-bold text-white mb-4">لا توجد آراء بعد</h4>
                <p className="text-slate-400 text-lg">كن أول من يشارك رأيه!</p>
              </div>
            ) : (
              <div className="grid gap-6">
                {reviews.map((review) => (
                  <div
                    key={review.id}
                    className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300"
                  >
                    <div className="flex items-start gap-4">
                      <img
                        src={review.avatar || "/placeholder.svg"}
                        alt={review.username}
                        className="w-12 h-12 rounded-full border-2 border-white/20"
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-3">
                            <h4 className="text-white font-bold">
                              {review.username}
                              {review.discriminator && review.discriminator !== "0" && (
                                <span className="text-slate-400">#{review.discriminator}</span>
                              )}
                            </h4>
                            {review.verified && (
                              <span className="bg-green-500/20 text-green-400 px-2 py-1 rounded-full text-xs border border-green-500/30 flex items-center gap-1">
                                ✅ عضو مؤكد
                              </span>
                            )}
                          </div>
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
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* دعوة للانضمام */}
          <div className="text-center mt-16">
            <div className="bg-gradient-to-r from-indigo-500/10 to-purple-500/10 backdrop-blur-sm rounded-2xl p-8 border border-indigo-400/20">
              <h3 className="text-2xl font-bold text-white mb-4">💭 شاركنا رأيك!</h3>
              <p className="text-xl text-slate-300 mb-6 max-w-xl mx-auto">
                انضم لسيرفر Discord وشاركنا تجربتك مع Eclora. رأيك يساعدنا في التطوير!
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
