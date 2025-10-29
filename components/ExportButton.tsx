'use client'

import { Wish } from '@/lib/supabase'
import { getPrioridadEmoji } from '@/lib/utils'
import { Button } from '@/components/ui/Button'
import { Clipboard } from 'lucide-react'

interface ExportButtonProps {
  wishes: Wish[]
  onExport: () => void
}

export default function ExportButton({ wishes, onExport }: ExportButtonProps) {
  const handleExport = () => {
    const texto = `MI LISTA DE DESEOS NAVIDEÑA\n\n` +
      wishes.map((w, i) => 
        `${i + 1}. ${w.deseo}\n` +
        `   ${w.nombre_usuario} | ${getPrioridadEmoji(w.prioridad)} | ${w.cumplido ? 'Cumplido' : 'Pendiente'}`
      ).join('\n\n') +
      `\n\nTotal: ${wishes.length} deseos\n` +
      `Generado: ${new Date().toLocaleDateString('es-ES')}`

    navigator.clipboard.writeText(texto)
    onExport()
  }

  return (
    <Button
      onClick={handleExport}
      variant="secondary"
      size="sm"
    >
      <Clipboard className="w-4 h-4 mr-1.5" />
      Exportar
    </Button>
  )
}
