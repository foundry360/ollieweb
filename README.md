# Ollie Admin Portal

A Next.js 14+ admin portal for managing the Ollie platform, built with TypeScript, Tailwind CSS, and Supabase.

## Features

- **Authentication & Authorization**: Secure login with admin role verification
- **Neighbor Approvals**: Review and approve/reject neighbor signup applications
- **User Management**: View, filter, and manage all platform users
- **Global Messaging**: Send system messages to users (all, by role, by status, or individual)
- **Gigs Management**: View and filter all job postings
- **Earnings Overview**: Track earnings by status with totals
- **Approvals Dashboard**: Monitor pending parent and completion approvals
- **Analytics Dashboard**: View key metrics and statistics

## Prerequisites

- Node.js 18+ and npm/yarn
- Supabase project with the Ollie database schema
- Admin user account in Supabase with `role = 'admin'` in the `users` table

## Setup

1. **Install dependencies**:
   ```bash
   npm install
   # or
   yarn install
   ```

2. **Configure environment variables**:
   Create a `.env.local` file in the root directory:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
   OFFENDERS_IO_API_KEY=your_offenders_io_api_key
   ```

   **Important**: 
   - The service role key is used server-side only for admin operations that bypass RLS. Never expose it client-side.
   - The Offenders.io API key is used for neighbor verification. Get your API key from [Offenders.io](https://offenders.io).

3. **Run the development server**:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

## Database Schema

The admin portal connects to the same Supabase database as the mobile app. Key tables:

- `users` - User profiles with roles (teen, poster, parent, admin)
- `gigs` - Job postings (renamed from tasks)
- `pending_neighbor_applications` - Neighbor signup applications
- `messages` - User messages
- `earnings` - Payment tracking
- `parent_approvals` - Parent approval for teen gigs
- `completion_approvals` - Neighbor approval for gig completion

## Row Level Security (RLS)

The admin portal uses the Supabase service role key for admin operations that need to bypass RLS. For client-side operations, ensure your RLS policies allow admin users to access the necessary data:

```sql
-- Example: Allow admin users to read all users
CREATE POLICY "Admins can read all users"
ON users FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM users
    WHERE users.id = auth.uid()
    AND users.role = 'admin'
  )
);
```

## Project Structure

```
├── app/                    # Next.js App Router pages
│   ├── api/               # API routes
│   │   └── admin/         # Admin API endpoints
│   ├── dashboard/         # Dashboard pages
│   ├── login/             # Login page
│   └── layout.tsx         # Root layout
├── components/            # React components
├── lib/                   # Utilities and helpers
│   ├── supabase/         # Supabase client setup
│   ├── auth.ts           # Authentication helpers
│   └── types/            # TypeScript types
└── middleware.ts          # Next.js middleware for route protection
```

## API Routes

- `POST /api/admin/neighbors/approve` - Approve neighbor application
- `POST /api/admin/neighbors/reject` - Reject neighbor application
- `GET /api/admin/users/list` - List users with filters
- `PATCH /api/admin/users/update` - Update user
- `POST /api/admin/messages/send` - Send global message
- `GET /api/admin/stats` - Get analytics statistics

## Authentication

1. Navigate to `/login`
2. Enter admin credentials
3. The system verifies the user has `role = 'admin'` in the `users` table
4. Upon successful login, redirect to `/dashboard`

## Features Overview

### Neighbor Approvals
- View all pending neighbor applications
- Filter by status (pending, approved, rejected)
- Search by name, email, or phone
- Approve or reject applications with optional rejection reason
- View phone verification status

### User Management
- List all users with pagination
- Filter by role, verification status, application status
- Search by name, email, or phone
- View detailed user information
- Edit user role, verification status, and application status

### Global Messaging
- Send messages to all users
- Send to users by role (teen, poster, parent, admin)
- Send to users by verification status
- Send to individual selected users
- Messages are stored in the `messages` table with system sender

### Gigs Management
- View all gigs with status filtering
- Search gigs by title or description
- View gig details (pay, location, skills, schedule)

### Earnings Overview
- View all earnings with status filtering
- See totals for paid, pending, and total earnings
- Filter by status (paid, pending, cancelled)

### Approvals Dashboard
- View pending parent approvals
- View pending completion approvals
- Monitor approval status

### Analytics Dashboard
- User statistics (total, by role, verified/unverified)
- Gigs statistics (total, by status)
- Earnings statistics (total amount, by status)
- Approvals statistics (pending counts)

## Development

### Tech Stack
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: Supabase
- **State Management**: TanStack Query (React Query)
- **Notifications**: react-hot-toast
- **Icons**: lucide-react

### Building for Production

```bash
npm run build
npm start
```

## Security Notes

1. **Service Role Key**: The `SUPABASE_SERVICE_ROLE_KEY` is only used server-side in API routes. Never expose it in client-side code.

2. **RLS Policies**: Ensure proper RLS policies are set up in Supabase to protect data while allowing admin access.

3. **Authentication**: All admin routes are protected by middleware that verifies admin role.

4. **Environment Variables**: Never commit `.env.local` to version control.

## Troubleshooting

### Login Issues
- Verify the user exists in Supabase Auth
- Verify the user has `role = 'admin'` in the `users` table
- Check browser console for errors

### Database Connection Issues
- Verify environment variables are set correctly
- Check Supabase project URL and keys
- Ensure RLS policies allow admin access

### API Route Errors
- Check server logs for detailed error messages
- Verify service role key is set correctly
- Ensure database tables exist and have correct schema

## License

Private - Ollie Platform





