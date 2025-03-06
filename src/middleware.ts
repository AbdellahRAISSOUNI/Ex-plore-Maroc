import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Get the pathname of the request
  const path = request.nextUrl.pathname;
  
  // Define public paths that don't require authentication
  const isPublicPath = path === '/login' || path === '/signup';
  
  // Check if user is authenticated by looking for the user item in localStorage
  // Note: In a real app, you would use a proper auth token or cookie
  const isAuthenticated = request.cookies.has('user');
  
  // If the path is public and user is authenticated, redirect to camera
  if (isPublicPath && isAuthenticated) {
    return NextResponse.redirect(new URL('/camera', request.url));
  }
  
  // If the path is not public and user is not authenticated, redirect to login
  if (!isPublicPath && !isAuthenticated && path !== '/_next' && !path.includes('.')) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  
  // If user is authenticated but trying to access home page, redirect to camera
  if (path === '/' && isAuthenticated) {
    return NextResponse.redirect(new URL('/camera', request.url));
  }
  
  return NextResponse.next();
}

// Configure the middleware to run on specific paths
export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|images).*)',
  ],
}; 