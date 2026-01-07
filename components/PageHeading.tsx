'use client'

import { usePathname } from 'next/navigation'

const pageTitles: Record<string, string> = {
  '/dashboard': 'Summary',
  '/dashboard/neighbors': 'Neighbor Approvals',
  '/dashboard/users': 'User Management',
  '/dashboard/messages': 'Global Messaging',
  '/dashboard/gigs': 'Gigs Management',
  '/dashboard/earnings': 'Earnings Overview',
  '/dashboard/approvals': 'Pending Approvals',
}

export function PageHeading() {
  const pathname = usePathname()
  const title = pageTitles[pathname] || 'Dashboard'

  return (
    <h1 className="text-2xl font-bold text-gray-900 mb-4">{title}</h1>
  )
}

