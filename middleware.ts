// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// ----------------------------------------------------
// 1. Fungsi Middleware Utama (Wajib diekspor)
// ----------------------------------------------------
export async function middleware(request: NextRequest) {
    // Ambil path yang sedang diakses (misal: /admin/dashboard)
    const path = request.nextUrl.pathname;

    // Placeholder: Di sini nanti Anda akan menambahkan logika Supabase Auth
    // Anda harus menggunakan @supabase/auth-helpers untuk mendapatkan sesi user.
    const userIsAdmin = false; // Ganti ini dengan hasil cek Supabase Session

    // Jika user mencoba mengakses area /admin/*
    if (path.startsWith('/admin')) {

        // Jika user TIDAK TERAUTENTIKASI, arahkan ke halaman login/homepage
        if (!userIsAdmin) {
            // Redirect ke root atau halaman login admin yang terpisah
            return NextResponse.redirect(new URL('/', request.url));
        }
    }

    // Lanjutkan permintaan jika sudah login atau jika bukan rute admin
    return NextResponse.next();
}

// ----------------------------------------------------
// 2. Konfigurasi Matcher (Wajib)
// ----------------------------------------------------
// Matcher menentukan path mana saja yang harus dilewati oleh middleware.
export const config = {
    matcher: [
        /*
         * Kecuali:
         * - API routes (/api)
         * - files (/favicon.ico, /vercel.svg, dll.)
         * - _next (Next.js internals)
         * - root public files (/.env.local, dll.)
         */
        '/((?!api|_next/static|_next/image|favicon.ico|assets|emails|api/webhook).*)',

        // Tambahkan secara spesifik rute admin Anda
        '/admin/:path*',
    ],
};