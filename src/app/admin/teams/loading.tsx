import 'bootstrap/dist/css/bootstrap.css'
import translations from "@/i18n.json";
import {Translation} from "@/types/translations";

export default function Loading(){
  const tr: Translation = (translations as Record<string, Translation>)[process.env.NEXT_PUBLIC_LANGUAGE || 'en'] || {};
  return (
      <div>
        <h1>{tr.teams?.toString()}</h1>
            <div className="card mt-4">
              <div className="card-header card-text placeholder-wave"><span className="placeholder col-2"></span></div>
              <div className="card-body row row-cols-12 placeholder-wave ">
                <span className="placeholder col py-5"></span>
                <span className="placeholder col py-5 mx-1"></span>
                <span className="placeholder col py-5"></span>
                <span className="placeholder col py-5 mx-1"></span>
                <span className="placeholder col py-5"></span>
                <span className="placeholder col py-5 ms-1"></span>
              </div>
              <div className="card-footer font-monospace text-body-secondary placeholder-wave">Total: <span className="placeholder col-1"/></div>
            </div>
      </div>
  )
}
