import { createClient } from '@/lib/supabase-server'
import { redirect } from 'next/navigation'
import { ReactNode } from 'react'

interface AuthGuardProps {
  children: ReactNode
  requireAdmin?: boolean
}

export async function AuthGuard({ children, requireAdmin = false }: AuthGuardProps) {
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  if (requireAdmin) {
    const { data: profile } = await supabase
      .from('users')
      .select('role')
      .eq('id', user.id)
      .single()

    if (profile?.role !== 'admin') {
      redirect('/')
    }
  }

  return <>{children}</>
}
