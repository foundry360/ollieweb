import { createClient } from '@supabase/supabase-js'
import { NextResponse, type NextRequest } from 'next/server'

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

function getProjectRef(): string {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
  return supabaseUrl.split('//')[1]?.split('.')[0] || 'supabase'
}

// Parse the auth cookie manually
function getSessionFromCookies(request: NextRequest): { access_token: string; refresh_token: string; expires_at?: number } | null {
  const projectRef = getProjectRef()
  const cookieName = `sb-${projectRef}-auth-token`
  
  const cookie = request.cookies.get(cookieName)
  if (!cookie?.value) {
    console.log('[Middleware] No auth cookie found')
    return null
  }
  
  try {
    const parsed = JSON.parse(cookie.value)
    if (parsed.access_token) {
      console.log('[Middleware] Found valid session cookie')
      return parsed
    }
  } catch (e) {
    console.log('[Middleware] Failed to parse cookie:', e)
  }
  
  return null
}

export async function middleware(request: NextRequest) {
  const response = NextResponse.next()
  const pathname = request.nextUrl.pathname

  // Skip middleware for API routes (let them handle their own auth)
  if (pathname.startsWith('/api/')) {
    return response
  }

  // Get session from cookies
  const session = getSessionFromCookies(request)

  // Protect dashboard routes
  if (pathname.startsWith('/dashboard')) {
    if (!session) {
      return NextResponse.redirect(new URL('/login', request.url))
    }
    
    // Verify the token is still valid
    try {
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
          global: {
            headers: {
              Authorization: `Bearer ${session.access_token}`
            }
          }
        }
      )
      
      const { data: { user }, error } = await supabase.auth.getUser()
      
      if (error || !user) {
        // Token is invalid, redirect to login and clear cookies
        const redirectResponse = NextResponse.redirect(new URL('/login', request.url))
        const projectRef = getProjectRef()
        redirectResponse.cookies.delete(`sb-${projectRef}-auth-token`)
        // Also delete any chunked cookies
        for (let i = 0; i < 10; i++) {
          redirectResponse.cookies.delete(`sb-${projectRef}-auth-token.${i}`)
        }
        return redirectResponse
      }
      
      // Check if user is an admin
      const userIsAdmin = await isAdmin(user.id)
      if (!userIsAdmin) {
        // User is not an admin, redirect to login with error
        const redirectResponse = NextResponse.redirect(new URL('/login?error=unauthorized', request.url))
        const projectRef = getProjectRef()
        redirectResponse.cookies.delete(`sb-${projectRef}-auth-token`)
        // Also delete any chunked cookies
        for (let i = 0; i < 10; i++) {
          redirectResponse.cookies.delete(`sb-${projectRef}-auth-token.${i}`)
        }
        return redirectResponse
      }
    } catch {
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }

  // DON'T redirect from login page - let users always access it
  // They can manually go to dashboard if already logged in

  return response
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
