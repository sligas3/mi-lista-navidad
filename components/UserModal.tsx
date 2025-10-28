'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Label } from '@/components/ui/Label'

interface UserModalProps {
  onSetUser: (nombre: string) => void
}

export default function UserModal({ onSetUser }: UserModalProps) {
  const [nombre, setNombre] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (nombre.trim().length < 2) {
      setError('El nombre debe tener al menos 2 caracteres')
      return
    }
    onSetUser(nombre.trim())
  }

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-in">
      <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 md:p-10 max-w-md w-full shadow-2xl border border-white/20 animate-scale-in">
        <div className="text-center mb-8">
          <div className="text-7xl mb-6 animate-float">🎅</div>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-3 tracking-tight">
            ¡Bienvenido!
          </h2>
          <p className="text-white/80 text-base md:text-lg">
            ¿Cómo te llamas?
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="nombre" required className="text-base">
              Tu nombre
            </Label>
            <Input
              id="nombre"
              value={nombre}
              onChange={(e) => {
                setNombre(e.target.value)
                setError('')
              }}
              placeholder="Escribe tu nombre..."
              autoFocus
              maxLength={30}
              error={error}
            />
          </div>

          <Button
            type="submit"
            variant="primary"
            size="lg"
            className="w-full text-base font-bold shadow-2xl shadow-green-900/60"
            leftIcon="✨"
          >
            Entrar al mundo navideño
          </Button>

          <p className="text-xs text-center text-white/60">
            Tu nombre se guardará localmente en tu navegador
          </p>
        </form>
      </div>
    </div>
  )
}
