import type { Metadata } from 'next'
import { Open_Sans } from 'next/font/google'
import './globals.css'
import { Toaster } from 'react-hot-toast'
import { QueryClientProvider } from './providers'
import { Analytics } from '@vercel/analytics/react'

const openSans = Open_Sans({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Ollie Jobs',
  description: 'Admin portal for managing Ollie platform',
  icons: {
    icon: '/favicon.ico',
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={openSans.className}>
        <QueryClientProvider>
          {children}
          <Toaster 
            position="top-right"
            toastOptions={{
              success: {
                iconTheme: {
                  primary: '#73af17',
                  secondary: '#ffffff',
                },
              },
            }}
          />
          <Analytics />
        </QueryClientProvider>
      </body>
    </html>
  )
}

