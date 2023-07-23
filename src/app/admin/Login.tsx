"use client"
import styles from "@/styles/auth.module.css";
import {useRouter} from 'next/navigation'
import translations from '@/i18n.json'
import {FormEvent} from "react";

async function sendForm(event: FormEvent, url: string) {
    const form: any | null = event.target
    if (form === null) return null;
    event.preventDefault()

    const formData: FormData = new FormData(form) || {};
    const res = await fetch(`${url}/admin`, {
        method: 'POST', headers: {
            'Content-Type': 'application/json', 'Accept': 'application/json',
        }, body: JSON.stringify({
            'user': formData.get('username'),
            'password': formData.get('password')
        }), cache: 'no-store'
    })

    if (!res.ok) {
        const {error} = await res.json();
        console.error(`${res.status} ${res.statusText}: ${error}`)
        // @ts-ignore
        document.querySelector('.error').textContent = error
        return null;
    }

    const {token} = await res.json();
    // Set the session cookie
    const cookieValue = JSON.stringify({token});
    document.cookie = `token=${encodeURIComponent(cookieValue)}; path=/`;
    return true;
}

export default function LoginPage() {
    const selectedLanguage = process.env.NEXT_PUBLIC_LANGUAGE || 'en'
    // @ts-ignore
    const tr = translations[selectedLanguage] || {};
    const router = useRouter();
    return (
            <div className={styles.outerForm}>
                <form className="col col-md-8 col-lg-6" onSubmit={
                    async (e) => {
                        // @ts-ignore
                        if (await sendForm(e, process.env.NEXT_PUBLIC_API))
                            await router.refresh()
                    }
                }>
                    <h1 className={styles.header}>{tr.login}</h1>
                    <hr/>
                    <input name="username" type="username" className="form-control mb-2" placeholder={tr.username} required pattern="[A-z0-9]{1,16}"/>
                    <input name="password" type="password" className="form-control mb-3" placeholder={tr.password} required minLength={1} maxLength={100}/>
                    <p className="error text-danger text-danger-emphasis mb-3">
                    </p>
                    <button className="btn btn-lg btn-success" type="submit">{tr.continue}</button>
                </form>
            </div>
    )
}
