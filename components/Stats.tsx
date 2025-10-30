'use client'

import { Wish } from '@/lib/supabase'
import { BarChart3, TreePine, Users, Star } from 'lucide-react'
import { motion } from 'framer-motion'

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
    <motion.div 
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.95 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className="glass-effect rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 mb-4 sm:mb-6 border border-navidad-dorado/30 card-hover relative overflow-hidden"
    >
      <div className="absolute -right-8 -top-8 opacity-5 rotate-12 hidden sm:block">
        <BarChart3 className="w-36 h-36" />
      </div>
      <h3 className="font-navidad text-lg xs:text-xl sm:text-2xl md:text-3xl text-navidad-dorado mb-4 sm:mb-6 text-center animate-glow relative z-10 flex items-center justify-center gap-2 sm:gap-3">
        <BarChart3 className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8" />
        <span className="hidden xs:inline">Estadísticas Navideñas</span>
        <span className="xs:hidden">Estadísticas</span>
        <TreePine className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 text-green-400" />
      </h3>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3 md:gap-4 relative z-10">
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1, duration: 0.3 }}
          className="bg-gradient-to-br from-white/20 to-white/10 rounded-lg sm:rounded-xl p-2 sm:p-3 md:p-4 text-center border border-white/20 card-hover"
        >
          <div className="text-xl sm:text-2xl md:text-3xl font-bold text-white">{total}</div>
          <div className="text-white/70 text-[10px] xs:text-xs sm:text-sm">Total</div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.3 }}
          className="bg-gradient-to-br from-green-500/30 to-green-500/20 rounded-lg sm:rounded-xl p-2 sm:p-3 md:p-4 text-center border border-green-400/30 card-hover"
        >
          <div className="text-xl sm:text-2xl md:text-3xl font-bold text-green-300">{cumplidos}</div>
          <div className="text-white/70 text-[10px] xs:text-xs sm:text-sm">Cumplidos</div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.3 }}
          className="bg-gradient-to-br from-yellow-500/30 to-yellow-500/20 rounded-lg sm:rounded-xl p-2 sm:p-3 md:p-4 text-center border border-yellow-400/30 card-hover"
        >
          <div className="text-xl sm:text-2xl md:text-3xl font-bold text-yellow-300">{pendientes}</div>
          <div className="text-white/70 text-[10px] xs:text-xs sm:text-sm">Pendientes</div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.3 }}
          className="bg-gradient-to-br from-navidad-dorado/30 to-navidad-dorado/20 rounded-lg sm:rounded-xl p-2 sm:p-3 md:p-4 text-center border border-navidad-dorado/40 card-hover"
        >
          <div className="text-xl sm:text-2xl md:text-3xl font-bold text-navidad-dorado">{porcentaje}%</div>
          <div className="text-white/70 text-[10px] xs:text-xs sm:text-sm">Progreso</div>
        </motion.div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.3 }}
        className="mt-3 sm:mt-4 grid grid-cols-2 gap-2 sm:gap-3 md:gap-4"
      >
        <div className="bg-white/5 rounded-lg p-2 sm:p-3">
          <div className="text-white/70 text-[10px] xs:text-xs mb-1 sm:mb-2 flex items-center gap-1">
            <Users className="w-3 h-3" />
            Personas
          </div>
          <div className="text-white font-medium text-sm sm:text-base">{usuarios.length}</div>
        </div>

        <div className="bg-white/5 rounded-lg p-2 sm:p-3">
          <div className="text-white/70 text-[10px] xs:text-xs mb-1 sm:mb-2 flex items-center gap-1">
            <Star className="w-3 h-3" />
            <span className="hidden xs:inline">Prioridad Alta</span>
            <span className="xs:hidden">Alta</span>
          </div>
          <div className="text-white font-medium text-sm sm:text-base">{prioridades.alta} <span className="hidden xs:inline">pendientes</span></div>
        </div>
      </motion.div>
    </motion.div>
  )
}
