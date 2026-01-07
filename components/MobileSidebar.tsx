'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import { SidebarNav } from './SidebarNav'
import { LogoutButton } from './LogoutButton'

export function MobileSidebar() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-200 lg:hidden"
        aria-label="Toggle menu"
      >
        {isOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <Menu className="h-6 w-6" />
        )}
      </button>

      {isOpen && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            onClick={() => setIsOpen(false)}
          />
          
                {/* Sidebar */}
                <div className="fixed inset-y-0 left-0 z-50 w-64 shadow-lg transform transition-transform duration-300 ease-in-out lg:hidden" style={{ backgroundColor: '#111827' }}>
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-center h-20 px-6 border-b border-gray-700" style={{ backgroundColor: '#111827' }}>
                <img
                  src="/header-logo.png"
                  alt="Ollie Admin"
                  className="h-14 w-auto object-contain"
                />
                <button
                  onClick={() => setIsOpen(false)}
                  className="absolute right-4 p-2 rounded-md text-gray-300 hover:text-white hover:bg-gray-800"
                >
                  <X className="h-6 w-6" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-md text-gray-300 hover:text-white hover:bg-gray-800"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto px-4 py-6" onClick={() => setIsOpen(false)}>
                <SidebarNav />
              </div>
              <div className="border-t border-gray-200 p-4">
                <LogoutButton />
              </div>
            </div>
          </div>
        </>
      )}
    </>
  )
}

