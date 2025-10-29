'use client'

import { Wish } from '@/lib/supabase'
import { Users, User } from 'lucide-react'
import { formatDisplayName } from '@/lib/formatName'
import { Button } from '@/components/ui/Button'

interface UserFilterProps {
  wishes: Wish[]
  selectedUser: string
  onSelectUser: (user: string) => void
}

export default function UserFilter({ wishes, selectedUser, onSelectUser }: UserFilterProps) {
  const usuarios = ['Todos', ...new Set(wishes.map(w => w.nombre_usuario))]

  return (
    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent hover:scrollbar-thumb-white/30" style={{ scrollbarWidth: 'thin' }}>
      {usuarios.map((user) => {
        const isSelected = selectedUser === user
        const isTodos = user === 'Todos'
        
        return (
          <Button
            key={user}
            onClick={() => onSelectUser(user)}
            variant={isSelected ? 'primary' : 'outline'}
            size="md"
            className="flex-shrink-0"
          >
            {isTodos ? (
              <>
                <Users className="w-4 h-4 mr-1.5" />
                Todos
              </>
            ) : (
              <>
                <User className="w-4 h-4 mr-1.5" />
                {formatDisplayName(user)}
              </>
            )}
          </Button>
        )
      })}
    </div>
  )
}
