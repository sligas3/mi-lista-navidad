'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Label } from '@/components/ui/Label'
import { Card } from '@/components/ui/Card'

interface WishFormProps {
  nombreUsuario: string
  onSubmit: (deseo: string, prioridad: 1 | 2 | 3) => Promise<void>
}

export default function WishForm({ nombreUsuario, onSubmit }: WishFormProps) {
  const [deseo, setDeseo] = useState('')
  const [prioridad, setPrioridad] = useState<1 | 2 | 3>(2)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [hasUrl, setHasUrl] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!deseo.trim()) {
      setError('Por favor escribe tu deseo')
      return
    }

    setLoading(true)
    setError('')
    try {
      await onSubmit(deseo, prioridad)
      setDeseo('')
      setPrioridad(2)
    } catch (err) {
      setError('Error al agregar el deseo')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="deseo" required className="text-base">
            ✨ Tu deseo navideño
          </Label>
          <Input
            id="deseo"
            value={deseo}
            onChange={(e) => {
              const value = e.target.value
              setDeseo(value)
              setError('')
              setHasUrl(/https?:\/\/[^\s]+/.test(value))
            }}
            placeholder="Ej: Un nuevo libro de aventuras 📚"
            maxLength={200}
            error={error}
          />
          <div className="flex items-center justify-between text-xs">
            <p className="text-white/60">
              {deseo.length}/200 caracteres
            </p>
            {hasUrl && (
              <span className="text-yellow-400 flex items-center gap-1">
                🔗 Link detectado
              </span>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <Label className="text-base">⭐ Prioridad</Label>
          <div className="flex gap-2">
            {[1, 2, 3].map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => setPrioridad(p as 1 | 2 | 3)}
                className={`flex-1 py-3 rounded-lg font-semibold text-sm transition-all ${
                  prioridad === p
                    ? 'bg-yellow-500 text-emerald-950 shadow-lg'
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                {'⭐'.repeat(p)}
              </button>
            ))}
          </div>
        </div>

        <Button
          type="submit"
          variant="primary"
          size="lg"
          className="w-full text-base font-bold shadow-2xl shadow-green-900/60"
          isLoading={loading}
          leftIcon="🎁"
        >
          Agregar Deseo
        </Button>

        <p className="text-xs text-center text-white/60">
          Pidiendo como: <span className="font-semibold text-white">{nombreUsuario}</span>
        </p>
      </form>
    </Card>
  )
}
