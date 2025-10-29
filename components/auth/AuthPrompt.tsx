'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { TreePine } from 'lucide-react'

interface AuthPromptProps {
  message?: string
  action?: string
}

export function AuthPrompt({ 
  message = 'Inicia sesión para continuar',
  action = 'Ingresar'
}: AuthPromptProps) {
  return (
    <div className="text-center py-8 space-y-4">
      <p className="text-white/80 text-sm">{message}</p>
      <Link href="/login">
        <Button variant="primary" size="md">
          <TreePine className="w-4 h-4" />
          {action}
        </Button>
      </Link>
    </div>
  )
}
