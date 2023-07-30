import {cookies} from 'next/headers';

export const runtime = 'edge'

export function GET() {
  const location: string = !cookies().get('token') ? '/register' : '/questions';
  return new Response(null, {status: 302, headers: {location: location}})
}
