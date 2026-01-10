import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

// Generate email HTML for different recipient types
function generateEmailHtml(
  fullName: string, 
  recipientType: 'teen' | 'neighbor' | 'parent',
  emailHeaderUrl: string, 
  connectedBodyUrl: string = ''
): string {
  // Extract first name only
  const firstName = fullName.split(' ')[0] || fullName;
  
  // Customize content based on recipient type
  let heading = '';
  let subheading = '';
  let greetingText = '';
  let mainContent = '';
  let closingText = '';
  
  switch (recipientType) {
    case 'teen':
      heading = `You're on the Ollie launch list!`;
      subheading = `Start earning money helping neighbors in your community`;
      greetingText = `Hi ${firstName},`;
      mainContent = `
              <p style="margin: 0 0 24px; font-size: 16px; line-height: 24px; color: #374151;">
                You're officially on the list for Ollie's launch! We're excited to help you start earning money doing tasks you're great at—all while building real work experience.
              </p>
              
              <h2 style="margin: 32px 0 12px; font-size: 18px; font-weight: 600; color: #111827;">What's next:</h2>
              <ul style="margin: 0 0 24px; padding-left: 24px; font-size: 16px; line-height: 24px; color: #374151;">
                <li style="margin-bottom: 8px;">We'll email you when Ollie launches in your area</li>
                <li style="margin-bottom: 8px;">You'll complete your profile and choose which tasks you want to do</li>
                <li style="margin-bottom: 8px;">Your parent will set up your account (they'll get an email too!)</li>
                <li style="margin-bottom: 0;">Start accepting jobs and earning money</li>
              </ul>
              
              <h2 style="margin: 32px 0 12px; font-size: 18px; font-weight: 600; color: #111827;">Jobs you can do:</h2>
              <ul style="margin: 0 0 24px; padding-left: 24px; font-size: 16px; line-height: 24px; color: #374151;">
                <li style="margin-bottom: 8px;">Lawn mowing & yard work</li>
                <li style="margin-bottom: 8px;">Pet sitting & dog walking</li>
                <li style="margin-bottom: 0;">And more tasks coming soon</li>
              </ul>
              
              <h2 style="margin: 32px 0 12px; font-size: 18px; font-weight: 600; color: #111827;">The perks:</h2>
              <ul style="margin: 0 0 24px; padding-left: 24px; font-size: 16px; line-height: 24px; color: #374151;">
                <li style="margin-bottom: 8px;">Set your own schedule</li>
                <li style="margin-bottom: 8px;">Work close to home</li>
                <li style="margin-bottom: 8px;">Build your reputation</li>
                <li style="margin-bottom: 0;">Earn money doing what you're good at</li>
              </ul>`;
      closingText = `We'll be in touch soon. Get ready to start earning!`;
      break;
      
    case 'neighbor':
      heading = `Welcome to Ollie!`;
      subheading = `You're among the first to discover safe, reliable help from local teens`;
      greetingText = `Hi ${firstName},`;
      mainContent = `
              <p style="margin: 0 0 24px; font-size: 16px; line-height: 24px; color: #374151;">
                Thanks for joining Ollie's pre-launch community! You're now on the list to be among the first neighbors to connect with talented local teens for lawn care, pet sitting, and other tasks.
              </p>
              
              <h2 style="margin: 32px 0 12px; font-size: 18px; font-weight: 600; color: #111827;">What happens next:</h2>
              <p style="margin: 0 0 24px; font-size: 16px; line-height: 24px; color: #374151;">
                We'll send you an email as soon as Ollie launches in your area. In the meantime, you can follow our progress and get early access updates.
              </p>
              
              <h2 style="margin: 32px 0 12px; font-size: 18px; font-weight: 600; color: #111827;">While you wait:</h2>
              <ul style="margin: 0 0 24px; padding-left: 24px; font-size: 16px; line-height: 24px; color: #374151;">
                <li style="margin-bottom: 8px;">We're carefully vetting our first teen helpers</li>
                <li style="margin-bottom: 8px;">Building safety features you can trust</li>
                <li style="margin-bottom: 0;">Getting ready to make your life a little easier</li>
              </ul>
              
              <p style="margin: 0 0 24px; font-size: 16px; line-height: 24px; color: #374151;">
                Have questions? Just reply to this email—we'd love to hear from you.
              </p>`;
      closingText = `Welcome aboard!`;
      break;
      
    case 'parent':
      heading = `Welcome to Ollie! Your teen is on our launch list`;
      subheading = `Safe, supervised earning opportunities for your teen`;
      greetingText = `Hi ${firstName},`;
      mainContent = `
              <p style="margin: 0 0 24px; font-size: 16px; line-height: 24px; color: #374151;">
                Your teen has joined Ollie's pre-launch list, and we wanted to reach out directly to you. Ollie is a platform that connects local teens with neighbors who need help with tasks like lawn care and pet sitting—all with built-in parental oversight.
              </p>
              
              <h2 style="margin: 32px 0 12px; font-size: 18px; font-weight: 600; color: #111827;">How Ollie keeps your teen safe:</h2>
              <ul style="margin: 0 0 24px; padding-left: 24px; font-size: 16px; line-height: 24px; color: #374151;">
                <li style="margin-bottom: 8px;">You approve every job before they accept it</li>
                <li style="margin-bottom: 8px;">Background-checked neighbors only</li>
                <li style="margin-bottom: 8px;">GPS tracking for job locations</li>
                <li style="margin-bottom: 8px;">In-app messaging (no phone numbers shared)</li>
                <li style="margin-bottom: 0;">Secure payment handling—no cash exchanges</li>
              </ul>
              
              <h2 style="margin: 32px 0 12px; font-size: 18px; font-weight: 600; color: #111827;">What happens next:</h2>
              <p style="margin: 0 0 24px; font-size: 16px; line-height: 24px; color: #374151;">
                When Ollie launches in your area, you'll receive an invitation to set up your teen's account together. You'll have full visibility and control over their activity.
              </p>
              
              <h2 style="margin: 32px 0 12px; font-size: 18px; font-weight: 600; color: #111827;">Your role:</h2>
              <ul style="margin: 0 0 24px; padding-left: 24px; font-size: 16px; line-height: 24px; color: #374151;">
                <li style="margin-bottom: 8px;">Approve job requests</li>
                <li style="margin-bottom: 8px;">Monitor their schedule</li>
                <li style="margin-bottom: 8px;">Manage payment deposits</li>
                <li style="margin-bottom: 0;">Review neighbor ratings</li>
              </ul>
              
              <p style="margin: 0 0 24px; font-size: 16px; line-height: 24px; color: #374151;">
                We built Ollie because we believe teens deserve safe opportunities to learn responsibility, build work ethic, and earn their own money. We're committed to making sure you feel confident every step of the way.
              </p>
              
              <p style="margin: 0 0 24px; font-size: 16px; line-height: 24px; color: #374151;">
                Questions? We're here to help—just reply to this email.
              </p>`;
      closingText = `Looking forward to launching soon!`;
      break;
  }
  
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="color-scheme" content="light only">
  <meta name="supported-color-schemes" content="light only">
  <title>You're on Ollie's Prelaunch List!</title>
  <style>
    /* Prevent dark mode color inversion */
    @media (prefers-color-scheme: dark) {
      .email-container {
        background-color: #f9fafb !important;
      }
      .email-card {
        background-color: #ffffff !important;
      }
      .email-body {
        background-color: #ffffff !important;
        color: #374151 !important;
      }
      .email-body p {
        color: #374151 !important;
      }
      .email-body ul {
        color: #374151 !important;
      }
      .email-body li {
        color: #374151 !important;
      }
      .email-footer {
        background-color: #111827 !important;
        color: #ffffff !important;
      }
      .email-footer p {
        color: #ffffff !important;
      }
      .email-footer a {
        color: #ffffff !important;
      }
    }
  </style>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f9fafb; color: #1f2937;">
  
  <!-- Main Container -->
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: #f9fafb; padding: 0;" class="email-container">
    <tr>
      <td align="center">
        
        <!-- Email Card -->
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="max-width: 600px; background-color: #ffffff; overflow: hidden;" class="email-card">
          
          ${emailHeaderUrl ? `
          <!-- EMAIL HEADER IMAGE -->
          <tr>
            <td style="padding: 0; margin: 0; line-height: 0; font-size: 0;">
              <img src="${emailHeaderUrl}" alt="Ollie" style="width: 100%; max-width: 600px; height: auto; display: block; margin: 0; padding: 0; border: 0;" onerror="this.style.display='none';" />
            </td>
          </tr>
          ` : `
          <!-- FALLBACK HEADER -->
          <tr>
            <td style="padding: 32px; text-align: center; background-color: #111827;">
              <p style="margin: 0; font-size: 24px; font-weight: 600; color: #ffffff;">Ollie</p>
            </td>
          </tr>
          `}
          
          <!-- WHITE BODY -->
          <tr>
            <td style="padding: 40px 32px 16px 32px; background-color: #ffffff; margin: 0;" class="email-body">
              
              <!-- Heading -->
              <h1 style="margin: 0 0 8px; font-size: 24px; font-weight: 600; line-height: 32px; color: #111827;">
                ${heading}
              </h1>
              
              <!-- Subheading -->
              <p style="margin: 0 0 32px; font-size: 16px; line-height: 24px; color: #6b7280;">
                ${subheading}
              </p>
              
              <!-- Greeting -->
              <p style="margin: 0 0 24px; font-size: 16px; line-height: 24px; color: #374151;">
                ${greetingText}
              </p>
              
              ${mainContent}
              
            </td>
          </tr>
          
          ${connectedBodyUrl ? `
          <!-- Connected Body Image -->
          <tr>
            <td style="padding: 0; margin: 0; line-height: 0; font-size: 0; text-align: center;">
              <img src="${connectedBodyUrl}" alt="Ollie Community" style="width: 100%; max-width: 600px; height: auto; display: block; margin: 0; padding: 0; border: 0;" />
            </td>
          </tr>
          ` : ''}
          
          <!-- WHITE BODY CONTINUED -->
          <tr>
            <td style="padding: 0 32px 40px 32px; background-color: #ffffff; margin: 0;" class="email-body">
              
              <!-- Closing -->
              <p style="margin: 32px 0 0; font-size: 16px; line-height: 24px; color: #374151;">
                ${closingText}<br>
                <strong>The Ollie Team</strong>
              </p>
              
            </td>
          </tr>
          
          <!-- BLACK FOOTER -->
          <tr>
            <td style="padding: 24px 32px; background-color: #111827; border-radius: 0 0 8px 8px;" class="email-footer">
              <p style="margin: 0 0 8px; font-size: 12px; line-height: 18px; color: #ffffff; text-align: center;">
                <a href="https://olliejobs.com" style="color: #ffffff; text-decoration: none;">olliejobs.com</a> | <a href="mailto:support@olliejobs.com" style="color: #ffffff; text-decoration: none;">support@olliejobs.com</a>
              </p>
              <p style="margin: 0; font-size: 10px; line-height: 16px; color: #ffffff; text-align: center;">
                © ${new Date().getFullYear()} Ollie. All rights reserved.
              </p>
            </td>
          </tr>
          
        </table>
        
      </td>
    </tr>
  </table>
  
</body>
</html>
    `.trim()
}

serve(async (req: Request) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  // Log function invocation
  console.log('📧 [send-prelaunch-confirmation-email] Function called:', {
    method: req.method,
    url: req.url,
    timestamp: new Date().toISOString()
  });

  // Get email configuration from Edge Function secrets
  const resendFromEmail = Deno.env.get('RESEND_FROM_EMAIL') || 'onboarding@resend.dev'
  const resendFromName = Deno.env.get('RESEND_FROM_NAME') || 'Ollie'
  
  // Handle GET request for browser preview (no auth required for preview)
  if (req.method === 'GET') {
    try {
      const url = new URL(req.url)
      const fullName = url.searchParams.get('fullName') || 'John Doe'
      const recipientType = (url.searchParams.get('recipientType') || 'teen') as 'teen' | 'neighbor' | 'parent'
      const emailHeaderUrl = url.searchParams.get('emailHeaderUrl') || ''
      const connectedBodyUrl = url.searchParams.get('connectedBodyUrl') || ''
      
      const emailBodyHtml = generateEmailHtml(fullName, recipientType, emailHeaderUrl, connectedBodyUrl)
      
      // Return HTML preview (no auth check for GET requests - preview only)
      return new Response(emailBodyHtml, {
        headers: {
          ...corsHeaders,
          'Content-Type': 'text/html',
        },
      })
    } catch (error: any) {
      return new Response(
        JSON.stringify({ error: error?.message || String(error) }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }
  }

  // Handle POST request to send email
  try {
    // Parse the request body
    const payload = await req.json()
    
    console.log('📦 Full payload received:', JSON.stringify(payload, null, 2))
    console.log('📦 Payload keys:', Object.keys(payload))
    console.log('📦 emailHeaderUrl in payload?', 'emailHeaderUrl' in payload)
    console.log('📦 connectedBodyUrl in payload?', 'connectedBodyUrl' in payload)
    console.log('📦 payload.emailHeaderUrl value:', payload.emailHeaderUrl)
    console.log('📦 payload.connectedBodyUrl value:', payload.connectedBodyUrl)
    
    const { 
      email, 
      fullName, 
      recipientType, 
      emailHeaderUrl: payloadHeaderUrl, 
      connectedBodyUrl: payloadBodyUrl 
    } = payload
    
    console.log('📦 Extracted payloadHeaderUrl:', payloadHeaderUrl)
    console.log('📦 Extracted payloadBodyUrl:', payloadBodyUrl)
    console.log('📦 payloadHeaderUrl !== undefined?', payloadHeaderUrl !== undefined)
    console.log('📦 payloadBodyUrl !== undefined?', payloadBodyUrl !== undefined)

    if (!email || !fullName) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields: email and fullName are required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }
    
    // Validate recipientType - required for leads (they're not users yet)
    if (!recipientType) {
      return new Response(
        JSON.stringify({ error: 'Missing required field: recipientType is required. Must be "teen", "neighbor", or "parent"' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }
    
    if (!['teen', 'neighbor', 'parent'].includes(recipientType)) {
      return new Response(
        JSON.stringify({ error: 'Invalid recipientType. Must be "teen", "neighbor", or "parent"' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }
    
    const validRecipientType = recipientType as 'teen' | 'neighbor' | 'parent'
    
    // Get image URLs: Use payload values if provided, otherwise use environment variables
    // IMPORTANT: For prelaunch emails, payload values are ALWAYS provided, so we use those
    const emailHeaderUrl = payload.emailHeaderUrl !== undefined && payload.emailHeaderUrl !== null
      ? payload.emailHeaderUrl
      : (Deno.env.get('EMAIL_HEADER_URL') || '')
    
    const connectedBodyUrl = payload.connectedBodyUrl !== undefined && payload.connectedBodyUrl !== null
      ? payload.connectedBodyUrl
      : (Deno.env.get('CONNECTED_BODY_URL') || '')
    
    console.log('📷 Image URL Configuration:')
    console.log('  - emailHeaderUrl (from payload):', payload.emailHeaderUrl)
    console.log('  - emailHeaderUrl (final):', emailHeaderUrl || '(empty - no header image)')
    console.log('  - connectedBodyUrl (from payload):', payload.connectedBodyUrl)
    console.log('  - connectedBodyUrl (final):', connectedBodyUrl || '(empty - no body image)')
    
    // Set subject based on recipient type
    let emailSubject = `You're on Ollie's Prelaunch List!`
    
    switch (validRecipientType) {
      case 'teen':
        emailSubject = `You're in! Get ready to earn with Ollie`
        break
      case 'neighbor':
        emailSubject = `You're on the list! Welcome to Ollie's pre-launch community`
        break
      case 'parent':
        emailSubject = `Your teen is ready to launch with Ollie—here's what you need to know`
        break
    }
    
    console.log('📧 Sending prelaunch confirmation email to lead:', {
      email,
      fullName,
      recipientType: validRecipientType,
      subject: emailSubject,
      emailHeaderUrl: emailHeaderUrl || 'Not set',
      connectedBodyUrl: connectedBodyUrl || 'Not set (no body image)'
    })
    
    const emailBodyHtml = generateEmailHtml(fullName, validRecipientType, emailHeaderUrl, connectedBodyUrl)

    // Log email preview for testing
    console.log('📧 EMAIL PREVIEW:')
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
    console.log('To:', email)
    console.log('From:', `${resendFromName} <${resendFromEmail}>`)
    console.log('Subject:', emailSubject)
    console.log('Recipient Type:', validRecipientType)
    console.log('Header Image URL:', emailHeaderUrl || 'Not configured')
    console.log('Connected Body URL:', connectedBodyUrl || 'Not configured (no body image)')
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')

    // Send email using Resend API
    try {
      const resendApiKey = Deno.env.get('RESEND_API_KEY')
      
      if (!resendApiKey) {
        console.log('⚠️ RESEND_API_KEY not configured. Email details logged below.')
        console.log('📧 To send emails, set RESEND_API_KEY in Edge Function secrets')
        console.log('Get your API key from: https://resend.com/api-keys')
        
        return new Response(
          JSON.stringify({ 
            success: true, 
            message: 'Email prepared. Configure RESEND_API_KEY in Edge Function secrets to send emails.',
            emailDetails: {
              to: email,
              from: `${resendFromName} <${resendFromEmail}>`,
              subject: emailSubject,
              recipientType: validRecipientType,
              emailHeaderUrl,
              connectedBodyUrl: connectedBodyUrl || 'No body image',
            },
            note: 'Set RESEND_API_KEY in Edge Function secrets to enable email sending. Get your key from https://resend.com/api-keys',
            htmlPreview: emailBodyHtml.substring(0, 500) + '...'
          }),
          { 
            status: 200,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
          }
        )
      }
      
      console.log('📧 Sending email via Resend API...')
      
      const resendResponse = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${resendApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: `${resendFromName} <${resendFromEmail}>`,
          to: [email],
          subject: emailSubject,
          html: emailBodyHtml,
        }),
      })
      
      const resendData = await resendResponse.json()
      
      if (resendResponse.ok) {
        console.log('✅ Email sent successfully via Resend:', resendData)
        return new Response(
          JSON.stringify({ 
            success: true, 
            message: 'Prelaunch confirmation email sent successfully',
            emailId: resendData.id,
            recipientType: validRecipientType,
          }),
          { 
            status: 200,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
          }
        )
      } else {
        throw new Error(`Resend API error: ${JSON.stringify(resendData)}`)
      }
    } catch (emailError: any) {
      console.error('Error sending email:', emailError)
      
      return new Response(
        JSON.stringify({ 
          success: false,
          error: 'Failed to send email',
          message: 'Check Edge Function logs for details.',
          errorDetails: emailError?.message || String(emailError)
        }),
        { 
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

  } catch (error: any) {
    console.error('Error processing request:', error)
    return new Response(
      JSON.stringify({ error: error?.message || String(error) }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )
  }
})

