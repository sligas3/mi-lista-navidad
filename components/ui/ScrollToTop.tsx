"use client";

import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      // Mostrar después de 300px de scroll
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", toggleVisibility, { passive: true });
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (!isVisible) return null;

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-20 right-4 z-40 
        w-12 h-12 md:w-14 md:h-14
        bg-white/10 hover:bg-white/20
        text-white rounded-full shadow-lg 
        flex items-center justify-center
        transition-all duration-300 ease-out
        hover:scale-110 active:scale-95
        backdrop-blur-md
        border border-white/30
        animate-in fade-in slide-in-from-bottom-4"
      aria-label="Volver arriba"
    >
      <ArrowUp className="w-5 h-5 md:w-6 md:h-6" />
    </button>
  );
}
