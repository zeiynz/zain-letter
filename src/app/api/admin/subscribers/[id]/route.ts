import { supabase } from '@/lib/supabase/client'
import { verifyAdminSession } from '@/server/authAdmin'
import { NextResponse } from 'next/server'
import { ApiResponse } from '@/types'

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
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

        const { id } = await params

        if (!id) {
            return NextResponse.json(
                {
                    success: false,
                    error: 'Subscriber ID is required',
                    code: 'MISSING_ID',
                } as ApiResponse,
                { status: 400 }
            )
        }

        // Delete subscriber from database
        const { error } = await supabase
            .from('subscribers')
            .delete()
            .eq('id', id)

        if (error) {
            console.error('Database error:', error)
            return NextResponse.json(
                {
                    success: false,
                    error: 'Failed to delete subscriber',
                    code: 'DB_ERROR',
                } as ApiResponse,
                { status: 500 }
            )
        }

        return NextResponse.json({
            success: true,
            data: { message: 'Subscriber deleted successfully' },
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
