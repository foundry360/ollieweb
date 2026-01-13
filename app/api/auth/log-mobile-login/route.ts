import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

function createAdminClient() {
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  
  if (!serviceRoleKey) {
    throw new Error('Missing SUPABASE_SERVICE_ROLE_KEY environment variable')
  }
  
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    serviceRoleKey,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    }
  )
}

/**
 * API endpoint for mobile apps to log login events
 * Mobile apps should call this after successful authentication via Supabase Auth
 * 
 * Expected payload:
 * {
 *   platform: 'mobile_ios' | 'mobile_android' | 'mobile',
 *   ip_address?: string,
 *   user_agent?: string
 * }
 * 
 * The user_id and email are extracted from the authenticated session
 */
export async function POST(request: NextRequest) {
  try {
    // Get the authorization token from the request
    const authHeader = request.headers.get('authorization')
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Authorization header required' },
        { status: 401 }
      )
    }

    const token = authHeader.replace('Bearer ', '')
    
    // Verify the token and get user info
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )

    const { data: { user }, error: authError } = await supabase.auth.getUser(token)
    
    if (authError || !user) {
      return NextResponse.json(
        { error: 'Invalid or expired token' },
        { status: 401 }
      )
    }

    // Parse request body
    const body = await request.json()
    const { platform, ip_address, user_agent } = body

    // Validate platform
    const validPlatforms = ['mobile_ios', 'mobile_android', 'mobile']
    if (!platform || !validPlatforms.includes(platform)) {
      return NextResponse.json(
        { error: `Platform must be one of: ${validPlatforms.join(', ')}` },
        { status: 400 }
      )
    }

    // Get IP address from headers if not provided
    const clientIP = ip_address || 
                     request.headers.get('x-forwarded-for') || 
                     request.headers.get('x-real-ip') || 
                     null

    // Get user agent from headers if not provided
    const clientUserAgent = user_agent || 
                           request.headers.get('user-agent') || 
                           null

    // Log the login event
    try {
      const adminClient = createAdminClient()
      
      await adminClient
        .from('login_events')
        .insert({
          user_id: user.id,
          email: user.email || '',
          platform: platform,
          ip_address: clientIP,
          user_agent: clientUserAgent,
        })

      return NextResponse.json({
        success: true,
        message: 'Login event logged successfully',
      })
    } catch (logError: any) {
      console.error('Failed to log mobile login event:', logError)
      return NextResponse.json(
        { error: 'Failed to log login event', details: logError.message },
        { status: 500 }
      )
    }
  } catch (error: any) {
    console.error('Mobile login logging error:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to log mobile login' },
      { status: 500 }
    )
  }
}



