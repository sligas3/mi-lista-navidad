import { createClient } from './supabase-server'

export async function requireAuth() {
  const supabase = await createClient()
  const { data: { session } } = await supabase.auth.getSession()
  
  if (!session) {
    throw new Error('No autenticado')
  }
  
  return { session, supabase }
}

export async function requireAdmin() {
  const { session, supabase } = await requireAuth()
  
  const { data: user } = await supabase
    .from('users')
    .select('role')
    .eq('id', session.user.id)
    .single()
  
  if (user?.role !== 'admin') {
    throw new Error('Acceso denegado: se requiere rol de administrador')
  }
  
  return { session, supabase, user }
}
