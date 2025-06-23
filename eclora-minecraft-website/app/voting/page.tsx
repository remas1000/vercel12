"use client"

import { useState, useEffect } from "react"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"

export default function VotingPage() {
  const [polls, setPolls] = useState<any[]>([])
  const [userVotes, setUserVotes] = useState<{ [key: string]: string }>({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadPolls()
    loadUserVotes()
  }, [])

  const loadPolls = () => {
    const savedPolls = localStorage.getItem("eclora-public-polls")
    if (savedPolls) {
      const parsedPolls = JSON.parse(savedPolls)
      // فلترة التصويتات النشطة فقط
      const activePolls = parsedPolls.filter((poll: any) => poll.status === "نشط")
      setPolls(activePolls)
    }
    setLoading(false)
  }

  const loadUserVotes = () => {
    const savedVotes = localStorage.getItem("eclora-user-votes")
    if (savedVotes) {
      setUserVotes(JSON.parse(savedVotes))
    }
  }

  const handleVote = (pollId: string, optionIndex: number) => {
    // التحقق من أن المستخدم لم يصوت من قبل
    if (userVotes[pollId]) {
      alert("لقد صوتت في هذا التصويت من قبل!")
      return
    }

    // تحديث الأصوات
    const updatedPolls = polls.map((poll) => {
      if (poll.id === pollId) {
        const updatedOptions = poll.options.map((option: any, index: number) => {
          if (index === optionIndex) {
            return { ...option, votes: option.votes + 1 }
          }
          return option
        })
        return { ...poll, options: updatedOptions }
      }
      return poll
    })

    setPolls(updatedPolls)

    // حفظ صوت المستخدم
    const newUserVotes = { ...userVotes, [pollId]: optionIndex.toString() }
    setUserVotes(newUserVotes)
    localStorage.setItem("eclora-user-votes", JSON.stringify(newUserVotes))

    // حفظ التصويتات المحدثة
    const allPolls = JSON.parse(localStorage.getItem("eclora-public-polls") || "[]")
    const updatedAllPolls = allPolls.map((poll: any) => {
      const updatedPoll = updatedPolls.find((p) => p.id === poll.id)
      return updatedPoll || poll
    })
    localStorage.setItem("eclora-public-polls", JSON.stringify(updatedAllPolls))

    // إشعار نجاح
    alert("تم تسجيل صوتك بنجاح! شكراً لمشاركتك 🎉")
  }

  if (loading) {
    return (
      <div className="min-h-screen">
        <Navigation />
        <div className="pt-32 flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="text-6xl mb-4 animate-spin">🗳️</div>
            <p className="text-xl text-slate-300">جاري تحميل التصويتات...</p>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <Navigation />

      <section className="pt-32 pb-20 px-6 bg-gradient-to-b from-slate-900 via-blue-900/10 to-slate-900 relative overflow-hidden">
        {/* عناصر تزيينية */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-400/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-400/5 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto">
          {/* الهيدر */}
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                🗳️ مركز التصويت
              </span>
            </h1>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              شارك برأيك وساعدنا في تطوير Eclora! صوتك مهم ويساهم في تحسين تجربة الجميع
            </p>
          </div>

          {polls.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-8xl mb-6 opacity-50">🗳️</div>
              <h3 className="text-2xl font-bold text-white mb-4">لا توجد تصويتات نشطة حالياً</h3>
              <p className="text-slate-400 text-lg mb-8">ترقبوا تصويتات جديدة قريباً!</p>
              <a
                href="https://discord.gg/eclora"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-400 hover:to-purple-500 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-200 hover:scale-105 inline-flex items-center gap-3"
              >
                <img
                  src="https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/discord.svg"
                  alt="Discord"
                  className="w-5 h-5 filter invert"
                />
                اقترح تصويت في Discord
              </a>
            </div>
          ) : (
            <div className="space-y-8">
              {polls.map((poll) => {
                const totalVotes = poll.options.reduce((sum: number, option: any) => sum + option.votes, 0)
                const hasVoted = userVotes[poll.id] !== undefined
                const userVoteIndex = userVotes[poll.id] ? Number.parseInt(userVotes[poll.id]) : -1

                return (
                  <div
                    key={poll.id}
                    className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-white/20 transition-all duration-300"
                  >
                    {/* عنوان التصويت */}
                    <div className="mb-6">
                      <h2 className="text-2xl font-bold text-white mb-3 flex items-center gap-3">
                        <span className="text-3xl">📊</span>
                        {poll.title}
                      </h2>
                      <div className="flex items-center gap-4 text-sm text-slate-400">
                        <span className="flex items-center gap-1">
                          <span>👥</span>
                          {totalVotes} صوت
                        </span>
                        <span className="flex items-center gap-1">
                          <span>📅</span>
                          ينتهي في: {poll.endDate}
                        </span>
                        {hasVoted && (
                          <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full border border-green-500/30">
                            ✅ تم التصويت
                          </span>
                        )}
                      </div>
                    </div>

                    {/* خيارات التصويت */}
                    <div className="space-y-4">
                      {poll.options.map((option: any, index: number) => {
                        const percentage = totalVotes > 0 ? (option.votes / totalVotes) * 100 : 0
                        const isUserChoice = userVoteIndex === index

                        return (
                          <div key={index} className="relative">
                            <button
                              onClick={() => !hasVoted && handleVote(poll.id, index)}
                              disabled={hasVoted}
                              className={`w-full text-right p-4 rounded-xl border transition-all duration-300 ${
                                hasVoted
                                  ? isUserChoice
                                    ? "bg-blue-500/20 border-blue-400/50 cursor-default"
                                    : "bg-white/5 border-white/10 cursor-default"
                                  : "bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20 hover:scale-105 cursor-pointer"
                              }`}
                            >
                              <div className="flex justify-between items-center mb-2">
                                <span
                                  className={`font-medium text-lg ${isUserChoice ? "text-blue-300" : "text-white"}`}
                                >
                                  {option.text}
                                  {isUserChoice && <span className="mr-2">👈 اختيارك</span>}
                                </span>
                                <span className="text-slate-400 text-sm">{option.votes} صوت</span>
                              </div>

                              {/* شريط التقدم */}
                              {hasVoted && (
                                <>
                                  <div className="w-full bg-white/10 rounded-full h-3 mb-2">
                                    <div
                                      className={`h-3 rounded-full transition-all duration-1000 ${
                                        isUserChoice
                                          ? "bg-gradient-to-r from-blue-500 to-blue-600"
                                          : "bg-gradient-to-r from-slate-500 to-slate-600"
                                      }`}
                                      style={{ width: `${percentage}%` }}
                                    ></div>
                                  </div>
                                  <div className="text-right text-slate-400 text-sm">{percentage.toFixed(1)}%</div>
                                </>
                              )}

                              {/* رسالة للتصويت */}
                              {!hasVoted && <div className="text-slate-400 text-sm mt-2">انقر للتصويت</div>}
                            </button>
                          </div>
                        )
                      })}
                    </div>

                    {/* معلومات إضافية */}
                    <div className="mt-6 pt-4 border-t border-white/10">
                      <div className="flex justify-between items-center text-sm text-slate-400">
                        <span>إجمالي المشاركين: {totalVotes}</span>
                        {!hasVoted && <span className="text-blue-400 font-medium">اختر خيارك وصوت الآن!</span>}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}

          {/* دعوة للمشاركة */}
          <div className="text-center mt-16">
            <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 backdrop-blur-sm rounded-2xl p-8 border border-blue-400/20">
              <h3 className="text-2xl font-bold text-white mb-4">💡 اقترح تصويت جديد!</h3>
              <p className="text-slate-300 mb-6 max-w-xl mx-auto">
                هل لديك فكرة لتصويت جديد؟ شاركها معنا في Discord وقد نضيفها للموقع!
              </p>
              <a
                href="https://discord.gg/eclora"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-200 hover:scale-105 inline-flex items-center gap-3"
              >
                <img
                  src="https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/discord.svg"
                  alt="Discord"
                  className="w-5 h-5 filter invert"
                />
                انضم للنقاش في Discord
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
