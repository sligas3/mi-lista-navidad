'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { AuthModal } from '@/components/auth/AuthModal'
import BackgroundFX from '@/components/ui/BackgroundFX'

export default function LoginPage() {
  const router = useRouter()

  useEffect(() => {
    // Verificar si ya hay sesión
    const checkSession = async () => {
      const { createClient } = await import('@/lib/supabase-browser')
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (user) router.push('/')
    }
    checkSession()
  }, [router])

  return (
    <>
      <BackgroundFX />
      <AuthModal isOpen={true} onClose={() => router.push('/')} />
    </>
  )
}
