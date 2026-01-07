import { NextRequest, NextResponse } from 'next/server'
import { requireAuth } from '@/lib/auth'
import { createAdminClient } from '@/lib/supabase/server'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    await requireAuth()
    const adminClient = createAdminClient()
    
    const searchParams = request.nextUrl.searchParams
    const role = searchParams.get('role')
    const verified = searchParams.get('verified')
    const applicationStatus = searchParams.get('application_status')
    const search = searchParams.get('search')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '50')
    const offset = (page - 1) * limit

    let query = adminClient.from('users').select('*', { count: 'exact' })

    if (role) {
      query = query.eq('role', role)
    }

    if (verified !== null) {
      query = query.eq('verified', verified === 'true')
    }

    if (applicationStatus) {
      query = query.eq('application_status', applicationStatus)
    }

    if (search) {
      query = query.or(`full_name.ilike.%${search}%,email.ilike.%${search}%,phone.ilike.%${search}%`)
    }

    query = query.order('created_at', { ascending: false })
      .range(offset, offset + limit - 1)

    const { data, error, count } = await query

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({
      users: data || [],
      total: count || 0,
      page,
      limit,
    })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}





