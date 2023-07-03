import {cookies} from "next/headers"
import {redirect} from 'next/navigation';
import 'bootstrap/dist/css/bootstrap.css'
import '../layout'
import Script from 'next/script'

export const runtime = 'edge'

class HttpError extends Error {
    constructor(public code: number, message: string) {
        super(message);
    }
}

export default async function Home() {
    let token = cookies().get('token')?.value as string
    // Redirect to /register if token not set
    if (!token) redirect('/redirect');
    token = JSON.parse(token).token
    try {
        const questions = await getQuestions(`${token}`);
        return (
                <div className="row justify-content-center">
                <form id="questions" className="col col-md-11 col-lg-10">
                    {Object.keys(questions).map((key: string) => (
                            <div key={key} className="card my-4">
                                <div className="card-header">
                                    Question {key}
                                </div>
                                <div className="card-body">
                                    {questions[key].map((option: string) => (
                                            <div key={option} className="form-check">
                                                <input type="radio" id={key + option} name={key}
                                                       className="form-check-input"
                                                       value={option}/>
                                                <label className="form-check-label"
                                                       htmlFor={key + option}>{option}</label>
                                            </div>
                                    ))}
                                </div>
                            </div>
                    ))
                    }
                    <p className="error text-danger-emphasis"></p>
                    <button className="btn btn-success btn-lg" type="submit">Submit</button>
                    <Script src="/questions.js"/>
                </form>
                </div>
        )
    } catch (e) {
        if ((e instanceof HttpError)) return sendError(e)
        throw e
    }
}

function sendError(e: HttpError) {
    console.error(e);
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

async function getQuestions(token: string) {
    const res = await fetch('https://quiz-7ff.pages.dev/api/questions', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    })

    if (!res.ok) throw new HttpError(res.status, res.statusText);

    return res.json()
}
