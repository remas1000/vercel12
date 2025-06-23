"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function DiscordCallback() {
  const router = useRouter()

  useEffect(() => {
    // إعادة توجيه فورية لصفحة المراجعات مع المعاملات
    const urlParams = new URLSearchParams(window.location.search)
    const code = urlParams.get("code")
    const error = urlParams.get("error")

    if (code || error) {
      router.push(`/reviews?${urlParams.toString()}`)
    } else {
      router.push("/reviews")
    }
  }, [router])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center">
      <div className="text-center">
        <div className="text-6xl mb-4 animate-spin">🔄</div>
        <h2 className="text-2xl font-bold text-white mb-2">جاري المعالجة...</h2>
        <p className="text-slate-300">سيتم توجيهك خلال لحظات</p>
      </div>
    </div>
  )
}
