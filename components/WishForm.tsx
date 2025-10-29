'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Label } from '@/components/ui/Label'
import { Card } from '@/components/ui/Card'
import { User } from '@/lib/types/database'
import Link from 'next/link'

interface WishFormProps {
  nombreUsuario: string
  onSubmit: (deseo: string, prioridad: 1 | 2 | 3) => Promise<void>
  user?: User | null
}

export default function WishForm({ nombreUsuario, onSubmit, user }: WishFormProps) {
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
            placeholder="Ej: Un nuevo libro de aventuras 📚 o https://..."
            maxLength={2048}
            error={error}
            className="break-all"
          />
          <div className="flex items-center justify-between text-xs">
            <p className="text-white/60">
              {deseo.length}/2048 caracteres
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
                className={`flex-1 min-h-[44px] py-3 px-4 rounded-lg font-semibold text-base transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400 ${
                  prioridad === p
                    ? 'bg-yellow-500 text-emerald-950 shadow-lg'
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
                aria-label={`Prioridad ${p} estrella${p > 1 ? 's' : ''}`}
              >
                {'⭐'.repeat(p)}
              </button>
            ))}
          </div>
        </div>

        {user ? (
          <>
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
              Pidiendo como: <span className="font-semibold text-white">{user.display_name || user.email}</span>
            </p>
          </>
        ) : (
          <div className="space-y-3">
            <p className="text-sm text-center text-white/80">
              Inicia sesión para crear deseos
            </p>
            <Link href="/login?returnUrl=/" className="block">
              <Button
                type="button"
                variant="primary"
                size="lg"
                className="w-full text-base font-bold"
                leftIcon="🎄"
              >
                Ingresar
              </Button>
            </Link>
          </div>
        )}
      </form>
    </Card>
  )
}
