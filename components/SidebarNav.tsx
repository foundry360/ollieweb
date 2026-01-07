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
  CheckCircle
} from 'lucide-react'

const navItems = [
  { href: '/dashboard', label: 'Summary', icon: LayoutDashboard },
  { href: '/dashboard/neighbors', label: 'Neighbor Approvals', icon: UserCheck },
  { href: '/dashboard/users', label: 'Users', icon: Users },
  { href: '/dashboard/messages', label: 'Messages', icon: MessageSquare },
  { href: '/dashboard/gigs', label: 'Gigs', icon: Briefcase },
  { href: '/dashboard/earnings', label: 'Earnings', icon: DollarSign },
  { href: '/dashboard/approvals', label: 'Approvals', icon: CheckCircle },
]

export function SidebarNav() {
  const pathname = usePathname()

  return (
    <nav className="space-y-1">
      {navItems.map((item) => {
        const Icon = item.icon
        const isActive = pathname === item.href || 
          (item.href !== '/dashboard' && pathname?.startsWith(item.href))
        
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center px-4 py-3 text-sm transition-colors border-l-4 ${
              isActive
                ? 'border-primary text-white font-bold bg-transparent'
                : 'border-transparent text-gray-300 hover:text-white font-medium'
            }`}
          >
            <Icon className={`w-5 h-5 mr-3 flex-shrink-0 ${isActive ? 'text-primary' : 'text-gray-400'}`} />
            <span>{item.label}</span>
          </Link>
        )
      })}
    </nav>
  )
}

