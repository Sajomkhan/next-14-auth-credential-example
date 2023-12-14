import { NextResponse } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function middleware(request) {

  let headers = new Headers(request.headers)
  if(!headers){
    return NextResponse.redirect(new URL('/login', request.url))
  }
} 

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/about/:path*', '/dashboard/:path*'],
}