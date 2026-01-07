import { requireAuth } from '@/lib/auth'
import { MessagesPanel } from '@/components/MessagesPanel'

export default async function MessagesPage() {
  await requireAuth()

  return (
    <div>
      <MessagesPanel />
    </div>
  )
}

