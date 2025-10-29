import { TreePine } from 'lucide-react'

export default function HeaderNavidad() {
  return (
    <header className="text-center mb-8 md:mb-12 animate-in px-4">
      <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-3 md:mb-4 drop-shadow-2xl tracking-tight">
        Mi Lista de Deseos
      </h1>
      <p className="text-[16px] md:text-lg text-white/90 max-w-2xl mx-auto leading-relaxed">
        <span className="inline-flex items-center gap-2">
          Comparte tus deseos navideños con familia y amigos
          <TreePine className="w-5 h-5 text-green-400" />
        </span>
      </p>
    </header>
  )
}
