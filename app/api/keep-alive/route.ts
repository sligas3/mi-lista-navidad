import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export async function GET() {
  try {
    const { error } = await supabase
      .from('wishes')
      .select('id')
      .limit(1)
    
    if (error) throw error
    
    return NextResponse.json({ 
      status: 'ok', 
      timestamp: new Date().toISOString() 
    })
  } catch (error) {
    return NextResponse.json({ 
      status: 'error', 
      error: String(error) 
    }, { status: 500 })
  }
}
