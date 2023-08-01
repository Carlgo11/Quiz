import {cookies} from 'next/headers';

export const runtime = 'edge'

export function GET() {
  const token = cookies().get('token')
  return new Response(null, {status: 302, headers: {location: token ? '/admin/questions' : '/admin/login'}})
}
