'use client'

import { Wish } from '@/lib/supabase'
import { formatearFecha, getPrioridadEmoji } from '@/lib/utils'
import { useState } from 'react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'

interface WishItemProps {
  wish: Wish
  currentUser: string
  onToggle: (id: string, cumplido: boolean) => Promise<void>
  onDelete: (id: string) => Promise<void>
}

export default function WishItem({ wish, currentUser, onToggle, onDelete }: WishItemProps) {
  const [loading, setLoading] = useState(false)
  const isOwner = wish.nombre_usuario === currentUser

  const handleToggle = async () => {
    setLoading(true)
    try {
      await onToggle(wish.id, !wish.cumplido)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!confirm('¿Eliminar este deseo? 🎄')) return
    setLoading(true)
    try {
      await onDelete(wish.id)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className={wish.cumplido ? 'opacity-60' : ''}>
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 space-y-3">
          <div className="flex items-start gap-3">
            <span className="text-2xl flex-shrink-0">
              {wish.cumplido ? '✅' : '🎁'}
            </span>
            <p className={`text-base font-medium text-zinc-900 ${wish.cumplido ? 'line-through' : ''}`}>
              {wish.deseo}
            </p>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            <span className="text-sm text-zinc-600 flex items-center gap-1">
              👤 <span className="font-medium">{wish.nombre_usuario}</span>
            </span>
            <span className="text-sm">{getPrioridadEmoji(wish.prioridad)}</span>
            <Badge variant={wish.cumplido ? 'success' : 'warning'}>
              {wish.cumplido ? 'Cumplido' : 'Pendiente'}
            </Badge>
            <span className="text-xs text-zinc-400">
              {formatearFecha(wish.created_at)}
            </span>
          </div>
        </div>

        {isOwner && (
          <div className="flex gap-2 flex-shrink-0">
            <Button
              onClick={handleToggle}
              disabled={loading}
              variant="ghost"
              size="sm"
              title={wish.cumplido ? 'Marcar pendiente' : 'Marcar cumplido'}
            >
              {wish.cumplido ? '↩️' : '✓'}
            </Button>
            <Button
              onClick={handleDelete}
              disabled={loading}
              variant="ghost"
              size="sm"
              title="Eliminar"
            >
              🗑️
            </Button>
          </div>
        )}
      </div>
    </Card>
  )
}
