'use server'

import { supabase } from '@/lib/supabase/client'
import { Resend } from 'resend'
import { ApiResponse, NewsletterPayload } from '@/types'
import { render } from '@react-email/render'
import NewsletterTemplate from '@/emails/NewsletterTemplate'

export async function sendNewsletter(
    payload: NewsletterPayload
): Promise<ApiResponse<{ sent: number }>> {
    try {
        // Initialize Resend inside function to avoid build-time env access
        const resend = new Resend(process.env.RESEND_API_KEY)
        const RESEND_FROM_EMAIL = process.env.RESEND_FROM_EMAIL || 'hi@iamzeiyn.com'

        if (!payload.subject || !payload.content) {
            return {
                success: false,
                error: 'Subject and content are required',
                code: 'MISSING_FIELDS',
            }
        }

        // Get all subscribers
        const { data: subscribers, error: queryError } = await supabase
            .from('subscribers')
            .select('id, email, created_at')

        if (queryError || !subscribers) {
            console.error('Database query error:', queryError)
            return {
                success: false,
                error: 'Failed to fetch subscribers',
                code: 'DB_ERROR',
            }
        }

        if (subscribers.length === 0) {
            return {
                success: true,
                data: { sent: 0 },
            }
        }

        // Render email template
        const html = await render(
            NewsletterTemplate({
                subject: payload.subject,
                content: payload.content,
            })
        )

        // Send newsletters individually
        let sent = 0
        for (const subscriber of subscribers) {
            try {
                await resend.emails.send({
                    from: RESEND_FROM_EMAIL,
                    to: subscriber.email,
                    subject: payload.subject,
                    html,
                })
                sent++
            } catch (error) {
                console.error(`Failed to send to ${subscriber.email}:`, error)
            }
        }

        return {
            success: true,
            data: { sent },
        }
    } catch (error) {
        console.error('Send newsletter error:', error)
        return {
            success: false,
            error: 'Internal server error',
            code: 'INTERNAL_ERROR',
        }
    }
}
