import Link from 'next/link'
import { User } from '@/lib/types/database'
import { UserMenu } from '@/components/auth/UserMenu'
import { Button } from '@/components/ui/Button'

interface HeaderProps {
  user: User | null
}

export function Header({ user }: HeaderProps) {
  return (
    <header 
      className="sticky top-0 z-50 w-full border-b border-white/10 backdrop-blur-xl bg-emerald-950/80"
      style={{
        paddingTop: 'max(env(safe-area-inset-top), 0.75rem)',
        paddingBottom: '0.75rem',
        paddingLeft: 'max(env(safe-area-inset-left), 1rem)',
        paddingRight: 'max(env(safe-area-inset-right), 1rem)',
      }}
    >
      <div className="container mx-auto flex items-center justify-between gap-4">
        {/* Logo */}
        <Link 
          href="/" 
          className="flex items-center text-white hover:opacity-90 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-400 focus-visible:ring-offset-2 focus-visible:ring-offset-emerald-950 rounded-lg p-1"
          aria-label="Ir a inicio"
        >
          <img 
            src="/logo.png" 
            alt="Mi Lista de Deseos" 
            className="h-10 w-10 md:h-12 md:w-12 object-contain"
          />
        </Link>

        {/* Auth Section */}
        <div className="flex items-center gap-3">
          {user ? (
            <UserMenu user={user} />
          ) : (
            <Link href="/login">
              <Button 
                variant="primary" 
                size="md"
                className="min-h-[44px] px-4 py-3 text-[16px] focus-visible:ring-2 focus-visible:ring-green-400 focus-visible:ring-offset-2 focus-visible:ring-offset-emerald-950"
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
