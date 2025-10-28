'use client'

import { Wish } from '@/lib/supabase'
import { getPrioridadEmoji } from '@/lib/utils'

interface ExportButtonProps {
  wishes: Wish[]
  onExport: () => void
}

export default function ExportButton({ wishes, onExport }: ExportButtonProps) {
  const handleExport = () => {
    const texto = `🎄 MI LISTA DE DESEOS NAVIDEÑA 🎅\n\n` +
      wishes.map((w, i) => 
        `${i + 1}. ${w.deseo}\n` +
        `   👤 ${w.nombre_usuario} | ${getPrioridadEmoji(w.prioridad)} | ${w.cumplido ? '✅ Cumplido' : '⏳ Pendiente'}`
      ).join('\n\n') +
      `\n\n✨ Total: ${wishes.length} deseos\n` +
      `📅 Generado: ${new Date().toLocaleDateString('es-ES')}`

    navigator.clipboard.writeText(texto)
    onExport()
  }

  return (
    <button
      onClick={handleExport}
      className="px-4 py-2 bg-navidad-verde hover:bg-navidad-verde/90 text-white rounded-lg text-sm transition-all font-medium"
    >
      📋 Exportar lista
    </button>
  )
}
