'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase-browser'
import { User } from '@/lib/types/database'
import { Button } from '@/components/ui/Button'
import { useRouter } from 'next/navigation'
import { Toast } from '@/components/ui/Toast'
import { getChristmasAvatar, getAvatarColor } from '@/lib/avatars'
import { formatDisplayName } from '@/lib/formatName'
import { Users, Copy, Check } from 'lucide-react'

interface UserMenuProps {
  user: User
}

export function UserMenu({ user }: UserMenuProps) {
  const [loading, setLoading] = useState(false)
  const [showToast, setShowToast] = useState(false)
  const [copied, setCopied] = useState(false)
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

  const handleCopyFamilyCode = () => {
    if (user.family_code) {
      navigator.clipboard.writeText(user.family_code)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <div className="flex items-center gap-1.5 sm:gap-2">
      {/* Código de Familia */}
      {user.family_code && (
        <button
          onClick={handleCopyFamilyCode}
          className="group relative px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-lg bg-blue-600/80 hover:bg-blue-600 border border-blue-500/50 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:ring-offset-emerald-950"
          aria-label="Copiar código de familia"
        >
          <div className="flex items-center gap-1.5">
            <Users className="w-4 h-4 text-white" />
            <span className="hidden sm:inline text-xs font-mono text-white font-semibold">
              {user.family_code}
            </span>
            {copied ? (
              <Check className="w-3.5 h-3.5 text-white" />
            ) : (
              <Copy className="w-3.5 h-3.5 text-white/70 group-hover:text-white transition-colors" />
            )}
          </div>
          {/* Tooltip */}
          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            {copied ? 'Copiado!' : 'Copiar código de familia'}
          </div>
        </button>
      )}

      {/* Avatar + Nombre */}
      <div className="flex items-center gap-2 sm:gap-2.5 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-lg bg-emerald-600/80 border border-emerald-500/50">
        <div className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full ${getAvatarColor(user.email)} flex items-center justify-center ring-2 ring-white/30`}>
          {(() => {
            const AvatarIcon = getChristmasAvatar(user.email)
            return <AvatarIcon className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
          })()}
        </div>
        <div className="hidden sm:block">
          <p className="text-white text-sm sm:text-base font-semibold leading-tight">
            {user.display_name ? formatDisplayName(user.display_name) : 'Usuario'}
          </p>
          {user.role === 'admin' && (
            <span className="text-xs text-yellow-300 font-medium">Admin</span>
          )}
        </div>
      </div>

      {/* Botón Logout visible */}
      <Button
        onClick={handleLogout}
        disabled={loading}
        variant="outline"
        size="md"
        className="focus-visible:ring-2 focus-visible:ring-green-400 focus-visible:ring-offset-2 focus-visible:ring-offset-emerald-950"
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
