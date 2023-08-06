import Script from 'next/script'
import styles from '@/styles/auth.module.css'
import translations from '@/i18n.json'
import {Translation} from "@/types/translations";
import {cookies} from "next/headers";
import {redirect} from "next/navigation";

export const runtime = 'edge'

export default async function Page() {
  let {token} = JSON.parse(cookies().get('token')?.value || "{}" as string)
  if (token) return redirect('/questions');
  const tr: Translation = (translations as Record<string, Translation>)[process.env.NEXT_PUBLIC_LANGUAGE || 'en'] || {};

  return (
      <div className={styles.outerForm}>
        <form className="col col-md-8 col-lg-6" id="register" method="POST" action={`${process.env.API}/teams`}>
          <h1 className={styles.header}>{tr.enter_name}</h1>
          <hr/>
          <div className="mb-3">
            <input name="username" className="form-control" placeholder={tr.team_name}/>
          </div>
          <p className="error text-danger text-danger-emphasis mb-3">
          </p>
          <button className="btn btn-lg btn-success" type="submit">{tr.continue}</button>
          <Script src="/register.js" defer/>
        </form>
      </div>
  );
}
