'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase-browser'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Label } from '@/components/ui/Label'
import { Separator } from '@/components/ui/Separator'
import { PasswordField } from './PasswordField'
import { useRouter } from 'next/navigation'
import { formatDisplayName } from '@/lib/formatName'

type AuthMode = 'login' | 'register'

export function AuthPanel() {
  const [mode, setMode] = useState<AuthMode>('login')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [displayName, setDisplayName] = useState('')
  const [emailValid, setEmailValid] = useState(true)
  
  const supabase = createClient()
  const router = useRouter()

  const validateEmail = (email: string) => {
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    setEmailValid(valid || email === '')
    return valid
  }

  async function handleGoogleLogin() {
    setLoading(true)
    setError(null)
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    })
    if (error) {
      setError('Error al conectar con Google. Intenta de nuevo.')
      setLoading(false)
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    
    if (!validateEmail(email)) {
      setError('Por favor ingresa un email válido')
      return
    }

    setLoading(true)
    setError(null)

    if (mode === 'register') {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { display_name: displayName.toLowerCase().trim() },
        },
      })
      if (error) {
        setError(error.message === 'User already registered' 
          ? 'Este email ya está registrado. Intenta iniciar sesión.'
          : 'Error al crear cuenta. Verifica tus datos.')
      } else {
        setError('¡Revisa tu email para confirmar tu cuenta! 📧')
      }
    } else {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      
      if (error) {
        setError('Email o contraseña incorrectos. ¿Olvidaste tu contraseña?')
      } else {
        const returnUrl = new URLSearchParams(window.location.search).get('returnUrl') || '/'
        window.location.href = returnUrl
      }
    }
    setLoading(false)
  }

  const isLogin = mode === 'login'

  return (
    <div 
      className="w-full max-w-md mx-auto transition-all duration-300 motion-reduce:transition-none"
      data-state="open"
    >
      {/* Tabs */}
      <div className="flex gap-2 mb-6 bg-white/5 p-1 rounded-xl">
        <button
          type="button"
          onClick={() => { setMode('login'); setError(null) }}
          className={`flex-1 py-3 px-4 rounded-lg font-semibold text-base transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400 ${
            isLogin
              ? 'bg-white/20 text-white shadow-lg'
              : 'text-white/70 hover:text-white hover:bg-white/10'
          }`}
        >
          Iniciar sesión
        </button>
        <button
          type="button"
          onClick={() => { setMode('register'); setError(null) }}
          className={`flex-1 py-3 px-4 rounded-lg font-semibold text-base transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400 ${
            !isLogin
              ? 'bg-white/20 text-white shadow-lg'
              : 'text-white/70 hover:text-white hover:bg-white/10'
          }`}
        >
          Crear cuenta
        </button>
      </div>

      {/* Google Button */}
      <Button
        onClick={handleGoogleLogin}
        disabled={loading}
        variant="secondary"
        size="lg"
        className="w-full mb-4"
      >
        <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
        </svg>
        Continuar con Google
      </Button>

      <Separator label="o" />

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {!isLogin && (
          <div className="space-y-2">
            <Label htmlFor="displayName">Nombre</Label>
            <Input
              id="displayName"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              placeholder="Tu nombre"
              required
            />
          </div>
        )}

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
              validateEmail(e.target.value)
            }}
            placeholder="tu@email.com"
            required
            error={!emailValid ? 'Email inválido' : undefined}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Contraseña</Label>
          <PasswordField
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            minLength={6}
            showStrength={!isLogin}
          />
          {isLogin && (
            <p className="text-xs text-white/60">Mínimo 6 caracteres</p>
          )}
        </div>

        <Button
          type="submit"
          disabled={loading}
          variant="primary"
          size="lg"
          className="w-full"
          isLoading={loading}
          aria-busy={loading}
        >
          {isLogin ? 'Ingresar' : 'Crear cuenta'}
        </Button>
      </form>

      {/* Microcopy */}
      <p className="text-center text-sm text-white/70 mt-4">
        {isLogin ? (
          <>¿No tienes cuenta? <button type="button" onClick={() => setMode('register')} className="text-yellow-400 hover:underline font-semibold">Créala aquí</button></>
        ) : (
          <>Usa tu correo para crear tu lista 🎁</>
        )}
      </p>

      {/* Error/Success */}
      {error && (
        <div
          className={`mt-4 p-4 rounded-lg text-sm ${
            error.includes('Revisa') || error.includes('📧')
              ? 'bg-green-500/20 text-green-300 border border-green-500/30'
              : 'bg-red-500/20 text-red-300 border border-red-500/30'
          }`}
          role="alert"
        >
          {error}
        </div>
      )}
    </div>
  )
}
