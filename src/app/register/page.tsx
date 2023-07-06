import 'bootstrap/dist/css/bootstrap.css'
import '../layout'
import Script from 'next/script'
import styles from './page.module.css'
import translations from '../i18n.json'
export const runtime = 'edge'

export default async function Home() {
    const selectedLanguage = process.env.LANGUAGE || 'en'
    // @ts-ignore
    const tr = translations[selectedLanguage] || {};

    return (
            <div className={styles.outerForm}>
                <form className="col col-md-8 col-lg-6" id="register" method="POST">
                    <h1 className={styles.header}>{tr.enter_username}</h1>
                    <hr/>
                    <div className="mb-3">
                        <input name="username" className="form-control" placeholder={tr.username}/>
                    </div>
                    <p className="error text-danger text-danger-emphasis mb-3">
                    </p>
                    <button className="btn btn-lg btn-success" type="submit">{tr.continue}</button>
                    <Script src="/register.js" async/>
                </form>
            </div>
    );
}
