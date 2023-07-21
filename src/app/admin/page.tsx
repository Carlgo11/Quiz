import 'bootstrap/dist/css/bootstrap.css'
import '../layout'
import Link from "next/link";

async function uploadQuestions(formData: FormData) {
    // @ts-ignore
    const code = formData.get('raw').toString()
    console.log(code)
    const res: Response = await fetch(`${process.env.API}/questions`, {
        method: 'PUT',
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            'Authorization': `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyIjoidGVzdDEiLCJuYmYiOjE2ODk0NjI1NDEsImV4cCI6MTY4OTQ2OTc0MSwiaWF0IjoxNjg5NDYyNTQxfQ.pTKVCGfnb1drpGxGljoZsTQnxry9MoaR-KpjDcnN-pA`
        },
        body: code,
        cache: "no-cache"
    })
    if (!res.ok) throw res.status
}

async function getQuestions() {
    const data = await fetch(`${process.env.API}/questions`, {
        headers: {
            // TODO: Implement admin JWT
            "authorization": `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyIjoidGVzdDAxIiwibmJmIjoxNjg5NzMzMzk1LCJleHAiOjE2ODk3NDA1OTUsImlhdCI6MTY4OTczMzM5NX0.0lNBs_siPg2n9UrIOMaJOXYLcznR8J4dxdb7LSby1Pk`,
            "accept": "application/json",
        },
        cache: "no-cache"
    });
    return await data.json()
}

export default async function AdminPage() {
    const questions = await getQuestions();
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

//return (
//             <div>
//                 <form action={uploadQuestions} className="form-floating">
//                     <textarea name="raw" className="form-control"></textarea>
//                     <label htmlFor="raw">Raw JSON data</label>
//                     <button className="btn btn-success" type="submit">Upload</button>
//                 </form>
//             </div>
//     )
