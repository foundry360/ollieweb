import { NextRequest, NextResponse } from 'next/server'
import { requireAuth } from '@/lib/auth'
import { createAdminClient } from '@/lib/supabase/server'

export async function GET(request: NextRequest) {
  try {
    const admin = await requireAuth()
    const adminClient = createAdminClient()

    const { count, error } = await adminClient
      .from('admin_notifications')
      .select('*', { count: 'exact', head: true })
      .eq('admin_id', admin.id)
      .eq('read', false)

    if (error) {
      console.error('Error fetching unread count:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ count: count || 0 })
  } catch (error: any) {
    console.error('Unread count API error:', error)
    return NextResponse.json({ error: error.message || 'Failed to fetch unread count' }, { status: 500 })
  }
}





