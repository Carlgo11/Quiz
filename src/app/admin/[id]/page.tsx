import 'bootstrap/dist/css/bootstrap.css'
import React from "react";
import Question from "@/app/admin/[id]/EditQuestion";

export default async function EditQuestion({params}: { params: { id: string } }) {

    const data = await fetch(`${process.env.API}/questions`, {
        headers: {
            // TODO: Implement admin JWT
            "authorization": `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyIjoidGVzdDAxIiwibmJmIjoxNjg5NzMzMzk1LCJleHAiOjE2ODk3NDA1OTUsImlhdCI6MTY4OTczMzM5NX0.0lNBs_siPg2n9UrIOMaJOXYLcznR8J4dxdb7LSby1Pk`,
            "accept": "application/json",
        },
        cache: "no-cache"
    });
    const json = (await data.json())[params.id] || []
    return <Question params={params} data={json}/>
}
