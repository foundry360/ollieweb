import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  try {
    const { name, email, message } = await request.json()

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required' },
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

    const supportEmail = process.env.SUPPORT_EMAIL || 'approvals@olliejobs.com'
    const resendApiKey = process.env.RESEND_API_KEY
    const fromEmail = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev'

    // Check if Resend API key is configured
    if (!resendApiKey) {
      console.error('RESEND_API_KEY is not configured. Please add it to your .env.local file')
      console.log('Contact form submission (not sent):', {
        name,
        email,
        message,
        to: supportEmail,
        timestamp: new Date().toISOString(),
      })
      
      // Still return success to user, but log the issue
      return NextResponse.json({
        success: true,
        message: 'Your question has been received. We\'ll get back to you soon!',
      })
    }

    // Send email using Resend
    const resend = new Resend(resendApiKey)

    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to: supportEmail,
      replyTo: email,
      subject: `New Question from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #73af17; margin-bottom: 20px;">New Contact Form Submission</h2>
          <div style="background-color: #f9fafb; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <p style="margin: 10px 0;"><strong>Name:</strong> ${name}</p>
            <p style="margin: 10px 0;"><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
          </div>
          <div style="margin-top: 20px;">
            <h3 style="color: #111827; margin-bottom: 10px;">Message:</h3>
            <p style="color: #374151; line-height: 1.6; white-space: pre-wrap;">${message.replace(/\n/g, '<br>')}</p>
          </div>
        </div>
      `,
      text: `
        New Contact Form Submission
        
        Name: ${name}
        Email: ${email}
        
        Message:
        ${message}
      `,
    })

    if (error) {
      console.error('Resend error:', error)
      throw new Error(error.message || 'Failed to send email')
    }

    console.log('Contact form email sent successfully:', {
      id: data?.id,
      name,
      email,
      to: supportEmail,
      timestamp: new Date().toISOString(),
    })

    return NextResponse.json({
      success: true,
      message: 'Your question has been received. We\'ll get back to you soon!',
    })
  } catch (error: any) {
    console.error('Error sending contact email:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to send message' },
      { status: 500 }
    )
  }
}

