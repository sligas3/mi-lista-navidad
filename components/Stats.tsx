'use client'

import { Wish } from '@/lib/supabase'

interface StatsProps {
  wishes: Wish[]
}

export default function Stats({ wishes }: StatsProps) {
  const total = wishes.length
  const cumplidos = wishes.filter(w => w.cumplido).length
  const pendientes = total - cumplidos
  const porcentaje = total > 0 ? Math.round((cumplidos / total) * 100) : 0

  const usuarios = [...new Set(wishes.map(w => w.nombre_usuario))]
  const prioridades = {
    alta: wishes.filter(w => w.prioridad === 3 && !w.cumplido).length,
    media: wishes.filter(w => w.prioridad === 2 && !w.cumplido).length,
    baja: wishes.filter(w => w.prioridad === 1 && !w.cumplido).length,
  }

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 mb-6">
      <h3 className="font-navidad text-2xl text-navidad-dorado mb-4 text-center">
        📊 Estadísticas Navideñas
      </h3>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white/10 rounded-lg p-4 text-center">
          <div className="text-3xl font-bold text-white">{total}</div>
          <div className="text-white/70 text-sm">Total</div>
        </div>

        <div className="bg-green-500/20 rounded-lg p-4 text-center">
          <div className="text-3xl font-bold text-green-300">{cumplidos}</div>
          <div className="text-white/70 text-sm">Cumplidos</div>
        </div>

        <div className="bg-yellow-500/20 rounded-lg p-4 text-center">
          <div className="text-3xl font-bold text-yellow-300">{pendientes}</div>
          <div className="text-white/70 text-sm">Pendientes</div>
        </div>

        <div className="bg-navidad-dorado/20 rounded-lg p-4 text-center">
          <div className="text-3xl font-bold text-navidad-dorado">{porcentaje}%</div>
          <div className="text-white/70 text-sm">Progreso</div>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-4">
        <div className="bg-white/5 rounded-lg p-3">
          <div className="text-white/70 text-xs mb-2">👥 Personas</div>
          <div className="text-white font-medium">{usuarios.length}</div>
        </div>

        <div className="bg-white/5 rounded-lg p-3">
          <div className="text-white/70 text-xs mb-2">⭐ Prioridad Alta</div>
          <div className="text-white font-medium">{prioridades.alta} pendientes</div>
        </div>
      </div>
    </div>
  )
}
