import {cookies} from "next/headers"
import {redirect} from 'next/navigation';
import QuestionsList from "@/components/questions/QuestionsList";

export const runtime = 'edge'

class HttpError extends Error {
  constructor(public code: number, message: string) {
    super(message);
  }
}

export default async function Page() {
  let {token} = JSON.parse(cookies().get('token')?.value || "{}" as string)

  if (!token) return redirect('/register');

  let questions;
  try {
    questions = await getQuestions(`${token}`);
  } catch (e) {
    console.error(e);
    if ((e instanceof HttpError)) {
      switch (e.code) {
        case 401:
          e.message = 'Your account has expired. Please re-register to continue accessing the service.'
      }

      return (
          <div className="alert alert-danger">
            <h1>An error occurred</h1>
            <p>{e.message}</p>
          </div>
      )
    }
    throw e
  }

  return (
        <div className="row justify-content-center">
          <QuestionsList questions={questions} token={token}/>
        </div>
    )
}

async function getQuestions(token: string) {
  const res: Response = await fetch(`${process.env.NEXT_PUBLIC_API}/questions`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    cache: "default"
  })

  if (!res.ok) throw new HttpError(res.status, res.statusText);
  return (await res.json()) as {[key: string]: string[]}
}

