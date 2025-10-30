"use client";

export default function ChristmasTreeLoader({
  className = "w-32 h-32",
  label = "Cargando…",
  decorative = false,
}: { className?: string; label?: string; decorative?: boolean }) {
  const aria = decorative ? { "aria-hidden": true } : { role: "img", "aria-label": label };
  
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-4">
        <div className="w-28 h-28 sm:w-32 sm:h-32" {...aria}>
          <svg viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg" className="w-full h-full animate-pulse">
            {/* copa del árbol */}
            <g id="tree" fill="#10b981">
              <path d="M64 10 22 64h22L24 96h28v22h24V96h28L84 64h22L64 10z" />
            </g>
            {/* tronco */}
            <rect x="58" y="96" width="12" height="16" rx="2" fill="#92400e" />
            {/* bolas rojas y doradas (estáticas) */}
            <g id="baubles">
              <circle cx="48" cy="52" r="4" fill="#E11D48" />
              <circle cx="80" cy="56" r="4" fill="#FACC15" />
              <circle cx="60" cy="70" r="4" fill="#E11D48" />
              <circle cx="72" cy="44" r="4" fill="#FACC15" />
            </g>
            {/* luces animadas */}
            <g id="lights" className="lights">
              <circle cx="64" cy="36" r="2" className="light light-a" />
              <circle cx="46" cy="64" r="2" className="light light-b" />
              <circle cx="82" cy="68" r="2" className="light light-c" />
              <circle cx="64" cy="80" r="2" className="light light-a" />
            </g>
            <style>{`
              @media (prefers-reduced-motion: reduce) {
                .light { animation: none !important; }
                #tree { animation: none !important; }
              }
              .light { opacity: .85; }
              .light-a { animation: lightCycle 1.8s ease-in-out infinite; }
              .light-b { animation: lightCycle 1.8s ease-in-out .3s infinite; }
              .light-c { animation: lightCycle 1.8s ease-in-out .6s infinite; }
              #tree { 
                animation: treeGlow 2s ease-in-out infinite;
                transform-origin: center;
              }
              @keyframes lightCycle {
                0%   { fill:#22C55E; opacity:.4 }
                25%  { fill:#FACC15; opacity:.75 }
                50%  { fill:#E11D48; opacity:.9 }
                75%  { fill:#FFFFFF; opacity:.7 }
                100% { fill:#22C55E; opacity:.4 }
              }
              @keyframes treeGlow {
                0%, 100% { opacity: 0.8; }
                50% { opacity: 1; }
              }
            `}</style>
          </svg>
        </div>
        <p className="text-white text-base sm:text-lg font-semibold font-sans drop-shadow-lg">{label}</p>
      </div>
    </div>
  );
}
