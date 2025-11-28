import { sendNewsletter } from '@/server/sendNewsletter'
import { verifyAdminSession } from '@/server/authAdmin'
import { NextRequest, NextResponse } from 'next/server'
import { NewsletterPayload } from '@/types'

export async function POST(request: NextRequest) {
    try {
        // Verify admin session
        const isAuthorized = await verifyAdminSession()
        if (!isAuthorized) {
            return NextResponse.json(
                {
                    success: false,
                    error: 'Unauthorized',
                    code: 'UNAUTHORIZED',
                },
                { status: 401 }
            )
        }

        const body = (await request.json()) as NewsletterPayload

        const result = await sendNewsletter(body)

        return NextResponse.json(result, {
            status: result.success ? 200 : 400,
        })
    } catch (error) {
        console.error('API error:', error)
        return NextResponse.json(
            {
                success: false,
                error: 'Invalid request',
                code: 'INVALID_REQUEST',
            },
            { status: 400 }
        )
    }
}
