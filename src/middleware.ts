import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;

    // Protect /admin routes
    if (path.startsWith('/admin') && path !== '/admin/login') {
        // Check for admin-session cookie
        const adminSession = request.cookies.get('admin-session');

        if (!adminSession || adminSession.value !== process.env.ADMIN_PASSWORD) {
            return NextResponse.redirect(new URL('/admin/login', request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/admin/:path*'],
};
