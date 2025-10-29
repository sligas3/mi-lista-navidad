'use client';

import { Gift, Users, Star, CheckCircle } from 'lucide-react';

const features = [
  {
    icon: Users,
    title: 'Comparte con tu familia',
    description: 'Todos pueden ver y agregar deseos en una lista colaborativa',
  },
  {
    icon: Gift,
    title: 'Agrega regalos con links',
    description: 'Incluye enlaces a productos para facilitar las compras',
  },
  {
    icon: Star,
    title: 'Prioriza tus deseos',
    description: 'Marca lo que más quieres: Mucho, Normal o Un poco',
  },
  {
    icon: CheckCircle,
    title: 'Marca cumplidos',
    description: 'Lleva control de qué deseos ya se hicieron realidad',
  },
];

export default function Features() {
  return (
    <section className="py-12 sm:py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white text-center mb-8 sm:mb-12">
          ¿Qué puedes hacer?
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="bg-white/10 backdrop-blur-md rounded-lg p-5 sm:p-6 border border-white/20 motion-safe:hover:scale-105 motion-safe:hover:border-white/40 transition-all duration-200 ease-out min-h-[160px] flex flex-col"
            >
              <feature.icon className="w-10 h-10 sm:w-12 sm:h-12 text-emerald-400 mb-3 sm:mb-4" />
              <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">{feature.title}</h3>
              <p className="text-white/70 text-sm leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
