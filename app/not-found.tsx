import Link from 'next/link';
import BackgroundFX from '@/components/ui/BackgroundFX';
import SnowEffect from '@/components/SnowEffect';
import { Button } from '@/components/ui/Button';
import { Home, LayoutDashboard } from 'lucide-react';

export default function NotFound() {

  return (
    <>
      <BackgroundFX />
      <SnowEffect />
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center space-y-6 bg-white/10 backdrop-blur-xl rounded-2xl p-8 border border-white/20">
          <div className="space-y-4">
            <div className="text-8xl">🎄</div>
            <h1 className="text-6xl font-bold text-white">404</h1>
            <h2 className="text-2xl font-semibold text-white">Página no encontrada</h2>
            <p className="text-white/70">
              Esta página no existe o ha sido movida.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              as="a"
              href="/"
              variant="primary"
              size="lg"
              className="w-full sm:w-auto"
            >
              <Home className="w-5 h-5" />
              Ir al inicio
            </Button>
            <Button
              as="a"
              href="/dashboard"
              variant="secondary"
              size="lg"
              className="w-full sm:w-auto"
            >
              <LayoutDashboard className="w-5 h-5" />
              Ir al panel
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
