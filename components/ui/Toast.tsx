'use client'

import { cn } from "@/lib/cn";
import { useEffect } from "react";

export interface ToastProps {
  message: string;
  variant?: 'success' | 'error' | 'info' | 'warning';
  onClose: () => void;
  duration?: number;
}

const variantStyles = {
  success: "bg-green-50 text-green-800 border-green-200",
  error: "bg-red-50 text-red-800 border-red-200",
  info: "bg-blue-50 text-blue-800 border-blue-200",
  warning: "bg-yellow-50 text-yellow-800 border-yellow-200",
};

const icons = {
  success: "✓",
  error: "✕",
  info: "ℹ",
  warning: "⚠",
};

export function Toast({ message, variant = 'success', onClose, duration = 3000 }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [onClose, duration]);

  return (
    <div
      className={cn(
        "fixed bottom-4 right-4 z-50 animate-in flex items-center gap-3 rounded-lg border px-4 py-3 shadow-lg max-w-md",
        variantStyles[variant]
      )}
      role="alert"
      aria-live="polite"
    >
      <span className="text-lg font-semibold">{icons[variant]}</span>
      <p className="text-sm font-medium flex-1">{message}</p>
      <button
        onClick={onClose}
        className="text-current opacity-70 hover:opacity-100 transition-opacity"
        aria-label="Cerrar"
      >
        ✕
      </button>
    </div>
  );
}
