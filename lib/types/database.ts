export type UserRole = 'teen' | 'poster' | 'parent' | 'admin'
export type ApplicationStatus = 'pending' | 'approved' | 'rejected' | 'active'
export type GigStatus = 'open' | 'assigned' | 'accepted' | 'in_progress' | 'pending_completion_approval' | 'completed' | 'cancelled'
export type ApprovalStatus = 'pending' | 'approved' | 'rejected'
export type EarningsStatus = 'pending' | 'paid' | 'cancelled'

export interface User {
  id: string
  email: string
  full_name: string | null
  role: UserRole
  phone: string | null
  date_of_birth: string | null
  bio: string | null
  profile_photo_url: string | null
  parent_id: string | null
  parent_email: string | null
  skills: string[] | null
  verified: boolean
  application_status: ApplicationStatus | null
  expo_push_token: string | null
  created_at: string
  updated_at: string
}

export interface Gig {
  id: string
  title: string
  description: string | null
  pay: number
  status: GigStatus
  poster_id: string
  teen_id: string | null
  location: {
    latitude: number
    longitude: number
  } | null
  address: string | null
  required_skills: string[] | null
  estimated_hours: number | null
  photos: string[] | null
  scheduled_date: string | null
  scheduled_start_time: string | null
  scheduled_end_time: string | null
  created_at: string
  updated_at: string
}

export interface PendingNeighborApplication {
  id: string
  user_id: string | null
  email: string
  full_name: string
  phone: string
  address: string | null
  date_of_birth: string | null
  status: ApprovalStatus
  phone_verified: boolean
  phone_verified_at: string | null
  reviewed_by: string | null
  reviewed_at: string | null
  rejection_reason: string | null
  created_at: string
  updated_at: string
}

export interface NeighborVerificationCheck {
  id: string
  application_id: string
  checked_by: string | null
  verified: boolean
  matches_count: number
  offenders_data: Array<{
    firstName: string
    lastName: string
    address: string
    city: string
    state: string
    zipcode: string
    offenses: string[]
  }> | null
  api_response: any
  checked_at: string
  created_at: string
  updated_at: string
}

export interface Message {
  id: string
  gig_id: string | null
  sender_id: string
  recipient_id: string
  content: string
  read: boolean
  created_at: string
}

export interface AdminNotification {
  id: string
  admin_id: string
  type: 'neighbor_application' | 'earnings_pending' | 'new_user'
  title: string
  message: string
  link: string | null
  read: boolean
  metadata: Record<string, any> | null
  created_at: string
}

export interface Earnings {
  id: string
  teen_id: string
  gig_id: string
  amount: number
  status: EarningsStatus
  paid_at: string | null
  created_at: string
  updated_at: string
}

export interface ParentApproval {
  id: string
  teen_id: string
  gig_id: string
  parent_id: string
  status: ApprovalStatus
  reason: string | null
  created_at: string
  updated_at: string
}

export interface CompletionApproval {
  id: string
  gig_id: string
  poster_id: string
  teen_id: string
  status: ApprovalStatus
  reason: string | null
  created_at: string
  updated_at: string
}

