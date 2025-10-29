'use client'

import { useEffect, useState } from 'react'
import { Button } from './Button'
import { formatUrl } from '@/lib/formatUrl'

interface LinkPreview {
  title: string
  description: string
  image: string | null
  url: string
  domain: string
}

interface LinkPreviewCardProps {
  url: string
}

export function LinkPreviewCard({ url }: LinkPreviewCardProps) {
  const [preview, setPreview] = useState<LinkPreview | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    const fetchPreview = async () => {
      try {
        const res = await fetch(`/api/link-preview?url=${encodeURIComponent(url)}`)
        if (!res.ok) throw new Error('Failed')
        const data = await res.json()
        setPreview(data)
      } catch {
        setError(true)
      } finally {
        setLoading(false)
      }
    }

    fetchPreview()
  }, [url])

  if (loading) {
    return (
      <div className="mt-3 bg-white/5 rounded-lg p-4 animate-pulse">
        <div className="h-4 bg-white/10 rounded w-3/4 mb-2" />
        <div className="h-3 bg-white/10 rounded w-1/2" />
      </div>
    )
  }

  if (error || !preview) return null

  return (
    <div className="mt-3 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 overflow-hidden hover:bg-white/15 transition-all">
      <div className="flex gap-3 p-3">
        {preview.image && (
          <img
            src={preview.image}
            alt={preview.title}
            className="w-20 h-20 object-cover rounded flex-shrink-0"
          />
        )}
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-white text-sm line-clamp-2 mb-1 break-words">
            {preview.title}
          </h4>
          <p className="text-xs text-white/60 mb-2 break-all" title={preview.url}>
            {formatUrl(preview.url, 40)}
          </p>
          <Button
            as="a"
            href={preview.url}
            target="_blank"
            rel="noopener noreferrer"
            variant="ghost"
            size="sm"
            className="text-xs"
          >
            Ver producto 🎁
          </Button>
        </div>
      </div>
    </div>
  )
}
