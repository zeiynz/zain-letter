'use server'

import { validateEmail } from '@/utils/validateEmail'
import { supabase } from '@/lib/supabase/client'
import { Resend } from 'resend'
import WelcomeEmail from '@/emails/WelcomeEmail'
import { ApiResponse, SubscribePayload } from '@/types'

export async function subscribe(
    payload: SubscribePayload
): Promise<ApiResponse<{ email: string }>> {
    try {
        // Initialize Resend inside function to avoid build-time env access
        const resend = new Resend(process.env.RESEND_API_KEY)
        const RESEND_FROM_EMAIL = process.env.RESEND_FROM_EMAIL || 'hi@iamzeiyn.com'

        // Validate email
        const validation = validateEmail(payload.email)
        if (!validation.valid) {
            return {
                success: false,
                error: validation.error || 'Invalid email',
                code: 'INVALID_EMAIL',
            }
        }

        const email = payload.email.toLowerCase().trim()

        // Check if email already exists
        const { data: existing, error: queryError } = await supabase
            .from('subscribers')
            .select('id')
            .eq('email', email)
            .single()

        if (queryError && queryError.code !== 'PGRST116') {
            console.error('Database query error:', queryError)
            return {
                success: false,
                error: 'Database error',
                code: 'DB_ERROR',
            }
        }

        if (existing) {
            return {
                success: false,
                error: 'Email already subscribed',
                code: 'EMAIL_EXISTS',
            }
        }

        // Insert subscriber
        const { data: subscriber, error: insertError } = await supabase
            .from('subscribers')
            .insert([{ email }])
            .select('id, email, created_at')
            .single()

        if (insertError || !subscriber) {
            console.error('Insert error:', insertError)
            return {
                success: false,
                error: 'Failed to subscribe',
                code: 'INSERT_ERROR',
            }
        }

        // Send welcome email
        try {
            await resend.emails.send({
                from: RESEND_FROM_EMAIL,
                to: email,
                subject: 'Welcome to our Newsletter!',
                react: WelcomeEmail({ email }),
            })
        } catch (emailError) {
            console.error('Email send error:', emailError)
            // Don't fail the subscription if email fails
        }

        return {
            success: true,
            data: { email },
        }
    } catch (error) {
        console.error('Subscribe error:', error)
        return {
            success: false,
            error: 'Internal server error',
            code: 'INTERNAL_ERROR',
        }
    }
}
