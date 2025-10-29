/**
 * Formatea un nombre con la primera letra de cada palabra en mayúscula
 */
export function formatDisplayName(name: string): string {
  return name
    .trim()
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}
