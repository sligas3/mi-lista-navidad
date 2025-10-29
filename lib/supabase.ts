import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Faltan variables de entorno de Supabase. Revisa .env.local");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
  db: {
    schema: 'public',
  },
  global: {
    headers: {
      'x-client-info': 'mi-lista-navidad',
    },
  },
});

// Tipos TypeScript para la tabla wishes
export interface Wish {
  id: string;
  nombre_usuario: string;
  deseo: string;
  prioridad: 1 | 2 | 3;
  cumplido: boolean;
  created_at: string;
  user_id?: string | null;
}

export type NewWish = Omit<Wish, "id" | "created_at">;
