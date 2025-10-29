import { Header } from "@/components/layout/Header";
import { getCurrentUser } from "@/app/actions/auth";

export default async function ProtectedLayout({ children }: { children: React.ReactNode }) {
  const user = await getCurrentUser();
  
  return (
    <>
      <Header user={user} />
      {children}
    </>
  );
}
