'use client'

import React, { useState, FormEvent, useEffect } from 'react'
import { motion } from 'framer-motion'
// Pastikan komponen Input dan Button di-styling dengan baik untuk dark mode di file komponennya
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { subscribe } from '@/server/subscribe'

// Generate stars with consistent positions using seed
function generateStars(count: number) {
    const stars = []
    for (let i = 0; i < count; i++) {
        // Use index as seed for consistent pseudo-random values
        const seed = i * 12.9898
        const x = (Math.sin(seed) * 43758.5453) % 1
        const y = (Math.sin(seed + 78.233) * 43758.5453) % 1
        const size = (Math.sin(seed + 45.164) * 43758.5453) % 1
        const duration = (Math.sin(seed + 99.0) * 43758.5453) % 1

        stars.push({
            id: i,
            left: x * 100,
            top: y * 100,
            width: size * 1 + 0.5,
            height: size * 1 + 0.5,
            duration: 3 + duration * 2,
            delay: (size * 2) % 3,
        })
    }
    return stars
}

export default function Hero() {
    const [email, setEmail] = useState('')
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)
    const [stars, setStars] = useState<ReturnType<typeof generateStars>>([])

    // Generate stars only on client to avoid hydration mismatch
    useEffect(() => {
        setStars(generateStars(50))
    }, [])

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!email) return

        setLoading(true)
        setMessage(null)

        try {
            const result = await subscribe({ email })

            if (result.success) {
                setMessage({ type: 'success', text: 'Welcome to the newsletter!' })
                setEmail('')
            } else {
                setMessage({
                    type: 'error',
                    text: result.error || 'Something went wrong. Please try again.',
                })
            }
        } catch (error) {
            console.error('Subscription error:', error)
            setMessage({ type: 'error', text: 'An unexpected error occurred.' })
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="relative min-h-screen w-full overflow-hidden bg-black">

            {/* 1. Latar Belakang - Efek Gradien & Noise */}
            <div className="absolute inset-0 bg-slate-950/90 [mask-image:radial-gradient(transparent,black)]">
                {/* Efek Bintang/Partikel - Only render after hydration */}
                {stars.length > 0 && stars.map((star) => (
                    <motion.div
                        key={star.id}
                        className="absolute w-1 h-1 bg-white rounded-full shadow-lg shadow-white/50"
                        style={{
                            left: `${star.left}%`,
                            top: `${star.top}%`,
                            width: `${star.width}px`,
                            height: `${star.height}px`,
                        }}
                        animate={{
                            opacity: [0.3, 1, 0.3], // Efek Berkedip
                        }}
                        transition={{
                            duration: star.duration,
                            repeat: Infinity,
                            delay: star.delay,
                        }}
                    />
                ))}
            </div>

            {/* 2. Content (Teks, Form) */}
            <div className="relative z-10 flex items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8">
                <motion.div
                    className="w-full max-w-2xl text-center"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                >

                    {/* Badge */}
                    <motion.div
                        className="mb-6 inline-block"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="px-4 py-2 rounded-full border border-slate-600/30 bg-slate-900/20 backdrop-blur-sm">
                            <span className="text-xs sm:text-sm text-slate-300 tracking-wide">Waitlister ✦ Build With Me</span>
                        </div>
                    </motion.div>

                    {/* Headline */}
                    <motion.h1
                        className="mb-6 text-5xl sm:text-6xl lg:text-7xl font-extrabold text-white leading-tight font-poppins"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.1, ease: 'easeOut' }}
                    >
                        Good things come
                        <br />
                        to those <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500 italic font-serif">who wait.</span>
                    </motion.h1>

                    {/* Subtitle */}
                    <motion.p
                        className="mb-12 text-lg sm:text-xl text-slate-400 font-poppins max-w-md mx-auto"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
                    >
                        Join the newsletter for insights you won’t want to miss and stay ahead with clear, valuable updates.
                    </motion.p>

                    {/* Email Form */}
                    <motion.form
                        onSubmit={handleSubmit}
                        className="flex flex-col sm:flex-row gap-3 justify-center items-center mb-8"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
                    >
                        <Input
                            type="email"
                            placeholder="Your Email Address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            // Styling Input untuk Dark Vibe
                            className="w-full sm:w-auto sm:min-w-80 bg-white/5 border-slate-700 text-white placeholder:text-popins-500 focus:ring-1 focus:ring-purple-500 transition-colors duration-300"
                        />
                        <Button
                            type="submit"
                            disabled={loading}
                            // Styling Tombol (Contoh Tombol Gradien Ungu)
                            className="w-full sm:w-auto whitespace-nowrap bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 shadow-lg shadow-purple-500/30 transition-all duration-300"
                        >
                            {loading ? 'Subscribing...' : 'Get Notified'}
                        </Button>
                    </motion.form>

                    {/* Message */}
                    {message && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={`inline-block px-4 py-2 rounded-lg text-sm transition-colors duration-300 ${message.type === 'success'
                                ? 'bg-green-600/30 text-green-300 border border-green-500/50'
                                : 'bg-red-600/30 text-red-300 border border-red-500/50'
                                }`}
                        >
                            {message.text}
                        </motion.div>
                    )}
                </motion.div>
            </div>

            {/* 3. Dekorasi - Efek Planet/Horizon di Bawah */}
            {/* Animasi pergerakan horizon/cahaya bawah */}
            <motion.div
                className="absolute bottom-0 left-0 w-full h-1/4 bg-gradient-to-t from-black via-slate-900/50 to-transparent"
                animate={{
                    scaleX: [1, 1.05, 1],
                }}
                transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: 'easeInOut',
                }}
            >
                {/* Efek Cahaya Cincin */}
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-[120%] h-1/2 bg-white/5 blur-3xl rounded-full" />
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-[80%] h-1/3 bg-purple-600/10 blur-3xl rounded-full" />
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-[50%] h-1/4 bg-pink-500/10 blur-3xl rounded-full" />
            </motion.div>
        </div>
    )
}