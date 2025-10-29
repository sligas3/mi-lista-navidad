import { requireAdmin } from '@/lib/auth-helpers'
import { redirect } from 'next/navigation'
import { ReactNode } from 'react'

interface AdminGuardProps {
  children: ReactNode
}

export async function AdminGuard({ children }: AdminGuardProps) {
  try {
    await requireAdmin()
  } catch {
    redirect('/')
  }

  return <>{children}</>
}
