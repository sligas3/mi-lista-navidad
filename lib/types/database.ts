export interface User {
  id: string
  display_name: string | null
  email: string | null
  avatar_url: string | null
  role: 'user' | 'admin'
  created_at: string
  updated_at: string
}

export interface Wish {
  id: string
  nombre_usuario: string
  deseo: string
  prioridad: 1 | 2 | 3
  cumplido: boolean
  created_at: string
  user_id?: string | null
}
