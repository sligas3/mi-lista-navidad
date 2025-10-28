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
    <div className="flex gap-2 overflow-x-auto pb-2">
      {usuarios.map((user) => (
        <button
          key={user}
          onClick={() => onSelectUser(user)}
          className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
            selectedUser === user
              ? 'bg-navidad-dorado text-navidad-oscuro'
              : 'bg-white/20 text-white hover:bg-white/30'
          }`}
        >
          {user === 'Todos' ? '👥 Todos' : `👤 ${user}`}
        </button>
      ))}
    </div>
  )
}
