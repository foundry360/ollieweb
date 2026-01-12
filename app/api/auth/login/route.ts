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

async function isAdmin(userId: string): Promise<boolean> {
  try {
    const adminClient = createAdminClient()
    const { data, error } = await adminClient
      .from('admin_users')
      .select('id')
      .eq('id', userId)
      .single()
    
    if (error || !data) {
      return false
    }
    
    return true
  } catch {
    return false
  }
}

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 })
    }

    // Use standard client for authentication
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )

    // Sign in with password
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error || !data.session) {
      console.error('Supabase login error:', error)
      return NextResponse.json(
        { error: error?.message || 'Invalid email or password' },
        { status: 401 }
      )
    }

    // Check if user is an admin
    const userIsAdmin = await isAdmin(data.session.user.id)
    if (!userIsAdmin) {
      return NextResponse.json(
        { error: 'Access denied. Admin privileges required.' },
        { status: 403 }
      )
    }

    // Log the login event
    try {
      const adminClient = createAdminClient()
      const clientIP = request.headers.get('x-forwarded-for') || 
                       request.headers.get('x-real-ip') || 
                       'unknown'
      const userAgent = request.headers.get('user-agent') || 'unknown'
      
      await adminClient
        .from('login_events')
        .insert({
          user_id: data.session.user.id,
          email: data.session.user.email || email,
          ip_address: clientIP,
          user_agent: userAgent,
          platform: 'web',
        })
    } catch (logError) {
      // Don't fail login if logging fails, just log the error
      console.error('Failed to log login event:', logError)
    }

    // Get project reference from URL for cookie name
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
    const projectRef = supabaseUrl.split('//')[1]?.split('.')[0] || 'supabase'

    // Create response
    const response = NextResponse.json({
      success: true,
      user: {
        id: data.session.user.id,
        email: data.session.user.email,
      },
    })

    // Set cookies - only include tokens, not the full user object
    const cookieName = `sb-${projectRef}-auth-token`
    
    // Minimal session data - just what we need for auth
    const sessionData = {
      access_token: data.session.access_token,
      refresh_token: data.session.refresh_token,
      expires_at: data.session.expires_at,
    }

    const cookieValue = JSON.stringify(sessionData)
    console.log('Cookie size:', cookieValue.length, 'bytes')
    
    // Set the cookie
    response.cookies.set(cookieName, cookieValue, {
      path: '/',
      sameSite: 'lax',
      httpOnly: false,
      secure: false, // Allow on localhost
      maxAge: 60 * 60 * 24 * 7, // 1 week
    })

    console.log('Login successful, cookie set for:', email)
    console.log('Cookie name:', cookieName)
    
    return response
  } catch (error: any) {
    console.error('Login error:', error)
    return NextResponse.json({ error: error.message || 'Failed to login' }, { status: 500 })
  }
}
