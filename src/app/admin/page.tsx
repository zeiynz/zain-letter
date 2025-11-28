'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { motion } from 'framer-motion'
import { Lock, AlertCircle } from 'lucide-react'

// Generate stars with consistent positions using seed
function generateStars(count: number) {
    const stars = []
    for (let i = 0; i < count; i++) {
        const seed = i * 12.9898
        const x = (Math.sin(seed) * 43758.5453) % 1
        const y = (Math.sin(seed + 78.233) * 43758.5453) % 1
        const duration = (Math.sin(seed + 99.0) * 43758.5453) % 1

        stars.push({
            id: i,
            left: x * 100,
            top: y * 100,
            duration: 3 + duration * 2,
            delay: (duration * 2) % 3,
        })
    }
    return stars
}

export default function AdminPage() {
    const router = useRouter()
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [stars, setStars] = useState<ReturnType<typeof generateStars>>([])

    // Generate stars only on client to avoid hydration mismatch
    useEffect(() => {
        setStars(generateStars(30))
    }, [])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError(null)

        try {
            const response = await fetch('/api/admin/auth', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ password }),
            })

            const data = await response.json()

            if (data.success) {
                router.push('/admin/dashboard')
            } else {
                setError(data.error || 'Invalid password')
            }
        } catch (err) {
            setError('An error occurred. Please try again.')
            console.error(err)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen w-full bg-gradient-to-b from-slate-950 via-purple-950 to-slate-950 flex items-center justify-center px-4">
            {/* Background stars - only render after hydration */}
            {stars.length > 0 && (
                <div className="absolute inset-0">
                    {stars.map((star) => (
                        <motion.div
                            key={star.id}
                            className="absolute w-1 h-1 bg-white rounded-full"
                            style={{
                                left: `${star.left}%`,
                                top: `${star.top}%`,
                            }}
                            animate={{
                                opacity: [0.3, 1, 0.3],
                            }}
                            transition={{
                                duration: star.duration,
                                repeat: Infinity,
                                delay: star.delay,
                            }}
                        />
                    ))}
                </div>
            )}

            {/* Login form */}
            <motion.div
                className="relative w-full max-w-md"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className="bg-slate-900/50 border border-slate-800 rounded-lg p-8 backdrop-blur-sm">
                    <div className="flex justify-center mb-6">
                        <div className="p-3 bg-purple-500/10 border border-purple-500/30 rounded-lg">
                            <Lock className="w-6 h-6 text-purple-400" />
                        </div>
                    </div>

                    <h1 className="text-2xl font-bold text-white text-center mb-2 font-poppins">
                        Admin Access
                    </h1>
                    <p className="text-slate-400 text-center mb-6 text-sm font-poppins">
                        Enter your password to continue
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2 font-poppins">
                                Password
                            </label>
                            <Input
                                type="password"
                                placeholder="Enter admin password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                disabled={loading}
                                autoFocus
                                className="bg-slate-800/50 border-slate-700 text-white"
                            />
                        </div>

                        {error && (
                            <div className="flex items-start gap-3 p-3 bg-red-900/20 border border-red-800 rounded-lg">
                                <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                                <p className="text-red-200 text-sm">{error}</p>
                            </div>
                        )}

                        <Button
                            type="submit"
                            disabled={loading || !password}
                            className="w-full"
                        >
                            {loading ? 'Authenticating...' : 'Sign In'}
                        </Button>
                    </form>

                    <p className="text-xs text-slate-500 text-center mt-6">
                        Protected admin area
                    </p>
                </div>
            </motion.div>
        </div>
    )
}
