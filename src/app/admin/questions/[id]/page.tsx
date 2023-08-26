import 'bootstrap/dist/css/bootstrap.css'
import React from "react";
import Question from "@/components/admin/questions/EditQuestion";
import {cookies} from "next/headers";
import {redirect} from "next/navigation";

export default async function EditQuestion({params}: { params: { id: number } }) {
  const {id} = params
  let {token} = JSON.parse(cookies().get('admin-token')?.value || "{}" as string)
  if (!token) redirect('/admin/login');

  const data = await fetch(`${process.env.NEXT_PUBLIC_API}/questions/${id}`, {
    headers: {
      "authorization": `Bearer ${token}`,
      "accept": "application/json",
    },
    cache: "no-cache"
  });

  const json = data.ok ? (await data.json())[id] : []
  return <Question id={id} data={json} token={token}/>
}
