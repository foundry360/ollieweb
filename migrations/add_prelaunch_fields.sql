-- Add full_name and user_type columns to prelaunch_leads table
-- Run this if the table already exists (was created before these fields were added)

-- Add full_name column
ALTER TABLE public.prelaunch_leads
ADD COLUMN IF NOT EXISTS full_name text;

-- Add user_type column (without constraint first, then add constraint)
ALTER TABLE public.prelaunch_leads
ADD COLUMN IF NOT EXISTS user_type text;

-- Drop the constraint if it exists and recreate it to ensure it's correct
ALTER TABLE public.prelaunch_leads
DROP CONSTRAINT IF EXISTS prelaunch_leads_user_type_check;

ALTER TABLE public.prelaunch_leads
ADD CONSTRAINT prelaunch_leads_user_type_check 
CHECK (user_type IS NULL OR user_type IN ('Neighbor', 'Teenlancer', 'Parent of Teenlancer'));

-- Create index for user_type for faster filtering
CREATE INDEX IF NOT EXISTS idx_prelaunch_leads_user_type ON public.prelaunch_leads(user_type);

