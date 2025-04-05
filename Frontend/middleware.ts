import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const token = req.cookies.get('token')?.value;

  const isLoginPage = req.nextUrl.pathname === '/login';

  if (!token && !isLoginPage) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  if (token && isLoginPage) {
    return NextResponse.redirect(new URL('/viewPage', req.url)); 
  }

  return NextResponse.next();
}

export const config = {
  matcher: [

    '/viewViolencePage/:path*', 
    '/viewForgottenPage/:path*', 
    '/resetPasswordPage', 
    '/viewPage',
    '/violenceLog',
    '/forgottenPage', 
    '/forgottenLog',
    '/login'
  ],
};