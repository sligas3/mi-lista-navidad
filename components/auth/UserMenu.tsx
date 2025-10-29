'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase-browser'
import { User } from '@/lib/types/database'
import { Button } from '@/components/ui/Button'
import { useRouter } from 'next/navigation'
import { Toast } from '@/components/ui/Toast'
import { getChristmasAvatar, getAvatarColor } from '@/lib/avatars'
import { formatDisplayName } from '@/lib/formatName'

interface UserMenuProps {
  user: User
}

export function UserMenu({ user }: UserMenuProps) {
  const [loading, setLoading] = useState(false)
  const [showToast, setShowToast] = useState(false)
  const supabase = createClient()
  const router = useRouter()

  async function handleLogout() {
    setLoading(true)
    await supabase.auth.signOut()
    setShowToast(true)
    setTimeout(() => {
      router.push('/')
      router.refresh()
    }, 500)
  }

  return (
    <div className="flex items-center gap-2">
      {/* Avatar + Nombre */}
      <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/10">
        <div className={`w-8 h-8 rounded-full ${getAvatarColor(user.email)} flex items-center justify-center`}>
          {(() => {
            const AvatarIcon = getChristmasAvatar(user.email)
            return <AvatarIcon className="w-5 h-5 text-white" />
          })()}
        </div>
        <div className="hidden sm:block">
          <p className="text-white text-sm font-medium leading-tight">
            {user.display_name ? formatDisplayName(user.display_name) : 'Usuario'}
          </p>
          {user.role === 'admin' && (
            <span className="text-xs text-yellow-400">Admin</span>
          )}
        </div>
      </div>

      {/* Botón Logout visible */}
      <Button
        onClick={handleLogout}
        disabled={loading}
        variant="outline"
        size="md"
        className="min-h-[44px] px-4 py-3 text-[16px] focus-visible:ring-2 focus-visible:ring-green-400 focus-visible:ring-offset-2 focus-visible:ring-offset-emerald-950"
        aria-label="Cerrar sesión"
        isLoading={loading}
      >
        Salir
      </Button>
      
      {showToast && (
        <Toast
          message="Sesión cerrada correctamente"
          variant="success"
          onClose={() => setShowToast(false)}
        />
      )}
    </div>
  )
}
