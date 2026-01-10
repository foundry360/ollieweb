import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/server'

export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  try {
    const { email, full_name, user_type } = await request.json()

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      )
    }

    if (!full_name || !full_name.trim()) {
      return NextResponse.json(
        { error: 'Full name is required' },
        { status: 400 }
      )
    }

    if (!user_type) {
      return NextResponse.json(
        { error: 'User type is required' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    // Validate user_type
    const validUserTypes = ['Neighbor', 'Teenlancer', 'Parent of Teenlancer']
    if (!validUserTypes.includes(user_type)) {
      return NextResponse.json(
        { error: 'Invalid user type' },
        { status: 400 }
      )
    }

    // Save to database
    const adminClient = createAdminClient()
    const trimmedEmail = email.trim().toLowerCase()
    const trimmedFullName = full_name.trim()
    
    const { data: leadData, error: dbError } = await adminClient
      .from('prelaunch_leads')
      .insert({ 
        email: trimmedEmail,
        full_name: trimmedFullName,
        user_type: user_type
      })
      .select()
      .single()

    // If duplicate email (unique constraint violation), still return success but don't send duplicate email notification
    if (dbError && dbError.code === '23505') {
      // Email already exists, which is fine - return success without sending another email
      console.log('Pre-launch lead already exists:', trimmedEmail)
      return NextResponse.json({
        success: true,
        message: 'You\'ve been added to our pre-launch list! We\'ll notify you when we launch.',
      })
    }

    // If other database error, log it and return error
    if (dbError) {
      console.error('Database error saving pre-launch lead:', {
        error: dbError,
        message: dbError.message,
        code: dbError.code,
        details: dbError.details,
        hint: dbError.hint,
      })
      
      // Check if it's a column missing error
      if (dbError.message?.includes('column') && dbError.message?.includes('does not exist')) {
        console.error('CRITICAL: Database columns are missing. Please run the migration: migrations/add_prelaunch_fields.sql')
        return NextResponse.json(
          { error: 'Database schema error. Please contact support.' },
          { status: 500 }
        )
      }
      
      // Return error to user
      return NextResponse.json(
        { error: `Failed to save to database: ${dbError.message || 'Unknown error'}` },
        { status: 500 }
      )
    }

    // Log successful save
    if (leadData) {
      console.log('Pre-launch lead saved successfully:', {
        id: leadData.id,
        email: trimmedEmail,
        full_name: trimmedFullName,
        user_type: user_type,
      })
    }

    // Send email using Supabase Edge Function
    try {
      // Map user_type to recipientType expected by edge function
      // 'Neighbor' -> 'neighbor', 'Teenlancer' -> 'teen', 'Parent of Teenlancer' -> 'parent'
      const recipientTypeMap: Record<string, 'teen' | 'neighbor' | 'parent'> = {
        'Neighbor': 'neighbor',
        'Teenlancer': 'teen',
        'Parent of Teenlancer': 'parent',
      }
      
      const recipientType = recipientTypeMap[user_type]
      
      if (!recipientType) {
        console.error('Invalid user_type for email sending:', user_type)
        // Still return success since DB save worked
      } else {
        // Construct image URLs for prelaunch emails
        // Use prelaunch-specific header image (launch-email.png) and no body image
        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
        const emailHeaderUrl = supabaseUrl 
          ? `${supabaseUrl}/storage/v1/object/public/email-assets/launch-email.png`
          : ''
        const connectedBodyUrl = '' // No body image for prelaunch emails

        const payload = {
          email: trimmedEmail,
          fullName: trimmedFullName, // Edge function expects fullName (camelCase)
          recipientType: recipientType, // Edge function expects recipientType
          emailHeaderUrl: emailHeaderUrl, // Pass prelaunch header image URL
          connectedBodyUrl: connectedBodyUrl, // Empty string = no body image
        }

        console.log('📧 Payload being sent to Edge Function:', JSON.stringify(payload, null, 2))
        console.log('Attempting to send email via Supabase Edge Function...', {
          functionName: 'send-prelaunch-confirmation-email',
          email: trimmedEmail,
          fullName: trimmedFullName,
          recipientType: recipientType,
          emailHeaderUrl: emailHeaderUrl,
          connectedBodyUrl: connectedBodyUrl,
          hasEmailHeaderUrl: !!emailHeaderUrl,
          hasConnectedBodyUrl: !!connectedBodyUrl,
          original_user_type: user_type,
        })

        // Invoke the Supabase Edge Function
        // Note: Supabase functions.invoke() automatically serializes the body to JSON
        const { data: functionData, error: functionError } = await adminClient.functions.invoke(
          'send-prelaunch-confirmation-email',
          {
            body: payload,
          }
        )

        console.log('Edge Function response:', {
          hasData: !!functionData,
          hasError: !!functionError,
          data: functionData,
          error: functionError,
        })

        if (functionError) {
          console.error('Edge Function error:', {
            error: functionError,
            message: functionError.message,
            name: functionError.name,
            context: functionError.context,
            fullError: JSON.stringify(functionError, null, 2),
          })
          
          // If we get error data, it might contain more details
          if (functionData) {
            console.error('Edge Function error data:', functionData)
          }
          
          // Don't throw - still return success since DB save worked
          console.warn('Email sending via Edge Function failed, but lead was saved to database')
        } else if (functionData) {
          console.log('✅ Pre-launch signup email sent successfully via Edge Function:', {
            response: functionData,
            email: trimmedEmail,
            full_name: trimmedFullName,
            user_type: user_type,
            recipientType: recipientType,
            timestamp: new Date().toISOString(),
          })
        } else {
          console.warn('⚠️ Edge Function returned no error and no data - check function logs')
        }
      }
    } catch (emailError: any) {
      console.error('Exception while invoking Edge Function:', {
        error: emailError,
        message: emailError?.message,
        stack: emailError?.stack,
        name: emailError?.name,
      })
      // Don't throw - still return success since DB save worked
      console.warn('Edge Function invocation exception, but lead was saved to database')
    }

    return NextResponse.json({
      success: true,
      message: 'You\'ve been added to our pre-launch list! We\'ll notify you when we launch.',
    })
  } catch (error: any) {
    console.error('Error processing pre-launch signup:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to sign up' },
      { status: 500 }
    )
  }
}

