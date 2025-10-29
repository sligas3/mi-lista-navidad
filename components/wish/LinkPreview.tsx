'use client'

import { formatUrl } from '@/lib/formatUrl'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle2, AlertCircle } from 'lucide-react'
import { useState, useEffect } from 'react'

interface LinkPreviewProps {
  url: string
}

export function LinkPreview({ url }: LinkPreviewProps) {
  const [debouncedUrl, setDebouncedUrl] = useState(url)

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedUrl(url), 300)
    return () => clearTimeout(timer)
  }, [url])

  if (!debouncedUrl) return null

  let isValid = false
  let hostname = ''

  try {
    const urlObj = new URL(debouncedUrl)
    isValid = true
    hostname = urlObj.hostname
  } catch {
    isValid = false
  }

  return (
    <AnimatePresence>
      {url && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.2 }}
          className="overflow-hidden"
        >
          <div className={`
            flex items-start gap-3 p-3 rounded-lg border text-sm
            ${isValid 
              ? 'bg-green-50 border-green-200' 
              : 'bg-amber-50 border-amber-200'
            }
          `}>
            {isValid ? (
              <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
            ) : (
              <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
            )}
            <div className="flex-1 min-w-0">
              {isValid ? (
                <>
                  <p className="font-medium text-green-900">{hostname}</p>
                  <p className="text-green-700 truncate">{formatUrl(debouncedUrl)}</p>
                </>
              ) : (
                <p className="text-amber-700">
                  URL incompleta o inválida
                </p>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
