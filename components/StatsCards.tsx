import Link from 'next/link'
import { Users, UserCheck, Briefcase, DollarSign, UserCircle } from 'lucide-react'

interface StatsCardsProps {
  stats: {
    totalUsers: number
    activeUsers: number
    pendingNeighbors: number
    openGigs: number
    pendingEarnings: number
  }
}

export function StatsCards({ stats }: StatsCardsProps) {
  const cards = [
    {
      title: 'Total Users',
      value: stats.totalUsers,
      icon: Users,
      href: '/dashboard/users',
    },
    {
      title: 'Active Users',
      value: stats.activeUsers,
      icon: UserCircle,
      href: '/dashboard/users',
    },
    {
      title: 'Pending Neighbors',
      value: stats.pendingNeighbors,
      icon: UserCheck,
      href: '/dashboard/neighbors',
    },
    {
      title: 'Open Gigs',
      value: stats.openGigs,
      icon: Briefcase,
      href: '/dashboard/gigs',
    },
    {
      title: 'Pending Earnings',
      value: stats.pendingEarnings,
      icon: DollarSign,
      href: '/dashboard/earnings',
    },
  ]

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5">
      {cards.map((card) => {
        const Icon = card.icon
        return (
          <Link
            key={card.title}
            href={card.href}
            className="bg-white overflow-hidden shadow rounded-lg hover:shadow-md transition-shadow"
          >
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0 rounded-md p-3 bg-primary">
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      {card.title}
                    </dt>
                    <dd className="text-lg font-semibold text-gray-900">
                      {card.value.toLocaleString()}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </Link>
        )
      })}
    </div>
  )
}

