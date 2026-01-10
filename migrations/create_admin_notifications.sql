-- Create admin_notifications table for admin portal notifications
-- Run this in your Supabase SQL Editor

-- Create the table
CREATE TABLE IF NOT EXISTS admin_notifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  admin_id UUID REFERENCES users(id) ON DELETE CASCADE,
  type TEXT NOT NULL CHECK (type IN ('neighbor_application', 'earnings_pending', 'new_user')),
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  link TEXT, -- e.g., '/dashboard/neighbors', '/dashboard/earnings', '/dashboard/users'
  read BOOLEAN DEFAULT FALSE,
  metadata JSONB, -- Store related IDs (user_id, application_id, earnings_id, etc.)
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_admin_notifications_admin_read ON admin_notifications(admin_id, read);
CREATE INDEX IF NOT EXISTS idx_admin_notifications_created ON admin_notifications(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_admin_notifications_type ON admin_notifications(type);
CREATE INDEX IF NOT EXISTS idx_admin_notifications_unread ON admin_notifications(admin_id, read, created_at DESC) WHERE read = FALSE;

-- Enable RLS
ALTER TABLE admin_notifications ENABLE ROW LEVEL SECURITY;

-- RLS Policy: Admins can view their own notifications
CREATE POLICY "Admins can view their own notifications"
  ON admin_notifications FOR SELECT
  USING (
    admin_id IN (
      SELECT id FROM users WHERE role = 'admin'
    )
  );

-- RLS Policy: System can insert admin notifications (service role)
CREATE POLICY "System can insert admin notifications"
  ON admin_notifications FOR INSERT
  WITH CHECK (true);

-- RLS Policy: Admins can update their own notifications (mark as read)
CREATE POLICY "Admins can update their own notifications"
  ON admin_notifications FOR UPDATE
  USING (
    admin_id IN (
      SELECT id FROM users WHERE role = 'admin'
    )
  );

-- Function to notify all admins
CREATE OR REPLACE FUNCTION notify_all_admins(
  p_type TEXT,
  p_title TEXT,
  p_message TEXT,
  p_link TEXT DEFAULT NULL,
  p_metadata JSONB DEFAULT NULL
)
RETURNS void AS $$
BEGIN
  INSERT INTO admin_notifications (admin_id, type, title, message, link, metadata)
  SELECT 
    id,
    p_type,
    p_title,
    p_message,
    p_link,
    p_metadata
  FROM users 
  WHERE role = 'admin';
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger function for new neighbor applications
CREATE OR REPLACE FUNCTION notify_new_neighbor_application()
RETURNS TRIGGER AS $$
BEGIN
  PERFORM notify_all_admins(
    'neighbor_application',
    'New Neighbor Application',
    'A new neighbor application from ' || NEW.full_name || ' requires review.',
    '/dashboard/neighbors',
    jsonb_build_object(
      'application_id', NEW.id,
      'user_id', NEW.user_id,
      'email', NEW.email,
      'full_name', NEW.full_name
    )
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for new neighbor applications
DROP TRIGGER IF EXISTS on_new_neighbor_application ON pending_neighbor_applications;
CREATE TRIGGER on_new_neighbor_application
  AFTER INSERT ON pending_neighbor_applications
  FOR EACH ROW
  WHEN (NEW.status = 'pending')
  EXECUTE FUNCTION notify_new_neighbor_application();

-- Trigger function for new pending earnings
CREATE OR REPLACE FUNCTION notify_new_pending_earnings()
RETURNS TRIGGER AS $$
DECLARE
  v_teen_name TEXT;
  v_gig_title TEXT;
BEGIN
  -- Get teen name
  SELECT full_name INTO v_teen_name
  FROM users
  WHERE id = NEW.teen_id;
  
  -- Get gig title if available
  SELECT title INTO v_gig_title
  FROM gigs
  WHERE id = NEW.gig_id;
  
  PERFORM notify_all_admins(
    'earnings_pending',
    'New Pending Earnings',
    COALESCE(v_teen_name, 'A teen') || ' has pending earnings' || 
    CASE WHEN v_gig_title IS NOT NULL THEN ' for "' || v_gig_title || '"' ELSE '' END || 
    ' ($' || NEW.amount || ').',
    '/dashboard/earnings',
    jsonb_build_object(
      'earnings_id', NEW.id,
      'teen_id', NEW.teen_id,
      'gig_id', NEW.gig_id,
      'amount', NEW.amount
    )
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for new pending earnings
DROP TRIGGER IF EXISTS on_new_pending_earnings ON earnings;
CREATE TRIGGER on_new_pending_earnings
  AFTER INSERT ON earnings
  FOR EACH ROW
  WHEN (NEW.status = 'pending')
  EXECUTE FUNCTION notify_new_pending_earnings();

-- Trigger function for new user registrations
CREATE OR REPLACE FUNCTION notify_new_user_registration()
RETURNS TRIGGER AS $$
BEGIN
  -- Only notify for non-admin users
  IF NEW.role != 'admin' THEN
    PERFORM notify_all_admins(
      'new_user',
      'New User Registration',
      COALESCE(NEW.full_name, NEW.email) || ' (' || NEW.role || ') has registered.',
      '/dashboard/users',
      jsonb_build_object(
        'user_id', NEW.id,
        'email', NEW.email,
        'full_name', NEW.full_name,
        'role', NEW.role
      )
    );
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for new user registrations
DROP TRIGGER IF EXISTS on_new_user_registration ON users;
CREATE TRIGGER on_new_user_registration
  AFTER INSERT ON users
  FOR EACH ROW
  EXECUTE FUNCTION notify_new_user_registration();












