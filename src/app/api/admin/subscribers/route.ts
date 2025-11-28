import { supabase } from '@/lib/supabase/client'
import { verifyAdminSession } from '@/server/authAdmin'
import { NextResponse } from 'next/server'
import { ApiResponse, Subscriber } from '@/types'

export async function GET() {
    try {
        // Verify admin session
        const isAuthorized = await verifyAdminSession()
        if (!isAuthorized) {
            return NextResponse.json(
                {
                    success: false,
                    error: 'Unauthorized',
                    code: 'UNAUTHORIZED',
                } as ApiResponse,
                { status: 401 }
            )
        }

        const { data: subscribers, error } = await supabase
            .from('subscribers')
            .select('id, email, created_at')
            .order('created_at', { ascending: false })

        if (error) {
            console.error('Database error:', error)
            return NextResponse.json(
                {
                    success: false,
                    error: 'Failed to fetch subscribers',
                    code: 'DB_ERROR',
                } as ApiResponse,
                { status: 500 }
            )
        }

        return NextResponse.json({
            success: true,
            data: subscribers as Subscriber[],
        })
    } catch (error) {
        console.error('API error:', error)
        return NextResponse.json(
            {
                success: false,
                error: 'Internal server error',
                code: 'INTERNAL_ERROR',
            } as ApiResponse,
            { status: 500 }
        )
    }
}
