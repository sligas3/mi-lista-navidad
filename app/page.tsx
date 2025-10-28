import { getWishes } from './actions'
import ClientPage from './ClientPage'

export const dynamic = 'force-dynamic'

export default async function Home() {
  const wishes = await getWishes()

  return <ClientPage initialWishes={wishes} />
}
