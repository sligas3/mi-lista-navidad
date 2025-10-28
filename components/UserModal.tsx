'use client'

import { useState } from 'react'

interface UserModalProps {
  onSetUser: (nombre: string) => void
}

export default function UserModal({ onSetUser }: UserModalProps) {
  const [nombre, setNombre] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (nombre.trim().length >= 2) {
      onSetUser(nombre.trim())
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl">
        <div className="text-center mb-6">
          <h2 className="font-navidad text-4xl text-navidad-rojo mb-2">
            🎅 ¡Bienvenido! 🎄
          </h2>
          <p className="text-gray-600">
            ¿Cómo te llamas?
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Tu nombre..."
            className="w-full px-4 py-3 rounded-lg border-2 border-navidad-verde/30 focus:border-navidad-dorado focus:outline-none text-navidad-oscuro"
            autoFocus
            maxLength={30}
            required
          />

          <button
            type="submit"
            disabled={nombre.trim().length < 2}
            className="w-full bg-navidad-rojo hover:bg-navidad-rojo/90 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-bold py-3 rounded-lg transition-all transform hover:scale-105 active:scale-95"
          >
            ✨ Entrar
          </button>
        </form>

        <p className="text-xs text-gray-500 text-center mt-4">
          Tu nombre se guardará localmente en tu navegador
        </p>
      </div>
    </div>
  )
}
