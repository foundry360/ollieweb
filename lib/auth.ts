import { createClient } from '@supabase/supabase-js'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { createAdminClient } from './supabase/server'

function getProjectRef(): string {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
  return supabaseUrl.split('//')[1]?.split('.')[0] || 'supabase'
}

export async function getCurrentUser() {
  const cookieStore = await cookies()
  const projectRef = getProjectRef()
  const cookieName = `sb-${projectRef}-auth-token`
  
  const authCookie = cookieStore.get(cookieName)
  if (!authCookie?.value) {
    return null
  }
  
  try {
    const session = JSON.parse(authCookie.value)
    if (!session.access_token) {
      return null
    }
    
    // Verify the token with Supabase
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
      return null
    }
    
    return user
  } catch {
    return null
  }
}

export async function isAdmin(userId: string): Promise<boolean> {
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

export async function requireAuth() {
  const user = await getCurrentUser()
  if (!user) {
    redirect('/login')
  }
  
  // Check if user is an admin
  const userIsAdmin = await isAdmin(user.id)
  if (!userIsAdmin) {
    redirect('/login?error=unauthorized')
  }
  
  return user
}
