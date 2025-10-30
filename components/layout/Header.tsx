'use client'

import Link from 'next/link'
import { User } from '@/lib/types/database'
import { UserMenu } from '@/components/auth/UserMenu'
import { Button } from '@/components/ui/Button'
import { Link as LinkIcon, BarChart3, Download } from 'lucide-react'

interface HeaderProps {
  user: User | null
  onShare?: () => void
  onStats?: () => void
  onExport?: () => void
  showStats?: boolean
}

export function Header({ user, onShare, onStats, onExport, showStats }: HeaderProps) {
  const handleShare = () => {
    if (onShare) {
      onShare()
    } else {
      window.dispatchEvent(new Event('header:share'))
    }
  }

  const handleExport = () => {
    if (onExport) {
      onExport()
    } else {
      window.dispatchEvent(new Event('header:export'))
    }
  }

  const handleStats = () => {
    if (onStats) {
      onStats()
    } else {
      window.dispatchEvent(new Event('header:stats'))
    }
  }
  return (
    <header 
      className="sticky top-0 z-50 w-full border-b border-white/10 backdrop-blur-xl bg-emerald-950/80"
      style={{
        paddingTop: 'max(env(safe-area-inset-top), 0.5rem)',
        paddingBottom: '0.5rem',
        paddingLeft: 'max(env(safe-area-inset-left), 0.75rem)',
        paddingRight: 'max(env(safe-area-inset-right), 0.75rem)',
      }}
    >
      <div className="container mx-auto flex items-center justify-between gap-2 sm:gap-4">
        {/* Logo */}
        <Link 
          href="/dashboard" 
          className="flex items-center text-white hover:opacity-90 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-400 focus-visible:ring-offset-2 focus-visible:ring-offset-emerald-950 rounded-lg p-0.5 sm:p-1"
          aria-label="Ir al panel"
        >
          <img 
            src="/logo.png" 
            alt="Mi Lista de Deseos" 
            className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 object-contain"
          />
        </Link>

        {/* Actions & Auth Section */}
        <div className="flex items-center gap-1 sm:gap-2">
          {user && (
            <>
              <Button
                onClick={handleShare}
                variant="ghost"
                size="sm"
                className="min-w-[36px] h-[36px] sm:h-[40px] p-0 sm:px-3 sm:gap-1.5"
                aria-label="Compartir"
              >
                <LinkIcon className="w-4 h-4" />
                <span className="hidden sm:inline text-sm">Compartir</span>
              </Button>
              <Button
                onClick={handleExport}
                variant="ghost"
                size="sm"
                className="min-w-[36px] h-[36px] sm:h-[40px] p-0 sm:px-3 sm:gap-1.5"
                aria-label="Exportar"
              >
                <Download className="w-4 h-4" />
                <span className="hidden sm:inline text-sm">Exportar</span>
              </Button>
              <Button
                onClick={handleStats}
                variant={showStats ? 'secondary' : 'ghost'}
                size="sm"
                className="min-w-[36px] h-[36px] sm:h-[40px] p-0 sm:px-3 sm:gap-1.5"
                aria-label="Estadísticas"
              >
                <BarChart3 className="w-4 h-4" />
                <span className="hidden sm:inline text-sm">Stats</span>
              </Button>
              <div className="w-px h-6 bg-white/20 mx-1" />
            </>
          )}
          {user ? (
            <UserMenu user={user} />
          ) : (
            <Link href="/login">
              <Button 
                variant="primary" 
                size="md"
                className="focus-visible:ring-2 focus-visible:ring-green-400 focus-visible:ring-offset-2 focus-visible:ring-offset-emerald-950"
              >
                Ingresar
              </Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  )
}
