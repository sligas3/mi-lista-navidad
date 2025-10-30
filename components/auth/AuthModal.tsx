'use client'

import { BaseModal } from '@/components/ui/BaseModal'
import { AuthPanel } from './AuthPanel'
import { TreePine } from 'lucide-react'

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
  initialMode?: 'login' | 'register'
}

export function AuthModal({ isOpen, onClose, initialMode }: AuthModalProps) {
  return (
    <BaseModal isOpen={isOpen} onClose={onClose} title="Bienvenido" icon={TreePine}>
      <AuthPanel initialMode={initialMode} />
    </BaseModal>
  )
}
