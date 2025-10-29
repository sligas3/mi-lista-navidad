'use client';

export default function LandingFooter() {
  return (
    <footer 
      className="py-6 sm:py-8 px-4 border-t border-white/10"
      style={{
        paddingBottom: 'max(1.5rem, calc(env(safe-area-inset-bottom) + 1rem))',
      }}
    >
      <div className="max-w-6xl mx-auto text-center space-y-4">
        <p className="text-white/60 text-sm leading-relaxed">
          © {new Date().getFullYear()} Mi Lista de Deseos Navideña. Hecho con ❤️ para esta Navidad.
        </p>
      </div>
    </footer>
  );
}
