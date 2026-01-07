import { requireAuth } from '@/lib/auth'
import { createAdminClient } from '@/lib/supabase/server'
import { NeighborApprovalsTable } from '@/components/NeighborApprovalsTable'
import { PendingNeighborApplication } from '@/lib/types/database'

export default async function NeighborApprovalsPage() {
  await requireAuth()
  const adminClient = createAdminClient()

  const { data: applications, error } = await adminClient
    .from('pending_neighbor_applications')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching applications:', error)
  }

  return (
    <div className="w-full">
      <NeighborApprovalsTable applications={(applications || []) as PendingNeighborApplication[]} />
    </div>
  )
}

