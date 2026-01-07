'use client'

import { useQuery } from '@tanstack/react-query'
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip, CartesianGrid } from 'recharts'
import { format, parseISO } from 'date-fns'
import { ArrowUp, ArrowDown } from 'lucide-react'

interface ChartDataPoint {
  date: string
  count: number
}

interface UserGrowthChartProps {
  days?: number
}

export function UserGrowthChart({ days = 30 }: UserGrowthChartProps) {
  const { data, isLoading, error } = useQuery({
    queryKey: ['user-growth', days],
    queryFn: async () => {
      const response = await fetch(`/api/admin/user-growth?days=${days}`)
      if (!response.ok) throw new Error('Failed to fetch user growth data')
      const result = await response.json()
      return result.data as ChartDataPoint[]
    },
  })

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-32">
        <div className="text-sm text-gray-400">Loading...</div>
      </div>
    )
  }

  if (error || !data || data.length === 0) {
    return (
      <div className="flex items-center justify-center h-32">
        <div className="text-sm text-gray-400">No data available</div>
      </div>
    )
  }

  // Format data for Recharts
  const chartData = data.map((point) => ({
    date: format(parseISO(point.date), 'MMM d'),
    count: point.count,
    fullDate: point.date,
  }))

  const totalUsers = data.reduce((sum, d) => sum + d.count, 0)

  // Calculate interval to ensure all labels fit
  // Recharts interval: 0=all, 1=every other, 2=every 3rd, etc.
  // Target: ~10-12 labels for optimal readability
  const calculateInterval = (dataPoints: number): number => {
    if (dataPoints <= 7) return 0 // Show all for 7 days or less
    if (dataPoints <= 14) return 1 // Show every other for up to 14 days
    // For more data points, calculate to show approximately 10-12 labels
    const targetLabels = 11
    const interval = Math.floor((dataPoints - 1) / targetLabels)
    return Math.max(0, interval)
  }

  const labelInterval = calculateInterval(data.length)

  // Adjust right margin based on days to prevent label cutoff
  // For 7 days showing all labels, need more space
  const rightMargin = days <= 7 ? 15 : days <= 14 ? 10 : 5

  return (
    <div className="w-full">
      <ResponsiveContainer width="100%" height={120}>
        <LineChart
          data={chartData}
          margin={{ top: 5, right: rightMargin, left: 20, bottom: 5 }}
        >
          <XAxis
            dataKey="date"
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 10, fill: '#6b7280' }}
            interval={labelInterval}
            angle={0}
            textAnchor="middle"
          />
          <YAxis
            hide
            domain={['dataMin', 'auto']}
          />
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <Tooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                return (
                  <div className="bg-white p-2 border border-gray-200 rounded shadow-sm">
                    <p className="text-xs text-gray-600">
                      {payload[0].payload.fullDate && format(parseISO(payload[0].payload.fullDate), 'MMM d, yyyy')}
                    </p>
                    <p className="text-sm font-semibold text-gray-900">
                      {payload[0].value} {payload[0].value === 1 ? 'user' : 'users'}
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
      
      {/* Summary stats */}
      <div className="mt-2 flex items-center justify-between text-xs text-gray-500">
        <span>Last {days} {days === 1 ? 'day' : 'days'}</span>
        <div className="flex items-center gap-1.5">
          {(() => {
            // Calculate trend: compare first half vs second half of the period
            if (chartData.length < 2) return null
            const midpoint = Math.floor(chartData.length / 2)
            const firstHalf = chartData.slice(0, midpoint).reduce((sum, d) => sum + d.count, 0)
            const secondHalf = chartData.slice(midpoint).reduce((sum, d) => sum + d.count, 0)
            let trend: 'up' | 'down' | 'neutral' | null = null
            if (firstHalf === 0) {
              trend = secondHalf > 0 ? 'up' : 'neutral'
            } else {
              trend = secondHalf > firstHalf ? 'up' : secondHalf < firstHalf ? 'down' : 'neutral'
            }
            const TrendIcon = trend === 'up' ? ArrowUp : trend === 'down' ? ArrowDown : null
            const trendColor = trend === 'up' ? 'text-primary' : trend === 'down' ? 'text-red-600' : 'text-gray-400'
            return TrendIcon ? <TrendIcon className={`w-3 h-3 ${trendColor}`} /> : null
          })()}
          <span className="font-medium text-gray-700">
            {totalUsers} new {totalUsers === 1 ? 'user' : 'users'}
          </span>
        </div>
      </div>
    </div>
  )
}

