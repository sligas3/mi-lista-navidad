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
        leftIcon="🎄"
      >
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
