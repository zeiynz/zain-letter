'use server'

import { ApiResponse, AuthPayload } from '@/types'
import { cookies } from 'next/headers'

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD

export async function authAdmin(
    payload: AuthPayload
): Promise<ApiResponse<{ authenticated: boolean }>> {
    try {
        if (!ADMIN_PASSWORD) {
            return {
                success: false,
                error: 'Admin password not configured',
                code: 'CONFIG_ERROR',
            }
        }

        if (!payload.password) {
            return {
                success: false,
                error: 'Password is required',
                code: 'MISSING_PASSWORD',
            }
        }

        if (payload.password !== ADMIN_PASSWORD) {
            return {
                success: false,
                error: 'Invalid password',
                code: 'INVALID_PASSWORD',
            }
        }

        // Set httpOnly cookie for session
        const cookieStore = await cookies()
        const sessionToken = Buffer.from(Math.random().toString()).toString('base64')
        cookieStore.set('admin_session', sessionToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 86400, // 24 hours
            path: '/',
        })

        return {
            success: true,
            data: { authenticated: true },
        }
    } catch (error) {
        console.error('Auth error:', error)
        return {
            success: false,
            error: 'Internal server error',
            code: 'INTERNAL_ERROR',
        }
    }
}

export async function verifyAdminSession(): Promise<boolean> {
    try {
        const cookieStore = await cookies()
        const session = cookieStore.get('admin_session')
        return !!session?.value
    } catch {
        return false
    }
}

export async function logoutAdmin(): Promise<ApiResponse<null>> {
    try {
        const cookieStore = await cookies()
        cookieStore.delete('admin_session')
        return { success: true }
    } catch (error) {
        console.error('Logout error:', error)
        return {
            success: false,
            error: 'Failed to logout',
            code: 'LOGOUT_ERROR',
        }
    }
}
