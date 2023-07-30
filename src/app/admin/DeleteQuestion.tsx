"use client"

import {useRouter} from "next/navigation";

export default function DeleteButton({question, token}: { question: string, token: string }) {
    const router = useRouter()
    const deleteQuestion = async () => {
        const res: Response = await fetch(`${process.env.NEXT_PUBLIC_API}/questions/${question}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            cache: "no-cache"
        })
        if (!res.ok) console.error((await res.json())['error'])
        return res.ok
    }

    return <i className="bi bi-trash-fill q-delete-btn"
              style={{position: "absolute", top: "1em", right: "1em"}} onClick={async () => await deleteQuestion() ? router.refresh() : null}></i>
}
