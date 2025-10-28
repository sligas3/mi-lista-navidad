'use client'

import { useEffect, useState } from 'react'

interface Orb {
  id: number
  left: number
  top: number
  size: number
  duration: number
  delay: number
}

export default function BackgroundFX() {
  const [orbs, setOrbs] = useState<Orb[]>([])
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    // Detectar prefers-reduced-motion
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(mediaQuery.matches)

    if (!mediaQuery.matches) {
      // Crear 8 orbes dorados
      const newOrbs = Array.from({ length: 8 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: 60 + Math.random() * 100,
        duration: 15 + Math.random() * 10,
        delay: Math.random() * 5,
      }))
      setOrbs(newOrbs)
    }
  }, [])

  if (reducedMotion) return null

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
      {/* Orbes dorados flotantes */}
      {orbs.map((orb) => (
        <div
          key={orb.id}
          className="orb absolute rounded-full bg-yellow-400/20"
          style={{
            left: `${orb.left}%`,
            top: `${orb.top}%`,
            width: `${orb.size}px`,
            height: `${orb.size}px`,
            animation: `float-orb ${orb.duration}s ease-in-out infinite, pulse-glow ${orb.duration * 0.6}s ease-in-out infinite`,
            animationDelay: `${orb.delay}s`,
            filter: 'blur(20px)',
          }}
        />
      ))}

      {/* Gradiente overlay sutil */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-emerald-950/20 to-emerald-950/40" />
    </div>
  )
}
