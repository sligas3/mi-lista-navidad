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

        {/* Auth Section */}
        <div className="flex items-center gap-1.5 sm:gap-3">
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
