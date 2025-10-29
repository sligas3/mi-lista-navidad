// Calcular días hasta Navidad
export function diasHastaNavidad(): number {
  const hoy = new Date();
  const navidad = new Date(hoy.getFullYear(), 11, 25);

  if (hoy > navidad) {
    navidad.setFullYear(navidad.getFullYear() + 1);
  }

  const diff = navidad.getTime() - hoy.getTime();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

// Obtener texto de prioridad
export function getPrioridadText(prioridad: 1 | 2 | 3): string {
  const texts = {
    1: "Un poco",
    2: "Normal",
    3: "Mucho",
  };
  return texts[prioridad];
}

// Obtener color de prioridad
export function getPrioridadColor(prioridad: 1 | 2 | 3): string {
  const colors = {
    1: "text-blue-400",
    2: "text-yellow-400",
    3: "text-red-400",
  };
  return colors[prioridad];
}

// Formatear fecha
export function formatearFecha(fecha: string): string {
  return new Date(fecha).toLocaleDateString("es-ES", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

// Obtener saludo según hora del día
export function getSaludo(): string {
  const hora = new Date().getHours();
  if (hora < 12) return "🌅 Buenos días";
  if (hora < 19) return "☀️ Buenas tardes";
  return "🌙 Buenas noches";
}

// Validar nombre de usuario
export function validarNombre(nombre: string): boolean {
  return nombre.trim().length >= 2 && nombre.trim().length <= 30;
}

// Extraer URL de un texto
export function extractUrl(text: string): string | null {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  const match = text.match(urlRegex);
  return match ? match[0] : null;
}
