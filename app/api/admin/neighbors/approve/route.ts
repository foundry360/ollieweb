import { NextRequest, NextResponse } from 'next/server'
import { requireAuth } from '@/lib/auth'
import { createAdminClient } from '@/lib/supabase/server'

export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  try {
    const admin = await requireAuth()
    
    if (!admin || !admin.id) {
      console.error('Admin authentication failed or admin.id is missing')
      return NextResponse.json({ 
        error: 'Authentication failed',
        details: 'Admin user not found or invalid' 
      }, { status: 401 })
    }

    const adminClient = createAdminClient()
    const { applicationId } = await request.json()

    if (!applicationId) {
      return NextResponse.json({ error: 'Application ID required' }, { status: 400 })
    }

    console.log('Approving application:', applicationId, 'by admin:', admin.id)

    // Get the application
    const { data: application, error: fetchError } = await adminClient
      .from('pending_neighbor_applications')
      .select('*')
      .eq('id', applicationId)
      .single()

    if (fetchError) {
      console.error('Error fetching application:', fetchError)
      return NextResponse.json({ 
        error: 'Application not found',
        details: fetchError.message 
      }, { status: 404 })
    }

    if (!application) {
      return NextResponse.json({ error: 'Application not found' }, { status: 404 })
    }

    if (application.status !== 'pending') {
      return NextResponse.json({ 
        error: 'Application already processed',
        details: `Current status: ${application.status}` 
      }, { status: 400 })
    }

    // Update application status
    // Note: reviewed_by might have a foreign key constraint
    // If admin.id doesn't exist in users table, we'll set it to null
    const updateData: any = {
      status: 'approved',
      reviewed_at: new Date().toISOString(),
    }

    // Check if admin exists in users table before setting reviewed_by
    const { data: adminUser } = await adminClient
      .from('users')
      .select('id')
      .eq('id', admin.id)
      .single()

    if (adminUser && adminUser.id) {
      updateData.reviewed_by = adminUser.id
    } else {
      // If admin doesn't exist in users table, leave reviewed_by as null
      // This avoids foreign key constraint violations
      console.warn('Admin user not found in users table, leaving reviewed_by as null')
    }

    console.log('Updating application with data:', updateData)

    const { error: updateError, data: updateDataResult } = await adminClient
      .from('pending_neighbor_applications')
      .update(updateData)
      .eq('id', applicationId)
      .select()

    if (updateError) {
      console.error('Error updating application status:', updateError)
      console.error('Update data attempted:', updateData)
      return NextResponse.json({ 
        error: 'Failed to approve application',
        details: updateError.message,
        code: updateError.code,
        hint: updateError.hint
      }, { status: 500 })
    }

    console.log('Application status updated successfully')

    // If user_id exists, create/update user profile
    if (application.user_id) {
      const userData: any = {
        id: application.user_id,
        email: application.email,
        full_name: application.full_name || null,
        phone: application.phone || null,
        role: 'poster',
        application_status: 'approved',
        verified: application.phone_verified || false,
      }

      // Only add date_of_birth if it exists
      if (application.date_of_birth) {
        userData.date_of_birth = application.date_of_birth
      }

      console.log('Creating/updating user profile:', userData)

      const { error: userError, data: userResult } = await adminClient
        .from('users')
        .upsert(userData, {
          onConflict: 'id',
        })
        .select()

      if (userError) {
        console.error('Error creating/updating user profile:', userError)
        console.error('User data attempted:', userData)
        // Return error if user creation fails, as this is important
        return NextResponse.json({ 
          error: 'Application approved but failed to create user profile',
          details: userError.message,
          code: userError.code,
          hint: userError.hint
        }, { status: 500 })
      }

      console.log('User profile created/updated successfully')
    } else {
      // If no user_id, log a warning but don't fail
      // The application is approved, but user profile creation is skipped
      console.warn('Application has no user_id, skipping user profile creation')
    }

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error('Unexpected error in approve route:', error)
    console.error('Error stack:', error.stack)
    return NextResponse.json({ 
      error: error.message || 'An unexpected error occurred',
      details: error.stack,
      type: error.constructor?.name
    }, { status: 500 })
  }
}





