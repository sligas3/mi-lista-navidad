'use server'

import { createClient } from '@/lib/supabase-server'
import { revalidatePath } from 'next/cache'

export async function getWishes() {
  const supabase = await createClient()
  
  const { data: { session } } = await supabase.auth.getSession()
  
  if (!session) {
    return []
  }

  const { data, error } = await supabase
    .from('wishes')
    .select('id, nombre_usuario, deseo, prioridad, cumplido, created_at')
    .order('created_at', { ascending: false })
    .limit(100)

  if (error) {
    console.error('Error fetching wishes:', error)
    return []
  }

  return data || []
}

export async function createWish(nombreUsuario: string, deseo: string, prioridad: 1 | 2 | 3) {
  const supabase = await createClient()
  
  const { data: { session } } = await supabase.auth.getSession()
  if (!session) throw new Error('No autenticado')

  // Extraer URL si existe para no modificarla
  const urlRegex = /(https?:\/\/[^\s<>"{}|\\^`\[\]]+)/g
  const urlMatch = deseo.match(urlRegex)
  
  let deseoFinal = deseo
  if (urlMatch) {
    // Separar texto de URL
    const url = urlMatch[0]
    const texto = deseo.replace(url, '').trim()
    // Capitalizar solo el texto, mantener URL intacta
    const textoCapitalizado = texto.charAt(0).toUpperCase() + texto.slice(1)
    deseoFinal = `${textoCapitalizado} ${url}`
  } else {
    // Sin URL, capitalizar normalmente
    deseoFinal = deseo.charAt(0).toUpperCase() + deseo.slice(1)
  }
  
  const { error } = await supabase
    .from('wishes')
    .insert({
      nombre_usuario: nombreUsuario,
      deseo: deseoFinal,
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
  const supabase = await createClient()
  
  const { data: { session } } = await supabase.auth.getSession()
  if (!session) throw new Error('No autenticado')

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
  const supabase = await createClient()
  
  const { data: { session } } = await supabase.auth.getSession()
  if (!session) throw new Error('No autenticado')

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
