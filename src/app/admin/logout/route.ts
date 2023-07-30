import {cookies} from 'next/headers';

export const runtime = 'edge'

export function GET() {
    if (cookies().get('token')) cookies().delete('token');
    return new Response(null, {status: 302, headers: {location: '/admin'}})
}
