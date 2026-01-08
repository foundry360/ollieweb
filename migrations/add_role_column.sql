-- Add role column to users table
-- Run this in your Supabase SQL Editor

-- Add the role column
ALTER TABLE users 
ADD COLUMN IF NOT EXISTS role TEXT CHECK (role IN ('teen', 'poster', 'parent', 'admin'));

-- Set default role for existing users (you may want to adjust this)
-- If you have existing admin users, update them manually:
-- UPDATE users SET role = 'admin' WHERE email = 'your-admin-email@example.com';

-- For other existing users, you might want to set a default:
-- UPDATE users SET role = 'poster' WHERE role IS NULL;

-- Make role NOT NULL after setting defaults (optional, but recommended)
-- ALTER TABLE users ALTER COLUMN role SET NOT NULL;

-- Create an index for faster role lookups
CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);










