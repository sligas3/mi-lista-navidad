import { getWishes } from './actions'
import { getCurrentUser } from './actions/auth'
import ClientPage from './ClientPage'
import AuthGuard from '@/components/auth/AuthGuard'

export const dynamic = 'force-dynamic'

export default async function Home() {
  return (
    <AuthGuard redirectTo="/">
      <HomeContent />
    </AuthGuard>
  )
}

async function HomeContent() {
  const wishes = await getWishes()
  const user = await getCurrentUser()

  return <ClientPage initialWishes={wishes} user={user} />
}
