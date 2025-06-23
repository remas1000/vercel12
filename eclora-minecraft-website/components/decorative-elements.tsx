export function DecorativeElements() {
  return (
    <>
      {/* نقاط تزيينية متحركة */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {/* نقاط صغيرة */}
        <div className="absolute top-20 left-10 w-1 h-1 bg-blue-400/40 rounded-full animate-pulse"></div>
        <div className="absolute top-32 left-20 w-2 h-2 bg-purple-400/30 rounded-full animate-pulse delay-300"></div>
        <div className="absolute top-40 left-5 w-1 h-1 bg-cyan-400/50 rounded-full animate-pulse delay-700"></div>

        <div className="absolute top-24 right-15 w-2 h-2 bg-pink-400/30 rounded-full animate-pulse delay-500"></div>
        <div className="absolute top-36 right-8 w-1 h-1 bg-blue-400/40 rounded-full animate-pulse delay-1000"></div>
        <div className="absolute top-48 right-25 w-2 h-2 bg-purple-400/25 rounded-full animate-pulse delay-200"></div>

        <div className="absolute bottom-20 left-12 w-1 h-1 bg-green-400/40 rounded-full animate-pulse delay-800"></div>
        <div className="absolute bottom-32 left-6 w-2 h-2 bg-yellow-400/30 rounded-full animate-pulse delay-400"></div>
        <div className="absolute bottom-40 left-18 w-1 h-1 bg-red-400/50 rounded-full animate-pulse delay-600"></div>

        <div className="absolute bottom-24 right-10 w-2 h-2 bg-indigo-400/30 rounded-full animate-pulse delay-900"></div>
        <div className="absolute bottom-36 right-20 w-1 h-1 bg-teal-400/40 rounded-full animate-pulse delay-100"></div>
        <div className="absolute bottom-48 right-5 w-2 h-2 bg-orange-400/25 rounded-full animate-pulse delay-1100"></div>

        {/* خطوط تزيينية */}
        <div className="absolute top-1/4 left-0 w-20 h-px bg-gradient-to-r from-transparent via-blue-400/20 to-transparent"></div>
        <div className="absolute top-1/2 right-0 w-16 h-px bg-gradient-to-l from-transparent via-purple-400/20 to-transparent"></div>
        <div className="absolute bottom-1/4 left-0 w-24 h-px bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent"></div>

        {/* نجوم صغيرة */}
        <div className="absolute top-1/3 left-1/3 text-yellow-400/20 text-xs animate-pulse delay-500">✦</div>
        <div className="absolute top-2/3 right-1/3 text-blue-400/20 text-xs animate-pulse delay-700">✦</div>
        <div className="absolute bottom-1/3 left-2/3 text-purple-400/20 text-xs animate-pulse delay-300">✦</div>

        {/* دوائر ضوئية */}
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-blue-400/5 rounded-full blur-2xl animate-float"></div>
        <div
          className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-purple-400/5 rounded-full blur-2xl animate-float"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute top-2/3 left-3/4 w-24 h-24 bg-cyan-400/5 rounded-full blur-2xl animate-float"
          style={{ animationDelay: "4s" }}
        ></div>
      </div>
    </>
  )
}

export function PageDecorations() {
  return (
    <div className="absolute inset-0 pointer-events-none">
      {/* شبكة نقاط خفيفة */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `radial-gradient(circle, #3b82f6 1px, transparent 1px)`,
            backgroundSize: "50px 50px",
          }}
        ></div>
      </div>

      {/* تأثيرات ضوئية */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-96 h-96 bg-gradient-radial from-blue-400/10 to-transparent rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-gradient-radial from-purple-400/10 to-transparent rounded-full blur-3xl"></div>
    </div>
  )
}

export function FloatingShapes() {
  return (
    <>
      {/* عناصر عائمة تزيينية */}
      <div className="absolute top-20 left-10 animate-float">
        <div className="text-4xl opacity-20">⚔️</div>
      </div>
      <div className="absolute top-40 right-20 animate-float" style={{ animationDelay: "2s" }}>
        <div className="text-3xl opacity-20">🏰</div>
      </div>
      <div className="absolute bottom-20 left-20 animate-float" style={{ animationDelay: "4s" }}>
        <div className="text-3xl opacity-20">💎</div>
      </div>
    </>
  )
}
