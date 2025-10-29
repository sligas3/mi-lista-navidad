'use server'

import { createClient } from '@/lib/supabase-server'
import { revalidatePath } from 'next/cache'
import { formatDisplayName } from '@/lib/formatName'

export async function getCurrentUser() {
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) return null

  const { data: profile } = await supabase
    .from('users')
    .select('*')
    .eq('id', user.id)
    .single()

  // Si falla el perfil (ej: RLS recursion), usar datos básicos del auth.user
  if (!profile) {
    return {
      id: user.id,
      email: user.email,
      display_name: user.user_metadata?.name || user.user_metadata?.display_name || null,
      avatar_url: user.user_metadata?.avatar_url || null,
      role: 'user' as const,
      created_at: user.created_at,
      updated_at: user.updated_at || user.created_at
    }
  }

  return profile
}

export async function updateProfile(data: {
  display_name?: string
  avatar_url?: string
}) {
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    throw new Error('No autenticado')
  }

  const formattedData = {
    ...data,
    display_name: data.display_name ? data.display_name.toLowerCase().trim() : undefined
  }

  const { error } = await supabase
    .from('users')
    .update(formattedData)
    .eq('id', user.id)

  if (error) throw error

  revalidatePath('/')
}

export async function signOut() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  revalidatePath('/')
}
