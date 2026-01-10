-- Create the prelaunch_leads table
CREATE TABLE IF NOT EXISTS public.prelaunch_leads (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  email text NOT NULL UNIQUE,
  full_name text,
  user_type text CHECK (user_type IN ('Neighbor', 'Teenlancer', 'Parent of Teenlancer')),
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Set up Row Level Security (RLS)
ALTER TABLE public.prelaunch_leads ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Service role can insert prelaunch_leads" ON public.prelaunch_leads;
DROP POLICY IF EXISTS "Service role can read all prelaunch_leads" ON public.prelaunch_leads;
DROP POLICY IF EXISTS "Anyone can insert prelaunch_leads" ON public.prelaunch_leads;

-- Policy to allow service role to insert prelaunch leads
CREATE POLICY "Service role can insert prelaunch_leads"
ON public.prelaunch_leads FOR INSERT
TO service_role
WITH CHECK (true);

-- Policy to allow service role to read all prelaunch_leads
CREATE POLICY "Service role can read all prelaunch_leads"
ON public.prelaunch_leads FOR SELECT
TO service_role
USING (true);

-- Policy to allow anonymous users to insert (for the modal)
CREATE POLICY "Anyone can insert prelaunch_leads"
ON public.prelaunch_leads FOR INSERT
TO anon
WITH CHECK (true);

-- Create indexes for faster queries
CREATE INDEX IF NOT EXISTS idx_prelaunch_leads_email ON public.prelaunch_leads(email);
CREATE INDEX IF NOT EXISTS idx_prelaunch_leads_created_at ON public.prelaunch_leads(created_at);

