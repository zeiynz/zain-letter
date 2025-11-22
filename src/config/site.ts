export const siteConfig = {
    name: "Zain Letter",
    description: "Bergabunglah dengan newsletter eksklusif untuk mendapatkan wawasan teknologi terbaru.",
    url: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",

    // Profil Pembuat / Author
    author: {
        name: "Zain",
        url: "https://github.com/zain", // Ganti dengan URL portfolio/github kamu
    },

    // Link Media Sosial (Bisa dipakai di Footer/Contact)
    links: {
        twitter: "https://twitter.com/zain",
        github: "https://github.com/zain",
        linkedin: "https://linkedin.com/in/zain",
    },

    // Konfigurasi SEO Open Graph (Tampilan saat link dishare di WA/Twitter)
    ogImage: "/og-image.jpg", // Pastikan ada file ini di folder public/

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