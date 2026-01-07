import Image from 'next/image'
import { requireAuth } from '@/lib/auth'
import { SidebarNav } from '@/components/SidebarNav'
import { LogoutButton } from '@/components/LogoutButton'
import { MobileSidebar } from '@/components/MobileSidebar'
import { PageHeading } from '@/components/PageHeading'
import { Notifications } from '@/components/Notifications'

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Check auth at page level instead of middleware
  await requireAuth()
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Full-width header */}
      <header className="w-full h-16 px-4 sm:px-6 lg:px-8 flex items-center justify-end bg-gray-50">
        <div className="flex items-center gap-4">
          <div className="hidden lg:block">
            <Notifications />
          </div>
          <div className="hidden lg:block">
            <LogoutButton />
          </div>
          <MobileSidebar />
        </div>
      </header>

      <div className="flex">
              {/* Desktop Sidebar */}
              <aside className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:top-0 lg:bottom-0 lg:border-r lg:border-gray-200" style={{ backgroundColor: '#111827' }}>
          <div className="flex-1 overflow-y-auto px-4 py-6">
            <div className="mb-6 flex justify-center">
              <Image
                src="/header-logo.png"
                alt="Ollie Admin"
                width={64}
                height={64}
                className="h-16 w-auto object-contain"
              />
            </div>
            <SidebarNav />
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 lg:pl-64">
          <div className="w-full px-4 sm:px-6 lg:px-8 pt-4 pb-8">
            <PageHeading />
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}

