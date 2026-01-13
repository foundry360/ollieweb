-- Create a function to log mobile app logins
-- This function can be called from mobile apps after successful authentication
CREATE OR REPLACE FUNCTION public.log_mobile_login(
  p_user_id uuid,
  p_email text,
  p_platform text,
  p_ip_address text DEFAULT NULL,
  p_user_agent text DEFAULT NULL
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- Insert login event for mobile app
  INSERT INTO public.login_events (
    user_id,
    email,
    platform,
    ip_address,
    user_agent,
    created_at
  ) VALUES (
    p_user_id,
    p_email,
    p_platform,
    p_ip_address,
    p_user_agent,
    timezone('utc'::text, now())
  );
EXCEPTION
  WHEN OTHERS THEN
    -- Log error but don't fail (to avoid breaking mobile login flow)
    RAISE WARNING 'Failed to log mobile login event: %', SQLERRM;
END;
$$;

-- Grant execute permission to authenticated users (mobile app users)
GRANT EXECUTE ON FUNCTION public.log_mobile_login TO authenticated;
GRANT EXECUTE ON FUNCTION public.log_mobile_login TO anon;

-- Create a database trigger on auth.sessions to automatically log mobile logins
-- Note: This requires access to auth schema, which may need to be enabled
-- Alternative: Mobile apps can call the API endpoint /api/auth/log-mobile-login instead

-- Create a trigger function that detects new sessions and logs them
-- This will catch all logins (web and mobile) that go through Supabase Auth
CREATE OR REPLACE FUNCTION public.handle_new_auth_session()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_user_email text;
  v_user_agent text;
  v_platform text;
BEGIN
  -- Get user email from auth.users
  SELECT email INTO v_user_email
  FROM auth.users
  WHERE id = NEW.user_id;
  
  -- Try to determine platform from user_agent if available
  -- For now, default to 'mobile' if not from web API
  -- Mobile apps should explicitly set platform when calling
  v_platform := 'mobile';
  
  -- Only log if this is not a web login (web logins are already logged via API)
  -- We can detect web logins by checking if there's already a recent login event
  -- with platform='web' for this user
  IF NOT EXISTS (
    SELECT 1
    FROM public.login_events
    WHERE user_id = NEW.user_id
      AND platform = 'web'
      AND created_at > NOW() - INTERVAL '1 minute'
  ) THEN
    -- This is likely a mobile login
    INSERT INTO public.login_events (
      user_id,
      email,
      platform,
      ip_address,
      user_agent,
      created_at
    ) VALUES (
      NEW.user_id,
      v_user_email,
      v_platform,
      NULL, -- IP address not available in trigger context
      NULL, -- User agent not available in trigger context
      timezone('utc'::text, now())
    )
    ON CONFLICT DO NOTHING; -- Prevent duplicates
  END IF;
  
  RETURN NEW;
EXCEPTION
  WHEN OTHERS THEN
    -- Log error but don't fail
    RAISE WARNING 'Failed to log login event in trigger: %', SQLERRM;
    RETURN NEW;
END;
$$;

-- Note: The trigger on auth.sessions requires superuser privileges
-- You may need to run this in Supabase SQL Editor with elevated permissions
-- Or use the API endpoint approach instead (see /api/auth/log-mobile-login/route.ts)



