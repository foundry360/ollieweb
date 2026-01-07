import { requireAuth } from '@/lib/auth'
import { createAdminClient } from '@/lib/supabase/server'
import { EarningsTable } from '@/components/EarningsTable'
import { Earnings } from '@/lib/types/database'

export default async function EarningsPage() {
  await requireAuth()
  const adminClient = createAdminClient()

  const { data: earnings, error } = await adminClient
    .from('earnings')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(100)

  if (error) {
    console.error('Error fetching earnings:', error)
  }

  return (
    <div>
      <EarningsTable earnings={(earnings || []) as Earnings[]} />
    </div>
  )
}

