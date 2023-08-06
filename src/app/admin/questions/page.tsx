import {cookies} from "next/headers";
import LoginPage from "@/components/admin/Login";
import QuestionsList from "@/components/admin/questions/Questions";
import '../layout'
export const runtime = 'edge';

export default async function AdminPage() {
  let {token} = JSON.parse(cookies().get('admin-token')?.value || "{}" as string)

  // Redirect to /register if token not set
  if (!token) return <LoginPage/>;

  return <QuestionsList token={token}/>
}
