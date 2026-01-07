import { NextRequest, NextResponse } from 'next/server'
import { requireAuth } from '@/lib/auth'
import { createAdminClient } from '@/lib/supabase/server'

export async function GET(request: NextRequest) {
  try {
    await requireAuth()
    const adminClient = createAdminClient()
    
    const { searchParams } = new URL(request.url)
    const days = parseInt(searchParams.get('days') || '90')
    
    // Determine grouping based on days
    const useDailyGrouping = days <= 30
    
    const startDate = new Date()
    startDate.setDate(startDate.getDate() - days)
    startDate.setHours(0, 0, 0, 0)
    
    // Fetch all completed gigs in the specified period
    // Use updated_at or created_at? Let's use updated_at since that's when it was completed
    const { data: gigs, error } = await adminClient
      .from('gigs')
      .select('updated_at, created_at')
      .eq('status', 'completed')
      .gte('updated_at', startDate.toISOString())
      .order('updated_at', { ascending: true })
    
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }
    
    let chartData: any[] = []
    
    if (useDailyGrouping) {
      // Daily grouping
      const gigsByDay: Record<string, number> = {}
      
      for (let i = 0; i < days; i++) {
        const date = new Date()
        date.setDate(date.getDate() - (days - 1 - i))
        date.setHours(0, 0, 0, 0)
        const dateKey = date.toISOString().split('T')[0]
        gigsByDay[dateKey] = 0
      }
      
      gigs?.forEach((gig: any) => {
        if (gig.updated_at) {
          const gigDate = new Date(gig.updated_at)
          gigDate.setHours(0, 0, 0, 0)
          const dateKey = gigDate.toISOString().split('T')[0]
          
          if (gigsByDay[dateKey] !== undefined) {
            gigsByDay[dateKey] += 1
          }
        }
      })
      
      chartData = Object.entries(gigsByDay)
        .map(([date, count]) => ({
          date,
          count,
          day: new Date(date).getDate(),
          month: new Date(date).getMonth() + 1,
          year: new Date(date).getFullYear(),
        }))
        .sort((a, b) => a.date.localeCompare(b.date))
    } else {
      // Monthly grouping
      const gigsByMonth: Record<string, { count: number; month: number; year: number }> = {}
      
      const monthsToShow = Math.ceil(days / 30)
      const today = new Date()
      for (let i = 0; i < monthsToShow; i++) {
        const monthDate = new Date(today.getFullYear(), today.getMonth() - i, 1)
        const monthKey = `${monthDate.getFullYear()}-${String(monthDate.getMonth() + 1).padStart(2, '0')}`
        gigsByMonth[monthKey] = {
          count: 0,
          month: monthDate.getMonth() + 1,
          year: monthDate.getFullYear(),
        }
      }
      
      gigs?.forEach((gig: any) => {
        if (gig.updated_at) {
          const gigDate = new Date(gig.updated_at)
          const monthKey = `${gigDate.getFullYear()}-${String(gigDate.getMonth() + 1).padStart(2, '0')}`
          
          if (gigsByMonth[monthKey]) {
            gigsByMonth[monthKey].count += 1
          }
        }
      })
      
      chartData = Object.entries(gigsByMonth)
        .map(([monthKey, monthData]) => ({
          monthKey,
          date: monthKey,
          count: monthData.count,
          month: monthData.month,
          year: monthData.year,
        }))
        .sort((a, b) => a.monthKey.localeCompare(b.monthKey))
    }
    
    return NextResponse.json({ data: chartData })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}


