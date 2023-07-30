"use client";
import 'bootstrap/dist/css/bootstrap.css'
import styles from '@/styles/editQuestion.module.css'
import React, {FormEvent, useState} from "react"
import {useRouter} from 'next/navigation'
import translations from "@/i18n.json";

export default function EditQuestion({params, data, token}: {
  params: { id: string },
  data: Array<string>,
  token: string
}) {
// @ts-ignore
  const tr = translations[process.env.NEXT_PUBLIC_LANGUAGE || 'en'] || {};
  const HandleSubmit = async (event: FormEvent, id: string, uri: string | undefined) => {

    const form: HTMLFormElement | null = document.querySelector('#question')
    if (form === null) return null;

    const formData: FormData = new FormData(form) || {};
    const options: string[] = [];

    for (const key of formData.keys()) {
      // Check if the key is numerical using a regular expression
      if (/^\d+$/.test(key)) {
        const value = formData.get(key);
        if (value !== null) options.push(value.toString());
      }
    }

    const data = {
      [id]: {
        options: options,
        correct: formData.get(formData.get('correct')?.toString() as string) //Use value of correct input elem
      }
    }
    event.preventDefault()
    const res: Response = await fetch(`${uri}/questions`, {
      method: 'PUT',
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(data),
      cache: "no-cache"
    })
    if (!res.ok) throw res.status
    return res.ok
  }

  const handleIncreaseOptions = (event: Event) => {
    event.preventDefault();
    setLength(length + 1);
  };

  const handleDecreaseOptions = (event: Event) => {
    event.preventDefault();
    setLength(length - 1);
  };

  const router = useRouter()

  const [length, setLength] = useState(data.length > 0 ? data.length : 1);
  return (
      <form key="a" id="question" onSubmit={
        async (e) => {
          if (await HandleSubmit(e, params.id, process.env.NEXT_PUBLIC_API))
            router.push("/admin/questions")
        }
      }>
        <div className="card">
          <div className="card-header">
            {tr.question} {params.id}
          </div>
          <div className="card-body">
            {Array.from({length: length}).map((_, index) => (
                <div className="input-group mb-3" key={index}>
                  <div className="input-group-text">
                    <input type="radio" className="btn btn-outline-secondary" value={index + 1}
                           name="correct" required></input>
                  </div>
                  <input name={(index + 1).toString()} id={(index + 1).toString()} type="text"
                         placeholder={"Option " + (index + 1)} className="form-control"
                         defaultValue={data[index] || ""} required/>
                </div>
            ))}
            <button className={styles.plusMinusBtn} onClick={(e: any) => handleIncreaseOptions(e)}>+
            </button>
            <button className={styles.plusMinusBtn} onClick={(e: any) => handleDecreaseOptions(e)}>-
            </button>
            <button type="submit">{tr.save}</button>
          </div>
        </div>
      </form>
  )
}
