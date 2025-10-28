import { createClient } from './supabase-server'

export async function getUser() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  return user
}

export async function getUserProfile() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) return null

  const { data: profile } = await supabase
    .from('users')
    .select('*')
    .eq('id', user.id)
    .single()

  return profile
}

export async function isAdmin() {
  const profile = await getUserProfile()
  return profile?.role === 'admin'
}

export async function requireAuth() {
  const user = await getUser()
  if (!user) {
    throw new Error('No autenticado')
  }
  return user
}

export async function requireAdmin() {
  await requireAuth()
  const admin = await isAdmin()
  if (!admin) {
    throw new Error('Requiere permisos de administrador')
  }
}
