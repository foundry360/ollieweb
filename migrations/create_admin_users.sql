-- Create admin_users table to track which Auth users are admins
-- Run this in your Supabase SQL Editor

-- Create the admin_users table
CREATE TABLE IF NOT EXISTS admin_users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create an index for faster lookups
CREATE INDEX IF NOT EXISTS idx_admin_users_id ON admin_users(id);
CREATE INDEX IF NOT EXISTS idx_admin_users_email ON admin_users(email);

-- Enable Row Level Security
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Create policy: Only admins can view admin_users (for admin management)
-- This allows admins to see who else is an admin
CREATE POLICY "Admins can view admin_users"
ON admin_users FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM admin_users
    WHERE admin_users.id = auth.uid()
  )
);

-- Create policy: Service role can manage admin_users (for server-side operations)
-- This allows the service role to insert/update/delete admin users
CREATE POLICY "Service role can manage admin_users"
ON admin_users FOR ALL
USING (true)
WITH CHECK (true);

-- Add your first admin user (replace with actual user ID and email)
-- To find a user ID, check the auth.users table in Supabase
-- Example:
-- INSERT INTO admin_users (id, email) 
-- VALUES ('user-uuid-here', 'admin@example.com')
-- ON CONFLICT (id) DO NOTHING;


