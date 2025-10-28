'use client'

import { diasHastaNavidad } from '@/lib/utils'
import { useEffect, useState } from 'react'

export default function Footer() {
  const [dias, setDias] = useState<number>(0)

  useEffect(() => {
    setDias(diasHastaNavidad())
  }, [])

  return (
    <footer className="mt-12 text-center pb-8">
      <div className="bg-navidad-rojo/20 backdrop-blur-sm rounded-lg p-6 max-w-md mx-auto border-2 border-navidad-dorado/30">
        <p className="text-navidad-dorado font-navidad text-3xl mb-2">
          🎁 {dias} días 🎁
        </p>
        <p className="text-white/80 text-sm">
          hasta Navidad
        </p>
      </div>
      <p className="text-white/50 text-xs mt-4">
        Hecho con ❤️ y ☕ para esta Navidad
      </p>
    </footer>
  )
}
