import 'bootstrap/dist/css/bootstrap.css'
import {redirect} from 'next/navigation';
import {cookies} from 'next/headers';

export const runtime = 'edge'

export default function Home() {
    if (!cookies().get('token')) redirect('/register');
    else redirect('/questions')
}
