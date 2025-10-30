'use client'

import { Heart } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="mt-16 text-center pb-8">
      <p className="text-white/50 text-xs">
        <span className="inline-flex items-center gap-1">
          Hecho con <Heart className="w-3 h-3 fill-current" /> para esta Navidad
        </span>
      </p>
    </footer>
  )
}
