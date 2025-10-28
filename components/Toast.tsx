'use client'

import { useEffect } from 'react'

interface ToastProps {
  message: string
  type?: 'success' | 'error' | 'info'
  onClose: () => void
}

export default function Toast({ message, type = 'success', onClose }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000)
    return () => clearTimeout(timer)
  }, [onClose])

  const colors = {
    success: 'bg-green-500',
    error: 'bg-red-500',
    info: 'bg-blue-500',
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 animate-fade-in">
      <div className={`${colors[type]} text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2`}>
        <span>{message}</span>
        <button onClick={onClose} className="ml-2 hover:opacity-80">
          ✕
        </button>
      </div>
    </div>
  )
}
