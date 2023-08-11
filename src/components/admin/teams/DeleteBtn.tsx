"use client"
import styles from "@/styles/teams.module.css";
import {useRouter} from "next/navigation";
import 'bootstrap-icons/font/bootstrap-icons.css';


async function delTeams(token: string, team: string) {
  const res: Response = await fetch(`${process.env.NEXT_PUBLIC_API}/teams`, {
    method: 'DELETE',
    headers: {
      "Content-Type": "application/json",
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({"user": team}),
    cache: "no-cache"
  })
  if (!res.ok) {
    const {error} = await res.json();
    console.error(error)
    return error;
  }
  return res.ok
}


export function DeleteBtn({token, team}: { token: string, team: string }) {
  const router = useRouter();
  return <i className={"bi bi-trash-fill q-delete-btn " + styles.qDeleteBtn}
            onClick={async () => await delTeams(token, team) ? router.refresh() : null}></i>
}
