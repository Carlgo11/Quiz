"use client"

import {useRouter} from "next/navigation";

export default function DeleteButton({question, token}: { question: string, token: string }) {
    const router = useRouter()
    const deleteQuestion = async () => {
        const res: Response = await fetch(`${process.env.NEXT_PUBLIC_API}/questions/${question}`, {
            method: 'DELETE',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`
            },
            cache: "no-cache"
        })
        if (!res.ok) throw res.status

        router.refresh()
        return res.ok
    }

    return <i className="bi bi-trash-fill"
              style={{position: "absolute", top: "1em", right: "1em"}} onClick={async () => deleteQuestion()}></i>
}
