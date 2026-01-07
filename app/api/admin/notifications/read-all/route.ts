import { NextRequest, NextResponse } from 'next/server'
import { requireAuth } from '@/lib/auth'
import { createAdminClient } from '@/lib/supabase/server'

export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  try {
    const admin = await requireAuth()
    const adminClient = createAdminClient()

    const { error } = await adminClient
      .from('admin_notifications')
      .update({ read: true })
      .eq('admin_id', admin.id)
      .eq('read', false)

    if (error) {
      console.error('Error marking all as read:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error('Mark all as read API error:', error)
    return NextResponse.json({ error: error.message || 'Failed to mark all as read' }, { status: 500 })
  }
}





