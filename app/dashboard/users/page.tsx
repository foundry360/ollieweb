import { requireAuth } from '@/lib/auth'
import { UsersTable } from '@/components/UsersTable'

export default async function UsersPage() {
  await requireAuth()

  return (
    <div>
      <UsersTable />
    </div>
  )
}

