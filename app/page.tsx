import { getWishes } from './actions'
import { getCurrentUser } from './actions/auth'
import ClientPage from './ClientPage'

export const dynamic = 'force-dynamic'

export default async function Home() {
  const wishes = await getWishes()
  const user = await getCurrentUser()

  return <ClientPage initialWishes={wishes} user={user} />
}
