import { authAdmin } from '@/server/authAdmin'
import { NextRequest, NextResponse } from 'next/server'
import { AuthPayload } from '@/types'

export async function POST(request: NextRequest) {
    try {
        const body = (await request.json()) as AuthPayload

        const result = await authAdmin(body)

        return NextResponse.json(result, {
            status: result.success ? 200 : 401,
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
