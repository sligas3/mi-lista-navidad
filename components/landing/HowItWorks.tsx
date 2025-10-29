'use client';

import { UserPlus, PlusCircle, Share2 } from 'lucide-react';

const steps = [
  {
    icon: UserPlus,
    title: 'Crea tu cuenta',
    description: 'Regístrate con Google o email en segundos',
  },
  {
    icon: PlusCircle,
    title: 'Agrega deseos',
    description: 'Escribe tus deseos y priorízalos',
  },
  {
    icon: Share2,
    title: 'Comparte',
    description: 'Invita a tu familia a ver y colaborar',
  },
];

export default function HowItWorks() {
  return (
    <section className="py-12 sm:py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white text-center mb-8 sm:mb-12">
          ¿Cómo funciona?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10">
          {steps.map((step, idx) => (
            <div key={idx} className="text-center space-y-3 sm:space-y-4">
              <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-emerald-600/20 border-2 border-emerald-400">
                <step.icon className="w-7 h-7 sm:w-8 sm:h-8 text-emerald-400" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-white">{step.title}</h3>
              <p className="text-white/70 text-sm sm:text-base leading-relaxed max-w-xs mx-auto">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
