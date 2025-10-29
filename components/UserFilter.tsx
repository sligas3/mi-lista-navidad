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

  return (
    <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
      {usuarios.map((user) => {
        const isSelected = selectedUser === user
        const isTodos = user === 'Todos'
        
        return (
          <button
            key={user}
            onClick={() => onSelectUser(user)}
            className={`
              px-4 py-2 min-h-[44px] rounded-full font-medium text-sm md:text-base
              transition-all duration-200 ease-out
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-rose-500 focus-visible:ring-offset-emerald-950
              motion-safe:hover:scale-[1.03] motion-safe:active:scale-[0.97]
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
}
