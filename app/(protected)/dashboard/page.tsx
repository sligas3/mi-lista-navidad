import { redirect } from 'next/navigation';
import { getWishes } from '@/app/actions';
import { getCurrentUser } from '@/app/actions/auth';
import ClientPage from '@/app/ClientPage';

export const dynamic = 'force-dynamic';

export default async function DashboardPage() {
  const user = await getCurrentUser();
  
  if (!user) {
    redirect('/login?next=/dashboard');
  }
  
  const wishes = await getWishes();

  return <ClientPage initialWishes={wishes} user={user} />;
}
