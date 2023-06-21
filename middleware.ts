import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import * as jose from 'jose';

export default async function middleware(req: NextRequest) {
  if (req.nextUrl.pathname.startsWith('/api/admin') || req.nextUrl.pathname === '/api/profile') {
    const token = req.headers.get('authorization')?.split(' ')[1];
    if (!token) {
      return new Response(JSON.stringify({
        error: {
          code: 401,
          message: 'Unauthorized!. No authorization token provided.',
        },
      }), {
        status: 401,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }

    try {
      const decodedToken = await jose.jwtVerify(
        token,
        new TextEncoder().encode(process.env.APP_KEY),
      );

      const response = NextResponse.next();
      response.headers.set('x-jwt-payload', JSON.stringify(decodedToken.payload));
      return response;
    } catch (error: any) {
      return new Response(JSON.stringify({
        error: {
          code: 401,
          message: `Unauthorized!. ${error.message}`,
        },
      }), {
        status: 401,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }
  }

  return NextResponse.next();
}
