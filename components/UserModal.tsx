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
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-in">
      <div className="bg-white rounded-xl p-8 max-w-md w-full shadow-2xl">
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">🎅</div>
          <h2 className="font-display text-3xl font-bold text-zinc-900 mb-2">
            ¡Bienvenido!
          </h2>
          <p className="text-zinc-600">
            ¿Cómo te llamas?
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="nombre" required>
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
            className="w-full"
            leftIcon="✨"
          >
            Entrar
          </Button>

          <p className="text-xs text-center text-zinc-500">
            Tu nombre se guardará localmente en tu navegador
          </p>
        </form>
      </div>
    </div>
  )
}
