'use client'

import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'
import { Users, UserCheck, Briefcase, UserCircle, ArrowUp, ArrowDown } from 'lucide-react'
import { UserGrowthChart } from './UserGrowthChart'
import { OllieEarningsChart } from './OllieEarningsChart'
import { GigsCreatedChart } from './GigsCreatedChart'
import { LoginCountsChart } from './LoginCountsChart'
import { CompletedGigsChart } from './CompletedGigsChart'

interface StatValue {
  current: number
  change: number
}

function StatCard({
  title,
  value,
  change,
  icon: Icon,
  href,
}: {
  title: string
  value: number
  change: number
  icon: React.ComponentType<{ className?: string }>
  href: string
}) {
  const isPositive = change >= 0
  const ChangeIcon = isPositive ? ArrowUp : ArrowDown

  return (
    <Link
      href={href}
      className="bg-white overflow-hidden shadow rounded-lg hover:shadow-md transition-shadow block flex-1 flex flex-col"
    >
      <div className="p-5 flex-1 flex items-center">
        <div className="flex items-center w-full">
          <div className="flex-shrink-0 rounded-md p-3 bg-primary">
            <Icon className="h-6 w-6 text-white" />
          </div>
          <div className="ml-5 w-0 flex-1">
            <dl>
              <dt className="text-sm font-medium text-gray-500 truncate">
                {title}
              </dt>
              <dd className="flex items-baseline justify-between">
                <span className="text-lg font-semibold text-gray-900">
                  {value.toLocaleString()}
                </span>
                <span className="flex items-center gap-1 text-xs font-medium text-primary">
                  <ChangeIcon className="w-3 h-3" />
                  {Math.abs(change).toFixed(1)}%
                </span>
              </dd>
            </dl>
          </div>
        </div>
      </div>
    </Link>
  )
}

export function SummaryStats() {
  const [selectedDays, setSelectedDays] = useState<number>(7)
  
  // Fetch stats based on selected days
  const { data: stats, isLoading: statsLoading } = useQuery({
    queryKey: ['summary-stats', selectedDays],
    queryFn: async () => {
      const response = await fetch(`/api/admin/summary-stats?days=${selectedDays}`)
      if (!response.ok) throw new Error('Failed to fetch summary stats')
      return response.json()
    },
  })

  const filterOptions = [
    { label: 'Last 7 days', value: 7 },
    { label: 'Last 30 days', value: 30 },
    { label: 'Last 90 days', value: 90 },
    { label: 'Last 120 days', value: 120 },
  ]

  return (
    <div className="space-y-5">
      {/* Date Filter */}
      <div className="flex items-center justify-end">
        <div className="flex items-center gap-2 bg-white rounded-lg shadow-sm p-1 border border-gray-200">
          {filterOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => setSelectedDays(option.value)}
              className={`px-3 py-1.5 text-xs font-medium rounded transition-colors ${
                selectedDays === option.value
                  ? 'bg-primary text-white'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>
      {/* First Row: Micro Cards and User Growth Chart */}
      <div className="grid grid-cols-12 gap-5">
        {/* First Column - 25% (3 columns) */}
        <div className="col-span-3 flex flex-col gap-5">
          {statsLoading ? (
            <>
              <div className="bg-white overflow-hidden shadow rounded-lg p-5 animate-pulse">
                <div className="h-20 bg-gray-200 rounded"></div>
              </div>
              <div className="bg-white overflow-hidden shadow rounded-lg p-5 animate-pulse">
                <div className="h-20 bg-gray-200 rounded"></div>
              </div>
            </>
          ) : stats ? (
            <>
              <StatCard
                title="Total Users"
                value={stats.totalUsers.current}
                change={stats.totalUsers.change}
                icon={Users}
                href="/dashboard/users"
              />
              <StatCard
                title="Active Users"
                value={stats.activeUsers.current}
                change={stats.activeUsers.change}
                icon={UserCircle}
                href="/dashboard/users"
              />
            </>
          ) : null}
        </div>

        {/* Second Column - 25% (3 columns) */}
        <div className="col-span-3 flex flex-col gap-5">
          {statsLoading ? (
            <>
              <div className="bg-white overflow-hidden shadow rounded-lg p-5 animate-pulse">
                <div className="h-20 bg-gray-200 rounded"></div>
              </div>
              <div className="bg-white overflow-hidden shadow rounded-lg p-5 animate-pulse">
                <div className="h-20 bg-gray-200 rounded"></div>
              </div>
            </>
          ) : stats ? (
            <>
              <StatCard
                title="Pending Neighbors"
                value={stats.pendingNeighbors.current}
                change={stats.pendingNeighbors.change}
                icon={UserCheck}
                href="/dashboard/neighbors"
              />
              <StatCard
                title="Open Gigs"
                value={stats.openGigs.current}
                change={stats.openGigs.change}
                icon={Briefcase}
                href="/dashboard/gigs"
              />
            </>
          ) : null}
        </div>

        {/* Third Column - 50% (6 columns) */}
        <div className="col-span-6">
          <div className="bg-white overflow-hidden shadow rounded-lg h-full">
            <div className="p-5">
              <h3 className="text-sm font-medium text-gray-500 mb-4">User Growth</h3>
              <UserGrowthChart days={selectedDays} />
            </div>
          </div>
        </div>
      </div>

      {/* Second Row: 4 Chart Placeholders */}
      <div className="grid grid-cols-4 gap-5">
        {/* Chart 1: Login Counts */}
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <LoginCountsChart days={selectedDays} />
          </div>
        </div>
        
        {/* Chart 2: Gigs Created */}
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <GigsCreatedChart days={selectedDays} />
          </div>
        </div>
        
        {/* Chart 3: Completed Gigs */}
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <CompletedGigsChart days={selectedDays} />
          </div>
        </div>
        
        {/* Chart 4: Ollie Earnings */}
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <OllieEarningsChart days={selectedDays} />
          </div>
        </div>
      </div>
    </div>
  )
}

