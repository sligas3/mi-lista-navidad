import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const url = searchParams.get('url')

  if (!url) {
    return NextResponse.json({ error: 'URL is required' }, { status: 400 })
  }

  try {
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 3000)

    const response = await fetch(
      `https://api.microlink.io?url=${encodeURIComponent(url)}&screenshot=false&video=false`,
      {
        headers: { 'Content-Type': 'application/json' },
        signal: controller.signal,
        next: { revalidate: 86400 },
      }
    )

    clearTimeout(timeout)

    if (!response.ok) throw new Error('Failed to fetch')

    const data = await response.json()

    if (data.status !== 'success') throw new Error('No preview')

    return NextResponse.json({
      title: data.data.title || 'Sin título',
      description: data.data.description || '',
      image: data.data.image?.url || data.data.logo?.url || null,
      url: data.data.url,
      domain: new URL(data.data.url).hostname,
    })
  } catch (error) {
    return NextResponse.json({ error: 'Preview not available' }, { status: 500 })
  }
}
