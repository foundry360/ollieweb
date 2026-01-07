import { requireAuth } from '@/lib/auth'
import { SummaryStats } from '@/components/SummaryStats'

export default async function DashboardPage() {
  await requireAuth()

  return (
    <div>
      <SummaryStats />
    </div>
  )
}

