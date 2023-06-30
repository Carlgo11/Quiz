import {cookies} from "next/headers";
import 'bootstrap/dist/css/bootstrap.css'
import '../layout';

export const runtime = 'edge'

export default async function Home() {
    const cookieStore = cookies();
    const token = JSON.parse(cookieStore.get('token')?.value as string).token
    const questions = await getQuetsions(`${token}`);
    return (
        <form>
            {Object.keys(questions).map((key) => (
                <div key={key} className="card my-4">
                    <div className="card-header">
                        Question {key}
                    </div>
                    <div className="card-body">
                        {questions[key].map((option: string) => (
                            <div key={option} className="form-check">
                                <input type="radio" id={key + option} name={key} className="form-check-input"/>
                                <label className="form-check-label">{option}</label>
                            </div>
                        ))}
                    </div>
                </div>
            ))
            }
        </form>
    )
}


async function getQuetsions(token: string) {
    const res = await fetch('https://quiz-7ff.pages.dev/api/questions', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    })
    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error(`Failed to fetch data. Status: ${res.status} ${res.statusText}`)
    }

    return res.json()
}
