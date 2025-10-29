'use client'

import { useState, useMemo } from 'react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Label } from '@/components/ui/Label'
import { Card } from '@/components/ui/Card'
import { User } from '@/lib/types/database'
import { PrioritySegment } from '@/components/wish/PrioritySegment'
import { LinkPreview } from '@/components/wish/LinkPreview'
import { motion } from 'framer-motion'
import { Sparkles, Link as LinkIcon, Gift, TreePine } from 'lucide-react'
import Link from 'next/link'

interface WishFormProps {
  nombreUsuario: string
  onSubmit: (deseo: string, prioridad: 1 | 2 | 3) => Promise<void>
  user?: User | null
}

export default function WishForm({ nombreUsuario, onSubmit, user }: WishFormProps) {
  const [titulo, setTitulo] = useState('')
  const [link, setLink] = useState('')
  const [prioridad, setPrioridad] = useState<1 | 2 | 3>(2)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  
  const shouldAnimate = useMemo(() => {
    if (typeof window === 'undefined') return false
    return window.matchMedia('(prefers-reduced-motion: no-preference)').matches && 
           navigator.hardwareConcurrency > 4
  }, [])
  
  const MotionDiv = shouldAnimate ? motion.div : 'div'

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!titulo.trim()) {
      setError('Por favor escribe el título de tu deseo')
      return
    }

    setLoading(true)
    setError('')
    try {
      const deseo = link.trim() ? `${titulo.trim()} ${link.trim()}` : titulo.trim()
      await onSubmit(deseo, prioridad)
      setTitulo('')
      setLink('')
      setPrioridad(2)
    } catch (err) {
      setError('Error al agregar el deseo')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card>
      <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
        <MotionDiv
          {...(shouldAnimate && {
            initial: { opacity: 0, y: 10 },
            animate: { opacity: 1, y: 0 },
            transition: { delay: 0.1 }
          })}
          className="space-y-2"
        >
          <Label htmlFor="titulo" required className="text-sm sm:text-base flex items-center gap-1.5 sm:gap-2">
            <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            ¿Qué deseas?
          </Label>
          <Input
            id="titulo"
            value={titulo}
            onChange={(e) => {
              setTitulo(e.target.value)
              setError('')
            }}
            placeholder="Ej: Un libro de aventuras"
            maxLength={500}
            error={error}
          />
        </MotionDiv>

        <MotionDiv
          {...(shouldAnimate && {
            initial: { opacity: 0, y: 10 },
            animate: { opacity: 1, y: 0 },
            transition: { delay: 0.2 }
          })}
          className="space-y-2"
        >
          <Label htmlFor="link" className="text-sm sm:text-base flex items-center gap-1.5 sm:gap-2">
            <LinkIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            Link
          </Label>
          <Input
            id="link"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            placeholder="https://..."
            maxLength={2048}
            type="url"
          />
          <LinkPreview url={link} />
        </MotionDiv>

        <MotionDiv
          {...(shouldAnimate && {
            initial: { opacity: 0, y: 10 },
            animate: { opacity: 1, y: 0 },
            transition: { delay: 0.3 }
          })}
        >
          <PrioritySegment value={prioridad} onChange={setPrioridad} />
        </MotionDiv>

        {user ? (
          <MotionDiv
            {...(shouldAnimate && {
              initial: { opacity: 0, y: 10 },
              animate: { opacity: 1, y: 0 },
              transition: { delay: 0.4 }
            })}
          >
            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full font-bold shadow-2xl shadow-green-900/60"
              isLoading={loading}
              leftIcon={<Gift className="w-4 h-4 sm:w-5 sm:h-5" />}
            >
              Agregar deseo
            </Button>
            <p className="text-[10px] xs:text-xs text-center text-white/60 mt-2 sm:mt-3">
              Pidiendo como: <span className="font-semibold text-white">{user.display_name || user.email}</span>
            </p>
          </MotionDiv>
        ) : (
          <div className="space-y-3">
            <p className="text-xs sm:text-sm text-center text-white/80">
              Inicia sesión para crear deseos
            </p>
            <Link href="/login?returnUrl=/" className="block">
              <Button
                type="button"
                variant="primary"
                size="lg"
                className="w-full font-bold"
                leftIcon={<TreePine className="w-4 h-4 sm:w-5 sm:h-5" />}
              >
                Ingresar
              </Button>
            </Link>
          </div>
        )}
      </form>
    </Card>
  )
}
