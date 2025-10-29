'use client'

import { cn } from "@/lib/cn";
import { useEffect } from "react";
import { CheckCircle, XCircle, Info, AlertTriangle, X } from 'lucide-react';

export interface ToastProps {
  message: string;
  variant?: 'success' | 'error' | 'info' | 'warning';
  onClose: () => void;
  duration?: number;
}

const variantStyles = {
  success: "bg-green-500/95 text-white border-green-400/50",
  error: "bg-red-500/95 text-white border-red-400/50",
  info: "bg-blue-500/95 text-white border-blue-400/50",
  warning: "bg-yellow-500/95 text-white border-yellow-400/50",
};

const iconComponents = {
  success: CheckCircle,
  error: XCircle,
  info: Info,
  warning: AlertTriangle,
};

export function Toast({ message, variant = 'success', onClose, duration = 3000 }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [onClose, duration]);

  return (
    <div
      className={cn(
        "fixed bottom-3 left-3 right-3 sm:bottom-4 sm:left-auto sm:right-4 sm:max-w-md z-50 animate-scale-in flex items-center gap-2 sm:gap-3 rounded-lg border px-3 py-2.5 sm:px-5 sm:py-3.5 shadow-2xl backdrop-blur-sm",
        variantStyles[variant]
      )}
      style={{
        paddingBottom: 'max(0.75rem, env(safe-area-inset-bottom))',
      }}
      role="alert"
      aria-live="polite"
    >
      {(() => {
        const IconComponent = iconComponents[variant]
        return <IconComponent className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0" />
      })()}
      <p className="text-xs sm:text-sm font-semibold flex-1">{message}</p>
      <button
        onClick={onClose}
        className="text-white/80 hover:text-white transition-colors min-w-[32px] min-h-[32px] flex items-center justify-center flex-shrink-0"
        aria-label="Cerrar notificación"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
