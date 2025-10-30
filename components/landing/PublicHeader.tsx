import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { LogIn, UserPlus, LayoutDashboard } from 'lucide-react';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

export default async function PublicHeader() {
  const cookieStore = await cookies();
  
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll() {
          // No-op: cookies are read-only in this context
        },
      },
    }
  );

  let session = null;
  try {
    const { data } = await supabase.auth.getSession();
    session = data.session;
  } catch (error) {
    // Ignorar errores de refresh token
  }
  return (
    <header 
      className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 backdrop-blur-xl bg-emerald-950/80"
      style={{
        paddingTop: 'max(env(safe-area-inset-top), 0.75rem)',
        paddingBottom: '0.75rem',
        paddingLeft: 'max(env(safe-area-inset-left), 1rem)',
        paddingRight: 'max(env(safe-area-inset-right), 1rem)',
      }}
    >
      <div className="container mx-auto max-w-6xl flex items-center justify-between gap-3">
        <Link 
          href="/" 
          className="flex items-center gap-2 text-white hover:opacity-90 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 rounded-lg p-1"
        >
          <img 
            src="/logo.png" 
            alt="Mi Lista de Deseos" 
            className="h-8 w-8 sm:h-10 sm:w-10 object-contain"
          />
          <span className="hidden sm:inline font-semibold text-lg">Mi Lista Navideña</span>
        </Link>

        <div className="flex items-center gap-2 sm:gap-3">
          {session ? (
            <Button
              as="a"
              href="/dashboard"
              variant="primary"
              size="sm"
              className="min-w-[120px]"
            >
              <LayoutDashboard className="w-4 h-4 sm:mr-1.5" />
              <span>Ir al panel</span>
            </Button>
          ) : (
            <>
              <Button
                as="a"
                href="/login"
                variant="ghost"
                size="sm"
                className="min-w-[90px]"
              >
                <LogIn className="w-4 h-4 sm:mr-1.5" />
                <span className="hidden sm:inline">Ingresar</span>
              </Button>
              <Button
                as="a"
                href="/register"
                variant="primary"
                size="sm"
                className="min-w-[100px]"
              >
                <UserPlus className="w-4 h-4 sm:mr-1.5" />
                <span className="hidden sm:inline">Crear cuenta</span>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
