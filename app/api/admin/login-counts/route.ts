import { NextRequest, NextResponse } from 'next/server'
import { requireAuth } from '@/lib/auth'
import { createAdminClient } from '@/lib/supabase/server'

export const dynamic = 'force-dynamic'

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
    
    // Fetch all login events in the specified period
    const { data: logins, error } = await adminClient
      .from('login_events')
      .select('created_at')
      .gte('created_at', startDate.toISOString())
      .order('created_at', { ascending: true })
    
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }
    
    let chartData: any[] = []
    
    if (useDailyGrouping) {
      // Daily grouping
      const loginsByDay: Record<string, number> = {}
      
      for (let i = 0; i < days; i++) {
        const date = new Date()
        date.setDate(date.getDate() - (days - 1 - i))
        date.setHours(0, 0, 0, 0)
        const dateKey = date.toISOString().split('T')[0]
        loginsByDay[dateKey] = 0
      }
      
      logins?.forEach((login: any) => {
        if (login.created_at) {
          const loginDate = new Date(login.created_at)
          loginDate.setHours(0, 0, 0, 0)
          const dateKey = loginDate.toISOString().split('T')[0]
          
          if (loginsByDay[dateKey] !== undefined) {
            loginsByDay[dateKey] += 1
          }
        }
      })
      
      chartData = Object.entries(loginsByDay)
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
      const loginsByMonth: Record<string, { count: number; month: number; year: number }> = {}
      
      const monthsToShow = Math.ceil(days / 30)
      const today = new Date()
      for (let i = 0; i < monthsToShow; i++) {
        const monthDate = new Date(today.getFullYear(), today.getMonth() - i, 1)
        const monthKey = `${monthDate.getFullYear()}-${String(monthDate.getMonth() + 1).padStart(2, '0')}`
        loginsByMonth[monthKey] = {
          count: 0,
          month: monthDate.getMonth() + 1,
          year: monthDate.getFullYear(),
        }
      }
      
      logins?.forEach((login: any) => {
        if (login.created_at) {
          const loginDate = new Date(login.created_at)
          const monthKey = `${loginDate.getFullYear()}-${String(loginDate.getMonth() + 1).padStart(2, '0')}`
          
          if (loginsByMonth[monthKey]) {
            loginsByMonth[monthKey].count += 1
          }
        }
      })
      
      chartData = Object.entries(loginsByMonth)
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

