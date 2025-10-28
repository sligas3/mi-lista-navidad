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
          <Label htmlFor="deseo" required>
            ✨ Tu deseo navideño
          </Label>
          <Input
            id="deseo"
            value={deseo}
            onChange={(e) => {
              setDeseo(e.target.value)
              setError('')
            }}
            placeholder="Ej: Un nuevo libro de aventuras 📚"
            maxLength={200}
            error={error}
          />
          <p className="text-xs text-zinc-500">
            {deseo.length}/200 caracteres
          </p>
        </div>

        <div className="space-y-2">
          <Label>⭐ Prioridad</Label>
          <div className="flex gap-2">
            {[1, 2, 3].map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => setPrioridad(p as 1 | 2 | 3)}
                className={`flex-1 py-2.5 rounded-lg font-medium text-sm transition-all ${
                  prioridad === p
                    ? 'bg-primary text-white shadow-sm'
                    : 'bg-zinc-100 text-zinc-700 hover:bg-zinc-200'
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
          className="w-full"
          isLoading={loading}
          leftIcon="🎁"
        >
          Agregar Deseo
        </Button>

        <p className="text-xs text-center text-zinc-500">
          Pidiendo como: <span className="font-semibold text-zinc-700">{nombreUsuario}</span>
        </p>
      </form>
    </Card>
  )
}
