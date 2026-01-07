import { NextRequest, NextResponse } from 'next/server'
import { requireAuth } from '@/lib/auth'
import { createAdminClient } from '@/lib/supabase/server'

export async function POST(request: NextRequest) {
  try {
    await requireAuth()
    const adminClient = createAdminClient()
    const { recipientIds, content } = await request.json()

    if (!recipientIds || !Array.isArray(recipientIds) || recipientIds.length === 0) {
      return NextResponse.json({ error: 'Recipients required' }, { status: 400 })
    }

    if (!content || content.trim().length === 0) {
      return NextResponse.json({ error: 'Message content required' }, { status: 400 })
    }

    // Get or create system sender (Ollie admin user)
    // First, try to find an admin user to use as sender, or create a system user
    const { data: adminUsers } = await adminClient
      .from('users')
      .select('id')
      .eq('role', 'admin')
      .limit(1)

    let senderId: string
    if (adminUsers && adminUsers.length > 0) {
      senderId = adminUsers[0].id
    } else {
      // If no admin user exists, we'll use the current admin's ID
      const admin = await requireAuth()
      senderId = admin.id
    }

    // Create message records for each recipient
    const messages = recipientIds.map((recipientId: string) => ({
      sender_id: senderId,
      recipient_id: recipientId,
      content: content.trim(),
      read: false,
      gig_id: null,
    }))

    const { error } = await adminClient
      .from('messages')
      .insert(messages)

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ 
      success: true, 
      sent: messages.length 
    })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}





