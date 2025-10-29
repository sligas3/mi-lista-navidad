'use client'

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { AuthModal } from '@/components/auth/AuthModal'
import BackgroundFX from '@/components/ui/BackgroundFX'

export default function LoginPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [showMessage, setShowMessage] = useState(false)
  const next = searchParams.get('next') || '/'

  useEffect(() => {
    // Mostrar mensaje si fue redirigido
    if (searchParams.get('next')) {
      setShowMessage(true)
      // Auto-dismiss después de 5 segundos
      const timer = setTimeout(() => setShowMessage(false), 5000)
      return () => clearTimeout(timer)
    }
  }, [searchParams])

  useEffect(() => {
    // Verificar si ya hay sesión
    const checkSession = async () => {
      const { createClient } = await import('@/lib/supabase-browser')
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (user) router.push(next)
    }
    checkSession()
  }, [router, next])

  return (
    <>
      <BackgroundFX />
      {showMessage && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-emerald-600/90 backdrop-blur-sm text-white px-6 py-3 rounded-full shadow-lg animate-in fade-in slide-in-from-top-2 duration-300">
          🎄 Inicia sesión para ver tu lista
        </div>
      )}
      <AuthModal isOpen={true} onClose={() => router.push('/')} />
    </>
  )
}
