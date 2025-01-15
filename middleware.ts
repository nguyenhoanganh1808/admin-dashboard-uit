// app/middleware.ts
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function middleware(request: Request) {
  const cookieStore = await cookies();
  const token = cookieStore.get('accessToken');

  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/protected-page', '/']
};
