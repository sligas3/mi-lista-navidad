'use client';

import { motion } from 'framer-motion';

interface CookieLoaderProps {
  message?: string;
}

export function CookieLoader({ message = 'Cargando...' }: CookieLoaderProps) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-4 px-4">
        {/* Cookie SVG con animación de mordida */}
        <div className="relative w-24 h-24 sm:w-28 sm:h-28">
          <svg viewBox="0 0 100 120" className="w-full h-full">
            <defs>
              {/* Clip path para limitar mordiscos a la circunferencia */}
              <clipPath id="cookieClip">
                <circle cx="50" cy="50" r="45" />
              </clipPath>
            </defs>
            
            {/* Cookie base - círculo completo */}
            <circle cx="50" cy="50" r="45" fill="#C2691E" />
            
            {/* Borde más oscuro */}
            <circle cx="50" cy="50" r="45" fill="none" stroke="#8B4513" strokeWidth="2" />
            
            {/* Chips de chocolate distribuidos */}
            <circle cx="35" cy="30" r="4" fill="#3E2723" />
            <circle cx="55" cy="25" r="3.5" fill="#3E2723" />
            <circle cx="65" cy="40" r="4" fill="#3E2723" />
            <circle cx="30" cy="50" r="3" fill="#3E2723" />
            <circle cx="50" cy="45" r="4.5" fill="#3E2723" />
            <circle cx="70" cy="60" r="3.5" fill="#3E2723" />
            <circle cx="40" cy="65" r="4" fill="#3E2723" />
            <circle cx="55" cy="70" r="3" fill="#3E2723" />
            <circle cx="35" cy="80" r="3.5" fill="#3E2723" />
            <circle cx="60" cy="85" r="4" fill="#3E2723" />
            
            {/* Mordidas animadas de arriba hacia abajo */}
            <motion.g
              clipPath="url(#cookieClip)"
              animate={{ 
                opacity: [1, 1, 1, 0]
              }}
              transition={{ 
                duration: 3.5,
                repeat: Infinity,
                times: [0, 0.7, 0.85, 1],
                repeatDelay: 0.5
              }}
            >
              <motion.path
                d="M 28 5 L 32 2 L 36 4 L 40 1 L 44 3 L 48 0 L 52 3 L 56 1 L 60 4 L 64 2 L 68 5 Q 72 8 70 12 L 68 16 L 64 18 L 60 17 L 56 19 L 52 18 L 48 20 L 44 18 L 40 19 L 36 17 L 32 18 L 28 16 Q 24 12 28 5 Z"
                fill="#1a1a2e"
                animate={{ 
                  opacity: [0, 1, 1, 1, 1]
                }}
                transition={{ 
                  duration: 3.5,
                  repeat: Infinity,
                  times: [0, 0.15, 0.7, 0.85, 1],
                  repeatDelay: 0.5
                }}
              />
              
              {/* Segunda mordida: mordisco irregular desplazado a la derecha */}
              <motion.path
                d="M 58 8 L 62 6 L 66 8 L 70 5 L 74 7 L 78 4 L 82 7 L 86 5 L 90 8 Q 93 12 90 16 L 88 20 L 84 22 L 80 21 L 76 23 L 72 22 L 68 24 L 64 22 L 60 23 L 56 21 Q 53 17 58 8 Z"
                fill="#1a1a2e"
                animate={{ 
                  opacity: [0, 0, 1, 1, 1]
                }}
                transition={{ 
                  duration: 3.5,
                  repeat: Infinity,
                  times: [0, 0.25, 0.35, 0.85, 1],
                  repeatDelay: 0.5
                }}
              />
              
              {/* Tercera mordida: mordisco irregular desplazado a la izquierda */}
              <motion.path
                d="M 10 8 L 14 5 L 18 7 L 22 4 L 26 7 L 30 5 L 34 8 L 38 6 L 42 8 Q 45 12 42 16 L 40 20 L 36 22 L 32 21 L 28 23 L 24 22 L 20 24 L 16 22 L 12 23 L 8 21 Q 5 17 10 8 Z"
                fill="#1a1a2e"
                animate={{ 
                  opacity: [0, 0, 1, 1, 1]
                }}
                transition={{ 
                  duration: 3.5,
                  repeat: Infinity,
                  times: [0, 0.4, 0.5, 0.85, 1],
                  repeatDelay: 0.5
                }}
              />
            </motion.g>
            
            {/* Migas cayendo desde diferentes alturas */}
            {[0, 1, 2, 3, 4].map((i) => (
              <motion.g key={i}>
                <motion.circle
                  cx={40 + i * 8}
                  cy={10 + i * 15}
                  r="2"
                  fill="#C2691E"
                  initial={{ opacity: 0, y: 0 }}
                  animate={{ 
                    opacity: [0, 1, 1, 0],
                    y: [0, 20, 40, 60]
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.3
                  }}
                />
                <motion.circle
                  cx={45 + i * 7}
                  cy={15 + i * 15}
                  r="1.5"
                  fill="#8B4513"
                  initial={{ opacity: 0, y: 0 }}
                  animate={{ 
                    opacity: [0, 1, 1, 0],
                    y: [0, 25, 50, 70]
                  }}
                  transition={{ 
                    duration: 2.2,
                    repeat: Infinity,
                    delay: i * 0.3 + 0.1
                  }}
                />
              </motion.g>
            ))}
          </svg>
        </div>

        {/* Mensaje */}
        <motion.p
          className="text-white text-base sm:text-lg font-semibold"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {message}
        </motion.p>

        {/* Puntos animados */}
        <div className="flex gap-1.5">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-2 h-2 bg-yellow-500 rounded-full"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
