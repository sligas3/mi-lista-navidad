'use client'

import { motion } from 'framer-motion'
import { Heart, Star, Sparkles } from 'lucide-react'
import { useEffect } from 'react'

type Priority = 1 | 2 | 3

interface PrioritySegmentProps {
  value: Priority
  onChange: (value: Priority) => void
}

const options = [
  { value: 3 as Priority, label: 'Mucho', icon: Heart, color: 'text-red-500', key: '1' },
  { value: 2 as Priority, label: 'Normal', icon: Star, color: 'text-yellow-400', key: '2' },
  { value: 1 as Priority, label: 'Un poco', icon: Sparkles, color: 'text-blue-400', key: '3' },
]

export function PrioritySegment({ value, onChange }: PrioritySegmentProps) {
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return
      if (e.key === '1') onChange(3)
      else if (e.key === '2') onChange(2)
      else if (e.key === '3') onChange(1)
    }
    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [onChange])

  return (
    <div className="space-y-2">
      <label className="block text-sm sm:text-base text-white">
        ¿Cuánto lo deseas?
      </label>
      
      <div className="relative flex gap-1.5 sm:gap-2 p-1 sm:p-1.5 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10">
        {options.map((option) => {
          const isSelected = value === option.value
          
          return (
            <button
              key={option.value}
              type="button"
              onClick={() => onChange(option.value)}
              className={`
                relative flex-1 px-2 py-2 sm:px-4 sm:py-2.5 rounded-md text-xs sm:text-sm font-medium
                transition-all duration-200
                ${isSelected 
                  ? 'text-gray-900' 
                  : 'text-white/70 hover:text-white hover:bg-white/5'
                }
              `}
              aria-pressed={isSelected}
            >
              {isSelected && (
                <motion.div
                  layoutId="priority-bg"
                  className="absolute inset-0 bg-white rounded-md shadow-lg border border-white/20"
                  transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                />
              )}
              
              <span className="relative flex items-center justify-center gap-1 sm:gap-1.5">
                <option.icon className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${option.color}`} />
                <span className="hidden xs:inline">{option.label}</span>
              </span>
            </button>
          )
        })}
      </div>
      
      <p className="text-[10px] xs:text-xs text-gray-500">
        <span className="hidden sm:inline">Mucho: lo deseo muchísimo | Normal: me gustaría | Un poco: si es posible</span>
        <span className="sm:hidden">Selecciona cuánto lo deseas</span>
      </p>
    </div>
  )
}
