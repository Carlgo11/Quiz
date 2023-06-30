export const runtime = 'edge'
import 'bootstrap/dist/css/bootstrap.css'
import '../layout';
import Script from 'next/script'

export default async function Home() {
    return (
        <form id="register" action="post">
            <h1 className="text-center">Choose A Team Name</h1>
            <hr/>
            <div className="mb-3">
                <label htmlFor="username" className="form-label">Team Name</label>
                <input name="username" id="username" className="form-control"/>
            </div>
            <p className="error text-danger text-danger-emphasis mb-3">
            </p>
            <button className="btn btn-lg btn-success" type="submit">Continue</button>
            <Script src="/register.js"/>
        </form>
    );
}