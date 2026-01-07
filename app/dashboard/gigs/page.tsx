import { requireAuth } from '@/lib/auth'
import { createAdminClient } from '@/lib/supabase/server'
import { GigsTable } from '@/components/GigsTable'
import { Gig } from '@/lib/types/database'

export default async function GigsPage() {
  await requireAuth()
  const adminClient = createAdminClient()

  const { data: gigs, error } = await adminClient
    .from('gigs')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(100)

  if (error) {
    console.error('Error fetching gigs:', error)
  }

  return (
    <div>
      <GigsTable gigs={(gigs || []) as Gig[]} />
    </div>
  )
}

