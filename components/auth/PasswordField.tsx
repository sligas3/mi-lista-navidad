'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/Input'

interface PasswordFieldProps {
  id: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  placeholder?: string
  required?: boolean
  minLength?: number
  showStrength?: boolean
}

export function PasswordField({
  id,
  value,
  onChange,
  placeholder = '••••••••',
  required = true,
  minLength = 6,
  showStrength = false
}: PasswordFieldProps) {
  const [show, setShow] = useState(false)

  const getStrength = (pwd: string): { level: number; label: string; color: string } => {
    if (pwd.length === 0) return { level: 0, label: '', color: '' }
    if (pwd.length < 6) return { level: 1, label: 'Débil', color: 'bg-red-500' }
    if (pwd.length < 10) return { level: 2, label: 'Media', color: 'bg-yellow-500' }
    return { level: 3, label: 'Fuerte', color: 'bg-green-500' }
  }

  const strength = showStrength ? getStrength(value) : null

  return (
    <div className="space-y-2">
      <div className="relative">
        <Input
          id={id}
          type={show ? 'text' : 'password'}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          minLength={minLength}
          className="pr-12"
        />
        <button
          type="button"
          onClick={() => setShow(!show)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400 rounded p-1"
          aria-label={show ? 'Ocultar contraseña' : 'Ver contraseña'}
        >
          <span className="text-lg" aria-hidden="true">
            {show ? '🙈' : '👁️'}
          </span>
        </button>
      </div>
      {showStrength && strength && strength.level > 0 && (
        <div className="space-y-1">
          <div className="flex gap-1">
            {[1, 2, 3].map((level) => (
              <div
                key={level}
                className={`h-1 flex-1 rounded-full transition-colors ${
                  level <= strength.level ? strength.color : 'bg-white/20'
                }`}
              />
            ))}
          </div>
          <p className="text-xs text-white/70">Fortaleza: {strength.label}</p>
        </div>
      )}
    </div>
  )
}
