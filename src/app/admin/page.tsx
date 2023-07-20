'use client'
import 'bootstrap/dist/css/bootstrap.css'
import '../layout'

async function uploadQuestions(formData: FormData) {
    // @ts-ignore
    const code = formData.get('raw').toString()
    console.log(code)
    const res = await fetch(`${process.env.API}/questions`, {
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

export default function AdminPage() {
    return (
            <div>
                <form action={uploadQuestions} className="form-floating">
                    <textarea name="raw" className="form-control"></textarea>
                    <label htmlFor="raw">Raw JSON data</label>
                    <button className="btn btn-success" type="submit">Upload</button>
                </form>
            </div>
    )
}
