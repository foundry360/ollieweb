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
    // For 7-30 days: daily grouping
    // For 90-120 days: monthly grouping
    const useDailyGrouping = days <= 30
    
    const startDate = new Date()
    startDate.setDate(startDate.getDate() - days)
    startDate.setHours(0, 0, 0, 0)
    
    // Fetch all earnings - platform fee is stored in the earnings table
    const { data: earnings, error } = await adminClient
      .from('earnings')
      .select('created_at, platform_fee_amount')
      .gte('created_at', startDate.toISOString())
      .order('created_at', { ascending: true })
    
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }
    
    let chartData: any[] = []
    
    if (useDailyGrouping) {
      // Daily grouping for shorter periods
      const earningsByDay: Record<string, number> = {}
      
      // Initialize all days in the period
      for (let i = 0; i < days; i++) {
        const date = new Date()
        date.setDate(date.getDate() - (days - 1 - i))
        date.setHours(0, 0, 0, 0)
        const dateKey = date.toISOString().split('T')[0]
        earningsByDay[dateKey] = 0
      }
      
      earnings?.forEach((earning: any) => {
        if (earning.created_at) {
          const earningDate = new Date(earning.created_at)
          earningDate.setHours(0, 0, 0, 0)
          const dateKey = earningDate.toISOString().split('T')[0]
          
          if (earningsByDay[dateKey] !== undefined) {
            const platformFee = parseFloat(earning.platform_fee_amount?.toString() || '0') || 0
            earningsByDay[dateKey] += platformFee
          }
        }
      })
      
      chartData = Object.entries(earningsByDay)
        .map(([date, amount]) => ({
          date,
          amount: parseFloat(amount.toFixed(2)),
          day: new Date(date).getDate(),
          month: new Date(date).getMonth() + 1,
          year: new Date(date).getFullYear(),
        }))
        .sort((a, b) => a.date.localeCompare(b.date))
    } else {
      // Monthly grouping for longer periods
      const earningsByMonth: Record<string, { amount: number; month: number; year: number }> = {}
      
      // Calculate number of months to show
      const monthsToShow = Math.ceil(days / 30)
      const today = new Date()
      for (let i = 0; i < monthsToShow; i++) {
        const monthDate = new Date(today.getFullYear(), today.getMonth() - i, 1)
        const monthKey = `${monthDate.getFullYear()}-${String(monthDate.getMonth() + 1).padStart(2, '0')}`
        earningsByMonth[monthKey] = {
          amount: 0,
          month: monthDate.getMonth() + 1,
          year: monthDate.getFullYear(),
        }
      }
      
      earnings?.forEach((earning: any) => {
        if (earning.created_at) {
          const earningDate = new Date(earning.created_at)
          const monthKey = `${earningDate.getFullYear()}-${String(earningDate.getMonth() + 1).padStart(2, '0')}`
          
          if (earningsByMonth[monthKey]) {
            const platformFee = parseFloat(earning.platform_fee_amount?.toString() || '0') || 0
            if (platformFee > 0) {
              earningsByMonth[monthKey].amount += platformFee
            }
          }
        }
      })
      
      chartData = Object.entries(earningsByMonth)
        .map(([monthKey, monthData]) => ({
          monthKey,
          date: monthKey,
          amount: parseFloat(monthData.amount.toFixed(2)),
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

