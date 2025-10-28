'use client'

import { Wish } from '@/lib/supabase'

interface UserFilterProps {
  wishes: Wish[]
  selectedUser: string
  onSelectUser: (user: string) => void
}

export default function UserFilter({ wishes, selectedUser, onSelectUser }: UserFilterProps) {
  const usuarios = ['Todos', ...new Set(wishes.map(w => w.nombre_usuario))]

  return (
    <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
      {usuarios.map((user) => (
        <button
          key={user}
          onClick={() => onSelectUser(user)}
          className={`px-5 py-2.5 rounded-full text-sm font-bold whitespace-nowrap transition-all shadow-md card-hover ${
            selectedUser === user
              ? 'bg-gradient-to-r from-navidad-dorado to-yellow-500 text-navidad-oscuro scale-105'
              : 'glass-effect text-white hover:bg-white/30 border border-white/30'
          }`}
        >
          {user === 'Todos' ? '👥 Todos' : `👤 ${user}`}
        </button>
      ))}
    </div>
  )
}
