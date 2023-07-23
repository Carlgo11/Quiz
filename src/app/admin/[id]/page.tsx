import 'bootstrap/dist/css/bootstrap.css'
import React from "react";
import Question from "@/app/admin/[id]/EditQuestion";
import {cookies} from "next/headers";
import {redirect} from "next/navigation";

export default async function EditQuestion({params}: { params: { id: string } }) {
    let {token} = JSON.parse(cookies().get('token')?.value || "{}" as string)
    if (!token) redirect('/admin/');

    const data = await fetch(`${process.env.API}/questions`, {
        headers: {
            "authorization": `Bearer ${token}`,
            "accept": "application/json",
        },
        cache: "no-cache"
    });
    const json = (await data.json())[params.id] || []
    return <Question params={params} data={json} token={token}/>
}
