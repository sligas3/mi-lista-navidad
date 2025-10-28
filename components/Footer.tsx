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
      <div className="bg-white rounded-lg border border-zinc-200 p-6 max-w-md mx-auto shadow-sm">
        <p className="font-display text-3xl font-bold text-primary mb-1">
          🎁 {dias} días 🎁
        </p>
        <p className="text-zinc-600 text-sm">
          hasta Navidad
        </p>
      </div>
      <p className="text-zinc-500 text-xs mt-6">
        Hecho con ❤️ para esta Navidad
      </p>
    </footer>
  )
}
