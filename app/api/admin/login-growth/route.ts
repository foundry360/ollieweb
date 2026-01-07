import { NextRequest, NextResponse } from 'next/server'
import { requireAuth } from '@/lib/auth'
import { createAdminClient } from '@/lib/supabase/server'

export async function GET(request: NextRequest) {
  try {
    await requireAuth()
    const adminClient = createAdminClient()
    
    // Get login data for the last 12 months
    const twelveMonthsAgo = new Date()
    twelveMonthsAgo.setMonth(twelveMonthsAgo.getMonth() - 12)
    twelveMonthsAgo.setDate(1) // First day of the month
    twelveMonthsAgo.setHours(0, 0, 0, 0)
    
    // Fetch all login events in the last 12 months
    const { data: logins, error } = await adminClient
      .from('login_events')
      .select('created_at')
      .gte('created_at', twelveMonthsAgo.toISOString())
      .order('created_at', { ascending: true })
    
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }
    
    // Group logins by month
    const loginsByMonth: Record<string, { count: number; month: number; year: number }> = {}
    
    // Initialize months for the last 12 months
    const today = new Date()
    for (let i = 0; i < 12; i++) {
      const monthDate = new Date(today.getFullYear(), today.getMonth() - i, 1)
      const monthKey = `${monthDate.getFullYear()}-${String(monthDate.getMonth() + 1).padStart(2, '0')}`
      loginsByMonth[monthKey] = {
        count: 0,
        month: monthDate.getMonth() + 1,
        year: monthDate.getFullYear(),
      }
    }
    
    // Count logins by month
    logins?.forEach((login: any) => {
      if (login.created_at) {
        const loginDate = new Date(login.created_at)
        const monthKey = `${loginDate.getFullYear()}-${String(loginDate.getMonth() + 1).padStart(2, '0')}`
        
        if (loginsByMonth[monthKey]) {
          loginsByMonth[monthKey].count += 1
        }
      }
    })
    
    // Convert to array format for the chart
    const chartData = Object.entries(loginsByMonth)
      .map(([monthKey, monthData]) => ({
        monthKey,
        date: monthKey,
        count: monthData.count,
        month: monthData.month,
        year: monthData.year,
      }))
      .sort((a, b) => a.monthKey.localeCompare(b.monthKey))
    
    return NextResponse.json({ data: chartData })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

