import { requireAuth } from '@/lib/auth'
import { PreLaunchLeadsTable } from '@/components/PreLaunchLeadsTable'

export default async function PreLaunchPage() {
  await requireAuth()

  return (
    <div>
      <PreLaunchLeadsTable />
    </div>
  )
}


