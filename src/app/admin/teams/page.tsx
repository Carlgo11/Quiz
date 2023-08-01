import 'bootstrap/dist/css/bootstrap.css'
import translations from "@/i18n.json";
import {cookies} from "next/headers";

async function getTeams(uri: string, token: string) {
  const res: Response = await fetch(`${uri}/teams`, {
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

export default async function TeamsPage() {
  let {token} = JSON.parse(cookies().get('token')?.value || "{}" as string)
  const teams = await getTeams(process.env.API || '', token)
  // @ts-ignore
  const tr = translations[process.env.NEXT_PUBLIC_LANGUAGE || 'en'] || {};
  return(
      <div>
        <h1>{tr.teams}</h1>
        {Object.keys(teams).map((team: string) => (
            <div key={team} className="card mt-4">
              <div className="card-header">{team}</div>
          <div className="card-body row">
            <table className="table table-striped-columns text-center">
              <thead>
              <tr>
                {Object.keys(teams[team]).map((question) =>
                    parseInt(question) ? <th key={question} scope="col">{tr.question} {question}</th> : null
                )}
              </tr>
              </thead>
              <tbody>
              <tr>
                {Object.keys(teams[team]).map((q) =>
                    parseInt(q) ?
                        teams[team][q].answer ?
                            <th key={q} className={teams[team][q].correct ? 'text-success' : 'text-danger'}>
                              {teams[team][q].answer}
                            </th> : <th>-</th> : null
                )}
              </tr>
              </tbody>
            </table>
          </div>
              <div className="card-footer font-monospace text-body-secondary">{teams[team].total}</div>
        </div>
        ))
        }
      </div>
  )
}
