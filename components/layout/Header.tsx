'use client'

import { useState } from 'react'
import Link from 'next/link'
import { User } from '@/lib/types/database'
import { Button } from '@/components/ui/Button'
import { CookieLoader } from '@/components/ui/CookieLoader'
import { Menu, X, Link as LinkIcon, BarChart3, Download, LogOut, Users, Copy, Check, User as UserIcon } from 'lucide-react'
import { createClient } from '@/lib/supabase-browser'
import { useRouter } from 'next/navigation'
import { getChristmasAvatar, getAvatarColor } from '@/lib/avatars'
import { formatDisplayName } from '@/lib/formatName'
import { motion, AnimatePresence } from 'framer-motion'

interface HeaderProps {
  user: User | null
  onShare?: () => void
  onStats?: () => void
  onExport?: () => void
  showStats?: boolean
}

export function Header({ user, onShare, onStats, onExport, showStats }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [copied, setCopied] = useState(false)
  const [loading, setLoading] = useState(false)
  const supabase = createClient()
  const router = useRouter()

  const handleShare = () => {
    window.dispatchEvent(new Event('header:share'))
    setMenuOpen(false)
  }

  const handleExport = () => {
    window.dispatchEvent(new Event('header:export'))
    setMenuOpen(false)
  }

  const handleStats = () => {
    window.dispatchEvent(new Event('header:stats'))
    setMenuOpen(false)
  }

  const handleCopyFamilyCode = () => {
    if (user?.family_code) {
      navigator.clipboard.writeText(user.family_code)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const handleLogout = async () => {
    setLoading(true)
    await supabase.auth.signOut()
    router.push('/')
    router.refresh()
    // No quitamos loading para mantener loader durante navegación
  }
  return (
    <>
      {loading && <CookieLoader message="Cerrando sesión..." />}
      <header 
        className="sticky top-0 z-50 w-full border-b border-white/10 backdrop-blur-xl bg-emerald-950/80"
        style={{
          paddingTop: 'max(env(safe-area-inset-top), 0.5rem)',
          paddingBottom: '0.5rem',
          paddingLeft: 'max(env(safe-area-inset-left), 0.75rem)',
          paddingRight: 'max(env(safe-area-inset-right), 0.75rem)',
        }}
      >
        <div className="container mx-auto flex items-center justify-between">
          {/* Desktop Actions - Hidden on mobile */}
          {user && (
            <div className="hidden md:flex items-center gap-2">
              <button
                onClick={handleShare}
                className="p-2 rounded-lg hover:bg-white/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-400"
                aria-label="Compartir"
              >
                <LinkIcon className="w-5 h-5 text-white" />
              </button>
              <button
                onClick={handleExport}
                className="p-2 rounded-lg hover:bg-white/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-400"
                aria-label="Exportar"
              >
                <Download className="w-5 h-5 text-white" />
              </button>
              <button
                onClick={handleStats}
                className={`p-2 rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-400 ${
                  showStats ? 'bg-white/20' : 'hover:bg-white/10'
                }`}
                aria-label="Estadísticas"
              >
                <BarChart3 className="w-5 h-5 text-white" />
              </button>
            </div>
          )}

          {/* Right side */}
          <div className="flex items-center gap-2">
            {/* Family Code - Desktop only */}
            {user?.family_code && (
              <button
                onClick={handleCopyFamilyCode}
                className="hidden md:flex items-center gap-2 px-3 py-2 rounded-lg bg-blue-600/80 hover:bg-blue-600 border border-blue-500/50 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
                aria-label="Copiar código de familia"
              >
                <Users className="w-4 h-4 text-white" />
                <span className="text-xs font-mono text-white font-semibold">
                  {user.family_code}
                </span>
                {copied ? (
                  <Check className="w-3.5 h-3.5 text-white" />
                ) : (
                  <Copy className="w-3.5 h-3.5 text-white/70" />
                )}
              </button>
            )}

            {/* User Avatar - Desktop only */}
            {user && (
              <div className="hidden md:flex items-center gap-2 px-3 py-2 rounded-lg bg-emerald-600/80 border border-emerald-500/50">
                <div className={`w-8 h-8 rounded-full ${getAvatarColor(user.email)} flex items-center justify-center ring-2 ring-white/30`}>
                  {(() => {
                    const AvatarIcon = getChristmasAvatar(user.email)
                    return <AvatarIcon className="w-4 h-4 text-white" />
                  })()}
                </div>
                <span className="text-white text-sm font-semibold">
                  {user.display_name ? formatDisplayName(user.display_name) : 'Usuario'}
                </span>
              </div>
            )}

            {/* Logout - Desktop only */}
            {user && (
              <button
                onClick={handleLogout}
                disabled={loading}
                className="hidden md:flex items-center gap-2 px-3 py-2 rounded-lg bg-red-600/20 hover:bg-red-600/30 border border-red-500/30 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400"
                aria-label="Cerrar sesión"
              >
                <LogOut className="w-4 h-4 text-red-400" />
                <span className="text-red-300 text-sm">Salir</span>
              </button>
            )}

            {/* Hamburger Menu - Mobile only */}
            {user ? (
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="md:hidden p-2 rounded-lg hover:bg-white/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-400"
                aria-label="Menú"
              >
                {menuOpen ? <X className="w-6 h-6 text-white" /> : <Menu className="w-6 h-6 text-white" />}
              </button>
            ) : (
              <Link href="/login">
                <Button variant="primary" size="md">
                  Ingresar
                </Button>
              </Link>
            )}
          </div>
        </div>
      </header>

      {/* Menu Dropdown */}
      <AnimatePresence>
        {menuOpen && user && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed top-[60px] left-0 right-0 z-[70] bg-emerald-950/95 backdrop-blur-xl border-b border-white/10 shadow-xl"
          >
            <div className="container mx-auto p-4 space-y-3">
              {/* User Info */}
              <div className="flex items-center gap-3 pb-3 border-b border-white/10">
                <div className={`w-12 h-12 rounded-full ${getAvatarColor(user.email)} flex items-center justify-center ring-2 ring-white/30`}>
                  {(() => {
                    const AvatarIcon = getChristmasAvatar(user.email)
                    return <AvatarIcon className="w-6 h-6 text-white" />
                  })()}
                </div>
                <div>
                  <p className="text-white font-semibold">
                    {user.display_name ? formatDisplayName(user.display_name) : 'Usuario'}
                  </p>
                  {user.role === 'admin' && (
                    <span className="text-xs text-yellow-300">Admin</span>
                  )}
                </div>
              </div>

              {/* Family Code */}
              {user.family_code && (
                <button
                  onClick={handleCopyFamilyCode}
                  className="w-full flex items-center justify-between p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-blue-400" />
                    <span className="text-white text-sm">Código de Familia</span>
                    <span className="text-blue-400 font-mono text-sm font-semibold">{user.family_code}</span>
                  </div>
                  {copied ? <Check className="w-5 h-5 text-green-400" /> : <Copy className="w-5 h-5 text-white/60" />}
                </button>
              )}

              {/* Menu Items */}
              <button
                onClick={handleShare}
                className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-white/10 transition-colors text-left"
              >
                <LinkIcon className="w-5 h-5 text-white/80" />
                <span className="text-white">Compartir</span>
              </button>

              <button
                onClick={handleExport}
                className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-white/10 transition-colors text-left"
              >
                <Download className="w-5 h-5 text-white/80" />
                <span className="text-white">Exportar</span>
              </button>

              <button
                onClick={handleStats}
                className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-white/10 transition-colors text-left"
              >
                <BarChart3 className="w-5 h-5 text-white/80" />
                <span className="text-white">Estadísticas</span>
              </button>

              {/* Logout */}
              <button
                onClick={handleLogout}
                disabled={loading}
                className="w-full flex items-center gap-3 p-3 rounded-lg bg-red-600/20 hover:bg-red-600/30 transition-colors text-left border border-red-500/30 disabled:opacity-50"
              >
                <LogOut className="w-5 h-5 text-red-400" />
                <span className="text-red-300">Cerrar Sesión</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
