'use client';

import { UserPlus, Users, PlusCircle, Share2, Lightbulb } from 'lucide-react';

const steps = [
  {
    icon: UserPlus,
    title: '1. Crea tu cuenta',
    description: 'Regístrate con Google o email en segundos',
  },
  {
    icon: Users,
    title: '2. Configura tu familia',
    description: 'Crea un código de familia o únete a uno existente para compartir deseos',
    highlight: true,
  },
  {
    icon: PlusCircle,
    title: '3. Agrega deseos',
    description: 'Escribe tus deseos navideños y priorízalos (Mucho, Normal, Un poco)',
  },
  {
    icon: Share2,
    title: '4. Comparte el código',
    description: 'Invita a tu familia compartiendo el código para que todos vean y agreguen deseos',
  },
];

export default function HowItWorks() {
  return (
    <section className="py-12 sm:py-16 px-4">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white text-center mb-4">
          ¿Cómo funciona?
        </h2>
        <p className="text-white/70 text-center mb-8 sm:mb-12 max-w-2xl mx-auto">
          Sigue estos simples pasos para crear y compartir tu lista de deseos navideña
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {steps.map((step, idx) => (
            <div 
              key={idx} 
              className={`text-center space-y-3 sm:space-y-4 p-6 rounded-xl transition-all ${
                step.highlight 
                  ? 'bg-blue-600/10 border-2 border-blue-400/50 shadow-lg shadow-blue-500/20' 
                  : 'bg-white/5 border border-white/10'
              }`}
            >
              <div className={`inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full ${
                step.highlight
                  ? 'bg-blue-600/20 border-2 border-blue-400'
                  : 'bg-emerald-600/20 border-2 border-emerald-400'
              }`}>
                <step.icon className={`w-7 h-7 sm:w-8 sm:h-8 ${
                  step.highlight ? 'text-blue-400' : 'text-emerald-400'
                }`} />
              </div>
              <h3 className="text-base sm:text-lg font-semibold text-white">{step.title}</h3>
              <p className="text-white/70 text-xs sm:text-sm leading-relaxed">{step.description}</p>
              {step.highlight && (
                <div className="pt-2">
                  <span className="inline-block px-3 py-1 bg-blue-500/20 border border-blue-400/30 rounded-full text-blue-300 text-xs font-semibold">
                    ¡Importante!
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
        
        {/* Nota adicional */}
        <div className="mt-8 sm:mt-12 p-4 sm:p-6 bg-yellow-500/10 border border-yellow-400/30 rounded-xl">
          <div className="flex items-start gap-3">
            <Users className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-400 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="text-white font-semibold mb-1 text-sm sm:text-base inline-flex items-center gap-2">
                <Lightbulb className="w-4 h-4 sm:w-5 sm:h-5" />
                Sobre el código de familia
              </h4>
              <p className="text-white/70 text-xs sm:text-sm leading-relaxed">
                El código de familia es único y permite que solo tu familia vea y comparta deseos entre ustedes. 
                Puedes crear uno nuevo o unirte a uno existente si alguien de tu familia ya lo creó.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
