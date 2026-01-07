import { NextRequest, NextResponse } from 'next/server'
import { requireAuth } from '@/lib/auth'
import { createAdminClient } from '@/lib/supabase/server'

export const dynamic = 'force-dynamic'

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

    // Parse full name into first and last name
    const nameParts = application.full_name.trim().split(/\s+/)
    const firstName = nameParts[0] || ''
    const lastName = nameParts.slice(1).join(' ') || ''

    if (!firstName || !lastName) {
      return NextResponse.json({ 
        error: 'Invalid name format. First and last name required.' 
      }, { status: 400 })
    }

    // Get API key from environment variables
    const apiKey = process.env.OFFENDERS_IO_API_KEY
    if (!apiKey) {
      console.error('OFFENDERS_IO_API_KEY not configured')
      return NextResponse.json({ 
        error: 'Verification service not configured' 
      }, { status: 500 })
    }

    // Build query parameters
    const params = new URLSearchParams({
      firstName,
      lastName,
      key: apiKey,
    })

    // Add optional parameters if available
    if (application.date_of_birth) {
      const dob = new Date(application.date_of_birth)
      params.append('dob', dob.toISOString().split('T')[0]) // Format: YYYY-MM-DD
    }

    if (application.address) {
      // Try to extract ZIP code from address
      const zipMatch = application.address.match(/\b\d{5}(-\d{4})?\b/)
      if (zipMatch) {
        params.append('zipcode', zipMatch[0])
      }
    }

    // Call Offenders.io API
    const apiUrl = `https://api.offenders.io/sexoffender?${params.toString()}`
    console.log('Calling Offenders.io API:', apiUrl.replace(apiKey, '***'))

    const apiResponse = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!apiResponse.ok) {
      console.error('Offenders.io API error:', apiResponse.status, apiResponse.statusText)
      return NextResponse.json({ 
        error: 'Verification service unavailable',
        details: `API returned ${apiResponse.status}` 
      }, { status: 500 })
    }

    const apiData = await apiResponse.json()

    // Process the response
    // The API typically returns an array of offenders or an object with results
    let matches: any[] = []
    let verified = true

    if (Array.isArray(apiData)) {
      matches = apiData
    } else if (apiData.offenders && Array.isArray(apiData.offenders)) {
      matches = apiData.offenders
    } else if (apiData.data && Array.isArray(apiData.data)) {
      matches = apiData.data
    } else if (apiData.results && Array.isArray(apiData.results)) {
      matches = apiData.results
    }

    // If there are matches, verification fails
    if (matches && matches.length > 0) {
      verified = false
    }

    // Format the results
    const offenders = matches.map((match: any) => ({
      firstName: match.firstName || match.first_name || '',
      lastName: match.lastName || match.last_name || '',
      address: match.address || match.street || '',
      city: match.city || '',
      state: match.state || '',
      zipcode: match.zipcode || match.zip || '',
      offenses: match.offenses || match.offense || match.charges || [],
    }))

    // Get admin user ID from users table (for checked_by foreign key)
    let checkedByUserId: string | null = null
    if (admin && admin.id) {
      const { data: adminUser } = await adminClient
        .from('users')
        .select('id')
        .eq('id', admin.id)
        .single()
      
      if (adminUser && adminUser.id) {
        checkedByUserId = adminUser.id
      }
    }

    // Save verification check audit record
    const checkRecord = {
      application_id: applicationId,
      checked_by: checkedByUserId,
      verified,
      matches_count: matches.length,
      offenders_data: offenders.length > 0 ? offenders : null,
      api_response: apiData,
      checked_at: new Date().toISOString(),
    }

    const { error: checkRecordError } = await adminClient
      .from('neighbor_verification_checks')
      .insert(checkRecord)

    if (checkRecordError) {
      console.error('Error saving verification check record:', checkRecordError)
      // Don't fail the request, but log the error
    }

    // Update the application with verification status
    const { error: updateError } = await adminClient
      .from('pending_neighbor_applications')
      .update({
        phone_verified: verified,
        phone_verified_at: verified ? new Date().toISOString() : null,
        updated_at: new Date().toISOString(),
      })
      .eq('id', applicationId)

    if (updateError) {
      console.error('Error updating verification status:', updateError)
      // Don't fail the request, just log the error
    }

    return NextResponse.json({
      success: true,
      result: {
        verified,
        matches: matches.length,
        offenders,
      },
    })
  } catch (error: any) {
    console.error('Unexpected error in verify route:', error)
    return NextResponse.json({ 
      error: error.message || 'An unexpected error occurred',
      details: error.stack 
    }, { status: 500 })
  }
}


