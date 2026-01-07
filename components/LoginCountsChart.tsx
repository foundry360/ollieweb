'use client'

import { useQuery } from '@tanstack/react-query'
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip, CartesianGrid } from 'recharts'
import { format, parseISO } from 'date-fns'
import { ArrowUp, ArrowDown } from 'lucide-react'

interface ChartDataPoint {
  date: string
  monthKey?: string
  count: number
  month?: number
  year?: number
  day?: number
}

interface LoginCountsChartProps {
  days?: number
}

export function LoginCountsChart({ days = 90 }: LoginCountsChartProps) {
  const { data, isLoading, error } = useQuery({
    queryKey: ['login-counts', days],
    queryFn: async () => {
      const response = await fetch(`/api/admin/login-counts?days=${days}`)
      if (!response.ok) throw new Error('Failed to fetch login counts data')
      const result = await response.json()
      return result.data as ChartDataPoint[]
    },
  })

  if (isLoading) {
    return (
      <div className="w-full">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-medium text-gray-500">Login Counts</h3>
          <span className="text-xs font-medium text-gray-400">Loading...</span>
        </div>
        <div className="flex items-center justify-center h-48">
          <div className="text-sm text-gray-400">Loading...</div>
        </div>
      </div>
    )
  }

  if (error || !data || data.length === 0) {
    const totalLogins = data ? data.reduce((sum, d) => sum + d.count, 0) : 0
    return (
      <div className="w-full">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-medium text-gray-500">Login Counts</h3>
          <span className="text-xs font-medium text-gray-700">
            {totalLogins > 0 ? `${totalLogins.toLocaleString()} logins` : '0 logins'}
          </span>
        </div>
        <div className="flex items-center justify-center h-48">
          <div className="text-sm text-gray-400">No data available</div>
        </div>
      </div>
    )
  }

  // Format data for Recharts
  const chartData = data.map((point) => {
    if (point.day !== undefined) {
      // Daily data
      const dateObj = parseISO(point.date)
      return {
        date: format(dateObj, 'MMM d'),
        count: point.count,
        fullDate: point.date,
        day: point.day,
        month: point.month,
        year: point.year,
      }
    } else {
      // Monthly data
      const monthDate = new Date(point.year!, point.month! - 1, 1)
      const monthLabel = format(monthDate, 'MMM yyyy')
      return {
        date: monthLabel,
        count: point.count,
        fullDate: point.date,
        month: point.month,
        year: point.year,
      }
    }
  })

  const totalLogins = data.reduce((sum, d) => sum + d.count, 0)

  // Calculate trend: compare first half vs second half of the period
  const calculateTrend = () => {
    if (chartData.length < 2) return null
    const midpoint = Math.floor(chartData.length / 2)
    const firstHalf = chartData.slice(0, midpoint).reduce((sum, d) => sum + d.count, 0)
    const secondHalf = chartData.slice(midpoint).reduce((sum, d) => sum + d.count, 0)
    if (firstHalf === 0) return secondHalf > 0 ? 'up' : 'neutral'
    return secondHalf > firstHalf ? 'up' : secondHalf < firstHalf ? 'down' : 'neutral'
  }

  const trend = calculateTrend()
  const TrendIcon = trend === 'up' ? ArrowUp : trend === 'down' ? ArrowDown : null
  const trendColor = trend === 'up' ? 'text-primary' : trend === 'down' ? 'text-red-600' : 'text-gray-400'

  // Calculate interval to ensure all labels fit
  const calculateInterval = (dataPoints: number): number => {
    if (dataPoints <= 7) return 0 // Show all for 7 days or less
    if (dataPoints === 30) return 4 // Show every 5th label for 30 days (~6 labels)
    if (dataPoints <= 14) return 1 // Show every other for up to 14 days
    // For more data points, calculate to show approximately 10-12 labels
    const targetLabels = 11
    const interval = Math.floor((dataPoints - 1) / targetLabels)
    return Math.max(0, interval)
  }

  const labelInterval = calculateInterval(chartData.length)
  
  // Adjust right margin based on days to prevent label cutoff
  const rightMargin = days <= 7 ? 15 : days <= 14 ? 10 : 5

  return (
    <div className="w-full">
      {/* Title with counter */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-gray-500">Login Counts</h3>
        <div className="flex items-center gap-1.5">
          {TrendIcon && <TrendIcon className={`w-3 h-3 ${trendColor}`} />}
          <span className="text-xs font-medium text-gray-700">
            {totalLogins.toLocaleString()} logins
          </span>
        </div>
      </div>
      
      <ResponsiveContainer width="100%" height={180}>
        <LineChart
          data={chartData}
          margin={{ top: 5, right: rightMargin, left: 20, bottom: 5 }}
        >
          <XAxis
            dataKey="date"
            axisLine={false}
            tickLine={false}
            hide={false}
            tick={{ fontSize: 10, fill: '#6b7280' }}
            interval={labelInterval}
            angle={0}
            textAnchor="middle"
          />
          <YAxis
            hide
            domain={['dataMin', 'auto']}
          />
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" opacity={0.5} />
          <Tooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                return (
                  <div className="bg-white p-2 border border-gray-200 rounded shadow-sm">
                    <p className="text-xs text-gray-600">
                      {payload[0].payload.fullDate
                        ? format(parseISO(payload[0].payload.fullDate), payload[0].payload.day !== undefined ? 'MMM d, yyyy' : 'MMMM yyyy')
                        : payload[0].payload.date}
                    </p>
                    <p className="text-sm font-semibold text-gray-900">
                      {payload[0].value?.toLocaleString()} logins
                    </p>
                  </div>
                )
              }
              return null
            }}
          />
          <Line
            type="monotone"
            dataKey="count"
            stroke="#db7028"
            strokeWidth={2}
            dot={{ fill: '#ffffff', stroke: '#db7028', strokeWidth: 2, r: 3 }}
            activeDot={{ r: 5, fill: '#ffffff', stroke: '#db7028', strokeWidth: 2 }}
          />
        </LineChart>
      </ResponsiveContainer>
      
      {/* Period label - centered */}
      <div className="mt-2 flex items-center justify-center text-xs text-gray-500">
        <span>Last 30 days</span>
      </div>
    </div>
  )
}
