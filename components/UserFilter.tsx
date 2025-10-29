'use client'

import { Wish } from '@/lib/supabase'
import { Users, User } from 'lucide-react'
import { formatDisplayName } from '@/lib/formatName'

interface UserFilterProps {
  readonly wishes: Wish[]
  readonly selectedUser: string
  readonly onSelectUser: (user: string) => void
}

export default function UserFilter({ wishes, selectedUser, onSelectUser }: UserFilterProps) {
  const usuarios = ['Todos', ...new Set(wishes.map(w => w.nombre_usuario))]
  const totalUsers = usuarios.length

  // Calcular distribución en forma de árbol
  const getTreeLayout = () => {
    if (totalUsers <= 3) return [totalUsers] // Una fila
    if (totalUsers <= 6) return [1, 2, 3] // Árbol pequeño
    if (totalUsers <= 10) return [1, 2, 3, 4] // Árbol mediano
    return [1, 2, 3, 4, Math.ceil((totalUsers - 10) / 5)] // Árbol grande
  }

  const layout = getTreeLayout()
  let userIndex = 0

  return (
    <div className="space-y-3">
      {/* Estrella en la cima */}
      {totalUsers > 3 && (
        <div className="flex justify-center">
          <svg
            className="w-8 h-8 text-yellow-400 motion-safe:animate-pulse"
            viewBox="0 0 24 24"
            fill="currentColor"
            style={{ animationDuration: '2s' }}
          >
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        </div>
      )}
      
      <div className="flex flex-col items-center gap-2 sm:gap-3">
        {layout.map((rowCount, rowIndex) => {
          const rowUsers = usuarios.slice(userIndex, userIndex + rowCount)
          userIndex += rowCount
          
          return (
            <div key={rowIndex} className="flex flex-wrap gap-2 justify-center">
              {rowUsers.map((user) => {
                const isSelected = selectedUser === user
                const isTodos = user === 'Todos'
                
                return (
                  <button
                    key={user}
                    onClick={() => onSelectUser(user)}
                    className={`
                      px-3 sm:px-4 py-2 min-h-[44px] rounded-full font-medium text-sm md:text-base
                      transition-all duration-200 ease-out
                      focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-rose-500 focus-visible:ring-offset-emerald-950
                      motion-safe:hover:scale-[1.05] motion-safe:active:scale-[0.97]
                      flex items-center gap-1.5 whitespace-nowrap
                      ${
                        isSelected
                          ? 'bg-emerald-600 text-white shadow-lg hover:bg-emerald-500 hover:brightness-110'
                          : 'bg-white/10 text-white/80 hover:bg-white/20 hover:text-white backdrop-blur-sm'
                      }
                    `}
                    aria-pressed={isSelected}
                  >
                    {isTodos ? (
                      <>
                        <Users className="w-4 h-4" />
                        <span>Todos</span>
                      </>
                    ) : (
                      <>
                        <User className="w-4 h-4" />
                        <span>{formatDisplayName(user)}</span>
                      </>
                    )}
                  </button>
                )
              })}
            </div>
          )
        })}
      </div>
      
      {/* Tronco del árbol */}
      {totalUsers > 3 && (
        <div className="flex justify-center">
          <div className="w-12 h-4 bg-amber-900/40 rounded-sm" />
        </div>
      )}
    </div>
  )
}
