import { TreePine } from 'lucide-react'

export default function HeaderNavidad() {
  return (
    <header className="text-center mb-6 sm:mb-8 md:mb-12 mt-16 sm:mt-20 animate-in px-3 sm:px-4">
      <h1 className="font-display text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-2 sm:mb-3 md:mb-4 drop-shadow-2xl tracking-tight pt-2">
        Mi Lista de Deseos
      </h1>
      <p className="text-sm sm:text-[16px] md:text-lg text-white/90 max-w-2xl mx-auto leading-relaxed">
        <span className="inline-flex items-center gap-1.5 sm:gap-2">
          <span className="hidden xs:inline">Comparte tus deseos navideños con familia y amigos</span>
          <span className="xs:hidden">Comparte tus deseos</span>
          <TreePine className="w-4 h-4 sm:w-5 sm:h-5 text-green-400" />
        </span>
      </p>
    </header>
  )
}
