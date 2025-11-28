export const siteConfig = {
    name: "Zain Letter",
    description: "Bergabunglah dengan newsletter eksklusif untuk mendapatkan wawasan teknologi terbaru.",
    url: process.env.NEXT_PUBLIC_APP_URL || "https://zainletter.vercel.app",

    // Author
    author: {
        name: "Zain",
        url: "https://github.com/zeiynz",
    },

    // Link Media Sosial (Bisa dipakai di Footer/Contact)
    links: {
        instagram: "https://instagram.com/iamzeiyn",
        linkedin: "https://linkedin.com/in/zeiyn",
    },

    // Konfigurasi SEO Open Graph (Tampilan saat link dishare di WA/Twitter)
    ogImage: "/author.png", // Pastikan ada file ini di folder public/

    // Teks UI Statis (Agar konsisten)
    ui: {
        heroTitle: "Good things come to those who wait.",
        heroSubtitle: "Generate leads, build excitement, and grow your email list ahead of launch day.",
        subscribeButtonIdle: "Get Notified",
        subscribeButtonLoading: "Wait...",
        subscribeButtonSuccess: "Joined!",
    }
} as const; // 'as const' membuat properti ini read-only (aman)

export type SiteConfig = typeof siteConfig;