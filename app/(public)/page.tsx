import { redirect } from "next/navigation";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import Hero from "@/components/landing/Hero";
import Features from "@/components/landing/Features";
import HowItWorks from "@/components/landing/HowItWorks";
import LandingFooter from "@/components/landing/Footer";
import BackgroundFX from "@/components/ui/BackgroundFX";
import SnowEffect from "@/components/SnowEffect";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const cookieStore = await cookies();
  
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll() {
          // No-op: cookies are read-only in this context
        },
      },
    }
  );

  try {
    const { data: { session }, error } = await supabase.auth.getSession();
    
    if (error) {
      // Limpiar cookies corruptas
      await supabase.auth.signOut();
    } else if (session) {
      redirect("/dashboard");
    }
  } catch (error) {
    // Silenciar errores de autenticación en landing page pública
  }

  return (
    <>
      <BackgroundFX />
      <SnowEffect />
      <div className="min-h-screen relative">
        <Hero />
        <Features />
        <HowItWorks />
        <LandingFooter />
      </div>
    </>
  );
}
