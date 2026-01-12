# Mobile Login Tracking

This document explains how to integrate mobile app login tracking with the Ollie admin portal.

## Overview

The system now tracks logins from both web (admin portal) and mobile apps. All login events are stored in the `login_events` table with a `platform` field that distinguishes between:
- `web` - Admin portal logins
- `mobile_ios` - iOS mobile app logins
- `mobile_android` - Android mobile app logins
- `mobile` - Generic mobile app logins (if platform cannot be determined)

## Mobile App Integration

After a user successfully authenticates via Supabase Auth in your mobile app, you should call the login tracking API endpoint to log the login event.

### API Endpoint

**POST** `/api/auth/log-mobile-login`

### Authentication

The endpoint requires a valid Supabase Auth access token in the Authorization header:

```
Authorization: Bearer <access_token>
```

### Request Body

```json
{
  "platform": "mobile_ios" | "mobile_android" | "mobile",
  "ip_address": "optional_ip_address",
  "user_agent": "optional_user_agent"
}
```

### Example Implementation

#### iOS (Swift)

```swift
func logLoginEvent(accessToken: String) async {
    guard let url = URL(string: "https://your-domain.com/api/auth/log-mobile-login") else {
        return
    }
    
    var request = URLRequest(url: url)
    request.httpMethod = "POST"
    request.setValue("Bearer \(accessToken)", forHTTPHeaderField: "Authorization")
    request.setValue("application/json", forHTTPHeaderField: "Content-Type")
    
    let body: [String: Any] = [
        "platform": "mobile_ios",
        "ip_address": nil, // Optional
        "user_agent": "Ollie iOS App" // Optional
    ]
    
    request.httpBody = try? JSONSerialization.data(withJSONObject: body)
    
    do {
        let (_, response) = try await URLSession.shared.data(for: request)
        if let httpResponse = response as? HTTPURLResponse {
            print("Login event logged: \(httpResponse.statusCode)")
        }
    } catch {
        print("Failed to log login event: \(error)")
    }
}
```

#### Android (Kotlin)

```kotlin
suspend fun logLoginEvent(accessToken: String) {
    val url = "https://your-domain.com/api/auth/log-mobile-login"
    
    val body = JSONObject().apply {
        put("platform", "mobile_android")
        // Optional fields
        // put("ip_address", getIpAddress())
        // put("user_agent", "Ollie Android App")
    }
    
    val request = Request.Builder()
        .url(url)
        .post(body.toString().toRequestBody("application/json".toMediaType()))
        .addHeader("Authorization", "Bearer $accessToken")
        .build()
    
    try {
        val response = client.newCall(request).execute()
        Log.d("LoginTracking", "Login event logged: ${response.code}")
    } catch (e: Exception) {
        Log.e("LoginTracking", "Failed to log login event", e)
    }
}
```

### When to Call

Call this endpoint immediately after a successful authentication:

1. User signs in with email/password
2. User signs in with OAuth (Google, Apple, etc.)
3. User's session is refreshed (optional - only if you want to track session refreshes)

**Important**: This should be a fire-and-forget call. Don't block the login flow if the tracking call fails.

## Database Schema

The `login_events` table structure:

```sql
CREATE TABLE login_events (
  id uuid PRIMARY KEY,
  user_id uuid REFERENCES auth.users(id),
  email text NOT NULL,
  platform text CHECK (platform IN ('web', 'mobile_ios', 'mobile_android', 'mobile')),
  ip_address text,
  user_agent text,
  created_at timestamp with time zone DEFAULT now()
);
```

## Querying Login Data

### Get All Logins (Web + Mobile)

```typescript
GET /api/admin/login-counts?days=90
```

### Get Only Web Logins

```typescript
GET /api/admin/login-counts?days=90&platform=web
```

### Get Only Mobile Logins

```typescript
GET /api/admin/login-counts?days=90&platform=mobile_ios
GET /api/admin/login-counts?days=90&platform=mobile_android
```

### Response Format

The API returns login counts grouped by date (daily for ≤30 days, monthly for >30 days) with platform breakdown:

```json
{
  "data": [
    {
      "date": "2024-01-15",
      "count": 42,
      "platforms": {
        "web": 10,
        "mobile_ios": 20,
        "mobile_android": 12
      }
    }
  ]
}
```

## Migration

To add mobile login tracking to an existing database, run:

```sql
-- Add platform column
ALTER TABLE public.login_events
ADD COLUMN IF NOT EXISTS platform text CHECK (platform IN ('web', 'mobile_ios', 'mobile_android', 'mobile'));

-- Update existing records (all existing logins are web)
UPDATE public.login_events
SET platform = 'web'
WHERE platform IS NULL;

-- Create index
CREATE INDEX IF NOT EXISTS idx_login_events_platform ON public.login_events(platform);
```

## Notes

- The tracking endpoint is idempotent - calling it multiple times for the same login session will create multiple entries (which is fine for analytics)
- Mobile apps should handle network failures gracefully - don't retry indefinitely
- The endpoint validates the access token but doesn't require admin privileges (any authenticated user can log their own login)
- IP address and user agent are optional but recommended for better analytics


