'use client'

import { useEffect, useState } from 'react'
import { Gift } from 'lucide-react'

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

const getChristmasDate = () => {
  const now = new Date()
  const year = now.getFullYear()
  const christmas = new Date(year, 11, 25, 0, 0, 0)
  if (now > christmas) {
    return new Date(year + 1, 11, 25, 0, 0, 0)
  }
  return christmas
}

const calculateTimeLeft = (): TimeLeft => {
  const target = getChristmasDate()
  const diff = target.getTime() - Date.now()

  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 }
  }

  const days = Math.floor(diff / 86400000)
  const hours = Math.floor((diff % 86400000) / 3600000)
  const minutes = Math.floor((diff % 3600000) / 60000)
  const seconds = Math.floor((diff % 60000) / 1000)

  return { days, hours, minutes, seconds }
}

export function ChristmasCountdownClient() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft())
  const [showFull, setShowFull] = useState(timeLeft.days <= 10)
  const [shouldAnimate, setShouldAnimate] = useState(false)

  useEffect(() => {
    setShouldAnimate(window.matchMedia('(prefers-reduced-motion: no-preference)').matches)

    const tick = () => {
      const newTimeLeft = calculateTimeLeft()
      setTimeLeft(newTimeLeft)
      setShowFull(newTimeLeft.days <= 10)
    }

    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])

  const transitionClass = shouldAnimate ? 'transition-all duration-300 ease-out' : ''

  return (
    <div 
      className="fixed top-16 left-1/2 -translate-x-1/2 z-[60] w-[95%] max-w-sm"
      aria-live="polite"
      aria-atomic="true"
      style={{ pointerEvents: 'none' }}
    >
      <div className="bg-white/10 backdrop-blur-md rounded-lg border border-white/20 px-3 py-2 shadow-xl mt-2" style={{ pointerEvents: 'auto' }}>
        <div className={`flex items-center justify-center gap-2 ${transitionClass}`}>
          <Gift className="w-5 h-5 text-yellow-400 flex-shrink-0" aria-hidden="true" />
          <span className="font-bold text-yellow-400 text-lg tabular-nums">
            {showFull 
              ? `${timeLeft.days}d ${timeLeft.hours}h ${timeLeft.minutes}m ${timeLeft.seconds}s`
              : `${timeLeft.days} días`
            }
          </span>
          <span className="text-white/70 text-xs">hasta Navidad</span>
        </div>
      </div>
    </div>
  )
}
