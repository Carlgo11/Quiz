import 'bootstrap/dist/css/bootstrap.css'
import '@/app/layout'
import {cookies} from "next/headers";
import LoginPage from "./Login";
import QuestionsList from "./Questions";

export default async function AdminPage() {
    let token = cookies().get('token')?.value as string

    // Redirect to /register if token not set
    if (!token) return <LoginPage/>;

    token = JSON.parse(token).token
    return <QuestionsList token={token}/>
}
