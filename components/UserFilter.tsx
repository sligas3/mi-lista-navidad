'use client'

import { Wish } from '@/lib/supabase'
import { Users, User } from 'lucide-react'
import { formatDisplayName } from '@/lib/formatName'

interface UserFilterProps {
  wishes: Wish[]
  selectedUser: string
  onSelectUser: (user: string) => void
}

export default function UserFilter({ wishes, selectedUser, onSelectUser }: UserFilterProps) {
  const usuarios = ['Todos', ...new Set(wishes.map(w => w.nombre_usuario))]

  return (
    <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
      {usuarios.map((user) => {
        const isSelected = selectedUser === user
        const isTodos = user === 'Todos'
        
        return (
          <button
            key={user}
            onClick={() => onSelectUser(user)}
            className={`min-h-[44px] px-5 py-3 rounded-lg text-sm font-semibold whitespace-nowrap transition-all flex items-center gap-2 ${
              isSelected
                ? 'bg-green-600 text-white shadow-lg scale-105'
                : 'bg-white/10 text-white hover:bg-white/20 border border-white/20'
            }`}
          >
            {isTodos ? (
              <>
                <Users className="w-4 h-4" />
                Todos
              </>
            ) : (
              <>
                <User className="w-4 h-4" />
                {formatDisplayName(user)}
              </>
            )}
          </button>
        )
      })}
    </div>
  )
}
