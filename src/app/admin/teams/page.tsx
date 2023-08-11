import translations from "@/i18n.json";
import {cookies} from "next/headers";
import styles from '@/styles/teams.module.css'
import {Translation} from "@/types/translations";
import {redirect} from "next/navigation";
import {DeleteBtn} from "@/components/admin/teams/DeleteBtn";

async function getTeams(token: string) {
  const res: Response = await fetch(`${process.env.NEXT_PUBLIC_API}/teams`, {
    method: 'GET',
    headers: {
      "Accept": "application/json",
      'Authorization': `Bearer ${token}`
    },
    cache: "no-cache"
  })
  if (!res.ok) throw res.status
  return res.json()
}

function Question({question, answer}: {question: {correct:boolean, name: number}, answer:string} ){
  return(
      <div className={"col " + styles.question}>
        <h3 className={styles.q_name}>{question.name}</h3>
        <hr className={styles.hr} />
        {answer ? <b key={question.name} className={styles.answer + (question.correct ? ' text-success' : ' text-danger')}>{answer}</b>:<b className={styles.answer}>—</b> }

      </div>
  )
}

export default async function TeamsPage() {
  let {token} = JSON.parse(cookies().get('admin-token')?.value || "{}" as string)
  if (!token) redirect('/admin/login');
  const teams = await getTeams(token)
  const tr: Translation = (translations as Record<string, Translation>)[process.env.NEXT_PUBLIC_LANGUAGE || 'en'] || {};
  return(
      <div>
        <h1>{tr.teams}</h1>
        {Object.keys(teams).map((team: string) => (
            <div key={team} className="card mt-4">
              <div className={"card-header " + styles.team}>{team}
                <DeleteBtn token={token} team={team}/>
              </div>
          <div className={"card-body row row-cols-6 " + styles.questions}>
                {Object.keys(teams[team]).map((q) =>
                    parseInt(q) ? <Question key={q} answer={teams[team][q].answer} question={{correct: teams[team][q].correct as boolean, name: parseInt(q)}}/> : null )}
          </div>
              <div className="card-footer font-monospace text-body-secondary">{tr.total}: {teams[team].total}</div>
        </div>
        ))
        }
      </div>
  )
}
