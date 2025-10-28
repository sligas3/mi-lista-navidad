'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase-browser'
import { User } from '@/lib/types/database'
import { Button } from '@/components/ui/Button'
import { useRouter } from 'next/navigation'

interface UserMenuProps {
  user: User
}

export function UserMenu({ user }: UserMenuProps) {
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)
  const supabase = createClient()
  const router = useRouter()

  async function handleLogout() {
    setLoading(true)
    await supabase.auth.signOut()
    router.refresh()
  }

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
      >
        {user.avatar_url ? (
          <img
            src={user.avatar_url}
            alt={user.display_name || 'Avatar'}
            className="w-8 h-8 rounded-full"
          />
        ) : (
          <div className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center text-white font-bold">
            {(user.display_name || user.email || 'U')[0].toUpperCase()}
          </div>
        )}
        <span className="text-white text-sm font-medium hidden md:block">
          {user.display_name || user.email}
        </span>
      </button>

      {open && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setOpen(false)}
          />
          <div className="absolute right-0 mt-2 w-56 bg-white/10 backdrop-blur-xl rounded-lg border border-white/20 shadow-xl z-20 p-2">
            <div className="px-3 py-2 border-b border-white/20 mb-2">
              <p className="text-white font-semibold text-sm">
                {user.display_name}
              </p>
              <p className="text-white/60 text-xs">{user.email}</p>
              {user.role === 'admin' && (
                <span className="inline-block mt-1 px-2 py-0.5 bg-yellow-500/20 text-yellow-400 text-xs rounded">
                  Admin
                </span>
              )}
            </div>
            <Button
              onClick={handleLogout}
              disabled={loading}
              variant="ghost"
              size="sm"
              className="w-full justify-start"
            >
              🚪 Cerrar sesión
            </Button>
          </div>
        </>
      )}
    </div>
  )
}
