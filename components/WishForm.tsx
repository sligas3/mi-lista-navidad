'use client'

import { useState } from 'react'

interface WishFormProps {
  nombreUsuario: string
  onSubmit: (deseo: string, prioridad: 1 | 2 | 3) => Promise<void>
}

export default function WishForm({ nombreUsuario, onSubmit }: WishFormProps) {
  const [deseo, setDeseo] = useState('')
  const [prioridad, setPrioridad] = useState<1 | 2 | 3>(2)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!deseo.trim()) return

    setLoading(true)
    try {
      await onSubmit(deseo, prioridad)
      setDeseo('')
      setPrioridad(2)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white/10 backdrop-blur-md rounded-xl p-6 shadow-xl border border-navidad-dorado/20">
      <div className="mb-4">
        <label className="block text-white/90 text-sm font-medium mb-2">
          ✨ Tu deseo navideño
        </label>
        <input
          type="text"
          value={deseo}
          onChange={(e) => setDeseo(e.target.value)}
          placeholder="Ej: Un nuevo libro de aventuras 📚"
          className="w-full px-4 py-3 rounded-lg bg-white/90 text-navidad-oscuro placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-navidad-dorado"
          maxLength={200}
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-white/90 text-sm font-medium mb-2">
          ⭐ Prioridad
        </label>
        <div className="flex gap-2">
          {[1, 2, 3].map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => setPrioridad(p as 1 | 2 | 3)}
              className={`flex-1 py-2 rounded-lg font-medium transition-all ${
                prioridad === p
                  ? 'bg-navidad-dorado text-navidad-oscuro scale-105'
                  : 'bg-white/20 text-white hover:bg-white/30'
              }`}
            >
              {'⭐'.repeat(p)}
            </button>
          ))}
        </div>
      </div>

      <button
        type="submit"
        disabled={loading || !deseo.trim()}
        className="w-full bg-navidad-rojo hover:bg-navidad-rojo/90 disabled:bg-gray-500 disabled:cursor-not-allowed text-white font-bold py-3 rounded-lg transition-all transform hover:scale-105 active:scale-95"
      >
        {loading ? '🎁 Agregando...' : '🎁 Agregar Deseo'}
      </button>

      <p className="text-white/60 text-xs mt-3 text-center">
        Pidiendo como: <span className="font-bold text-navidad-dorado">{nombreUsuario}</span>
      </p>
    </form>
  )
}
