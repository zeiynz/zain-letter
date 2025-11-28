'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import Dashboard from '@/components/sections/Dashboard'
import { LogOut, Loader2 } from 'lucide-react'
import { logoutAdmin } from '@/server/authAdmin'

const queryClient = new QueryClient()

function DashboardContent() {
    const router = useRouter()
    const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null)

    useEffect(() => {
        const verifyAuth = async () => {
            try {
                const response = await fetch('/api/admin/subscribers')
                if (response.status === 401) {
                    setIsAuthorized(false)
                    router.push('/admin')
                } else {
                    setIsAuthorized(true)
                }
            } catch {
                setIsAuthorized(false)
                router.push('/admin')
            }
        }

        verifyAuth()
    }, [router])

    const handleLogout = async () => {
        await logoutAdmin()
        router.push('/admin')
    }

    if (isAuthorized === null) {
        return (
            <div className="min-h-screen w-full bg-gradient-to-b from-slate-950 via-purple-950 to-slate-950 flex items-center justify-center">
                <div className="flex flex-col items-center gap-3">
                    <Loader2 className="w-8 h-8 text-purple-400 animate-spin" />
                    <p className="text-slate-400">Verifying access...</p>
                </div>
            </div>
        )
    }

    if (!isAuthorized) {
        return null
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-4xl font-bold text-white">Dashboard</h1>
                        <p className="text-slate-400 mt-1">Manage your newsletter</p>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-slate-300 bg-white text-slate-900 hover:bg-slate-50 dark:border-slate-600 dark:bg-slate-950 dark:text-slate-50 dark:hover:bg-slate-900 h-10 px-4 py-2 gap-2"
                    >
                        <LogOut className="w-4 h-4" />
                        Logout
                    </button>
                </div>

                {/* Dashboard content */}
                <Dashboard />
            </div>
        </div>
    )
}

export default function AdminDashboardPage() {
    return (
        <QueryClientProvider client={queryClient}>
            <DashboardContent />
        </QueryClientProvider>
    )
}
