import 'bootstrap/dist/css/bootstrap.css'
import {redirect} from 'next/navigation';
import {cookies} from 'next/headers';

export const runtime = 'edge'

export default function Home() {
    const cookieStore = cookies();
    const token = cookieStore.get('token');
    if (!token) redirect('/register');
    else redirect('/questions')
}
