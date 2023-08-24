import Link from "next/link";
import 'bootstrap-icons/font/bootstrap-icons.css';
import DeleteButton from "./DeleteQuestion";
import translations from '@/i18n.json'
import {Translation} from "@/types/translations";
import {redirect} from "next/navigation";

const fetchQuestions = async (token: string) => {
  const data = await fetch(`${process.env.NEXT_PUBLIC_API}/questions`, {
    headers: {
      "authorization": `Bearer ${token.toString()}`,
      "accept": "application/json",
    },
    cache: "no-cache"
  });
  if (!data.ok) {
    if (data.status === 401 || data.status === 403)
      redirect('/admin/logout')
    console.log(`domain: ${data.url}`)
    console.error(await data.text())
    return false;
  }
  return await data.json()
}

export default async function QuestionsList({token}: { token: string }) {
  const tr: Translation = (translations as Record<string, Translation>)[process.env.NEXT_PUBLIC_LANGUAGE || 'en'] || {};
  const questions = await fetchQuestions(token);
  if (!questions) return "";
  return (
      <div className="row">
        {Object.keys(questions).map((id: string) => (
            <div key={id}
                 className="col-12 mt-1 p-3 border border-secondary-subtle bg-body-secondary position-relative row">
              <Link href={`/admin/questions/${id}`} className="col-11">
                <div>
                  <h2>{tr.question} {id}</h2>
                  <p className="text-body-secondary">{questions[id].length} {tr.options}</p>
                </div>
              </Link>
              <div className="col">
                <DeleteButton question={id} token={token}/>
              </div>
            </div>
        ))}
        <Link href={`/admin/questions/${Object.keys(questions).length + 1}`}>
          <button className="btn btn-primary mt-2" type="button">{tr.add_new}</button>
        </Link>
      </div>
  )
}
