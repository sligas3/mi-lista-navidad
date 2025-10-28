import { createClient } from '@/lib/supabase-server'
import { redirect } from 'next/navigation'
import { AuthButtons } from '@/components/auth/AuthButtons'
import Link from 'next/link'

export default async function RegisterPage() {
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
            🎁 Crear cuenta
          </h1>
          <p className="text-white/70">
            Únete y comparte tus deseos navideños
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 border border-white/20">
          <AuthButtons mode="register" />

          <p className="text-center text-white/60 text-sm mt-6">
            ¿Ya tienes cuenta?{' '}
            <Link href="/login" className="text-yellow-400 hover:text-yellow-300 font-semibold">
              Inicia sesión
            </Link>
          </p>
        </div>
      </div>
    </main>
  )
}
