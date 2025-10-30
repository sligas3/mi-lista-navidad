'use server';

import { createClient } from '@/lib/supabase-server';
import { revalidatePath } from 'next/cache';

/**
 * Genera un código único de familia
 */
export async function generateFamilyCode(): Promise<string> {
  const supabase = await createClient();
  
  const { data, error } = await supabase.rpc('generate_family_code');
  
  if (error || !data) {
    throw new Error('Error al generar código de familia');
  }
  
  return data;
}

/**
 * Actualiza el código de familia del usuario actual
 */
export async function updateFamilyCode(familyCode: string): Promise<void> {
  const supabase = await createClient();
  
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) throw new Error('No autenticado');
  
  const { error } = await supabase
    .from('users')
    .update({ family_code: familyCode.toUpperCase().trim() })
    .eq('id', session.user.id);
  
  if (error) throw new Error('Error al actualizar código de familia');
  
  revalidatePath('/dashboard');
}

/**
 * Verifica si un código de familia existe
 */
export async function verifyFamilyCode(familyCode: string): Promise<boolean> {
  const supabase = await createClient();
  
  const { data, error } = await supabase
    .from('users')
    .select('id')
    .eq('family_code', familyCode.toUpperCase().trim())
    .limit(1);
  
  if (error) return false;
  
  return (data?.length ?? 0) > 0;
}

/**
 * Obtiene el código de familia del usuario actual
 */
export async function getCurrentFamilyCode(): Promise<string | null> {
  const supabase = await createClient();
  
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) return null;
  
  const { data, error } = await supabase
    .from('users')
    .select('family_code')
    .eq('id', session.user.id)
    .single();
  
  if (error || !data) return null;
  
  return data.family_code;
}
