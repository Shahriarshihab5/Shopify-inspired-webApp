import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  const authToken = request.cookies.get('auth-token')?.value;
  
  // Protected merchant routes
  const merchantRoutes = ['/dashboard'];
  const isMerchantRoute = merchantRoutes.some(route => pathname.startsWith(route));
  
  // Redirect to login if accessing protected route without auth
  if (isMerchantRoute && !authToken) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  
  // Redirect to dashboard if logged in and trying to access login/signup
  if ((pathname === '/login' || pathname === '/signup') && authToken) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|public).*)',
  ],
};
