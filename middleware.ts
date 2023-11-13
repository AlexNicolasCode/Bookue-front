import env from '@/main/config/env'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  if (shouldRedirectToNotFoundScreen(request.nextUrl.pathname)) {
    return NextResponse.redirect(new URL('/404', request.url))
  }
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

export const config = {
  matcher: ['/', '/book/:path*', '/login', '/sign-up'],
}

const shouldRedirectToNotFoundScreen = (pathname: string): boolean => {
  const paths = [
    { name: '/', isEnable: env.SCREEN.HOME },
    { name: '/notes', isEnable: env.SCREEN.NOTES },
    { name: '/add', isEnable: env.SCREEN.ADD_BOOK },
    { name: '/login', isEnable: env.SCREEN.SIGN_IN },
    { name: '/sign-up', isEnable: env.SCREEN.SIGN_UP },
  ]
  return paths.some((path) => pathname.endsWith(path.name) && !path.isEnable)
}
