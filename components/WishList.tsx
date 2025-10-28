'use client'

import { Wish } from '@/lib/supabase'
import WishItem from './WishItem'
import { useState } from 'react'

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
    <div className="space-y-4">
      {/* Filtros y búsqueda */}
      <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 space-y-3">
        <input
          type="text"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          placeholder="🔍 Buscar por deseo o persona..."
          className="w-full px-4 py-2 rounded-lg bg-white/90 text-navidad-oscuro placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-navidad-dorado"
        />

        <div className="flex gap-2">
          {(['todos', 'pendientes', 'cumplidos'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFiltro(f)}
              className={`flex-1 py-2 rounded-lg font-medium text-sm transition-all ${
                filtro === f
                  ? 'bg-navidad-dorado text-navidad-oscuro'
                  : 'bg-white/20 text-white hover:bg-white/30'
              }`}
            >
              {f === 'todos' && '🎁 Todos'}
              {f === 'pendientes' && '⏳ Pendientes'}
              {f === 'cumplidos' && '✅ Cumplidos'}
            </button>
          ))}
        </div>
      </div>

      {/* Lista de deseos */}
      {wishesFiltrados.length === 0 ? (
        <div className="text-center py-12 bg-white/10 backdrop-blur-md rounded-xl">
          <p className="text-white/70 text-lg">
            {busqueda ? '🔍 No se encontraron deseos' : '🎄 Aún no hay deseos navideños'}
          </p>
          <p className="text-white/50 text-sm mt-2">
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

      {/* Contador */}
      <p className="text-center text-white/60 text-sm">
        Mostrando {wishesFiltrados.length} de {wishes.length} deseos
      </p>
    </div>
  )
}
