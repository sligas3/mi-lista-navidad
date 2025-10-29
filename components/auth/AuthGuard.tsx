import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase-server'

interface AuthGuardProps {
  children: React.ReactNode
  redirectTo?: string
}

export default async function AuthGuard({ children, redirectTo }: AuthGuardProps) {
  const supabase = await createClient()
  const { data: { session } } = await supabase.auth.getSession()
  
  if (!session) {
    const currentPath = redirectTo || '/'
    redirect(`/login?next=${encodeURIComponent(currentPath)}`)
  }
  
  return <>{children}</>
}
