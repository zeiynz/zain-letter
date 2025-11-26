import type { Metadata, Viewport } from "next";
import { Poppins, Playfair_Display } from "next/font/google";
import "./globals.css";

// 1. Setup Poppins (Body Text)
const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap", // Penting untuk performa (LCP)
});

// 2. Setup Playfair Display (Headings)
const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

// 3. Definisikan URL Website (Ganti dengan domain aslimu nanti)
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://zain-newsletter.com";

export const viewport: Viewport = {
  themeColor: "#ffffff", // Sesuaikan dengan brand color
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  // SEO Dasar
  title: {
    default: "Zain Newsletter",
    template: "%s | Zain Newsletter", // Format otomatis untuk halaman lain
  },
  description: "Join exclusive waitlist for Zain Newsletter. Dapatkan wawasan mingguan seputar teknologi, bisnis, dan pengembangan diri.",
  keywords: ["Newsletter", "Teknologi", "Bisnis", "Zain", "Growth", "Waitlist"],
  authors: [{ name: "Zain", url: SITE_URL }],
  creator: "Zain",

  // Konfigurasi Icon (Pastikan file ada di folder /public)
  icons: {
    icon: "/rich.png",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },

  // Open Graph (Untuk tampilan saat share di WA, FB, LinkedIn)
  openGraph: {
    title: "Zain Newsletter",
    description: "Dapatkan wawasan mingguan seputar teknologi dan bisnis langsung ke inbox Anda.",
    url: SITE_URL,
    siteName: "Zain Newsletter",
    images: [
      {
        url: "/og-image.png", // Gambar preview (rekomendasi size 1200x630px)
        width: 1200,
        height: 630,
        alt: "Zain Newsletter Preview",
      },
    ],
    locale: "id_ID",
    type: "website",
  },

  // Twitter Card (Untuk tampilan saat share di X/Twitter)
  twitter: {
    card: "summary_large_image",
    title: "Zain Newsletter",
    description: "Join the exclusive waitlist.",
    images: ["/author.png"], // Menggunakan gambar yang sama dengan OG
  },

  // Kontrol Robot (Google Indexing)
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${poppins.variable} ${playfair.variable} antialiased bg-white text-gray-900`}
      >
        {children}
      </body>
    </html>
  );
}