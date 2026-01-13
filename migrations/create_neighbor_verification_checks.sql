-- Create neighbor_verification_checks table to store audit trail of OffenderIO verification checks
-- Run this in your Supabase SQL Editor

-- Create the neighbor_verification_checks table
CREATE TABLE IF NOT EXISTS neighbor_verification_checks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  application_id UUID NOT NULL REFERENCES pending_neighbor_applications(id) ON DELETE CASCADE,
  checked_by UUID REFERENCES users(id) ON DELETE SET NULL,
  verified BOOLEAN NOT NULL,
  matches_count INTEGER NOT NULL DEFAULT 0,
  offenders_data JSONB,
  api_response JSONB,
  checked_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for faster lookups
CREATE INDEX IF NOT EXISTS idx_verification_checks_application_id ON neighbor_verification_checks(application_id);
CREATE INDEX IF NOT EXISTS idx_verification_checks_checked_by ON neighbor_verification_checks(checked_by);
CREATE INDEX IF NOT EXISTS idx_verification_checks_checked_at ON neighbor_verification_checks(checked_at);
CREATE INDEX IF NOT EXISTS idx_verification_checks_verified ON neighbor_verification_checks(verified);

-- Enable Row Level Security
ALTER TABLE neighbor_verification_checks ENABLE ROW LEVEL SECURITY;

-- Create policy: Service role can manage verification checks (for server-side operations)
CREATE POLICY "Service role can manage verification_checks"
ON neighbor_verification_checks FOR ALL
USING (true)
WITH CHECK (true);

-- Create policy: Admins can view verification checks
CREATE POLICY "Admins can view verification_checks"
ON neighbor_verification_checks FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM admin_users
    WHERE admin_users.id = auth.uid()
  )
);









