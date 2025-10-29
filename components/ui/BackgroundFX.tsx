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
  const [yellowOrbs, setYellowOrbs] = useState<Orb[]>([])
  const [redOrbs, setRedOrbs] = useState<Orb[]>([])
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(mediaQuery.matches)

    if (!mediaQuery.matches) {
      // Detectar dispositivo de baja gama
      const isLowEnd = navigator.hardwareConcurrency <= 4 || window.innerWidth < 768
      const orbCount = isLowEnd ? 3 : 6

      const newYellowOrbs = Array.from({ length: orbCount }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: 60 + Math.random() * 100,
        duration: 15 + Math.random() * 10,
        delay: Math.random() * 5,
      }))
      setYellowOrbs(newYellowOrbs)

      const newRedOrbs = Array.from({ length: orbCount }, (_, i) => ({
        id: i + 100,
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: 60 + Math.random() * 100,
        duration: 15 + Math.random() * 10,
        delay: Math.random() * 5,
      }))
      setRedOrbs(newRedOrbs)
    }
  }, [])

  if (reducedMotion) return null

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
      {/* Silueta de árbol de navidad */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[700px] opacity-10 hidden md:block">
        {/* Triángulos del árbol */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[200px] border-r-[200px] border-b-[250px] border-l-transparent border-r-transparent border-b-green-600/40" style={{ filter: 'blur(20px)' }} />
        <div className="absolute bottom-[180px] left-1/2 -translate-x-1/2 w-0 h-0 border-l-[180px] border-r-[180px] border-b-[230px] border-l-transparent border-r-transparent border-b-green-600/40" style={{ filter: 'blur(20px)' }} />
        <div className="absolute bottom-[340px] left-1/2 -translate-x-1/2 w-0 h-0 border-l-[150px] border-r-[150px] border-b-[200px] border-l-transparent border-r-transparent border-b-green-600/40" style={{ filter: 'blur(20px)' }} />
        
        {/* Tronco */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-20 bg-amber-900/30" style={{ filter: 'blur(20px)' }} />
        
        {/* Bolas rojas decorativas */}
        <div className="absolute top-[120px] left-[45%] w-12 h-12 rounded-full bg-red-600/40 animate-pulse" style={{ filter: 'blur(10px)', animationDuration: '3s' }} />
        <div className="absolute top-[200px] right-[35%] w-10 h-10 rounded-full bg-red-500/40 animate-pulse" style={{ filter: 'blur(15px)', animationDuration: '3.5s', animationDelay: '0.5s' }} />
        <div className="absolute top-[280px] left-[40%] w-14 h-14 rounded-full bg-red-600/40 animate-pulse" style={{ filter: 'blur(15px)', animationDuration: '4s', animationDelay: '1s' }} />
        <div className="absolute top-[360px] right-[38%] w-11 h-11 rounded-full bg-red-500/40 animate-pulse" style={{ filter: 'blur(15px)', animationDuration: '3.2s', animationDelay: '1.5s' }} />
        <div className="absolute top-[440px] left-[42%] w-13 h-13 rounded-full bg-red-600/40 animate-pulse" style={{ filter: 'blur(15px)', animationDuration: '3.8s', animationDelay: '0.8s' }} />
        <div className="absolute top-[520px] right-[40%] w-12 h-12 rounded-full bg-red-500/40 animate-pulse" style={{ filter: 'blur(15px)', animationDuration: '3.3s', animationDelay: '1.2s' }} />
        <div className="absolute top-[160px] right-[42%] w-11 h-11 rounded-full bg-red-600/40 animate-pulse" style={{ filter: 'blur(15px)', animationDuration: '3.6s', animationDelay: '0.3s' }} />
        <div className="absolute top-[240px] left-[38%] w-10 h-10 rounded-full bg-red-500/40 animate-pulse" style={{ filter: 'blur(15px)', animationDuration: '3.4s', animationDelay: '1.8s' }} />
        <div className="absolute top-[320px] right-[36%] w-12 h-12 rounded-full bg-red-600/40 animate-pulse" style={{ filter: 'blur(15px)', animationDuration: '3.7s', animationDelay: '0.6s' }} />
        <div className="absolute top-[400px] left-[44%] w-13 h-13 rounded-full bg-red-500/40 animate-pulse" style={{ filter: 'blur(15px)', animationDuration: '3.9s', animationDelay: '1.3s' }} />
        <div className="absolute top-[480px] right-[39%] w-11 h-11 rounded-full bg-red-600/40 animate-pulse" style={{ filter: 'blur(15px)', animationDuration: '3.1s', animationDelay: '0.9s' }} />
      </div>

      {/* Orbes dorados flotantes */}
      {yellowOrbs.map((orb) => (
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

      {/* Orbes rojos flotantes */}
      {redOrbs.map((orb) => (
        <div
          key={orb.id}
          className="orb absolute rounded-full"
          style={{
            left: `${orb.left}%`,
            top: `${orb.top}%`,
            width: `${orb.size}px`,
            height: `${orb.size}px`,
            backgroundColor: 'rgba(225, 29, 72, 0.2)',
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
