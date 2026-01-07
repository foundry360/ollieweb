import { NextRequest, NextResponse } from 'next/server'
import { requireAuth } from '@/lib/auth'
import { createAdminClient } from '@/lib/supabase/server'

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const admin = await requireAuth()
    const adminClient = createAdminClient()
    const { id } = params

    const { error } = await adminClient
      .from('admin_notifications')
      .update({ read: true })
      .eq('id', id)
      .eq('admin_id', admin.id)

    if (error) {
      console.error('Error marking notification as read:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error('Mark as read API error:', error)
    return NextResponse.json({ error: error.message || 'Failed to mark as read' }, { status: 500 })
  }
}





