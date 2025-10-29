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
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          );
        },
      },
    }
  );

  const { data: { session } } = await supabase.auth.getSession();
  
  if (session) {
    redirect("/dashboard");
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
