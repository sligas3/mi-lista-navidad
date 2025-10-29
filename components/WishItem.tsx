'use client'

import { Wish } from '@/lib/supabase'
import { formatearFecha, getPrioridadText, getPrioridadColor, extractUrl } from '@/lib/utils'
import { formatDisplayName } from '@/lib/formatName'
import { useState } from 'react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { LinkPreviewCard } from '@/components/ui/LinkPreviewCard'
import { User } from '@/lib/types/database'
import { Gift, CheckCircle, User as UserIcon, Undo2, Trash2, Sparkles, Star, Heart } from 'lucide-react'

interface WishItemProps {
  wish: Wish
  currentUser: string
  onToggle: (id: string, cumplido: boolean) => Promise<void>
  onDelete: (id: string) => Promise<void>
  user?: User | null
}

export default function WishItem({ wish, currentUser, onToggle, onDelete, user }: WishItemProps) {
  const [loading, setLoading] = useState(false)
  const isOwner = wish.nombre_usuario === currentUser
  const url = extractUrl(wish.deseo)
  const deseoSinUrl = url ? wish.deseo.replace(url, '').trim() : wish.deseo
  
  const getPriorityIcon = (prioridad: 1 | 2 | 3) => {
    const icons = {
      1: Sparkles,
      2: Star,
      3: Heart,
    }
    return icons[prioridad]
  }
  
  const PriorityIcon = getPriorityIcon(wish.prioridad)

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
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div className="flex-1 space-y-3 min-w-0">
          <div className="flex items-start gap-2 sm:gap-3">
            <span className="flex-shrink-0">
              {wish.cumplido ? (
                <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-green-400" />
              ) : (
                <Gift className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-400" />
              )}
            </span>
            <div className="flex-1">
              <p className={`text-sm sm:text-base font-semibold text-white leading-relaxed break-words ${wish.cumplido ? 'line-through opacity-60' : ''}`}>
                {formatDisplayName(deseoSinUrl)}
              </p>
              {url && (
                <a 
                  href={url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-[11px] xs:text-xs sm:text-sm text-blue-400 hover:text-blue-300 underline mt-0.5 sm:mt-1 inline-block truncate max-w-full"
                  title={url}
                  onClick={(e) => {
                    // En móvil, prevenir app nativa y forzar navegador
                    if (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) {
                      e.preventDefault()
                      window.open(url, '_blank', 'noopener,noreferrer')
                    }
                  }}
                >
                  {url.length > 40 ? `${url.substring(0, 37)}...` : url}
                </a>
              )}
            </div>
          </div>

          {url && <LinkPreviewCard url={url} />}

          <div className="flex items-center gap-2 sm:gap-3 flex-wrap text-xs sm:text-sm">
            <span className="text-white/70 flex items-center gap-1">
              <UserIcon className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="font-medium truncate max-w-[120px] sm:max-w-none">{formatDisplayName(wish.nombre_usuario)}</span>
            </span>
            <span className={`flex items-center gap-1 ${getPrioridadColor(wish.prioridad)}`}>
              <PriorityIcon className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="hidden xs:inline">{getPrioridadText(wish.prioridad)}</span>
            </span>
            <Badge variant={wish.cumplido ? 'success' : 'warning'}>
              {wish.cumplido ? 'Cumplido' : 'Pendiente'}
            </Badge>
            <span className="text-white/50 hidden sm:inline">
              {formatearFecha(wish.created_at)}
            </span>
          </div>
        </div>

        {isOwner && (
          <div className="flex gap-2 flex-shrink-0 self-end sm:self-start">
            <Button
              onClick={handleToggle}
              disabled={loading}
              variant="ghost"
              size="sm"
              className="min-w-[44px] p-2"
              title={wish.cumplido ? 'Marcar pendiente' : 'Marcar cumplido'}
              aria-label={wish.cumplido ? 'Marcar pendiente' : 'Marcar cumplido'}
            >
              {wish.cumplido ? (
                <Undo2 className="w-4 h-4 sm:w-5 sm:h-5" />
              ) : (
                <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5" />
              )}
            </Button>
            <Button
              onClick={handleDelete}
              disabled={loading}
              variant="ghost"
              size="sm"
              className="min-w-[44px] p-2"
              title="Eliminar"
              aria-label="Eliminar deseo"
            >
              <Trash2 className="w-4 h-4 sm:w-5 sm:h-5" />
            </Button>
          </div>
        )}
      </div>
    </Card>
  )
}
