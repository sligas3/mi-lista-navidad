'use client';

import { Button } from '@/components/ui/Button';
import { Gift, Sparkles, ChevronDown, TreePine } from 'lucide-react';

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
            <span className="text-emerald-400 inline-flex items-center gap-2 sm:gap-3">
              Navideña <TreePine className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12" />
            </span>
          </h1>
          <p className="text-[1rem] leading-relaxed sm:text-lg md:text-xl lg:text-2xl text-white/80 max-w-2xl mx-auto">
            Comparte tus deseos con familia y amigos. Simple, festivo y colaborativo.
          </p>
        </div>

        {/* Scroll indicator */}
        <div className="pt-8 sm:pt-12">
          <p className="text-white/60 text-sm mb-4">
            Descubre cómo funciona antes de comenzar
          </p>
          <button
            onClick={() => {
              const howItWorks = document.querySelector('section:nth-of-type(2)');
              howItWorks?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }}
            className="inline-flex flex-col items-center gap-2 text-emerald-400 hover:text-emerald-300 transition-colors group"
            aria-label="Ver cómo funciona"
          >
            <span className="text-sm font-semibold">Ver cómo funciona</span>
            <ChevronDown className="w-6 h-6 motion-safe:animate-bounce" />
          </button>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-stretch sm:items-center pt-6 sm:pt-8 max-w-md sm:max-w-none mx-auto">
          <Button
            as="a"
            href="/register"
            variant="primary"
            size="lg"
            className="w-full sm:w-auto min-w-[200px]"
          >
            <Sparkles className="w-5 h-5" />
            Crear cuenta
          </Button>
          <Button
            as="a"
            href="/login"
            variant="outline"
            size="lg"
            className="w-full sm:w-auto min-w-[200px]"
          >
            <Gift className="w-5 h-5" />
            Ingresar
          </Button>
        </div>
      </div>
    </section>
  );
}
