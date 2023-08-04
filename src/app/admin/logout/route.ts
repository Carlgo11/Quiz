import {cookies} from 'next/headers';

export const runtime = 'edge'

export function GET() {
  if (cookies().get('admin-token')) cookies().delete('admin-token');
  return new Response(null, {status: 302, headers: {location: '/admin/login'}})
}
