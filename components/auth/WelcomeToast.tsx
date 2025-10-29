'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { TreePine } from 'lucide-react'

interface WelcomeToastProps {
  userName?: string | null
}

export function WelcomeToast({ userName }: WelcomeToastProps) {
  const [show, setShow] = useState(false)

  useEffect(() => {
    // Mostrar solo si es una sesión nueva (viene de login)
    const isNewSession = sessionStorage.getItem('new_session')
    if (isNewSession) {
      setShow(true)
      sessionStorage.removeItem('new_session')
      
      const timer = setTimeout(() => setShow(false), 4000)
      return () => clearTimeout(timer)
    }
  }, [])

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-emerald-600/90 backdrop-blur-sm text-white px-6 py-3 rounded-full shadow-lg flex items-center gap-2"
        >
          <TreePine className="w-5 h-5" />
          <span>¡Bienvenido{userName ? `, ${userName}` : ''}!</span>
          <TreePine className="w-5 h-5" />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
