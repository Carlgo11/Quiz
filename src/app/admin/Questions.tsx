import Link from "next/link";
import 'bootstrap-icons/font/bootstrap-icons.css';
import DeleteButton from "@/app/admin/DeleteQuestion";

async function fetchQuestions(token: string) {
    const data = await fetch(`${process.env.API}/questions`, {
        headers: {
            "authorization": `Bearer ${token.toString()}`,
            "accept": "application/json",
        },
        cache: "no-cache"
    });
    if (!data.ok) {
        console.error(data.json())
        return false;
    }
    return await data.json()
}

export default async function QuestionsList({token}:{token:string}) {
    const questions = await fetchQuestions(token);
    if (!questions) return "";
    return (
            <div className="row">
                {Object.keys(questions).map((id: string) => (
                        <div key={id}
                             className="col-12 mt-1 p-3 border border-secondary-subtle bg-body-secondary position-relative row">
                            <Link href={`/admin/${id}`} className="col-11">
                                <div>
                                <h2>Question {id}</h2>
                                <p className="text-body-secondary">{questions[id].length} options</p>
                                </div>
                            </Link>
                            <div className="col">
                                <DeleteButton question={id} token={token}/>
                            </div>
                        </div>
                ))}
                <Link href={`/admin/${Object.keys(questions).length + 1}`}>
                    <button className="btn btn-primary mt-2" type="button">Add new</button>
                </Link>
            </div>
    )
}
