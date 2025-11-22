"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { validateEmail } from "@/utils/validateEmail";

// --- Sub-Komponen: Icon Petir ---
const LightningIcon = ({ className }: { className?: string }) => (
    <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
    >
        <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
);

// --- Sub-Komponen: Background Effects ---
const BackgroundEffects = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* 1. Stars (CSS Pattern) */}
        <div
            className="absolute inset-0 opacity-40 z-0"
            style={{
                backgroundImage: `radial-gradient(rgba(255,255,255,0.8) 1px, transparent 0)`,
                backgroundSize: '40px 40px'
            }}
        />

        {/* 2. Deep Space Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black/80 z-0" />

        {/* 3. Horizon Glow (Lengkungan cahaya bumi) */}
        <div className="absolute -bottom-[200px] left-1/2 -translate-x-1/2 w-[180%] h-[500px] bg-white/5 blur-[120px] rounded-[100%] z-0" />
        <div className="absolute -bottom-[100px] left-1/2 -translate-x-1/2 w-[120%] h-[300px] bg-white/10 blur-[80px] rounded-[100%] z-0" />

        {/* 4. Horizon Line (Garis tipis di cakrawala) */}
        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent z-10" />
    </div>
);

export default function NewsletterSection() {
    const [email, setEmail] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setStatus("loading");

        // Validasi Frontend
        const validation = validateEmail(email);
        if (!validation.isValid) {
            setError(validation.error || "Email tidak valid");
            setStatus("idle");
            return;
        }

        // Simulasi Server Action (Ganti dengan real action nanti)
        setTimeout(() => {
            setStatus("success");
            setEmail("");
        }, 1500);
    };

    return (
        <section className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-[#020202] text-white selection:bg-white selection:text-black font-sans">

            <BackgroundEffects />

            {/* Main Content Container */}
            <main className="relative z-10 flex w-full max-w-4xl flex-col items-center px-4 text-center">

                {/* 1. Badge: Waitlister */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="mb-8 flex items-center gap-2.5 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-[11px] font-medium tracking-wide text-gray-300 backdrop-blur-md uppercase"
                >
                    <span className="text-gray-100">Waitlister</span>
                    <LightningIcon className="h-3 w-3 text-white" />
                    <span className="text-white/20">|</span>
                    <span className="text-gray-400">Framer Template</span>
                </motion.div>

                {/* 2. Headline: Typography Besar */}
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
                    className="text-5xl font-medium tracking-tight sm:text-6xl md:text-7xl lg:text-[5.5rem] leading-[1.1] text-white"
                >
                    Good things come <br className="hidden sm:block" />
                    to those{" "}
                    {/* Font Serif Italic (Playfair Display) */}
                    <span className="font-serif italic font-normal text-gray-200">
                        who wait.
                    </span>
                </motion.h1>

                {/* 3. Subheadline */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                    className="mt-6 max-w-xl text-lg font-light text-gray-400 sm:text-xl leading-relaxed"
                >
                    Generate leads, build excitement, and grow <br className="hidden sm:block" />
                    your email list ahead of launch day.
                </motion.p>

                {/* 4. Form Input */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="mt-10 w-full max-w-[480px]"
                >
                    <form onSubmit={handleSubmit} className="relative group">
                        <div className="relative flex items-center">

                            {/* Input Field */}
                            <input
                                type="email"
                                placeholder="Your Email Address"
                                value={email}
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                    if (error) setError(null);
                                }}
                                disabled={status === "loading" || status === "success"}
                                className={cn(
                                    "h-14 w-full rounded-xl border bg-white/5 pl-5 pr-36 text-[15px] text-white placeholder:text-gray-500 outline-none backdrop-blur-sm transition-all duration-300",
                                    "border-white/10 hover:border-white/20 focus:border-white/30 focus:bg-white/10",
                                    error && "border-red-500/50 bg-red-500/5 focus:border-red-500/50 text-red-200 placeholder:text-red-200/50"
                                )}
                            />

                            {/* Button Inside Input */}
                            <button
                                type="submit"
                                disabled={status === "loading" || status === "success"}
                                className={cn(
                                    "absolute right-1.5 top-1.5 bottom-1.5 h-11 rounded-lg px-6 text-sm font-semibold transition-all duration-300",
                                    "bg-white text-black hover:bg-gray-200 active:scale-95",
                                    "disabled:opacity-80 disabled:cursor-not-allowed disabled:active:scale-100",
                                    status === "success" && "bg-green-500 text-white hover:bg-green-600"
                                )}
                            >
                                {status === "loading" ? (
                                    <span className="flex items-center gap-2">
                                        <span className="h-3 w-3 animate-spin rounded-full border-2 border-black/30 border-t-black" />
                                    </span>
                                ) : status === "success" ? (
                                    "Joined!"
                                ) : (
                                    "Get Notified"
                                )}
                            </button>
                        </div>

                        {/* Error Message */}
                        {error && (
                            <motion.span
                                initial={{ opacity: 0, y: -5 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="absolute -bottom-6 left-2 text-xs font-medium text-red-400"
                            >
                                {error}
                            </motion.span>
                        )}
                    </form>
                </motion.div>

                {/* 5. Footer Credits */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8, duration: 1 }}
                    className="fixed bottom-8 left-0 right-0 flex justify-center gap-4 text-[10px] font-medium uppercase tracking-[0.2em] text-gray-600"
                >
                    <span className="hover:text-gray-400 transition-colors cursor-pointer">Use This Template</span>
                    <span className="opacity-30">•</span>
                    <span className="hover:text-gray-400 transition-colors">Proudly Built In Framer</span>
                    <span className="opacity-30">•</span>
                    <span className="hover:text-gray-400 transition-colors cursor-pointer">Created by Zain</span>
                </motion.div>

            </main>
        </section>
    );
}