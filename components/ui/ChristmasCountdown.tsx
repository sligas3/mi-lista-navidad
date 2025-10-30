import { getCurrentUser } from '@/app/actions/auth'
import { ChristmasCountdownClient } from './ChristmasCountdownClient'

export async function ChristmasCountdown() {
  const user = await getCurrentUser()
  
  if (!user || !user.family_code) {
    return null
  }

  return <ChristmasCountdownClient />
}
