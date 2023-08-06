"use client"
import style from "@/styles/questions.module.css";
import {Translation} from "@/types/translations";
import translations from "@/i18n.json";
import {FormEvent, useEffect, useState} from "react";
import {useRouter} from "next/navigation";

export default function QuestionCard({questions, token}: { questions: any, token: string }) {

  const [answers, setAnswers] = useState({})
  const [sent, setSent] = useState(false);
  useEffect(() => {
    const fetchAnswers = async () => {
      const a = await getAnswers(token)
      setAnswers(a)
      setSent(Object.entries(a).length > 0)
    }
    fetchAnswers()
  }, [token])


  const router = useRouter()

  /**
   * Handles form submission to send answers to the server.
   * @param event The form submission event.
   */
  async function SubmitAnswers(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);
    const questions: Record<string, string> = {};
    formData.forEach((value, key) => {
      questions[key] = value.toString();
    });

    // Upload answers to the API
    const res: Response = await fetch(`${process.env.NEXT_PUBLIC_API}/answers`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'answers': questions
      }), cache: 'no-store'
    })

    setSent(res.ok)

    if (!res.ok) {
      const {error} = await res.json();
      console.error(`${res.status} ${res.statusText}: ${error}`)

      // Handle the error message
      const errorElement = document.querySelector(".error");
      if (errorElement) {
        errorElement.textContent = error;
      }
      return null;
    }
    router.refresh();

  }

  function optionChecked(question: string, option: string) {
    if (!Object.keys(answers).includes(question)) return false;
    // @ts-ignore
    return answers[question] === option;
  }

  const tr: Translation = (translations as Record<string, Translation>)[process.env.NEXT_PUBLIC_LANGUAGE || 'en'] || {};
  return (
      <form id="questions" className="col col-md-11 col-lg-10" onSubmit={async (e) => await SubmitAnswers(e)}>
        {Object.keys(questions).map((question: string) => (
            <div key={question} className="card my-4">
              <div className={"card-header " + style.header}>
                {tr.question} {question}
              </div>
              <div className="card-body">
                {questions[question].map((option: string) => (
                    <div key={option} className={"form-check py-1 fs-5 "}>
                      <input type="radio" id={question + option} name={question}
                             className={"form-check-input"}
                             disabled={sent}
                             defaultChecked={optionChecked(question, option)}
                             value={option}/>
                      <label className={"form-check-label ps-1 " + style.label}
                             htmlFor={question + option}>{option}</label>
                    </div>
                ))}
              </div>
            </div>
        ))
        }
        <p className="error text-danger-emphasis"></p>
        <button className="btn btn-success btn-lg mb-4" type="submit">{tr.save}</button>
      </form>
  )
}

async function getAnswers(token: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API}/answers`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json'
    },
    cache: 'reload'
  })
  if (!res.ok) return {}
  return await res.json() as {}
}
