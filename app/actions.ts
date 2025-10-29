'use server'

import { supabase } from '@/lib/supabase'
import { revalidatePath } from 'next/cache'

export async function getWishes() {
  const { data, error } = await supabase
    .from('wishes')
    .select('id, nombre_usuario, deseo, prioridad, cumplido, created_at, user_id')
    .order('created_at', { ascending: false })
    .limit(100)

  if (error) {
    console.error('Error fetching wishes:', error)
    return []
  }

  return data || []
}

export async function createWish(nombreUsuario: string, deseo: string, prioridad: 1 | 2 | 3) {
  const { error } = await supabase
    .from('wishes')
    .insert({
      nombre_usuario: nombreUsuario,
      deseo: deseo,
      prioridad: prioridad,
      cumplido: false,
    })

  if (error) {
    console.error('Error creating wish:', error)
    throw new Error('No se pudo crear el deseo')
  }

  revalidatePath('/')
}

export async function toggleWish(id: string, cumplido: boolean) {
  const { error } = await supabase
    .from('wishes')
    .update({ cumplido })
    .eq('id', id)

  if (error) {
    console.error('Error toggling wish:', error)
    throw new Error('No se pudo actualizar el deseo')
  }

  revalidatePath('/')
}

export async function deleteWish(id: string) {
  const { error } = await supabase
    .from('wishes')
    .delete()
    .eq('id', id)

  if (error) {
    console.error('Error deleting wish:', error)
    throw new Error('No se pudo eliminar el deseo')
  }

  revalidatePath('/')
}
