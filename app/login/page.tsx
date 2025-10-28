import { createClient } from '@/lib/supabase-server'
import { redirect } from 'next/navigation'
import { AuthButtons } from '@/components/auth/AuthButtons'
import Link from 'next/link'

export default async function LoginPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (user) {
    redirect('/')
  }

  return (
    <main className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="font-display text-4xl font-bold text-white mb-2">
            🎄 Bienvenido
          </h1>
          <p className="text-white/70">
            Inicia sesión para ver tus deseos navideños
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 border border-white/20">
          <AuthButtons mode="login" />

          <p className="text-center text-white/60 text-sm mt-6">
            ¿No tienes cuenta?{' '}
            <Link href="/register" className="text-yellow-400 hover:text-yellow-300 font-semibold">
              Regístrate
            </Link>
          </p>
        </div>
      </div>
    </main>
  )
}
