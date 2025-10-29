/**
 * Trunca URLs largas de forma elegante para visualización
 * Mantiene el host y muestra path corto con "..."
 */
export function formatUrl(url: string, maxLength: number = 50): string {
  try {
    const urlObj = new URL(url)
    const host = urlObj.hostname.replace('www.', '')
    const path = urlObj.pathname + urlObj.search
    
    if (url.length <= maxLength) {
      return url
    }
    
    // Si solo el host es muy largo
    if (host.length > maxLength - 10) {
      return host.slice(0, maxLength - 3) + '...'
    }
    
    // Host + path truncado
    const remainingLength = maxLength - host.length - 6 // 6 para "https://" o "..."
    if (path.length > remainingLength) {
      return `${host}${path.slice(0, remainingLength)}...`
    }
    
    return `${host}${path}`
  } catch {
    // Si no es URL válida, truncar simple
    return url.length > maxLength ? url.slice(0, maxLength - 3) + '...' : url
  }
}

/**
 * Valida si una cadena es una URL válida
 */
export function isValidUrl(str: string): boolean {
  try {
    new URL(str)
    return true
  } catch {
    return false
  }
}
