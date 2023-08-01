"use client"
import styles from "@/styles/auth.module.css";
import {FormEvent} from "react";
import translations from "@/i18n.json";
import {Translation} from "@/types/translations";

async function sendForm(event: FormEvent, url: string, method: string = 'PUT') {

  const form: any | null = event.target
  if (form === null) return null;
  event.preventDefault()

  const formData: FormData = new FormData(form) || {};
  // @ts-ignore
  const errorElem: Element = document.querySelector('.error')
  errorElem.textContent = ''
  const auth = [formData.get('username'), formData.get('password')].join(':')
  let data
  try {
    const res = await fetch(`${url}/admin`, {
      method: method, headers: {
        'Accept': 'application/json',
        'Authorization': `Basic ${Buffer.from(auth).toString('base64')}`
      }, cache: 'no-store'
    })

    if (!res.ok) {
      // Try and validate user instead of creating user if status eql conflict
      if (res.status === 409)
        return sendForm(event, url, 'POST')

      // Unless error is due to a user conflict, output error to DOM & console
      const {error} = await res.json();
      errorElem.textContent = error
      return false;
    }

    data = await res.json()

    if (!data['token'] || !data['token']) throw new Error('No response from server.')

  } catch (e) {
    if (e instanceof TypeError) {
      errorElem.textContent = "Unable to contact server. Try again later."
    } else if (e instanceof Error) {
      errorElem.textContent = e.message
    }
    console.error(e)
    return false
  }

  const {token} = data
  // Set the session cookie
  const cookieValue = JSON.stringify({token});
  document.cookie = `token=${encodeURIComponent(cookieValue)}; path=/`;
  // @ts-ignore
  document.cookie = `user=${encodeURIComponent(formData.get('username'))}; path=/`
  console.log(token)
  return true;
}

export default function LoginPage() {
  const tr: Translation = (translations as Record<string, Translation>)[process.env.NEXT_PUBLIC_LANGUAGE || 'en'] || {};

  return (
      <div className={styles.outerForm}>
        <form className="col col-md-8 col-lg-6" onSubmit={
          async (e) => {
            // @ts-ignore
            if (await sendForm(e, process.env.NEXT_PUBLIC_API))
              window.location.replace('/admin/questions/')
          }
        }>
          <h1 className={styles.header}>{tr.login}</h1>
          <hr/>
          <input name="username" type="username" className="form-control mb-2" placeholder={tr.username} required
                 maxLength={16} pattern="[A-z0-9]{1,16}" title="Only letters and numbers allowed"/>
          <input name="password" type="password" className="form-control mb-3" placeholder={tr.password} required
                 minLength={1} maxLength={100}/>
          <p className="error text-danger text-danger-emphasis mb-3">
          </p>
          <button className="btn btn-lg btn-outline-danger" type="submit">{tr.continue}</button>
        </form>
      </div>
  )
}
