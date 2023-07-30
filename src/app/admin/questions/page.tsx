import 'bootstrap/dist/css/bootstrap.css'
import {cookies} from "next/headers";
import LoginPage from "@/components/Login";
import QuestionsList from "@/components/Questions";
import '../layout'

export default async function AdminPage() {
  let {token} = JSON.parse(cookies().get('token')?.value || "{}" as string)

  // Redirect to /register if token not set
  if (!token) return <LoginPage/>;

  return <QuestionsList token={token}/>
}
