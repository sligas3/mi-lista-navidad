import { isAdmin } from '@/lib/auth-helpers'
import { redirect } from 'next/navigation'
import { ReactNode } from 'react'

interface AdminGuardProps {
  children: ReactNode
}

export async function AdminGuard({ children }: AdminGuardProps) {
  const admin = await isAdmin()

  if (!admin) {
    redirect('/')
  }

  return <>{children}</>
}
