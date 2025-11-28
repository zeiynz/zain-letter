import { subscribe } from '@/server/subscribe'
import { NextRequest, NextResponse } from 'next/server'
import { SubscribePayload } from '@/types'

export async function POST(request: NextRequest) {
    try {
        const body = (await request.json()) as SubscribePayload

        const result = await subscribe(body)

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
