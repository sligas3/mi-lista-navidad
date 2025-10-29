import { createClient } from '@/lib/supabase-server'
import { redirect } from 'next/navigation'
import { AuthPanel } from '@/components/auth/AuthPanel'
import BackgroundFX from '@/components/ui/BackgroundFX'

export default async function LoginPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (user) {
    redirect('/')
  }

  return (
    <>
      <BackgroundFX />
      <main className="min-h-screen flex items-center justify-center p-4 pt-24">
        <div className="w-full max-w-md">
          <div className="text-center mb-8 animate-in">
            <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-3">
              🎄 Bienvenido
            </h1>
            <p className="text-white/80 text-base">
              Accede a tu lista de deseos navideña
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 md:p-8 border border-white/20 animate-scale-in">
            <AuthPanel />
          </div>
        </div>
      </main>
    </>
  )
}
