import Link from "next/link";
import {cookies} from "next/headers";

async function fetchQuestions(token: string) {
    const data = await fetch(`${process.env.API}/questions`, {
        headers: {
            "authorization": `Bearer ${token.toString()}`,
            "accept": "application/json",
        },
        cache: "no-cache"
    });
    return await data.json()
}

export default async function QuestionsList() {
    let {token} = JSON.parse(cookies().get('token')?.value || "{}" as string)
    const questions = await fetchQuestions(token);
    return (
            <div className="row">
                {Object.keys(questions).map((id: string) => (
                        <Link href={`/admin/${id}`} key={id}>
                            <div className="col-12 mt-1 p-3 border border-secondary-subtle bg-body-secondary">
                                <h2>Question {id}</h2>
                                <p className="text-body-secondary">{questions[id].length} options</p>
                            </div>
                        </Link>
                ))}
                <Link href={`/admin/${Object.keys(questions).length + 1}`}>
                    <button className="btn btn-primary mt-2" type="button">Add new</button>
                </Link>
            </div>
    )
}
