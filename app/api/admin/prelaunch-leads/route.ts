import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/server'
import { requireAuth } from '@/lib/auth'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    await requireAuth()
    const adminClient = createAdminClient()

    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '50')
    const search = searchParams.get('search') || ''

    const offset = (page - 1) * limit

    // Build query
    let query = adminClient
      .from('prelaunch_leads')
      .select('*', { count: 'exact' })

    // Apply search filter if provided (search in both email and full_name)
    if (search) {
      query = query.or(`email.ilike.%${search}%,full_name.ilike.%${search}%`)
    }

    // Apply pagination
    query = query
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1)

    const { data: leads, error, count } = await query

    if (error) {
      console.error('Error fetching pre-launch leads:', error)
      return NextResponse.json(
        { error: 'Failed to fetch pre-launch leads' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      leads: leads || [],
      total: count || 0,
      page,
      limit,
      totalPages: Math.ceil((count || 0) / limit),
    })
  } catch (error: any) {
    console.error('Error in pre-launch leads API:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to fetch pre-launch leads' },
      { status: 500 }
    )
  }
}

