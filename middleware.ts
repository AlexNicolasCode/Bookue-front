import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
export function middleware(request: NextRequest) {
    const hasAccessToken = request.cookies.has('bookue-user')
    const isSignInScreen = request.nextUrl.pathname.startsWith('/login')
    const isSignUpScreen = request.nextUrl.pathname.startsWith('/sign-up')
    const isAuthenticationScreen = isSignInScreen || isSignUpScreen
    if (!isAuthenticationScreen && !hasAccessToken) {
        return NextResponse.redirect(new URL('/login', request.url))
    }
    if (isAuthenticationScreen && hasAccessToken) {
        return NextResponse.redirect(new URL('/', request.url))
    }
}