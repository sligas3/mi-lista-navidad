import { 
  User, Gift, Star, Bell, Snowflake, TreePine, 
  Sparkles, Heart, Candy, Cookie, Music, Crown
} from 'lucide-react'
import { LucideIcon } from 'lucide-react'

/**
 * Avatares navideños para usuarios (iconos SVG)
 */
const CHRISTMAS_AVATARS: LucideIcon[] = [
  User,      // Usuario
  Gift,      // Regalo
  Star,      // Estrella
  Bell,      // Campana
  Snowflake, // Copo de nieve
  TreePine,  // Árbol
  Sparkles,  // Destellos
  Heart,     // Corazón
  Candy,     // Dulce
  Cookie,    // Galleta
  Music,     // Música
  Crown,     // Corona
]

/**
 * Obtiene un avatar navideño aleatorio basado en el email del usuario
 * Siempre retorna el mismo icono para el mismo email
 */
export function getChristmasAvatar(email: string | null | undefined): LucideIcon {
  if (!email) return TreePine
  
  // Hash simple del email para obtener un índice consistente
  let hash = 0
  for (let i = 0; i < email.length; i++) {
    hash = ((hash << 5) - hash) + email.charCodeAt(i)
    hash = hash & hash // Convert to 32bit integer
  }
  
  const index = Math.abs(hash) % CHRISTMAS_AVATARS.length
  return CHRISTMAS_AVATARS[index]
}

/**
 * Colores de fondo para avatares (tonos navideños)
 */
const CHRISTMAS_COLORS = [
  'bg-red-600',      // Rojo navideño
  'bg-green-600',    // Verde pino
  'bg-emerald-700',  // Verde oscuro
  'bg-red-700',      // Rojo oscuro
  'bg-amber-600',    // Dorado
  'bg-blue-600',     // Azul invernal
  'bg-purple-600',   // Morado festivo
  'bg-rose-600',     // Rosa navideño
]

/**
 * Obtiene un color de fondo consistente basado en el email
 */
export function getAvatarColor(email: string | null | undefined): string {
  if (!email) return 'bg-green-600'
  
  let hash = 0
  for (let i = 0; i < email.length; i++) {
    hash = ((hash << 5) - hash) + email.charCodeAt(i)
    hash = hash & hash
  }
  
  const index = Math.abs(hash) % CHRISTMAS_COLORS.length
  return CHRISTMAS_COLORS[index]
}
