'use server'

import { createAdminClient } from '@/lib/supabase-admin'
import { requireAdmin } from '@/lib/auth-helpers'
import { revalidatePath } from 'next/cache'

export async function getAllUsers() {
  await requireAdmin()
  
  const supabase = createAdminClient()
  
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) throw error
  
  return data
}

export async function updateUserRole(userId: string, role: 'user' | 'admin') {
  await requireAdmin()
  
  const supabase = createAdminClient()
  
  const { error } = await supabase
    .from('users')
    .update({ role })
    .eq('id', userId)

  if (error) throw error
  
  revalidatePath('/admin')
}

export async function deleteUser(userId: string) {
  await requireAdmin()
  
  const supabase = createAdminClient()
  
  // Eliminar de auth.users (cascade eliminará de public.users)
  const { error } = await supabase.auth.admin.deleteUser(userId)

  if (error) throw error
  
  revalidatePath('/admin')
}
