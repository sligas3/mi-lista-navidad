'use client'

import { useState } from 'react'
import { BaseModal } from '@/components/ui/BaseModal'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Label } from '@/components/ui/Label'
import { User } from '@/lib/types/database'
import { UserCircle } from 'lucide-react'

interface ProfileModalProps {
  user: User
  onSave: (displayName: string) => Promise<void>
  onClose: () => void
}

export function ProfileModal({ user, onSave, onClose }: ProfileModalProps) {
  const [displayName, setDisplayName] = useState(user.display_name || '')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (displayName.trim().length < 2) {
      setError('El nombre debe tener al menos 2 caracteres')
      return
    }

    setLoading(true)
    setError('')
    
    try {
      await onSave(displayName.trim())
      onClose()
    } catch (err) {
      setError('Error al guardar. Intenta de nuevo.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <BaseModal isOpen={true} onClose={onClose} title="Completa tu perfil" icon={UserCircle}>
      <p className="text-white/80 text-sm text-center mb-4 sm:mb-6">
        ¿Cómo quieres que te llamemos?
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="displayName" required>
            Tu nombre
          </Label>
          <Input
            id="displayName"
            value={displayName}
            onChange={(e) => {
              setDisplayName(e.target.value)
              setError('')
            }}
            placeholder="Ej: María García"
            autoFocus
            maxLength={50}
            error={error}
          />
          <p className="text-xs text-white/60">
            Este nombre se mostrará en tu perfil y deseos
          </p>
        </div>

        <div className="flex gap-2">
          <Button
            type="button"
            onClick={onClose}
            variant="ghost"
            size="md"
            className="flex-1"
            disabled={loading}
          >
            Cancelar
          </Button>
          <Button
            type="submit"
            variant="primary"
            size="md"
            className="flex-1"
            isLoading={loading}
          >
            Guardar
          </Button>
        </div>
      </form>
    </BaseModal>
  )
}
