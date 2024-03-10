import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

import { TOKEN_NAME, UNAUTHORIZED_PATHNAMES } from '@/utils/const'

export function middleware(request: NextRequest) {
    const token = cookies().get(TOKEN_NAME)
    if (token !== undefined) {
        request.cookies.set(TOKEN_NAME, token.value)
    }
    if ((request.nextUrl.pathname === '/login' || request.nextUrl.pathname === '/signup') && token !== undefined) {
        return NextResponse.redirect(new URL('/dashboard', request.url))
    }
    if (UNAUTHORIZED_PATHNAMES.includes(request.nextUrl.pathname) && token === undefined) {
        return NextResponse.redirect(new URL('/login', request.url))
    }
    return NextResponse.next()
}


// See "Matching Paths" below to learn mores
export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        '/((?!_next/static|_next/image|favicon.ico).*)',
    ],
}