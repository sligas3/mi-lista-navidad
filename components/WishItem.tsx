'use client'

import { Wish } from '@/lib/supabase'
import { formatearFecha, getPrioridadEmoji, extractUrl } from '@/lib/utils'
import { useState } from 'react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { LinkPreviewCard } from '@/components/ui/LinkPreviewCard'
import { User } from '@/lib/types/database'
import { Gift, CheckCircle, User as UserIcon, Undo2, Trash2 } from 'lucide-react'

interface WishItemProps {
  wish: Wish
  currentUser: string
  onToggle: (id: string, cumplido: boolean) => Promise<void>
  onDelete: (id: string) => Promise<void>
  user?: User | null
}

export default function WishItem({ wish, currentUser, onToggle, onDelete, user }: WishItemProps) {
  const [loading, setLoading] = useState(false)
  const isOwner = user ? wish.user_id === user.id : wish.nombre_usuario === currentUser
  const url = extractUrl(wish.deseo)

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
    <Card className={`animate-scale-in ${wish.cumplido ? 'opacity-60' : ''}`}>
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 space-y-3">
          <div className="flex items-start gap-3">
            <span className="flex-shrink-0">
              {wish.cumplido ? (
                <CheckCircle className="w-6 h-6 text-green-400" />
              ) : (
                <Gift className="w-6 h-6 text-yellow-400" />
              )}
            </span>
            <p className={`text-base font-semibold text-white leading-relaxed break-words ${wish.cumplido ? 'line-through opacity-60' : ''}`}>
              {wish.deseo}
            </p>
          </div>

          {url && <LinkPreviewCard url={url} />}

          <div className="flex items-center gap-3 flex-wrap">
            <span className="text-sm text-white/70 flex items-center gap-1.5">
              <UserIcon className="w-4 h-4" />
              <span className="font-medium">{wish.nombre_usuario}</span>
            </span>
            <span className="text-sm">{getPrioridadEmoji(wish.prioridad)}</span>
            <Badge variant={wish.cumplido ? 'success' : 'warning'}>
              {wish.cumplido ? 'Cumplido' : 'Pendiente'}
            </Badge>
            <span className="text-xs text-white/50">
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
              size="md"
              className="min-w-[44px]"
              title={wish.cumplido ? 'Marcar pendiente' : 'Marcar cumplido'}
              aria-label={wish.cumplido ? 'Marcar pendiente' : 'Marcar cumplido'}
            >
              {wish.cumplido ? (
                <Undo2 className="w-5 h-5" />
              ) : (
                <CheckCircle className="w-5 h-5" />
              )}
            </Button>
            <Button
              onClick={handleDelete}
              disabled={loading}
              variant="ghost"
              size="md"
              className="min-w-[44px]"
              title="Eliminar"
              aria-label="Eliminar deseo"
            >
              <Trash2 className="w-5 h-5" />
            </Button>
          </div>
        )}
      </div>
    </Card>
  )
}
