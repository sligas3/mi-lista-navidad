'use client'

import { Wish } from '@/lib/supabase'
import WishItem from './WishItem'
import { useState } from 'react'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'

interface WishListProps {
  wishes: Wish[]
  currentUser: string
  onToggle: (id: string, cumplido: boolean) => Promise<void>
  onDelete: (id: string) => Promise<void>
}

export default function WishList({ wishes, currentUser, onToggle, onDelete }: WishListProps) {
  const [filtro, setFiltro] = useState<'todos' | 'pendientes' | 'cumplidos'>('todos')
  const [busqueda, setBusqueda] = useState('')

  const wishesFiltrados = wishes.filter((wish) => {
    const matchFiltro =
      filtro === 'todos' ||
      (filtro === 'pendientes' && !wish.cumplido) ||
      (filtro === 'cumplidos' && wish.cumplido)

    const matchBusqueda =
      wish.deseo.toLowerCase().includes(busqueda.toLowerCase()) ||
      wish.nombre_usuario.toLowerCase().includes(busqueda.toLowerCase())

    return matchFiltro && matchBusqueda
  })

  return (
    <div className="space-y-6">
      {/* Filtros */}
      <div className="space-y-4">
        <Input
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          placeholder="🔍 Buscar por deseo o persona..."
        />

        <div className="flex gap-2 flex-wrap">
          <Button
            onClick={() => setFiltro('todos')}
            variant={filtro === 'todos' ? 'primary' : 'outline'}
            size="sm"
          >
            🎁 Todos
          </Button>
          <Button
            onClick={() => setFiltro('pendientes')}
            variant={filtro === 'pendientes' ? 'primary' : 'outline'}
            size="sm"
          >
            ⏳ Pendientes
          </Button>
          <Button
            onClick={() => setFiltro('cumplidos')}
            variant={filtro === 'cumplidos' ? 'primary' : 'outline'}
            size="sm"
          >
            ✅ Cumplidos
          </Button>
        </div>
      </div>

      {/* Lista */}
      {wishesFiltrados.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-lg border border-zinc-200">
          <div className="text-6xl mb-4">🎄</div>
          <h3 className="text-lg font-semibold text-zinc-900 mb-2">
            {busqueda ? 'No se encontraron deseos' : 'Aún no hay deseos navideños'}
          </h3>
          <p className="text-zinc-600">
            {!busqueda && '¡Sé el primero en agregar uno! ✨'}
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {wishesFiltrados.map((wish) => (
            <WishItem
              key={wish.id}
              wish={wish}
              currentUser={currentUser}
              onToggle={onToggle}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}

      <p className="text-center text-sm text-zinc-500">
        Mostrando {wishesFiltrados.length} de {wishes.length} deseos
      </p>
    </div>
  )
}
