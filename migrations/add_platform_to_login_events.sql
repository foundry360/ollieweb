-- Add platform column to login_events table to distinguish between web and mobile logins
ALTER TABLE public.login_events
ADD COLUMN IF NOT EXISTS platform text CHECK (platform IN ('web', 'mobile_ios', 'mobile_android', 'mobile'));

-- Create index for faster queries by platform
CREATE INDEX IF NOT EXISTS idx_login_events_platform ON public.login_events(platform);

-- Update existing records to have 'web' as default (since they were all web logins)
UPDATE public.login_events
SET platform = 'web'
WHERE platform IS NULL;



