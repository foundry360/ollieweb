import { requireAuth } from '@/lib/auth'
import { createAdminClient } from '@/lib/supabase/server'
import { ApprovalsPanel } from '@/components/ApprovalsPanel'

export default async function ApprovalsPage() {
  await requireAuth()
  const adminClient = createAdminClient()

  const [parentApprovals, completionApprovals] = await Promise.all([
    adminClient
      .from('parent_approvals')
      .select('*')
      .eq('status', 'pending')
      .order('created_at', { ascending: false }),
    adminClient
      .from('completion_approvals')
      .select('*')
      .eq('status', 'pending')
      .order('created_at', { ascending: false }),
  ])

  return (
    <div>
      <ApprovalsPanel
        parentApprovals={parentApprovals.data || []}
        completionApprovals={completionApprovals.data || []}
      />
    </div>
  )
}

