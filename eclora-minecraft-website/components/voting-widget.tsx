"use client"

import { useState, useEffect } from "react"
import Link from "next/link"

export default function VotingWidget() {
  const [currentPoll, setCurrentPoll] = useState<any>(null)
  const [userVotes, setUserVotes] = useState<{ [key: string]: string }>({})

  useEffect(() => {
    loadCurrentPoll()
    loadUserVotes()
  }, [])

  const loadCurrentPoll = () => {
    const savedPolls = localStorage.getItem("eclora-public-polls")
    if (savedPolls) {
      const polls = JSON.parse(savedPolls)
      const activePolls = polls.filter((poll: any) => poll.status === "نشط")
      if (activePolls.length > 0) {
        // أخذ أحدث تصويت
        setCurrentPoll(activePolls[activePolls.length - 1])
      }
    }
  }

  const loadUserVotes = () => {
    const savedVotes = localStorage.getItem("eclora-user-votes")
    if (savedVotes) {
      setUserVotes(JSON.parse(savedVotes))
    }
  }

  const handleQuickVote = (optionIndex: number) => {
    if (!currentPoll) return

    // التحقق من أن المستخدم لم يصوت من قبل
    if (userVotes[currentPoll.id]) {
      alert("لقد صوتت في هذا التصويت من قبل!")
      return
    }

    // تحديث الأصوات
    const updatedOptions = currentPoll.options.map((option: any, index: number) => {
      if (index === optionIndex) {
        return { ...option, votes: option.votes + 1 }
      }
      return option
    })

    const updatedPoll = { ...currentPoll, options: updatedOptions }
    setCurrentPoll(updatedPoll)

    // حفظ صوت المستخدم
    const newUserVotes = { ...userVotes, [currentPoll.id]: optionIndex.toString() }
    setUserVotes(newUserVotes)
    localStorage.setItem("eclora-user-votes", JSON.stringify(newUserVotes))

    // حفظ التصويتات المحدثة
    const allPolls = JSON.parse(localStorage.getItem("eclora-public-polls") || "[]")
    const updatedAllPolls = allPolls.map((poll: any) => {
      if (poll.id === currentPoll.id) {
        return updatedPoll
      }
      return poll
    })
    localStorage.setItem("eclora-public-polls", JSON.stringify(updatedAllPolls))

    alert("تم تسجيل صوتك بنجاح! 🎉")
  }

  if (!currentPoll) {
    return null
  }

  const totalVotes = currentPoll.options.reduce((sum: number, option: any) => sum + option.votes, 0)
  const hasVoted = userVotes[currentPoll.id] !== undefined

  return (
    <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 backdrop-blur-sm rounded-2xl p-6 border border-blue-400/20 relative overflow-hidden">
      {/* تأثير خلفي */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 animate-pulse"></div>

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <span className="text-2xl animate-bounce">🗳️</span>
            تصويت جديد!
          </h3>
          <span className="bg-red-500/20 text-red-400 px-3 py-1 rounded-full text-sm border border-red-500/30 animate-pulse">
            🔥 نشط الآن
          </span>
        </div>

        <h4 className="text-lg font-semibold text-blue-300 mb-4">{currentPoll.title}</h4>

        {!hasVoted ? (
          <div className="space-y-3 mb-4">
            {currentPoll.options.slice(0, 2).map((option: any, index: number) => (
              <button
                key={index}
                onClick={() => handleQuickVote(index)}
                className="w-full text-right p-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 hover:border-white/20 transition-all duration-300 hover:scale-105 text-white font-medium"
              >
                {option.text}
              </button>
            ))}
            {currentPoll.options.length > 2 && (
              <p className="text-slate-400 text-sm text-center">+{currentPoll.options.length - 2} خيارات أخرى</p>
            )}
          </div>
        ) : (
          <div className="mb-4">
            <div className="bg-green-500/20 border border-green-500/30 rounded-xl p-3 text-center">
              <span className="text-green-400 font-medium">✅ شكراً لمشاركتك!</span>
            </div>
          </div>
        )}

        <div className="flex justify-between items-center">
          <span className="text-slate-400 text-sm flex items-center gap-1">
            <span>👥</span>
            {totalVotes} صوت
          </span>
          <Link
            href="/voting"
            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-400 hover:to-purple-500 text-white px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-200 hover:scale-105"
          >
            عرض التفاصيل
          </Link>
        </div>
      </div>
    </div>
  )
}
