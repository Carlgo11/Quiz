import 'bootstrap/dist/css/bootstrap.css'
import '@/app/layout'
import Script from 'next/script'
import styles from '@/styles/auth.module.css'
import translations from '@/i18n.json'

export const runtime = 'edge'

export default async function Home() {
  // @ts-ignore
  const tr = translations[process.env.NEXT_PUBLIC_LANGUAGE || 'en'] || {};

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
