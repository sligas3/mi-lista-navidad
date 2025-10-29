'use client';

import { Button } from '@/components/ui/Button';
import { Gift, Sparkles } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center px-4 py-16 sm:py-20">
      <div className="max-w-4xl mx-auto text-center space-y-6 sm:space-y-8 motion-safe:animate-fade-up">
        <div className="space-y-4 sm:space-y-6 md:space-y-8">
          {/* Logo */}
          <div className="flex justify-center">
            <img 
              src="/logo.png" 
              alt="Mi Lista de Deseos Navideña" 
              className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 object-contain motion-safe:animate-float"
            />
          </div>
          
          <h1 className="text-[2.5rem] leading-[1.1] sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white">
            Mi Lista de Deseos
            <br />
            <span className="text-emerald-400">Navideña 🎄</span>
          </h1>
          <p className="text-[1rem] leading-relaxed sm:text-lg md:text-xl lg:text-2xl text-white/80 max-w-2xl mx-auto">
            Comparte tus deseos con familia y amigos. Simple, festivo y colaborativo.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-stretch sm:items-center pt-2 sm:pt-4 max-w-md sm:max-w-none mx-auto">
          <Button
            as="a"
            href="/login"
            variant="primary"
            size="lg"
            className="w-full sm:w-auto min-w-[200px]"
          >
            <Gift className="w-5 h-5" />
            Ingresar
          </Button>
          <Button
            as="a"
            href="/register"
            variant="outline"
            size="lg"
            className="w-full sm:w-auto min-w-[200px]"
          >
            <Sparkles className="w-5 h-5" />
            Crear cuenta
          </Button>
        </div>
      </div>
    </section>
  );
}
