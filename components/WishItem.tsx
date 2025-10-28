'use client'

import { Wish } from '@/lib/supabase'
import { formatearFecha, getPrioridadEmoji } from '@/lib/utils'
import { useState } from 'react'

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
    <div
      className={`bg-white/95 rounded-lg p-5 shadow-lg border-2 transition-all hover:shadow-xl ${
        wish.cumplido
          ? 'border-green-400 opacity-75'
          : 'border-navidad-dorado/30'
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-2xl">{wish.cumplido ? '✅' : '🎁'}</span>
            <h3
              className={`font-semibold text-navidad-oscuro ${
                wish.cumplido ? 'line-through opacity-60' : ''
              }`}
            >
              {wish.deseo}
            </h3>
          </div>

          <div className="flex items-center gap-3 text-sm text-gray-600">
            <span className="flex items-center gap-1">
              👤 <span className="font-medium">{wish.nombre_usuario}</span>
            </span>
            <span>{getPrioridadEmoji(wish.prioridad)}</span>
            <span className="text-xs opacity-60">
              {formatearFecha(wish.created_at)}
            </span>
          </div>
        </div>

        {isOwner && (
          <div className="flex gap-2">
            <button
              onClick={handleToggle}
              disabled={loading}
              className="px-3 py-1 bg-green-500 hover:bg-green-600 text-white text-sm rounded-md transition-colors disabled:opacity-50"
              title={wish.cumplido ? 'Marcar pendiente' : 'Marcar cumplido'}
            >
              {wish.cumplido ? '↩️' : '✓'}
            </button>
            <button
              onClick={handleDelete}
              disabled={loading}
              className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white text-sm rounded-md transition-colors disabled:opacity-50"
              title="Eliminar"
            >
              🗑️
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
