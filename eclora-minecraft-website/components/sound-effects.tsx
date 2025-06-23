"use client"

import type React from "react"

import { useEffect } from "react"

export function useSoundEffects() {
  useEffect(() => {
    // إنشاء الأصوات
    const createSound = (frequency: number, duration: number, type: OscillatorType = "sine") => {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
      const oscillator = audioContext.createOscillator()
      const gainNode = audioContext.createGain()

      oscillator.connect(gainNode)
      gainNode.connect(audioContext.destination)

      oscillator.frequency.value = frequency
      oscillator.type = type

      gainNode.gain.setValueAtTime(0.1, audioContext.currentTime)
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration)

      oscillator.start(audioContext.currentTime)
      oscillator.stop(audioContext.currentTime + duration)
    }

    // صوت النقر
    const playClickSound = () => {
      createSound(800, 0.1, "square")
    }

    // صوت الهوفر
    const playHoverSound = () => {
      createSound(600, 0.05, "sine")
    }

    // صوت النسخ
    const playCopySound = () => {
      createSound(1000, 0.15, "triangle")
      setTimeout(() => createSound(1200, 0.1, "triangle"), 100)
    }

    // إضافة الأصوات للأزرار
    const addSoundToButtons = () => {
      // أزرار عادية
      document.querySelectorAll("button, a[href]").forEach((element) => {
        element.addEventListener("mouseenter", playHoverSound)
        element.addEventListener("click", playClickSound)
      })

      // أزرار النسخ
      document.querySelectorAll('[data-copy="true"]').forEach((element) => {
        element.addEventListener("click", playCopySound)
      })
    }

    // تشغيل الأصوات بعد تحميل الصفحة
    setTimeout(addSoundToButtons, 1000)

    // إعادة تشغيل عند تغيير الصفحة
    const observer = new MutationObserver(addSoundToButtons)
    observer.observe(document.body, { childList: true, subtree: true })

    return () => observer.disconnect()
  }, [])
}

export function SoundProvider({ children }: { children: React.ReactNode }) {
  useSoundEffects()
  return <>{children}</>
}
