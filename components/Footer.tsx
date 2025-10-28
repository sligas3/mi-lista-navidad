'use client'

import { diasHastaNavidad } from '@/lib/utils'
import { useEffect, useState } from 'react'

export default function Footer() {
  const [dias, setDias] = useState<number>(0)

  useEffect(() => {
    setDias(diasHastaNavidad())
  }, [])

  return (
    <footer className="mt-16 text-center pb-8">
      <div className="bg-white/10 backdrop-blur-md rounded-lg border border-white/20 p-6 max-w-md mx-auto shadow-xl">
        <p className="font-display text-4xl font-bold text-yellow-400 mb-2 tracking-tight">
          🎁 {dias} días 🎁
        </p>
        <p className="text-white/80 text-sm">
          hasta Navidad
        </p>
      </div>
      <p className="text-white/50 text-xs mt-6">
        Hecho con ❤️ para esta Navidad
      </p>
    </footer>
  )
}
