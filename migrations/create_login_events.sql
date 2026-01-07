-- Create the login_events table
CREATE TABLE IF NOT EXISTS public.login_events (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  email text NOT NULL,
  ip_address text,
  user_agent text,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Set up Row Level Security (RLS)
ALTER TABLE public.login_events ENABLE ROW LEVEL SECURITY;

-- Policy to allow service role to insert login events
CREATE POLICY "Service role can insert login_events"
ON public.login_events FOR INSERT
TO service_role
WITH CHECK (true);

-- Policy to allow service role to read all login_events
CREATE POLICY "Service role can read all login_events"
ON public.login_events FOR SELECT
TO service_role
USING (true);

-- Create indexes for faster queries
CREATE INDEX IF NOT EXISTS idx_login_events_user_id ON public.login_events(user_id);
CREATE INDEX IF NOT EXISTS idx_login_events_created_at ON public.login_events(created_at);
CREATE INDEX IF NOT EXISTS idx_login_events_email ON public.login_events(email);

