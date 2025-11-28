'use client';

import { motion } from 'framer-motion';

export function Footer() {
    return (
        <motion.footer
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="font-[Poppins] absolute bottom-6 left-0 right-0 z-20 mx-auto flex w-full max-w-7xl items-center justify-between px-6 text-[10px] uppercase tracking-wider text-gray-600"
        >
            <div className="flex gap-4 items-center">
                <span className="hidden sm:inline text-gray-800">•</span>
                <span className="hidden sm:inline">
                    Privacy <span className="text-gray-400">Policy</span>
                </span>
                <span className="hidden sm:inline text-gray-800">•</span>
                <span>
                    Created by <span className="text-gray-400">Zain</span>
                </span>
            </div>
        </motion.footer>
    );
}