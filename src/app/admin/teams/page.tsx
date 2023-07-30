import 'bootstrap/dist/css/bootstrap.css'
import translations from "@/i18n.json";

export default function TeamsPage(){
  // @ts-ignore
  const tr = translations[process.env.NEXT_PUBLIC_LANGUAGE || 'en'] || {};

  return(
      <div>
        <h1>{tr.teams}</h1>
        <div className="card mt-4">
          <div className="card-header">{tr.team} 1</div>
          <div className="card-body row">
            <table className="table table-striped-columns text-center">
              <thead>
              <tr>
                <th scope="col">{tr.question} 1</th>
                <th scope="col">{tr.question} 2</th>
                <th scope="col">{tr.question} 3</th>
                <th scope="col">{tr.question} 4</th>
                <th scope="col">{tr.question} 5</th>
                <th scope="col">{tr.question} 6</th>
              </tr>
              </thead>
              <tbody className="">
              <tr>
                <th className="text-danger">A</th>
                <th className="text-success">A</th>
                <th className="text-danger">A</th>
                <th className="text-success">A</th>
                <th className="text-danger">A</th>
                <th className="text-danger">A</th>
              </tr>
              </tbody>
            </table>
          </div>
          <div className="card-footer font-monospace text-body-secondary">2/6</div>
        </div>
      </div>

  );
}
