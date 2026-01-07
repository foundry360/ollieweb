import { NextRequest, NextResponse } from 'next/server'
import { requireAuth } from '@/lib/auth'
import { createAdminClient } from '@/lib/supabase/server'

export async function POST(request: NextRequest) {
  try {
    const admin = await requireAuth()
    const adminClient = createAdminClient()
    const { applicationId } = await request.json()

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
        status: 'approved',
        reviewed_by: admin.id,
        reviewed_at: new Date().toISOString(),
      })
      .eq('id', applicationId)

    if (updateError) {
      return NextResponse.json({ error: 'Failed to approve application' }, { status: 500 })
    }

    // If user_id exists, create/update user profile
    if (application.user_id) {
      const { error: userError } = await adminClient
        .from('users')
        .upsert({
          id: application.user_id,
          email: application.email,
          full_name: application.full_name,
          phone: application.phone,
          date_of_birth: application.date_of_birth,
          role: 'poster',
          application_status: 'approved',
          verified: application.phone_verified || false,
        }, {
          onConflict: 'id',
        })

      if (userError) {
        console.error('Error creating user profile:', userError)
        // Don't fail the request, but log the error
      }
    }

    return NextResponse.json({ success: true })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}





