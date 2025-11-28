import type { Metadata, Viewport } from "next";
import { Poppins, Playfair_Display } from "next/font/google";
import "./globals.css";

// 1. Poppins (Primary / Body Font)
const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

// 2. Playfair Display (Headings Font)
const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

// Website domain
const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://zainletter.vercel.app";

export const viewport: Viewport = {
  themeColor: "#ffffff",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Zain Newsletter",
    template: "%s | Zain Newsletter",
  },
  description:
    "Join the exclusive waitlist for the Zain Newsletter. Get weekly insights on technology, business, and personal growth.",
  keywords: [
    "Newsletter",
    "Technology",
    "Business",
    "Zain",
    "Growth",
    "Waitlist",
  ],
  authors: [{ name: "Zain", url: SITE_URL }],
  creator: "Zain",

  icons: {
    icon: "/rich.png",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },

  openGraph: {
    title: "Zain Newsletter",
    description:
      "Get weekly insights on technology and business delivered directly to your inbox.",
    url: SITE_URL,
    siteName: "Zain Newsletter",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Zain Newsletter Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Zain Newsletter",
    description: "Join the exclusive waitlist.",
    images: ["/author.png"],
  },

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
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${poppins.variable} ${playfair.variable} antialiased bg-white text-gray-900 dark:bg-slate-950`}
      >
        {children}
      </body>
    </html>
  );
}