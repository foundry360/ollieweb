import { NextRequest, NextResponse } from 'next/server'
import { requireAuth } from '@/lib/auth'
import { createAdminClient } from '@/lib/supabase/server'

export async function POST(request: NextRequest) {
  try {
    const admin = await requireAuth()
    const adminClient = createAdminClient()
    const { applicationId, rejectionReason } = await request.json()

    if (!applicationId) {
      return NextResponse.json({ error: 'Application ID required' }, { status: 400 })
    }

    // Get the application
    const { data: application, error: fetchError } = await adminClient
      .from('pending_neighbor_applications')
      .select('*')
      .eq('id', applicationId)
      .single()

    if (fetchError || !application) {
      return NextResponse.json({ error: 'Application not found' }, { status: 404 })
    }

    if (application.status !== 'pending') {
      return NextResponse.json({ error: 'Application already processed' }, { status: 400 })
    }

    // Update application status
    const { error: updateError } = await adminClient
      .from('pending_neighbor_applications')
      .update({
        status: 'rejected',
        reviewed_by: admin.id,
        reviewed_at: new Date().toISOString(),
        rejection_reason: rejectionReason || null,
      })
      .eq('id', applicationId)

    if (updateError) {
      return NextResponse.json({ error: 'Failed to reject application' }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}




