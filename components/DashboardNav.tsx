'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  LayoutDashboard, 
  Users, 
  UserCheck, 
  MessageSquare, 
  Briefcase, 
  DollarSign,
  CheckCircle,
  BarChart3
} from 'lucide-react'

const navItems = [
  { href: '/dashboard', label: 'Overview', icon: LayoutDashboard },
  { href: '/dashboard/neighbors', label: 'Neighbor Approvals', icon: UserCheck },
  { href: '/dashboard/users', label: 'Users', icon: Users },
  { href: '/dashboard/messages', label: 'Messages', icon: MessageSquare },
  { href: '/dashboard/gigs', label: 'Gigs', icon: Briefcase },
  { href: '/dashboard/earnings', label: 'Earnings', icon: DollarSign },
  { href: '/dashboard/approvals', label: 'Approvals', icon: CheckCircle },
  { href: '/dashboard/analytics', label: 'Analytics', icon: BarChart3 },
]

export function DashboardNav() {
  const pathname = usePathname()

  return (
    <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
      {navItems.map((item) => {
        const Icon = item.icon
        const isActive = pathname === item.href || 
          (item.href !== '/dashboard' && pathname?.startsWith(item.href))
        
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
              isActive
                ? 'border-primary text-gray-900'
                : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
            }`}
          >
            <Icon className="w-4 h-4 mr-2" />
            {item.label}
          </Link>
        )
      })}
    </div>
  )
}














