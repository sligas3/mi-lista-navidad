'use client'

import { Button } from './Button'
import { formatUrl } from '@/lib/formatUrl'
import { ExternalLink } from 'lucide-react'

interface LinkPreviewCardProps {
  url: string
}

export function LinkPreviewCard({ url }: LinkPreviewCardProps) {
  let hostname = ''
  
  try {
    const urlObj = new URL(url)
    hostname = urlObj.hostname.replace('www.', '')
  } catch {
    return null
  }

  return (
    <div className="mt-3 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 overflow-hidden hover:bg-white/15 transition-all">
      <div className="flex flex-col xs:flex-row xs:items-center xs:justify-between gap-2 xs:gap-3 p-2 xs:p-3">
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-white text-[11px] xs:text-xs sm:text-sm mb-0.5 xs:mb-1 truncate">
            {hostname}
          </p>
          <p className="text-[10px] xs:text-xs text-white/60 truncate" title={url}>
            {formatUrl(url, 25)}
          </p>
        </div>
        <Button
          as="a"
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          variant="primary"
          size="sm"
          className="flex-shrink-0 w-full xs:w-auto text-[11px] xs:text-xs"
        >
          <ExternalLink className="w-3 h-3 xs:w-4 xs:h-4 mr-1" />
          Ver
        </Button>
      </div>
    </div>
  )
}
